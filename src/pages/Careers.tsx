import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, FileText, MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import life1 from '../public/life1.jpg';
import life2 from '../public/life2.jpg';
import life3 from '../public/life3.jpg';
import life4 from '../public/life4.jpeg';
import ayushPhoto from '../public/Drivetrain Engineer - Ayush Singh.jpg';
import awanishPhoto from '../public/Embedded Engineer - Awanish Yadav.jpg';
import pradeepPhoto from '../public/Data and Finance Manager - Pradeep Sahu.jpeg';
import ariselliPhoto from '../public/Validation Engineer - Ariselli Chandreshekhar.jpg';
// Job descriptions ship as build assets, so each URL stays hashed and valid.
import jdPowertrain from '../public/Careers_JD/JD - Electro-Mechanical Powertrain Engineer.pdf';
import jdSalesLead from '../public/Careers_JD/JD - Sales Team Lead.pdf';
import jdSalesDirector from '../public/Careers_JD/JD - Sales Director.pdf';
import jdFoundersOffice from '../public/Careers_JD/JD - Founder’s Office.pdf';
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
  { photo: ariselliPhoto, name: 'Ariselli Chandreshekhar', designation: 'Validation Engineer' },
  { photo: pradeepPhoto, name: 'Pradeep Sahu', designation: 'Data and Finance Manager' },
  { photo: awanishPhoto, name: 'Awanish Yadav', designation: 'Embedded Engineer' },
  { photo: ayushPhoto, name: 'Ayush Singh', designation: 'Drivetrain Engineer' }
];

const openings = [
  { title: 'Electro-Mechanical Powertrain Engineer', team: 'Engineering', location: 'Greater Noida, India', jd: jdPowertrain },
  { title: 'Sales Team Lead', team: 'Sales', location: 'Greater Noida, India', jd: jdSalesLead },
  { title: 'Sales Director', team: 'Sales', location: 'Greater Noida, India', jd: jdSalesDirector },
  { title: "Founder's Office", team: 'Strategy', location: 'Greater Noida, India', jd: jdFoundersOffice }
];

/**
 * There is no application portal — the whole process is one email. Role cards
 * link straight to a composed message so the subject line is already right.
 */
const HR_EMAIL = 'hr@voltworks.in';
const applyHref = (role?: string) =>
  `mailto:${HR_EMAIL}?subject=${encodeURIComponent(role ? `ME — ${role}` : 'ME — VoltWorks')}`;

const applyExamples = [
  'Tune the motor which will use 20% less energy vs now.',
  'Do ₹10 Cr in sales.',
  'Make VoltWorks a brand with 1M followers.'
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
      <section className="py-10 bg-slate-50">
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
            className="mt-14 border-t border-slate-200"
          >
            {/* A plain ruled list, not cards: four roles read faster as rows, and
                each row carries two separate links so neither can nest. */}
            {openings.map((role) => (
              <motion.div
                key={role.title}
                variants={fadeUp}
                className="group flex flex-col gap-4 border-b border-slate-200 py-7 transition-colors duration-300 hover:border-primary/40 md:flex-row md:items-center md:justify-between md:gap-8"
              >
                <div className="min-w-0">
                  <h3 className="text-xl md:text-2xl font-headline font-semibold text-navy-deep">
                    {role.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
                    <span>{role.team}</span>
                    <span className="text-slate-300">·</span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {role.location}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-6">
                  <a
                    href={role.jd}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 underline-offset-4 transition-colors hover:text-primary hover:underline"
                  >
                    <FileText className="h-4 w-4" />
                    View JD
                  </a>
                  <a
                    href={applyHref(role.title)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-light"
                  >
                    Apply
                    <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* The gradient border is a padded wrapper — the white child paints over
              the middle, leaving only the travelling gradient showing as an edge. */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={stagger}
            className="shine-gradient mt-14 rounded-panel p-[2px] shadow-lg shadow-primary/10"
          >
            <div className="rounded-panel bg-white p-8 md:p-12">
              <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
                <motion.div variants={fadeUp} className="flex flex-col">
                  <p className="text-sm uppercase tracking-[0.35em] text-primary mb-6">How to apply</p>
                  <div className="relative flex flex-1 min-h-[190px] items-center justify-center rounded-card border border-slate-200 bg-slate-50">
                    <span className="font-headline font-bold tracking-tight text-7xl md:text-8xl text-navy-deep">ME</span>
                    <span className="absolute bottom-5 text-[10px] uppercase tracking-[0.35em] text-slate-400">
                      One page · one topic
                    </span>
                  </div>
                  <p className="mt-6 text-slate-600 leading-relaxed">
                    No portals or long form fill ups. Just write one page on the only subject you are
                    already an expert in, and send it.
                  </p>
                </motion.div>

                <motion.div variants={stagger} className="space-y-5">
                  <motion.h3 variants={fadeUp} className="font-headline text-2xl md:text-3xl font-semibold text-navy-deep">
                    One email. One subject: you.
                  </motion.h3>

                  <motion.p variants={fadeUp} className="text-slate-600 leading-relaxed">
                    We're not looking for a cover letter. We're looking for intent.
                  </motion.p>

                  <motion.p variants={fadeUp} className="text-slate-600 leading-relaxed">
                    Tell us what capability you want to develop with us, and what you want to put your
                    name on while you're here. Be specific. &ldquo;Learn a lot&rdquo; and &ldquo;contribute to growth&rdquo;
                    tell us nothing. Tell us something we can hold you to:
                  </motion.p>

                  <motion.ul variants={stagger} className="space-y-3">
                    {applyExamples.map((example) => (
                      <motion.li key={example} variants={fadeUp} className="flex gap-3 text-navy-deep">
                        <span className="text-primary shrink-0">—</span>
                        <span className="leading-relaxed">&ldquo;{example}&rdquo;</span>
                      </motion.li>
                    ))}
                  </motion.ul>

                  <motion.p variants={fadeUp} className="text-slate-600 leading-relaxed">
                    Or something else. People who do well at VoltWorks arrive knowing what they're chasing.
                  </motion.p>

                  <motion.p variants={fadeUp} className="text-slate-600 leading-relaxed">
                    Mail you ME to{' '}
                    <a href={applyHref()} className="font-semibold text-primary hover:underline">
                      {HR_EMAIL}
                    </a>{' '}
                    with your CV attached and the role in the subject line. A person reads every single
                    one, and you will hear back either way.
                  </motion.p>
                </motion.div>
              </div>

              <motion.div variants={fadeUp} className="mt-10 flex flex-col items-start gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-slate-600">
                  None of the four fit? Just describe Who you are and what you'd like to build — we do hire people before we write job descriptions.
                </p>
                <a
                  href={applyHref()}
                  className="shine-gradient group inline-flex shrink-0 items-center gap-3 rounded-card px-7 py-4 font-semibold text-white shadow-lg shadow-primary/25 transition duration-300 hover:shadow-xl hover:shadow-primary/30"
                >
                  Email your ME
                  <ChevronRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
