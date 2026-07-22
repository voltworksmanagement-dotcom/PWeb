import { useEffect, useRef } from 'react';

/**
 * WebGL water-ripple background.
 *
 * Runs a two-buffer height-field water simulation: each step derives a new
 * height from the neighbourhood average of the previous two states, damped so
 * ripples decay. The height gradient then refracts a procedurally generated
 * caustic pattern — no source image, so the effect ships no assets and stays
 * on-brand with the surrounding navy.
 *
 * Height is stored in an 8-bit RGBA texture, packed across two channels for
 * precision. Float render targets need OES_texture_float *plus*
 * WEBGL_color_buffer_float, and the latter is missing on plenty of GPUs — the
 * packed 8-bit path renders everywhere.
 *
 * Degrades safely: without WebGL, or under prefers-reduced-motion, the caller's
 * own CSS background simply shows through.
 */

const SIM_SIZE = 256;   // simulation grid resolution (square, power of two)
const DAMPING = 0.984;  // <1 so ripple energy bleeds off over ~1s
const MAX_DPR = 1.5;    // cap device pixel ratio; the effect is soft anyway

const QUAD_VS = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

/**
 * Height is a signed value around 0, packed into two 8-bit channels.
 * Shared by both fragment shaders so the encodings can't drift apart.
 */
const PACK_GLSL = `
const float HEIGHT_RANGE = 2.0;

float unpackHeight(vec4 c) {
  float v = c.r + c.g / 255.0;
  return (v - 0.5) * HEIGHT_RANGE;
}

vec4 packHeight(float h) {
  float v = clamp(h / HEIGHT_RANGE + 0.5, 0.0, 1.0);
  float r = floor(v * 255.0) / 255.0;
  float g = fract(v * 255.0);
  return vec4(r, g, 0.0, 1.0);
}
`;

/**
 * Simulation step. uPrev is state at t-1, uCurr at t; output is t+1.
 * Drops are injected here rather than in a separate pass so one draw covers
 * both integration and input.
 */
const SIM_FS = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uPrev;
uniform sampler2D uCurr;
uniform vec2 uTexel;
uniform vec2 uDrop;
uniform float uDropStrength;
uniform float uDropRadius;
uniform float uDamping;
uniform vec2 uAspect;

${PACK_GLSL}

void main() {
  float prev = unpackHeight(texture2D(uPrev, vUv));
  float curr = unpackHeight(texture2D(uCurr, vUv));

  float sum =
      unpackHeight(texture2D(uCurr, vUv + vec2(uTexel.x, 0.0)))
    + unpackHeight(texture2D(uCurr, vUv - vec2(uTexel.x, 0.0)))
    + unpackHeight(texture2D(uCurr, vUv + vec2(0.0, uTexel.y)))
    + unpackHeight(texture2D(uCurr, vUv - vec2(0.0, uTexel.y)));

  float next = (sum * 0.5 - prev) * uDamping;

  if (uDropStrength > 0.0) {
    // Correct for aspect so drops stay circular on wide viewports.
    float d = distance(vUv * uAspect, uDrop * uAspect);
    next += uDropStrength * smoothstep(uDropRadius, 0.0, d);
  }

  gl_FragColor = packHeight(next);
}
`;

/**
 * Render pass: pure refraction.
 *
 * Measured against the reference recording, the effect adds no colour of its
 * own — comparing a rippled frame to a calm one over the same region gives
 * identical means and a 0.983 histogram intersection, with individual pixels
 * differing by up to 235. In other words it only *moves* pixels, like looking
 * through real water. So this pass paints no caustics and no blue tint: it
 * reproduces the section's own backdrop, samples it at a displaced coordinate,
 * and adds only a faint white glint on the crests.
 */
const RENDER_FS = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uHeight;
uniform vec2 uTexel;
uniform vec2 uAspect;

${PACK_GLSL}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y);
}

// The section's own vertical gradient, reproduced so it can be refracted.
// Must track the CSS gradient on the parent <section>.
//
// Refracting a perfectly smooth gradient is nearly invisible: a decayed ripple
// displaces UVs by ~0.016, which over this gradient is a <1/255 colour change.
// The reference video refracts a detailed photo, which is why it reads so
// clearly there. So the backdrop carries fine monochrome structure for the
// displacement to bite on — brightness variation only, in the same navy, so it
// still adds no hue of its own.
vec3 backdrop(vec2 uv) {
  vec3 top = vec3(0.016, 0.039, 0.118);  // #040a1e
  vec3 mid = vec3(0.071, 0.141, 0.278);  // #122447
  vec3 bot = vec3(0.016, 0.039, 0.118);  // #040a1e

  vec3 base = uv.y > 0.5
    ? mix(mid, top, (uv.y - 0.5) * 2.0)
    : mix(bot, mid, uv.y * 2.0);

  vec2 p = uv * uAspect;
  float detail =
      noise(p * 14.0) * 0.55
    + noise(p * 34.0) * 0.30
    + noise(p * 70.0) * 0.15;

  // Scale with the local backdrop brightness so the texture disappears into
  // the dark top/bottom edges instead of banding against them.
  float amp = 0.055 * smoothstep(0.0, 0.35, base.b);
  return base + vec3(0.55, 0.75, 1.0) * (detail - 0.5) * amp;
}

void main() {
  float hL = unpackHeight(texture2D(uHeight, vUv - vec2(uTexel.x, 0.0)));
  float hR = unpackHeight(texture2D(uHeight, vUv + vec2(uTexel.x, 0.0)));
  float hD = unpackHeight(texture2D(uHeight, vUv - vec2(0.0, uTexel.y)));
  float hU = unpackHeight(texture2D(uHeight, vUv + vec2(0.0, uTexel.y)));

  vec2 grad = vec2(hR - hL, hU - hD);
  vec3 normal = normalize(vec3(-grad * 3.0, 1.0));

  // Refraction: sample the backdrop at a displaced coordinate. This is the
  // whole effect — everything else below is a light touch on top.
  vec2 refracted = vUv + grad * 0.55;
  vec3 col = backdrop(refracted);

  // Crest shading. Because the backdrop is a smooth gradient, displacement
  // alone is nearly invisible, so lift/darken along the slope to give the wave
  // a readable surface. Neutral white, not blue — the reference adds no hue.
  float crest = clamp((grad.x + grad.y) * 5.0, -1.0, 1.0);
  col += vec3(1.0) * crest * 0.10;

  // Sparse white glint on the steepest crests.
  vec3 lightDir = normalize(vec3(0.4, 0.7, 0.6));
  float spec = pow(max(dot(normal, lightDir), 0.0), 60.0);
  col += vec3(1.0) * spec * 0.18;

  // Feather the top/bottom so the canvas blends into the section gradient.
  float edge = smoothstep(0.0, 0.16, vUv.y) * smoothstep(1.0, 0.84, vUv.y);

  gl_FragColor = vec4(col, edge);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string, label: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(`[WaterRipple] ${label} failed to compile:`, gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function program(gl: WebGLRenderingContext, vs: string, fs: string, label: string) {
  const v = compile(gl, gl.VERTEX_SHADER, vs, `${label} vertex shader`);
  const f = compile(gl, gl.FRAGMENT_SHADER, fs, `${label} fragment shader`);
  if (!v || !f) return null;
  const p = gl.createProgram();
  if (!p) return null;
  gl.attachShader(p, v);
  gl.attachShader(p, f);
  gl.bindAttribLocation(p, 0, 'aPos');
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.warn(`[WaterRipple] ${label} failed to link:`, gl.getProgramInfoLog(p));
    return null;
  }
  return p;
}

export default function WaterRipple({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const gl = (canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      depth: false,
      stencil: false,
    }) || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;

    if (!gl) {
      console.warn('[WaterRipple] WebGL unavailable — falling back to the CSS background.');
      return;
    }

    const simProg = program(gl, QUAD_VS, SIM_FS, 'simulation');
    const renderProg = program(gl, QUAD_VS, RENDER_FS, 'render');
    if (!simProg || !renderProg) return;

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    // Neutral height (0.0) packs to r=0.5 — clear to that, not to black, or the
    // whole field starts at the bottom of its range and slams into the clamp.
    const NEUTRAL = new Uint8Array(SIM_SIZE * SIM_SIZE * 4);
    for (let i = 0; i < SIM_SIZE * SIM_SIZE; i++) {
      NEUTRAL[i * 4] = 128;
      NEUTRAL[i * 4 + 1] = 0;
      NEUTRAL[i * 4 + 2] = 0;
      NEUTRAL[i * 4 + 3] = 255;
    }

    const makeTarget = () => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, SIM_SIZE, SIM_SIZE, 0, gl.RGBA, gl.UNSIGNED_BYTE, NEUTRAL);
      // NEAREST: the packed two-channel encoding must not be interpolated.
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      const ok = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
      return { tex, fbo, ok };
    };

    // Three states: t-1, t, and the target we render t+1 into.
    let a = makeTarget();
    let b = makeTarget();
    let c = makeTarget();
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    if (!a.ok || !b.ok || !c.ok) {
      console.warn('[WaterRipple] incomplete framebuffer — falling back to the CSS background.');
      return;
    }

    const simU = {
      prev: gl.getUniformLocation(simProg, 'uPrev'),
      curr: gl.getUniformLocation(simProg, 'uCurr'),
      texel: gl.getUniformLocation(simProg, 'uTexel'),
      drop: gl.getUniformLocation(simProg, 'uDrop'),
      dropStrength: gl.getUniformLocation(simProg, 'uDropStrength'),
      dropRadius: gl.getUniformLocation(simProg, 'uDropRadius'),
      damping: gl.getUniformLocation(simProg, 'uDamping'),
      aspect: gl.getUniformLocation(simProg, 'uAspect'),
    };
    const renderU = {
      height: gl.getUniformLocation(renderProg, 'uHeight'),
      texel: gl.getUniformLocation(renderProg, 'uTexel'),
      aspect: gl.getUniformLocation(renderProg, 'uAspect'),
    };

    const drops: { x: number; y: number; strength: number; radius: number }[] = [];
    const addDrop = (x: number, y: number, strength: number, radius: number) => {
      if (drops.length < 12) drops.push({ x, y, strength, radius });
    };

    let width = 1;
    let height = 1;
    let aspectX = 1;
    let aspectY = 1;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      width = Math.max(1, Math.round(rect.width * dpr));
      height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      const ar = width / height;
      aspectX = ar > 1 ? ar : 1;
      aspectY = ar > 1 ? 1 : 1 / ar;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // --- input ---------------------------------------------------------
    let lastX = 0;
    let lastY = 0;
    let hasLast = false;

    const toUv = (clientX: number, clientY: number) => {
      const r = canvas.getBoundingClientRect();
      return { x: (clientX - r.left) / r.width, y: 1 - (clientY - r.top) / r.height };
    };

    const onMove = (e: PointerEvent) => {
      const { x, y } = toUv(e.clientX, e.clientY);
      if (x < 0 || x > 1 || y < 0 || y > 1) return;
      // Strength tracks pointer speed: a slow drift barely disturbs the
      // surface, a fast sweep throws a real wake.
      const speed = hasLast ? Math.hypot(x - lastX, y - lastY) : 0;
      lastX = x;
      lastY = y;
      hasLast = true;
      addDrop(x, y, Math.min(0.5, 0.16 + speed * 6.0), 0.05);
    };

    const onDown = (e: PointerEvent) => {
      const { x, y } = toUv(e.clientX, e.clientY);
      if (x < 0 || x > 1 || y < 0 || y > 1) return;
      addDrop(x, y, 0.9, 0.085);
    };

    const onLeave = () => {
      hasLast = false;
    };

    // Listen on the window so the ripple still follows the cursor even though
    // the section's content sits above the canvas.
    if (!reduceMotion) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerdown', onDown, { passive: true });
      canvas.addEventListener('pointerleave', onLeave, { passive: true });
    }

    let rainTimer: ReturnType<typeof setTimeout> | undefined;
    const scheduleRain = () => {
      rainTimer = setTimeout(() => {
        addDrop(Math.random(), Math.random(), 0.35 + Math.random() * 0.3, 0.055);
        scheduleRain();
      }, 1600 + Math.random() * 2200);
    };

    // --- loop ----------------------------------------------------------
    let running = false;
    let raf = 0;

    const step = () => {
      // Simulation: a (t-1), b (t) -> c (t+1), then rotate.
      // Drain several drops per frame so a fast pointer keeps its full trail.
      const batch = Math.max(1, drops.length);
      for (let i = 0; i < batch; i++) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, c.fbo);
        gl.viewport(0, 0, SIM_SIZE, SIM_SIZE);
        gl.disable(gl.BLEND);
        gl.useProgram(simProg);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, a.tex);
        gl.uniform1i(simU.prev, 0);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, b.tex);
        gl.uniform1i(simU.curr, 1);
        gl.uniform2f(simU.texel, 1 / SIM_SIZE, 1 / SIM_SIZE);
        gl.uniform1f(simU.damping, DAMPING);
        gl.uniform2f(simU.aspect, aspectX, aspectY);

        const drop = drops.shift();
        if (drop) {
          gl.uniform2f(simU.drop, drop.x, drop.y);
          gl.uniform1f(simU.dropStrength, drop.strength);
          gl.uniform1f(simU.dropRadius, drop.radius);
        } else {
          gl.uniform2f(simU.drop, 0, 0);
          gl.uniform1f(simU.dropStrength, 0);
          gl.uniform1f(simU.dropRadius, 1);
        }
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        const spent = a;
        a = b;
        b = c;
        c = spent;
      }

      // Composite to the canvas.
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, width, height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.useProgram(renderProg);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, b.tex);
      gl.uniform1i(renderU.height, 0);
      gl.uniform2f(renderU.texel, 1 / SIM_SIZE, 1 / SIM_SIZE);
      gl.uniform2f(renderU.aspect, aspectX, aspectY);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = () => {
      if (!running) return;
      step();
      raf = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (running || reduceMotion) return;
      running = true;
      resize();
      // Seed a few drops so the surface is already moving when it scrolls in.
      for (let i = 0; i < 4; i++) {
        addDrop(Math.random(), Math.random(), 0.4, 0.06);
      }
      raf = requestAnimationFrame(loop);
      scheduleRain();
    };

    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(raf);
      if (rainTimer) clearTimeout(rainTimer);
    };

    // Only animate while the section is actually on screen.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? startLoop() : stopLoop()),
      { threshold: 0 },
    );
    io.observe(canvas);

    if (reduceMotion) {
      resize();
      step();
    }

    return () => {
      stopLoop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointerleave', onLeave);
      [a, b, c].forEach(t => {
        gl.deleteTexture(t.tex);
        gl.deleteFramebuffer(t.fbo);
      });
      gl.deleteBuffer(quad);
      gl.deleteProgram(simProg);
      gl.deleteProgram(renderProg);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full block ${className}`}
      aria-hidden="true"
    />
  );
}
