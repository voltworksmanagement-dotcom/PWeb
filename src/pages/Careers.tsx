import { motion } from 'motion/react';
import { ChevronRight, MapPin, Heart, Briefcase, Activity } from 'lucide-react';
import { useRef } from 'react';

import life1 from '../public/life1.jpg';
import life2 from '../public/life2.jpg';
import life3 from '../public/life3.jpg';
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

const benefits = [
  { icon: Activity, title: 'Work life balance', description: 'Flexible routines, focused collaboration, and support for your wellbeing.' },
  { icon: Briefcase, title: 'Career growth', description: 'Real ownership, fast learning, and mentorship across engineering and product.' },
  { icon: Heart, title: 'Healthcare', description: 'Coverage and care that keeps you and your family moving with confidence.' }
];

const openings = [
  {
    title: 'Senior Power Electronics Engineer',
    location: 'Greater Noida, India',
    url: 'https://forms.gle/962KMM5jiy5k5nCEA'
  }
];

export default function Careers() {
  const openPositionsRef = useRef<HTMLDivElement>(null);

  const scrollToPositions = () => {
    openPositionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white text-slate-900"
    >
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPP6wc5eD2KEGGbZ4vd3LgMkoifDsPGRVGmSnyzzfeZ83rY-V4Fu8KUjKQJLizjAl_N3H2czmg8fE-PdUXpcoxHkLwp22BdgPNyMUeVGJbhBjY2zX7MoeumC_5tobwm-mBk3EPSdNldPEf_1eQnXp7saIJ5uBu1oMWOTUe9vGroj5-fynmr0meSMrUMIFG5blpsiBS9uSmzFb_fyKmiqvQjExmP03zcgifkWQOctQ_5RiVbnMh7fMqOsXzp_zLIqXMi8jdzYhjM9E"
            alt="industrial team"
          />
          <div className="absolute inset-0 bg-navy-deep/70" />
        </div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-28"
        >
          <div className="max-w-3xl">
            <motion.span variants={fadeUp} className="inline-block text-[10px] md:text-xs uppercase tracking-[0.4em] text-primary mb-4">Precision engineering since 2023</motion.span>
            <motion.h1 variants={fadeUp} className="font-headline-xl text-4xl md:text-5xl text-white leading-tight mb-5">
              Build the systems that power tomorrow's mobility.
            </motion.h1>
            {/* The long company-background paragraph that used to sit here now
                lives in the "Why VoltWorks" section — a hero shouldn't ask for
                three paragraphs of reading before its call to action. */}
            <motion.p variants={fadeUp} className="text-base md:text-lg text-white/85 leading-relaxed max-w-2xl mb-8">
              We're revolutionizing how motors and controllers work — building the high-performance drivetrain technology behind software-defined mobility.
            </motion.p>
            <motion.button
              variants={fadeUp}
              onClick={scrollToPositions}
              className="group inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-card font-semibold shadow-2xl shadow-primary/20 hover:bg-primary-light transition duration-300"
            >
              See Open Positions
              <ChevronRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>
          </div>
        </motion.div>
      </section>

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
            <motion.p variants={fadeUp} className="text-sm uppercase tracking-[0.35em] text-primary mb-4">Benefits</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl font-headline font-bold text-navy-deep">
              Built for the people who build the future.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={staggerSlow}
            className="grid gap-8 md:grid-cols-3"
          >
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="group rounded-card border border-slate-200 bg-slate-50 p-8 md:p-10 text-center shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-card bg-slate-100 text-3xl text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <benefit.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-headline font-semibold text-navy-deep mb-3">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section ref={openPositionsRef} className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={stagger}
            className="rounded-panel border border-slate-200 bg-white p-6 md:p-10 shadow-xl"
          >
            <motion.div variants={fadeUp} className="mb-8 md:mb-10">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-navy-deep mb-4">Open positions</h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                Help build products that will drive the new era of future automotive.
              </p>
            </motion.div>

            <motion.div variants={stagger} className="space-y-4">
              {openings.map((role) => (
                <motion.a
                  key={role.title}
                  variants={fadeUp}
                  href={role.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-4 rounded-card border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:border-primary hover:bg-white hover:shadow-xl"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-2xl font-headline font-semibold text-navy-deep transition-colors group-hover:text-primary">
                        {role.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                        <MapPin className="h-4 w-4" />
                        {role.location}
                      </div>
                    </div>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-300 text-primary transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                      <ChevronRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </motion.a>
              ))}

              {/* A single role in a container built for a list reads as sparse —
                  this signals the list is live rather than merely short. */}
              <motion.div
                variants={fadeUp}
                className="rounded-card border border-dashed border-slate-300 p-6 text-center"
              >
                <p className="text-slate-500 text-sm leading-relaxed">
                  More roles across engineering, firmware and operations are opening soon.
                  Send us your CV and we'll reach out when one matches.
                </p>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-12 pt-8 border-t border-slate-200 text-center">
              <p className="text-slate-600">
                Did not find the right opportunity or have questions? Email us at <a href="mailto:hr@voltworks.in" className="text-primary hover:underline font-semibold">hr@voltworks.in</a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
