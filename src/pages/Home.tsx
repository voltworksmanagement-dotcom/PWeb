import { motion, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { VIEWPORT, fadeUp, slideFrom, stagger, staggerSlow } from '../lib/motion';
import top1 from '../public/top1.png';
import top2 from '../public/top2.png';
import top3 from '../public/top3.png';
import top4 from '../public/top4.png';
import techBrochure from '../public/Technical Brochure - Q4 FY 24-25.pdf';
import homeVid from '../public/home-vid.mp4';
import patent1 from '../public/patent-1.png';
// TODO: swap for the real "production line" photo when supplied.
import milestoneCapacity from '../public/PMSM Motor - L3.png';

// Partner images
import p1 from '../public/image.png';
import p2 from '../public/image (1).png';
import p3 from '../public/image (2).png';
import p4 from '../public/image (3).png';
import supertech from '../public/Supertech.webp';
import p6 from '../public/image (6).png';
import urbacab from '../public/urbancab.png';
import panther from '../public/panther.png';

// Partner logos: Supertech, Urbacab, Panther replace older customer logos

// `fit: 'contain'` frames a document/scan on a tinted panel; 'cover' lets a
// photo bleed to the edges of its frame.
// These two render as alternating image/text rows. The third milestone
// (powertrain sets sold) is a distinct full-width "live" stat spotlight,
// defined separately below as POWERTRAIN_SOLD.
const milestones = [
  {
    year: 'Filed',
    title: 'Patents Filed',
    description: 'We’ve filed our first patent for a novel stator architecture used in our electric machines — the intellectual-property foundation of our indigenous powertrain platform.',
    metric: '1' as string | undefined,
    metricSuffix: '' as string | undefined,
    metricRange: undefined as [string, string] | undefined,
    metricLabel: 'Patent Filed',
    image: patent1,
    fit: 'contain' as const,
  },
  {
    year: 'Current',
    title: 'Production Capacity',
    description: 'Our manufacturing line is built to scale with demand, producing between 4,000 and 8,000 powertrain sets every month.',
    metric: undefined as string | undefined,
    metricSuffix: undefined as string | undefined,
    metricRange: ['4,000', '8,000'] as [string, string] | undefined,
    metricLabel: 'Powertrain Sets / Month',
    image: milestoneCapacity,
    fit: 'contain' as const,
  },
];

// Base count for the live spotlight counter — bump this as real sales land.
const POWERTRAIN_SOLD = 10127;

const ACCENT = '#3b82f6';

/**
 * Counts from 0 to the numeric part of `value` when scrolled into view, keeping
 * any non-numeric formatting ("10K" -> counts 10, keeps the K).
 */
function CountUp({ value, className, style }: { value: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);

  const target = parseFloat(value.replace(/,/g, ''));
  const suffix = value.replace(/^[\d,.]+/, '');

  useEffect(() => {
    if (!inView || Number.isNaN(target)) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    const duration = 1200;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast off the line, settles gently on the final number.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(target * eased).toLocaleString() + suffix);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, suffix, value, reduceMotion]);

  return <span ref={ref} className={className} style={style}>{Number.isNaN(target) ? value : display}</span>;
}

/**
 * Digital-odometer style counter for the "powertrain sets sold" spotlight.
 * Rolls 0 -> target with a slot-machine flicker (each frame overshoots the
 * true progress by a small random jitter, so it reads as spinning digits
 * rather than a clean linear count). Once settled, it drifts upward by 1 on
 * a slow random interval — a decorative "live" feel with no backend behind
 * it; the base number resets to POWERTRAIN_SOLD on every page load.
 */
function LiveOdometer({ target, digits = 5 }: { target: number; digits?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);
  const settledRef = useRef(false);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setValue(target);
      settledRef.current = true;
      return;
    }

    const duration = 2200;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      if (progress < 1) {
        const eased = 1 - Math.pow(2, -10 * progress);
        const ceiling = Math.round(target * eased);
        const jitter = Math.floor(Math.random() * Math.max(1, target - ceiling) * 0.15);
        setValue(Math.min(target, ceiling + jitter));
        frame = requestAnimationFrame(tick);
      } else {
        setValue(target);
        settledRef.current = true;
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, reduceMotion]);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    let timer: ReturnType<typeof setTimeout>;
    const scheduleBump = () => {
      timer = setTimeout(() => {
        if (settledRef.current) setValue((v) => v + 1);
        scheduleBump();
      }, 4000 + Math.random() * 6000);
    };
    scheduleBump();
    return () => clearTimeout(timer);
  }, [inView, reduceMotion]);

  const digitChars = String(value).padStart(digits, '0').split('');

  return (
    <div ref={ref} className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5" aria-label={`${value.toLocaleString()} powertrain sets sold`}>
      {digitChars.map((digit, i) => (
        <span
          key={i}
          className="font-headline font-black tabular-nums inline-flex items-center justify-center rounded-lg md:rounded-xl text-3xl sm:text-4xl md:text-6xl w-[1em] h-[1.4em] text-white"
          style={{
            background: 'linear-gradient(160deg,#0d1938,#050b1d)',
            border: '1px solid rgba(59,130,246,0.28)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 40px -20px rgba(0,0,0,0.7)',
          }}
        >
          {digit}
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col bg-[#040a1e] overflow-x-hidden w-full">
      {/* Hero Section — Premium Redesign */}
      <section className="relative w-full min-h-[auto] md:min-h-screen bg-[#040a1e] overflow-hidden flex flex-col justify-start md:justify-center">

        {/* === BACKGROUND LAYERS === */}
        {/* 1. Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.7)' }}
        >
          <source src={homeVid} type="video/mp4" />
        </video>

        {/* 2. Multi-layer gradient overlay for depth */}
        <div className="absolute inset-0 z-10" style={{
          background: 'linear-gradient(135deg, rgba(4,10,30,0.92) 0%, rgba(4,10,30,0.6) 50%, rgba(0,30,80,0.4) 100%)',
        }} />

        {/* 3. Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 z-10" style={{
          background: 'linear-gradient(to bottom, transparent, #040a1e)',
        }} />

        {/* 4. Animated tech grid overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />

        {/* 5. Radial blue glow from center-left */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 70% 60% at 20% 60%, rgba(37,99,235,0.15) 0%, transparent 70%)',
        }} />

        {/* 6. Top-right subtle accent glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] z-10 pointer-events-none" style={{
          background: 'radial-gradient(circle at 80% 20%, rgba(99,102,241,0.1) 0%, transparent 60%)',
        }} />

        {/* === CONTENT === */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 md:px-16 w-full flex flex-col justify-start md:justify-center min-h-[auto] md:min-h-screen pt-12 pb-2 md:py-20">

          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 md:mb-6 flex items-center gap-3"
          >
            <span className="flex items-center gap-2 px-[clamp(0.75rem,3vw,1rem)] py-[clamp(0.25rem,1.2vw,0.375rem)] rounded-full text-[clamp(0.625rem,2.6vw,0.75rem)] font-bold uppercase tracking-[0.2em]"
              style={{
                background: 'rgba(37,99,235,0.15)',
                border: '1px solid rgba(59,130,246,0.35)',
                color: '#93c5fd',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse inline-block" />
                India's Indigenous EV drivetrain
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-headline font-bold leading-[1.08] tracking-tight text-white mt-2 md:mt-0 mb-4 md:mb-3 hero-headline"
            style={{ maxWidth: '820px' }}
          >
            Enabling Smart &amp;{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(90deg, #60a5fa, #1d67cd)' }}>
                Connected
              </span>
            </span>{' '}
            Electric Vehicles
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-body text-sm md:text-lg text-slate-300 mb-8 md:mb-10 leading-relaxed"
            style={{ maxWidth: '520px' }}
          >
            {/* Mobile gets a condensed line — the full spec reads as a wall of
                text at phone width, but shipping no sub-headline at all left
                mobile visitors with no statement of what we build. */}
            <span className="md:hidden">
              PMSM motors, FOC controllers and firmware — one integrated EV drivetrain stack.
            </span>
            <span className="hidden md:inline">
              Designing and manufacturing PMSM motors, FOC controllers, and proprietary firmware as a single integrated stack for L2, L3 and L5 electric vehicles.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap gap-4 mb-12 md:mb-16"
          >
            <Link
              to="/contact"
              className="group relative flex items-center gap-2 px-[clamp(1.25rem,5vw,2rem)] py-[clamp(0.65rem,2.8vw,1rem)] text-[clamp(0.625rem,2.6vw,0.75rem)] font-bold uppercase tracking-widest text-white rounded-full overflow-hidden transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #004fa8, #1d67cd)',
                boxShadow: '0 0 24px rgba(0,79,168,0.4), 0 4px 16px rgba(0,0,0,0.3)',
              }}
            >
              <span className="relative z-10">Get a Demo</span>
              <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-1">→</span>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #1d67cd, #3b82f6)' }} />
            </Link>
            <Link
              to="/products"
              className="group flex items-center gap-2 px-[clamp(1.25rem,5vw,2rem)] py-[clamp(0.65rem,2.8vw,1rem)] text-[clamp(0.625rem,2.6vw,0.75rem)] font-bold uppercase tracking-widest text-slate-300 rounded-full transition-all duration-300 hover:text-white"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span>Explore Products</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>

          {/* Floating stat chips */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="grid grid-cols-2 md:flex md:flex-wrap gap-2 md:gap-4"
          >
            {[
              { value: '5+', label: 'Years of Experience' },
              { value: 'L2 · L3 · L5', label: 'Vehicle Platforms Served' },
              { value: '10K+', label: 'Vehicles Electrified' },
              { value: 'IP67', label: 'Rated Waterproofing' },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-3 px-3 py-2 md:px-5 md:py-3 rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span className="text-base md:text-xl font-headline font-bold text-white">{stat.value}</span>
                <span className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider font-medium">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator removed */}
      </section>


      {/* Milestones Section — alternating scroll story + live stat spotlight */}
      <section className="relative w-full bg-gradient-to-b from-[#040a1e] via-[#070d28] to-[#040a1e] py-20 md:py-28 overflow-hidden">
        {/* Ambient glow orb */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={stagger}
            className="mb-16 md:mb-24"
          >
            <motion.span variants={fadeUp} className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-blue-400 mb-4">Our Journey</motion.span>
            <motion.h2 variants={fadeUp} className="font-headline text-3xl sm:text-4xl md:text-5xl text-white font-bold leading-tight">
              Milestones That <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #60a5fa, #1d67cd)' }}>Define Us</span>
            </motion.h2>
          </motion.div>

          {/* Alternating milestone rows, tied together by a center spine on desktop */}
          <div className="relative">
            <div
              className="hidden md:block absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(59,130,246,0.35), transparent)' }}
              aria-hidden="true"
            />

            <div className="flex flex-col gap-20 md:gap-28">
              {milestones.map((m, i) => {
                const reversed = i % 2 === 1;
                return (
                  <motion.div
                    key={m.year + m.title}
                    initial="hidden"
                    whileInView="show"
                    viewport={VIEWPORT}
                    className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
                  >
                    {/* Node on the spine */}
                    <span
                      className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full z-10"
                      style={{ background: '#3b82f6', boxShadow: '0 0 0 5px rgba(59,130,246,0.15), 0 0 20px rgba(59,130,246,0.6)' }}
                      aria-hidden="true"
                    />

                    <motion.div
                      variants={slideFrom(reversed ? 'right' : 'left')}
                      className={`relative rounded-2xl overflow-hidden h-[280px] md:h-[380px] ${reversed ? 'md:order-2' : ''}`}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        boxShadow: 'none',
                      }}
                    >
                      <img
                        src={m.image}
                        alt={m.title}
                        loading="lazy"
                        className={`w-full h-full ${m.fit === 'contain' ? 'object-contain p-7' : 'object-cover'}`}
                      />
                    </motion.div>

                    <motion.div
                      variants={slideFrom(reversed ? 'left' : 'right')}
                      className={`relative z-10 ${reversed ? 'md:order-1 md:text-right' : ''}`}
                    >
                      <div className="text-xs font-bold tracking-[0.24em] uppercase mb-3.5" style={{ color: ACCENT }}>
                        {m.year}
                      </div>
                      <h3 className="font-headline text-2xl md:text-4xl text-white font-bold leading-tight mb-4">
                        {m.title}
                      </h3>

                      {m.metricRange ? (
                        <div className={`flex items-baseline gap-2 mb-1.5 ${reversed ? 'md:justify-end' : ''}`}>
                          <CountUp
                            value={m.metricRange[0]}
                            className="text-3xl md:text-4xl font-headline font-bold text-transparent bg-clip-text"
                            style={{ backgroundImage: 'linear-gradient(90deg, #7cb2ff, #1d67cd)' }}
                          />
                          <span className="text-xl md:text-2xl font-headline font-bold" style={{ color: ACCENT }}>–</span>
                          <CountUp
                            value={m.metricRange[1]}
                            className="text-3xl md:text-4xl font-headline font-bold text-transparent bg-clip-text"
                            style={{ backgroundImage: 'linear-gradient(90deg, #7cb2ff, #1d67cd)' }}
                          />
                        </div>
                      ) : (
                        <div className={`flex items-baseline gap-2.5 mb-1.5 ${reversed ? 'md:justify-end' : ''}`}>
                          <CountUp
                            value={m.metric ?? ''}
                            className="text-4xl md:text-5xl font-headline font-bold text-transparent bg-clip-text"
                            style={{ backgroundImage: 'linear-gradient(90deg, #7cb2ff, #1d67cd)' }}
                          />
                          <span className="text-xl md:text-2xl font-headline font-bold" style={{ color: ACCENT }}>
                            {m.metricSuffix}
                          </span>
                        </div>
                      )}

                      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-4">
                        {m.metricLabel}
                      </p>
                      <p className={`text-slate-400 leading-relaxed text-sm md:text-base max-w-md ${reversed ? 'md:ml-auto' : ''}`}>
                        {m.description}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Milestone 3 — live stat spotlight, deliberately breaks the rhythm above */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={fadeUp}
            className="relative mt-20 md:mt-28 rounded-3xl overflow-hidden text-center px-6 py-14 md:py-20"
            style={{
              border: '1px solid rgba(59,130,246,0.25)',
              background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(37,99,235,0.16) 0%, rgba(7,13,40,0.4) 60%, rgba(4,10,30,0.4) 100%)',
              boxShadow: '0 40px 80px -30px rgba(0,0,0,0.7)',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage: 'linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col items-center">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-6"
                style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(59,130,246,0.35)', color: '#93c5fd' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse inline-block" />
                Live
              </span>

              <LiveOdometer target={POWERTRAIN_SOLD} />

              <h3 className="font-headline text-xl md:text-2xl text-white font-bold mt-7 mb-2">
                Powertrain Sets Sold
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base max-w-md">
                Every unit shipped is a vehicle electrified. This count grows as our powertrain sets reach the road.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Unify & Partner Section (moved below hero) */}
      {/* <section className="bg-white py-10 md:py-24 px-6 md:px-16 w-full text-center border-t border-slate-100">
        <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 mb-6 leading-tight">
          Our Customers
        </h2>
        <p className="text-slate-600 mb-16 max-w-4xl mx-auto leading-relaxed text-sm md:text-base lg:text-lg">
          Craft the perfect powertrain for your vision. Our cutting-edge technology unlocks unique performance and unmatched safety, tailored to your vehicle's DNA.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16 items-center justify-items-center max-w-5xl mx-auto px-4">
          <img src={top1} alt="Partner 1" className="h-8 md:h-10 lg:h-12 object-contain mix-blend-multiply" />
          <img src={p1} alt="Partner 2" className="h-8 md:h-10 lg:h-12 object-contain mix-blend-multiply" />
          <img src={p2} alt="Partner 3" className="h-8 md:h-10 lg:h-12 object-contain mix-blend-multiply" />
          <img src={p3} alt="Partner 4" className="h-10 md:h-12 lg:h-14 object-contain mix-blend-multiply md:scale-110 lg:scale-165" />
          <img src={p4} alt="Partner 5" className="h-8 md:h-10 lg:h-12 object-contain mix-blend-multiply" />
          <img src={supertech} alt="Supertech" className="h-8 md:h-10 lg:h-14 object-contain mix-blend-multiply" />
          <img src={p6} alt="Urbacab" className="h-10 md:h-12 lg:h-8 object-contain mix-blend-multiply md:scale-110 lg:scale-215" />
          <img src={panther} alt="Panther" className="h-8 md:h-10 lg:h-18 object-contain mix-blend-multiply" />
        </div>
      </section> */}

      {/* ─── LIGHT BAND ───────────────────────────────────────────────────
          Mission + Purpose read as one continuous white band rather than a
          lone white section between two dark ones. The wedge above and the
          fade below make the palette change look intentional. */}

      {/* Transition into the light band */}
      <div className="relative h-16 md:h-24 bg-white overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[#040a1e]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 100%)' }} />
      </div>

      <section className="bg-white overflow-hidden" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 pt-6 pb-16 md:pt-12 md:pb-28">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={stagger}
            className="grid grid-cols-12 gap-8 md:gap-16"
          >
            <motion.div variants={slideFrom('left')} className="col-span-12 lg:col-span-5">
              <span className="font-headline text-primary text-xs font-bold mb-4 block tracking-widest uppercase">
                OUR PURPOSE
              </span>
              <h2 className="font-headline text-2xl md:text-4xl mb-6 uppercase leading-tight text-navy-deep">
                ENGINEERING RELIABILITY FOR A HIGH-VOLTAGE FUTURE.
              </h2>
              <div className="h-px w-16 bg-primary" />
            </motion.div>

            <motion.div variants={slideFrom('right')} className="col-span-12 lg:col-span-7 space-y-8">
              <p className="font-body text-lg text-on-surface-v leading-relaxed">
                Voltworks Industrial stands at the intersection of traditional craftsmanship and digital innovation. We design power distribution systems that form the backbone of modern infrastructure, ensuring efficiency, safety, and unwavering performance in the most demanding environments.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-outline-v">
                <div>
                  <h3 className="font-headline text-xl mb-4 uppercase text-navy-deep">OUR MISSION</h3>
                  <p className="font-body text-slate-600 leading-relaxed">
                    To empower global industries with precision-engineered electrical solutions that prioritize durability and technical excellence above all else.
                  </p>
                </div>
                <div>
                  <h3 className="font-headline text-xl mb-4 uppercase text-navy-deep">OUR HISTORY</h3>
                  <p className="font-body text-slate-600 leading-relaxed">
                    Founded in a small technical workshop, we have grown into a global leader in high-voltage engineering, maintaining our core values of integrity and meticulous design.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Quote — the numbers that used to flank this repeated the hero stat
            chips verbatim, so the quote now carries the block on its own. */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 pb-16 md:pb-28">
          <motion.figure
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={fadeUp}
            className="relative bg-navy text-white px-6 py-10 md:px-16 md:py-16 rounded-panel overflow-hidden"
          >
            {/* Faint grid, echoing the hero's tech overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-60"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)
                `,
                backgroundSize: '48px 48px',
              }}
            />
            <div className="relative max-w-3xl">
              <span className="font-headline text-5xl md:text-6xl leading-none text-primary-light/50 block mb-2" aria-hidden="true">"</span>
              <blockquote className="font-body text-lg md:text-2xl leading-relaxed text-white/90">
                Precision is not just a standard; it's our foundational philosophy. At Voltworks, every component is a testament to our commitment to industrial excellence.
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="h-px w-10 bg-primary-light" />
                <span className="font-headline text-[10px] md:text-xs font-bold text-primary-light tracking-widest uppercase">
                  Chief Technical Officer
                </span>
              </figcaption>
            </div>
          </motion.figure>
        </div>
      </section>

      {/* Trusted & Supported By Section (moved above CTA) */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-8 md:px-8 lg:px-8 mt-8 md:mt-5 pb-0 md:pb-4">
          <motion.h3
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={fadeUp}
            className="text-center text-navy-deep font-headline text-base md:text-lg lg:text-xl mb-10 md:mb-8 uppercase tracking-wide font-normal"
          >
            Trusted & Supported By
          </motion.h3>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={staggerSlow}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:gap-x-10 lg:gap-x-14 w-full"
          >
            {[
              { src: top1, alt: 'Top 1 Logo', className: 'w-24 md:w-32 lg:w-40' },
              { src: top2, alt: 'Top 2 Logo', className: 'w-40 md:w-56 lg:w-72' },
              { src: top3, alt: 'Top 3 Logo', className: 'w-28 md:w-40 lg:w-48' },
              { src: top4, alt: 'Top 4 Logo', className: 'w-36 md:w-48 lg:w-56 scale-120' },
            ].map(logo => (
              <motion.img
                key={logo.alt}
                variants={fadeUp}
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className={`${logo.className} object-contain opacity-70 hover:opacity-100 transition-opacity duration-300`}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Transition into the dark CTA band */}
      <div className="relative h-16 md:h-24 bg-white overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[#040a1e]" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0 100%)' }} />
      </div>

      {/* CTA Section */}
      <section className="bg-[#040a1e] py-12 md:py-24 px-6 md:px-16 text-center">
        <motion.div
           initial="hidden"
           whileInView="show"
           viewport={VIEWPORT}
           variants={stagger}
           className="max-w-2xl mx-auto"
        >
          <motion.h2 variants={fadeUp} className="font-headline text-2xl md:text-3xl text-white uppercase mb-6 leading-tight">
            Ready to Optimize Your Infrastructure?
          </motion.h2>
          <motion.p variants={fadeUp} className="font-body text-base md:text-lg text-slate-400 mb-10">
            Consult with our engineering team to design a custom solution for your facility's power and control needs.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="bg-primary text-white font-headline text-xs font-bold px-10 py-5 hover:bg-primary-light transition-all uppercase tracking-widest inline-block text-center">
              Schedule Consultation
            </Link>
            <a href={techBrochure} download="Voltworks_Technical_Brochure.pdf" className="border border-slate-700 text-white font-headline text-xs font-bold px-10 py-5 hover:bg-slate-800 transition-all uppercase tracking-widest inline-block text-center">
              Download Technical Catalog
            </a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
