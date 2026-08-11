import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import life1 from '../public/life1.jpg';
import life2 from '../public/life2.jpg';
import life3 from '../public/life3.jpg';
import life4 from '../public/life4.jpeg';
import ayushPhoto from '../public/Drivetrain Engineer - Ayush Singh.jpg';
import awanishPhoto from '../public/Embedded Engineer - Awanish Yadav.jpg';
import pradeepPhoto from '../public/Data and Finance Manager - Pradeep Sahu.jpeg';
import ariselliPhoto from '../public/Validation Engineer - Ariselli Chandreshekhar.jpg';
import { VIEWPORT, fadeUp, slideFrom, stagger, staggerSlow } from '../lib/motion';

const values = [
  {
    title: 'Comprehensive 360° solutions',
    description: 'End-to-end delivery from concept and engineering to on-site commissioning — optimizing efficiency, safety, and lifecycle performance.'
  },
  {
    title: 'One team, one vision',
    description: 'Cross-disciplinary collaboration focused on practical outcomes — fast iteration, clear ownership, and aligned objectives.'
  },
  {
    title: 'Relentless innovation',
    description: 'We pursue practical breakthroughs — improving performance, lowering energy use, and making systems smarter and safer.'
  },
  {
    title: 'Cultivate & share knowledge',
    description: 'Open learning and rigorous documentation ensure our teams and partners grow together — faster, safer, and more reliably.'
  }
];

const team = [
  { photo: ayushPhoto, name: 'Ayush Singh', designation: 'Drivetrain Engineer' },
  { photo: awanishPhoto, name: 'Awanish Yadav', designation: 'Embedded Engineer' },
  { photo: pradeepPhoto, name: 'Pradeep Sahu', designation: 'Data and Finance Manager' },
  { photo: ariselliPhoto, name: 'Ariselli Chandreshekhar', designation: 'Validation Engineer' }
];

const openings = [
  { title: 'Electro-Mechanical Powertrain Engineer', team: 'Engineering', location: 'Greater Noida, India' },
  { title: 'Sales Team Lead', team: 'Sales', location: 'Greater Noida, India' },
  { title: 'Sales Director', team: 'Sales', location: 'Greater Noida, India' },
  { title: "Founder's Office", team: 'Strategy', location: 'Greater Noida, India' }
];

/**
 * There is no application portal — the whole process is one email. Role cards
 * link straight to a composed message so the subject line is already right.
 */
const HR_EMAIL = 'hr@voltworks.in';
const applyHref = (role?: string) =>
  `mailto:${HR_EMAIL}?subject=${encodeURIComponent(role ? `ME — ${role}` : 'ME — VoltWorks')}`;

const applySteps = [
  {
    step: '01',
    title: 'Write your ME',
    body: 'One page, one topic: you. Not a cover letter — tell us what you have built, what broke while you were learning to build it, and what you want to build next.'
  },
  {
    step: '02',
    title: 'Attach your resume',
    body: 'A PDF is plenty. No portfolio site required, no fifteen-field form, no account to create.'
  },
  {
    step: '03',
    title: 'Send it across',
    body: `Email both to ${HR_EMAIL} with the role in the subject line. A person reads every single one, and you will hear back either way.`
  }
];

export default function Careers() {
  const teamScrollRef = useRef<HTMLDivElement>(null);
  const [teamScroll, setTeamScroll] = useState({ left: false, right: false });

  const updateTeamScroll = () => {
    const el = teamScrollRef.current;
    if (!el) return;
    setTeamScroll({
      left: el.scrollLeft > 8,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 8
    });
  };

  useEffect(() => {
    updateTeamScroll();
    window.addEventListener('resize', updateTeamScroll);
    return () => window.removeEventListener('resize', updateTeamScroll);
  }, []);

  const scrollTeam = (direction: 1 | -1) => {
    const el = teamScrollRef.current;
    el?.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white text-slate-900"
    >
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-start">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              variants={stagger}
              className="space-y-6"
            >
              <motion.p variants={fadeUp} className="text-sm uppercase tracking-[0.35em] text-primary mb-4">Why VoltWorks</motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl font-headline font-bold text-navy-deep max-w-xl">
                Join a team that turns industrial ambition into real-world impact.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-slate-700 leading-relaxed max-w-2xl">
                Founded by IIT BHU and IIT Delhi alumni, we build high-performance drivetrain solutions that give OEMs a seamless way to turn device data into actionable insight — without compromising safety or security.
              </motion.p>
              <motion.p variants={fadeUp} className="text-lg text-slate-700 leading-relaxed max-w-2xl">
                Our values aren't just words on a wall; they are the technical specifications for how we conduct business and engineering.
              </motion.p>
              <motion.div variants={stagger} className="grid gap-6 sm:grid-cols-2">
                {values.map((item) => (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    className="rounded-card border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
                  >
                    <h3 className="font-headline-md text-xl text-navy-deep mb-3">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              variants={slideFrom('right')}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 overflow-hidden rounded-panel shadow-lg min-h-[160px] md:min-h-[220px]">
                  <img src={life1} alt="VoltWorks team collaboration" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-1 gap-4">
                  <div className="overflow-hidden rounded-panel shadow-lg min-h-[100px] md:min-h-[108px]">
                    <img src={life2} alt="VoltWorks workspace" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="overflow-hidden rounded-panel shadow-lg min-h-[100px] md:min-h-[108px]">
                    <img src={life3} alt="VoltWorks technology" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>

              {/* life4 is a wide bench shot — it earns the full width rather
                  than being cropped into the stack above. */}
              <div className="col-span-1 sm:col-span-2 overflow-hidden rounded-panel shadow-lg min-h-[150px] md:min-h-[200px]">
                <img src={life4} alt="VoltWorks engineers bench-testing a motor controller" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-sm uppercase tracking-[0.35em] text-primary mb-4">Our People</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl font-headline font-bold text-navy-deep">
              The people who build the future.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={staggerSlow}
            className="relative"
          >
            <div
              ref={teamScrollRef}
              onScroll={updateTeamScroll}
              className={`flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${teamScroll.left || teamScroll.right ? '' : 'justify-center'}`}
            >
              {team.map((member) => (
                <motion.div
                  key={member.name}
                  variants={fadeUp}
                  className="group w-64 sm:w-72 md:w-80 shrink-0 snap-start text-center"
                >
                  <div className="aspect-[4/5] overflow-hidden rounded-card shadow-lg mb-5">
                    <img
                      src={member.photo}
                      alt={member.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-xl font-headline font-semibold text-navy-deep">{member.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-primary">{member.designation}</p>
                </motion.div>
              ))}
            </div>

            {(teamScroll.left || teamScroll.right) && (
              <>
                <button
                  type="button"
                  onClick={() => scrollTeam(-1)}
                  disabled={!teamScroll.left}
                  aria-label="Previous team members"
                  className="absolute -left-3 top-[38%] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-navy-deep shadow-lg transition hover:text-primary disabled:opacity-40 disabled:pointer-events-none"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollTeam(1)}
                  disabled={!teamScroll.right}
                  aria-label="Next team members"
                  className="absolute -right-3 top-[38%] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-navy-deep shadow-lg transition hover:text-primary disabled:opacity-40 disabled:pointer-events-none"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.p variants={fadeUp} className="text-sm uppercase tracking-[0.35em] text-primary mb-4">Join our team</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-headline font-bold text-navy-deep leading-tight mb-6">
              Small team. Real vehicles. Room to own something.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-700 leading-relaxed">
              We are small enough that nothing here is somebody else's problem. The motors and
              controllers we design leave the bench, go into vehicles, and get judged on real
              roads — so the work you do in your first month is work you will watch running.
              We care far more about what you have built than about where you built it.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={staggerSlow}
            className="mt-14 grid gap-5 sm:grid-cols-2"
          >
            {openings.map((role) => (
              <motion.a
                key={role.title}
                variants={fadeUp}
                href={applyHref(role.title)}
                className="group flex flex-col justify-between gap-6 rounded-card border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
              >
                <div>
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                    {role.team}
                  </span>
                  <h3 className="mt-4 text-2xl font-headline font-semibold text-navy-deep transition-colors group-hover:text-primary">
                    {role.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin className="h-4 w-4" />
                    {role.location}
                  </span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-300 text-primary transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                    <ChevronRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* The application itself is the differentiator, so it gets the loudest
              panel on the page rather than a footnote under the role list. */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={stagger}
            className="mt-8 overflow-hidden rounded-panel bg-navy-deep p-8 md:p-12 text-white"
          >
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
              <motion.div variants={fadeUp} className="flex flex-col">
                <p className="text-sm uppercase tracking-[0.35em] text-primary-light mb-6">How to apply</p>
                <div className="relative flex flex-1 min-h-[190px] items-center justify-center rounded-card border border-white/15 bg-white/5">
                  <span className="font-headline font-bold tracking-tight text-7xl md:text-8xl">ME</span>
                  <span className="absolute bottom-5 text-[10px] uppercase tracking-[0.35em] text-white/50">
                    One page · one topic
                  </span>
                </div>
                <p className="mt-6 text-white/70 leading-relaxed">
                  No portals. No screening rounds. Write one page on the only subject you are
                  already an expert in, and send it.
                </p>
              </motion.div>

              <motion.ol variants={stagger} className="space-y-8">
                {applySteps.map((item) => (
                  <motion.li key={item.step} variants={fadeUp} className="flex gap-5">
                    <span className="font-headline text-lg font-bold text-primary-light shrink-0 pt-0.5">{item.step}</span>
                    <div>
                      <h3 className="font-headline text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-white/70 leading-relaxed">{item.body}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ol>
            </div>

            <motion.div variants={fadeUp} className="mt-10 flex flex-col items-start gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-white/70">
                None of the four fit? Send a ME anyway — we hire people before we write job descriptions.
              </p>
              <a
                href={applyHref()}
                className="group inline-flex shrink-0 items-center gap-3 rounded-card bg-primary px-7 py-4 font-semibold text-white transition duration-300 hover:bg-primary-light"
              >
                Email your ME
                <ChevronRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
