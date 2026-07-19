import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import homeVid from '../public/home-vid.mp4';
import top1 from '../public/top1.png';
import top2 from '../public/top2.png';
import top3 from '../public/top3.png';
import top4 from '../public/top4.png';
import techBrochure from '../public/Technical Brochure - Q4 FY 24-25.pdf';
import patent1 from '../public/patent-1.png';
// TODO: swap these two for the real milestone photos when supplied.
import milestonePrototype from '../public/PMSM Motor - L3.png';
import milestoneFleet from '../public/PMSM Controller - L2.webp';

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
const milestones = [
  {
    year: 'Jan, 2025',
    title: 'Powertrain Prototype',
    description: 'Our first integrated motor-controller unit successfully completed 10,000 km of rigorous road testing, validating our core engineering philosophy.',
    metric: '10K',
    metricSuffix: ' km',
    metricLabel: 'Test Distance',
    image: milestonePrototype,
    fit: 'contain' as const,
  },
  {
    year: 'Feb, 2025',
    title: 'First Patent Granted',
    description: 'Secured our first patent for the innovative powertrain architecture, marking a significant milestone in our intellectual property portfolio.',
    metric: '1',
    metricSuffix: ' Patent',
    metricLabel: 'Stator for Electric Machine',
    image: patent1,
    fit: 'contain' as const,
  },
  {
    year: 'May, 2026',
    title: '10,000 Vehicles Electrified',
    description: 'Achieved a major milestone by electrifying over 10,000 vehicles across multiple platforms, demonstrating the scalability and reliability of our powertrain solutions.',
    metric: '10K',
    metricSuffix: '+',
    metricLabel: 'Vehicles Electrified',
    image: milestoneFleet,
    fit: 'contain' as const,
  },
  // {
  //   year: '2022',
  //   title: 'Cloud Telemetry Integration',
  //   description: 'Deployed cloud-based telemetry streaming for in-depth vehicle health monitoring, predictive maintenance, and live performance analytics.',
  //   metric: '1M+',
  //   metricLabel: 'Data Points/Day',
  //   color: '#06b6d4',
  //   icon: '☁️',
  // },
  // {
  //   year: '2023',
  //   title: 'Global Market Expansion',
  //   description: 'Forged strategic partnerships with leading EV manufacturers across Europe and Asia, bringing VoltWorks technology to international markets.',
  //   metric: '12+',
  //   metricLabel: 'Countries Reached',
  //   color: '#10b981',
  //   icon: '🌍',
  // },
  // {
  //   year: '2024',
  //   title: 'Next-Gen Kit V3 Released',
  //   description: 'Launched the V3 powertrain kit — 40% lighter, 25% more efficient, and equipped with AI-driven torque vectoring for unmatched driving dynamics.',
  //   metric: '40%',
  //   metricLabel: 'Weight Reduction',
  //   color: '#f59e0b',
  //   icon: '🏎️',
  // },
];

const ACCENT = '#3b82f6';

// Shared motion vocabulary — every scroll reveal on this page draws from these
// so timing and distance stay consistent section to section.
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const slideFrom = (dir: 'left' | 'right') => ({
  hidden: { opacity: 0, x: dir === 'left' ? -48 : 48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
});

/**
 * Counts from 0 to the numeric part of `value` when scrolled into view, keeping
 * any non-numeric formatting ("10K" -> counts 10, keeps the K).
 */
function CountUp({ value, className, style }: { value: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);

  const target = parseFloat(value);
  const suffix = value.replace(/^[\d.]+/, '');

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
      setDisplay(Math.round(target * eased) + suffix);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, suffix, value, reduceMotion]);

  return <span ref={ref} className={className} style={style}>{Number.isNaN(target) ? value : display}</span>;
}

function MilestoneRow({ milestone, index }: { milestone: typeof milestones[number]; index: number }) {
  const reduceMotion = useReducedMotion();
  const imageFirst = index % 2 === 0;

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
      variants={stagger}
      className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-center"
    >
      {/* Spine node — sits on the center rail at this row's vertical midpoint. */}
      <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div
          variants={{
            hidden: { scale: 0, opacity: 0 },
            show: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: EASE, delay: 0.2 } },
          }}
          className="w-4 h-4 rounded-full border-2 bg-[#040a1e]"
          style={{ borderColor: ACCENT, boxShadow: `0 0 0 6px rgba(4,10,30,1), 0 0 24px ${ACCENT}80` }}
        />
      </div>

      {/* Image */}
      <motion.div
        variants={reduceMotion ? fadeUp : slideFrom(imageFirst ? 'left' : 'right')}
        className={`group relative ${imageFirst ? 'md:order-1' : 'md:order-2'}`}
      >
        <div
          className="relative overflow-hidden rounded-2xl border aspect-[16/10]"
          style={{
            borderColor: 'rgba(148,163,184,0.15)',
            background: 'linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(255,255,255,0.02) 100%)',
          }}
        >
          <img
            src={milestone.image}
            alt={milestone.title}
            loading="lazy"
            className={`w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
              milestone.fit === 'contain' ? 'object-contain p-6 md:p-10' : 'object-cover'
            }`}
          />
          {/* Sheen that sweeps across on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: `linear-gradient(115deg, transparent 40%, ${ACCENT}14 50%, transparent 60%)` }}
          />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        variants={reduceMotion ? fadeUp : slideFrom(imageFirst ? 'right' : 'left')}
        className={`flex flex-col ${imageFirst ? 'md:order-2 md:pl-4 lg:pl-8' : 'md:order-1 md:pr-4 lg:pr-8 md:text-right md:items-end'}`}
      >
        <span
          className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase mb-3"
          style={{ color: ACCENT }}
        >
          {milestone.year}
        </span>

        <h3 className="font-headline text-xl md:text-2xl lg:text-3xl text-white font-bold leading-tight mb-3">
          {milestone.title}
        </h3>

        <div className={`flex items-baseline gap-2 mb-2 ${imageFirst ? '' : 'md:justify-end'}`}>
          <CountUp
            value={milestone.metric}
            className="text-3xl md:text-4xl font-headline font-bold text-transparent bg-clip-text"
            style={{ backgroundImage: `linear-gradient(90deg, #60a5fa, ${ACCENT})` }}
          />
          <span className="text-xl md:text-2xl font-headline font-bold" style={{ color: ACCENT }}>
            {milestone.metricSuffix}
          </span>
        </div>

        <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-slate-500 font-bold mb-3">
          {milestone.metricLabel}
        </p>

        <div
          className={`h-px w-12 mb-3 ${imageFirst ? '' : 'md:self-end'}`}
          style={{ background: `linear-gradient(90deg, ${ACCENT}, transparent)` }}
        />

        <p className="text-slate-400 leading-relaxed text-sm max-w-md">
          {milestone.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const timelineRef = useRef<HTMLDivElement | null>(null);

  // Spine draws itself as the timeline scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 60%'],
  });
  const spineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 30, restDelta: 0.001 });

  return (
    <div className="flex flex-col bg-[#040a1e] overflow-x-hidden w-full">
      {/* Hero Section — Premium Redesign */}
      <section className="relative w-full min-h-[auto] md:min-h-screen bg-[#040a1e] overflow-hidden flex flex-col justify-start md:justify-center">

        {/* === BACKGROUND LAYERS === */}
        {/* 1. Background video */}
        <video
          src={homeVid}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0 scale-105"
          style={{ filter: 'brightness(0.45) saturate(0.8)' }}
        />

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
            className="hidden md:block font-body text-base md:text-lg text-slate-300 mb-8 md:mb-10 leading-relaxed"
            style={{ maxWidth: '520px' }}
          >
            Designing and manufacturing PMSM motors, FOC controllers, and proprietary firmware as a single integrated stack for L2, L3 and L5 electric vehicles.
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
            className="hidden md:flex flex-wrap gap-4"
          >
            {[
              { value: '5+', label: 'Years of Experience' },
              { value: 'L2 · L3 · L5', label: 'Vehicle Platforms Served' },
              { value: '10K+', label: 'Vehicles Electrified' },
              { value: 'IP67', label: 'Rated Waterproofing' },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-2 md:gap-3 px-3 py-2 md:px-5 md:py-3 rounded-xl"
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


      {/* Milestones Section */}
      <section className="relative w-full bg-gradient-to-b from-[#040a1e] via-[#070d28] to-[#040a1e] pt-8 pb-20 md:pt-16 md:pb-32 overflow-hidden">
        {/* Ambient glow orbs */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-indigo-600/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16 md:mb-20"
          >
            <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-blue-400 mb-4">Our Journey</span>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl text-white font-bold leading-tight">
              Milestones That <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #60a5fa, #1d67cd)' }}>Define Us</span>
            </h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              From a bold idea to a global powertrain leader — every step has been engineered with purpose.
            </p>
          </motion.div>

          {/* Alternating timeline */}
          <div ref={timelineRef} className="relative">
            {/* Center spine (desktop) — track plus the scroll-drawn fill. */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-slate-800/60" />
            <motion.div
              className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px origin-top"
              style={{
                scaleY: spineScale,
                background: `linear-gradient(to bottom, ${ACCENT}, #60a5fa)`,
                boxShadow: `0 0 12px ${ACCENT}60`,
              }}
            />

            <div className="flex flex-col gap-14 md:gap-20">
              {milestones.map((m, i) => (
                <MilestoneRow key={m.year} milestone={m} index={i} />
              ))}
            </div>
          </div>
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

      {/* Mission & Purpose Section */}
      <section className="bg-white py-10 md:py-32 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto overflow-hidden" id="about">
        <div className="grid grid-cols-12 gap-8 md:gap-16">
          <div className="col-span-12 lg:col-span-5">
            <span className="font-headline text-primary text-xs font-bold mb-4 block tracking-widest uppercase">
              OUR PURPOSE
            </span>
            <h2 className="font-headline text-2xl md:text-4xl mb-8 uppercase leading-tight">
              ENGINEERING RELIABILITY FOR A HIGH-VOLTAGE FUTURE.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-7 space-y-8">
            <p className="font-body text-lg text-on-surface-v">
              Voltworks Industrial stands at the intersection of traditional craftsmanship and digital innovation. We design power distribution systems that form the backbone of modern infrastructure, ensuring efficiency, safety, and unwavering performance in the most demanding environments.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-outline-v">
              <div>
                <h3 className="font-headline text-xl mb-4 uppercase">OUR MISSION</h3>
                <p className="font-body text-slate-600">
                  To empower global industries with precision-engineered electrical solutions that prioritize durability and technical excellence above all else.
                </p>
              </div>
              <div>
                <h3 className="font-headline text-xl mb-4 uppercase">OUR HISTORY</h3>
                <p className="font-body text-slate-600">
                  Founded in a small technical workshop, we have grown into a global leader in high-voltage engineering, maintaining our core values of integrity and meticulous design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-industrial-bg py-8 md:py-16 px-4 sm:px-6 md:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
            <div className="bg-white p-6 md:p-8 border border-outline-v/30 flex flex-col justify-between aspect-auto">
              <span className="text-4xl md:text-5xl font-headline text-primary">5</span>
              <p className="font-headline text-[10px] font-bold mt-6 tracking-widest uppercase text-slate-500">
                YEARS OF EXPERIENCE
              </p>
            </div>
            <div className="bg-navy text-white p-6 md:p-8 col-span-1 md:col-span-2 flex flex-col justify-between">
              <p className="font-body text-base md:text-lg opacity-80 italic leading-relaxed">
                "Precision is not just a standard; it's our foundational philosophy. At Voltworks, every component is a testament to our commitment to industrial excellence."
              </p>
              <p className="font-headline text-[10px] font-bold mt-6 text-primary tracking-widest uppercase">
                CHIEF TECHNICAL OFFICER
              </p>
            </div>
            <div className="bg-white p-6 md:p-8 border border-outline-v/30 flex flex-col justify-between aspect-auto">
              <span className="text-4xl md:text-5xl font-headline text-primary">10,000+</span>
              <p className="font-headline text-[10px] font-bold mt-6 tracking-widest uppercase text-slate-500">
                VEHICLES ELECTRIFIED
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted & Supported By Section (moved above CTA) */}
      <section className="w-full bg-[#040a1e]">
        <div className="max-w-7xl mx-auto px-8 md:px-8 lg:px-8 mt-8 md:mt-5 pb-0 md:pb-4">
          <h3 className="text-center text-white font-headline text-base md:text-lg lg:text-xl mb-10 md:mb-8 uppercase tracking-wide font-normal">
            Trusted & Supported By
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:gap-x-10 lg:gap-x-14 opacity-90 w-full">
            <img src={top1} alt="Top 1 Logo" className="w-24 md:w-32 lg:w-40 object-contain" />
            <img src={top2} alt="Top 2 Logo" className="w-40 md:w-56 lg:w-72 object-contain" />
            <img src={top3} alt="Top 3 Logo" className="w-28 md:w-40 lg:w-48 object-contain" />
            <img src={top4} alt="Top 4 Logo" className="w-24 md:w-32 lg:w-40 object-contain" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#040a1e] py-12 md:py-24 px-6 md:px-16 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-2xl mx-auto"
        >
          <h2 className="font-headline text-2xl md:text-3xl text-white uppercase mb-6 leading-tight">
            Ready to Optimize Your Infrastructure?
          </h2>
          <p className="font-body text-base md:text-lg text-slate-400 mb-10">
            Consult with our engineering team to design a custom solution for your facility's power and control needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="bg-primary text-white font-headline text-xs font-bold px-10 py-5 hover:bg-primary-light transition-all uppercase tracking-widest inline-block text-center">
              Schedule Consultation
            </Link>
            <a href={techBrochure} download="Voltworks_Technical_Brochure.pdf" className="border border-slate-700 text-white font-headline text-xs font-bold px-10 py-5 hover:bg-slate-800 transition-all uppercase tracking-widest inline-block text-center">
              Download Technical Catalog
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
