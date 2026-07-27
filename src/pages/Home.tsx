import { motion, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { VIEWPORT, fadeUp, slideFrom, stagger, staggerSlow } from '../lib/motion';
import { liveVehicleCount } from '../lib/liveCounter';
import top1 from '../public/top1.png';
import top2 from '../public/top2.png';
import top3 from '../public/top3.png';
import top4 from '../public/top4.png';
import techBrochure from '../public/Technical Brochure - Q4 FY 24-25.pdf';
import patent1 from '../public/patent-1.png';
import teamPhoto from '../public/life3.jpg';
import heroMotor from '../public/hero-motor.png';
import heroProduction from '../public/hero-production.png';
import heroWater from '../public/hero-water.webp';
import heroRickshaw from '../public/hero-rickshaw_line.webp';

const ACCENT = '#1d67cd';

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
 * Digital-odometer style counter for the "vehicles electrified" spotlight.
 * Rolls 0 -> target with a slot-machine flicker (each frame overshoots the
 * true progress by a small random jitter, so it reads as spinning digits
 * rather than a clean linear count). The target comes from liveVehicleCount()
 * — a deterministic clock-based figure (see src/lib/liveCounter.ts), so a
 * refresh never resets it and it only ticks during working hours. Once
 * settled, the display re-syncs against the live figure each minute.
 */
function LiveOdometer({ digits = 5 }: { digits?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);
  const settledRef = useRef(false);
  const target = useRef(liveVehicleCount()).current;

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

  // After the roll-up settles, keep the display in sync with the live figure.
  // During working hours that surfaces as an occasional +1; at night and on
  // weekends the number simply holds still.
  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      if (!settledRef.current) return;
      const next = liveVehicleCount();
      setValue((v) => (next > v ? next : v));
    }, 60_000);
    return () => clearInterval(timer);
  }, [inView]);

  const digitChars = String(value).padStart(digits, '0').split('');

  return (
    <div ref={ref} className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5" aria-label={`${value.toLocaleString()} vehicles electrified`}>
      {digitChars.map((digit, i) => (
        <span
          key={i}
          className="font-headline font-black tabular-nums inline-flex items-center justify-center rounded-lg md:rounded-xl text-3xl sm:text-4xl md:text-6xl w-[1em] h-[1.4em] text-white"
          style={{
            background: 'linear-gradient(160deg,#1e4976,#122f52)',
            border: '1px solid rgba(255,255,255,0.14)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 40px -20px rgba(0,0,0,0.7)',
          }}
        >
          {digit}
        </span>
      ))}
    </div>
  );
}

/** "INDIA" rendered in the tricolour, as in the final homepage design. */
function IndiaWord() {
  return (
    <span>
      <span style={{ color: '#ff9933' }}>IN</span>
      <span className="text-white">D</span>
      <span style={{ color: '#3ecf4f' }}>IA</span>
    </span>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col bg-white overflow-x-hidden w-full">
      {/* ─── HERO — light, copy left / product render right ─────────────── */}
      <section className="relative w-full bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 w-full pt-10 md:pt-16 pb-12 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Copy */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-5 md:mb-7"
              >
                <span className="inline-flex items-center gap-2 px-[clamp(0.75rem,3vw,1.25rem)] py-[clamp(0.3rem,1.2vw,0.5rem)] rounded-full text-[clamp(0.625rem,2.6vw,0.75rem)] font-bold uppercase tracking-[0.15em] text-slate-900 border border-slate-300 bg-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900 inline-block" />
                  India&rsquo;s Indigenous EV Drivetrain
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-headline font-bold leading-[1.08] tracking-tight text-slate-900 mb-5 md:mb-6 hero-headline"
                style={{ maxWidth: '820px' }}
              >
                Enabling Smart &amp; Connected{' '}
                <span style={{ color: ACCENT }}>Electric</span>{' '}
                Vehicles
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="font-body text-sm md:text-lg text-slate-600 leading-relaxed mb-8 md:mb-10"
                style={{ maxWidth: '520px' }}
              >
                <span className="md:hidden">
                  PMSM motors, FOC controllers and firmware — one integrated EV drivetrain stack.
                </span>
                <span className="hidden md:inline">
                  Designing and manufacturing PMSM motors, FOC controllers, and proprietary firmware as a single integrated stack for L2, L3 and L5 electric vehicles.
                </span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/contact"
                  className="group flex items-center gap-2 px-[clamp(1.25rem,5vw,2.25rem)] py-[clamp(0.65rem,2.8vw,1rem)] text-[clamp(0.625rem,2.6vw,0.75rem)] font-bold uppercase tracking-widest text-white rounded-full transition-all duration-300 hover:opacity-90"
                  style={{ background: '#12419c', boxShadow: '0 8px 20px -8px rgba(18,65,156,0.5)' }}
                >
                  <span>Get a Demo</span>
                </Link>
                <Link
                  to="/products"
                  className="group flex items-center gap-2 px-[clamp(1.25rem,5vw,2.25rem)] py-[clamp(0.65rem,2.8vw,1rem)] text-[clamp(0.625rem,2.6vw,0.75rem)] font-bold uppercase tracking-widest text-slate-900 rounded-full border border-slate-300 bg-white transition-all duration-300 hover:border-slate-500"
                >
                  <span>Explore Products</span>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-5"
            >
              <img
                src={heroMotor}
                alt="Exploded view of a Voltworks PMSM Controller"
                className="w-full h-[220px] md:h-[340px] object-contain"
              />
            </motion.div>
          </div>

          {/* Stat chips */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="grid grid-cols-2 md:flex md:flex-wrap gap-2 md:gap-4 mt-10 md:mt-14"
          >
            {[
              { value: '4+', label: 'Years in Industry' },
              { value: 'L2 · L3 · L5', label: 'Vehicle Platforms Served' },
              { value: '10K+', label: 'Vehicles Electrified' },
              { value: 'IP67', label: 'Rated Waterproofing' },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-3 px-3 py-2 md:px-5 md:py-3 rounded-xl border border-slate-300 bg-white"
              >
                <span className="text-base md:text-xl font-headline font-bold text-slate-900">{stat.value}</span>
                <span className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider font-medium">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── MILESTONES — alternating story rows + live stat spotlight ──── */}
      <section className="relative w-full bg-white py-14 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={stagger}
            className="mb-14 md:mb-20"
          >
            <motion.span variants={fadeUp} className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: ACCENT }}>Our Journey</motion.span>
            <motion.h2 variants={fadeUp} className="font-headline text-3xl sm:text-4xl md:text-5xl text-slate-900 font-bold leading-tight">
              Milestones That <span style={{ color: ACCENT }}>Define Us</span>
            </motion.h2>
          </motion.div>

          {/* Rows, tied together by a center spine on desktop */}
          <div className="relative">
            <div
              className="hidden md:block absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(29,103,205,0.35), transparent)' }}
              aria-hidden="true"
            />

            <div className="flex flex-col gap-16 md:gap-24">
              {/* Row 1 — patent (image left / copy right) */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
                className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
              >
                <span
                  className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full z-10"
                  style={{ background: '#12419c', boxShadow: '0 0 0 5px rgba(29,103,205,0.15)' }}
                  aria-hidden="true"
                />

                <motion.div variants={slideFrom('left')} className="relative h-[300px] md:h-[460px]">
                  <img
                    src={patent1}
                    alt="Patent certificate — Stator for Electric Machine"
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </motion.div>

                <motion.div variants={slideFrom('right')} className="relative z-10">
                  <div className="text-xs font-bold tracking-[0.24em] uppercase mb-4" style={{ color: ACCENT }}>
                    Filed
                  </div>
                  <div className="flex items-start gap-4 mb-6">
                    <span className="font-headline font-black leading-none text-5xl md:text-7xl" style={{ color: ACCENT }} aria-hidden="true">1</span>
                    <div>
                      <h3 className="font-headline text-2xl md:text-4xl font-bold leading-tight" style={{ color: ACCENT }}>
                        Patents Granted
                      </h3>
                      <p className="text-[11px] md:text-sm uppercase tracking-[0.14em] font-bold mt-1" style={{ color: ACCENT }}>
                        Stator for Electric Machine
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-sm md:text-base mb-4">
                    We holds a patent (No. 584010) for a novel &ldquo;Stator for Electric Machine&rdquo;. Unlike a conventional single-piece laminated stator, our design splits the stator core into two engineered components — a main body of laminated steel and a separate stator tooth ring made of soft magnetic composite (SMC).
                  </p>
                  <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                    This construction raises the winding fill factor from 40% to 60%, packing more copper into the same volume and improving magnetic flux distribution where it matters most. The performance gains are significant. Against a conventional benchmark, the patented stator delivers roughly 1.3× the torque (10.5 Nm vs 8.2 Nm), cuts torque ripple from 6.1% to 2.8%, reduces core loss, and slashes cogging torque by around 99% — for smoother, quieter, more efficient operation. It&rsquo;s a foundational piece of VoltWorks&rsquo; motor IP, owned entirely by the company and built into our PMSM drivetrains across two- and three-wheeler platforms.
                  </p>
                </motion.div>
              </motion.div>

              {/* Row 2 — production capacity (copy left / image right) */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
                className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
              >
                <span
                  className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full z-10"
                  style={{ background: '#12419c', boxShadow: '0 0 0 5px rgba(29,103,205,0.15)' }}
                  aria-hidden="true"
                />

                <motion.div variants={slideFrom('left')} className="relative z-10 md:order-1 order-2">
                  <div className="text-xs font-bold tracking-[0.24em] uppercase mb-4" style={{ color: ACCENT }}>
                    Production Capacity
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <CountUp
                      value="4,000"
                      className="text-4xl md:text-5xl font-headline font-bold"
                      style={{ color: ACCENT }}
                    />
                    <span className="text-2xl md:text-3xl font-headline font-bold" style={{ color: ACCENT }}>–</span>
                    <CountUp
                      value="8,000"
                      className="text-4xl md:text-5xl font-headline font-bold"
                      style={{ color: ACCENT }}
                    />
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.2em] font-bold mb-5" style={{ color: ACCENT }}>
                    Powertrain Sets / Month
                  </p>
                  <p className="text-slate-700 leading-relaxed text-sm md:text-base max-w-md">
                    We operates an in-house production capacity of 4,000–8,000 Powertrain sets per month, run on advanced manufacturing machinery with full safety tooling and precautions built into the line. The facility is backed by a strong, skilled workforce and our own supply chain, giving us end-to-end control over output, quality, and cost.
                  </p>
                </motion.div>

                <motion.div variants={slideFrom('right')} className="relative md:order-2 order-1">
                  <img
                    src={heroProduction}
                    alt="Voltworks assembly line producing powertrain sets"
                    loading="lazy"
                    className="w-full h-[260px] md:h-[380px] object-cover rounded-2xl"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Milestone 3 — live "vehicles electrified" spotlight over the
              ocean backdrop, with the design's slanted bottom edge. */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={fadeUp}
            className="relative mt-20 md:mt-28 overflow-hidden text-center px-6 pt-14 pb-28 md:pt-20 md:pb-44 bg-black"
            style={{
              borderRadius: '1.5rem',
              clipPath: 'polygon(0 0, 100% 0, 100% 82%, 0 100%)',
            }}
          >
            <img
              src={heroWater}
              alt=""
              loading="lazy"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
            <div className="relative z-10 flex flex-col items-center">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-8 bg-white text-slate-800 border border-slate-200">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: '#3b82f6' }} />
                Live
              </span>

              <LiveOdometer />

              <h3 className="font-headline text-xl md:text-3xl text-white font-bold uppercase tracking-wide mt-8 mb-3">
                Vehicles Electrified
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base max-w-md">
                Every unit shipped is a vehicle electrified. This count grows as our powertrain sets reach the road.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── OUR PURPOSE ────────────────────────────────────────────────── */}
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

        {/* Quote — copy left, team photo right */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 pb-16 md:pb-28">
          <motion.figure
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
          >
            <motion.div variants={slideFrom('left')}>
              <span className="font-headline text-5xl md:text-6xl leading-none block mb-4" style={{ color: ACCENT }} aria-hidden="true">&rdquo;</span>
              <blockquote className="font-body text-lg md:text-2xl leading-relaxed text-slate-800">
                Precision is not just a standard; it&rsquo;s our foundational philosophy. At Voltworks, every component is a testament to our commitment to industrial excellence.
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="h-px w-10" style={{ background: ACCENT }} />
                <span className="font-headline text-[10px] md:text-xs font-bold tracking-widest uppercase" style={{ color: ACCENT }}>
                  Voltworks&rsquo; Tech Team
                </span>
              </figcaption>
            </motion.div>

            <motion.div variants={slideFrom('right')}>
              <img
                src={teamPhoto}
                alt="Voltworks engineers working on a controller board"
                loading="lazy"
                className="w-full h-[280px] md:h-[400px] object-cover"
                style={{ borderRadius: '6rem 1.5rem 1.5rem 7rem' }}
              />
            </motion.div>
          </motion.figure>
        </div>
      </section>

      {/* ─── TRUSTED & SUPPORTED BY ─────────────────────────────────────── */}
      <section className="w-full bg-white pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-8">
          <motion.h3
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={fadeUp}
            className="text-center text-slate-900 font-headline text-xl md:text-2xl mb-12 md:mb-16 uppercase tracking-wide font-normal"
          >
            Trusted &amp; Supported By
          </motion.h3>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={staggerSlow}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-14 lg:gap-x-20 w-full"
          >
            {[
              { src: top4, alt: 'IIT Indore Ace Foundation', className: 'w-24 md:w-32 lg:w-40' },
              { src: top1, alt: 'STMicroelectronics', className: 'w-24 md:w-32 lg:w-40' },
              { src: top2, alt: 'SIIC IIT Kanpur', className: 'w-40 md:w-56 lg:w-72' },
              { src: top3, alt: 'Citibank', className: 'w-28 md:w-40 lg:w-48' },
            ].map(logo => (
              <motion.img
                key={logo.alt}
                variants={fadeUp}
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className={`${logo.className} object-contain`}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA — Made in India ────────────────────────────────────────── */}
      <section className="relative w-full bg-white">
        <div
          className="relative overflow-hidden bg-black"
          style={{ clipPath: 'polygon(0 14%, 100% 0, 100% 100%, 0 100%)' }}
        >
          <img
            src={heroRickshaw}
            alt=""
            loading="lazy"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={stagger}
            className="relative z-10 max-w-3xl mx-auto text-center px-6 pt-28 md:pt-36 pb-14 md:pb-20"
          >
            <motion.h2 variants={fadeUp} className="font-headline text-xl md:text-3xl text-white font-bold uppercase tracking-wide mb-5 leading-tight">
              Made in <IndiaWord /> for World.
            </motion.h2>
            <motion.p variants={fadeUp} className="font-body text-sm md:text-base text-slate-300 mb-10 max-w-xl mx-auto">
              Consult with our engineering team to design a custom solution for your e-rickshaws now
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="bg-primary text-white font-headline text-xs font-bold px-10 py-5 hover:bg-primary-light transition-all uppercase tracking-widest inline-block text-center">
                Schedule Consultation
              </Link>
              <a href={techBrochure} download="Voltworks_Technical_Brochure.pdf" className="border border-white/50 text-white font-headline text-xs font-bold px-10 py-5 hover:bg-white/10 transition-all uppercase tracking-widest inline-block text-center">
                Download Technical Catalog
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
