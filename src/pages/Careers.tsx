import { motion } from 'motion/react';
import { ChevronRight, MapPin, Heart, Briefcase, Activity } from 'lucide-react';
import { useRef } from 'react';

import life1 from '../public/life1.jpg';
import life2 from '../public/life2.jpg';
import life3 from '../public/life3.jpg';

export default function Careers() {
  const openPositionsRef = useRef<HTMLDivElement>(null);

  const scrollToPositions = () => {
    openPositionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white text-slate-900"
    >
      <section className="relative overflow-hidden min-h-[520px]">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPP6wc5eD2KEGGbZ4vd3LgMkoifDsPGRVGmSnyzzfeZ83rY-V4Fu8KUjKQJLizjAl_N3H2czmg8fE-PdUXpcoxHkLwp22BdgPNyMUeVGJbhBjY2zX7MoeumC_5tobwm-mBk3EPSdNldPEf_1eQnXp7saIJ5uBu1oMWOTUe9vGroj5-fynmr0meSMrUMIFG5blpsiBS9uSmzFb_fyKmiqvQjExmP03zcgifkWQOctQ_5RiVbnMh7fMqOsXzp_zLIqXMi8jdzYhjM9E"
            alt="industrial team"
          />
          <div className="absolute inset-0 bg-navy-deep/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <span className="inline-block text-xs uppercase tracking-[0.4em] text-primary mb-4">Precision engineering since 1994</span>
            <h1 className="font-headline-xl text-5xl md:text-6xl text-white leading-tight mb-6">
              Build the systems that power tomorrow’s mobility.
            </h1>
            <p className="text-lg md:text-xl text-white/85 leading-relaxed mb-6">
              At VoltWorks, we are revolutionizing the way motors and controllers work in the modern world. Our technology is at the forefront of industrial automation, powered by the expertise of German and Swiss engineers.
            </p>
            <p className="text-base md:text-lg text-white/75 leading-relaxed max-w-2xl mb-10">
              We are a team founded by IIT BHU and IIT Delhi alumni focusing on providing high-performance solutions that drive the future of connected devices. Our advanced platforms offer OEMs a seamless way to transform device data into actionable insights while ensuring safety and security. At VoltWorks, we focus on delivering efficiency, reliability, and robust performance to help you stay ahead in the software-defined mobility era.
            </p>
            <button
              onClick={scrollToPositions}
              className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl shadow-primary/20 hover:bg-primary-light transition duration-300"
            >
              See Open Positions
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-start">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.35em] text-primary mb-4">Why VoltWorks</p>
              <h2 className="text-4xl font-headline font-bold text-navy-deep max-w-xl">
                Join a team that turns industrial ambition into real-world impact.
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed max-w-2xl">
                Our values aren't just words on a wall; they are the technical specifications for how we conduct business and engineering.
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                {[
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
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl transition-shadow duration-300">
                    <h3 className="font-headline-md text-xl text-navy-deep mb-3">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 flex gap-4">
                <div className="flex-1 overflow-hidden rounded-[2rem] shadow-lg min-h-[220px]">
                  <img src={life1} alt="VoltWorks team collaboration" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex-1 grid gap-4">
                  <div className="overflow-hidden rounded-[2rem] shadow-lg min-h-[108px]">
                    <img src={life2} alt="VoltWorks workspace" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="overflow-hidden rounded-[2rem] shadow-lg min-h-[108px]">
                    <img src={life3} alt="VoltWorks technology" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.35em] text-primary mb-4">Benefits</p>
            <h2 className="text-4xl font-headline font-bold text-navy-deep">
              Built for the people who build the future.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: Activity, title: 'Work life balance', description: 'Flexible routines, focused collaboration, and support for your wellbeing.' },
              { icon: Briefcase, title: 'Career growth', description: 'Real ownership, fast learning, and mentorship across engineering and product.' },
              { icon: Heart, title: 'Healthcare', description: 'Coverage and care that keeps you and your family moving with confidence.' }
            ].map((benefit) => (
              <motion.div
                key={benefit.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-3xl text-primary">
                  <benefit.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-headline font-semibold text-navy-deep mb-3">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={openPositionsRef} className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl">
            <div className="mb-10">
              <h2 className="text-4xl font-headline font-bold text-navy-deep mb-4">Open positions</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                Help build products that will drive the new era of future automotive.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="https://forms.gle/962KMM5jiy5k5nCEA"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:border-primary hover:bg-white hover:shadow-xl"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-headline font-semibold text-navy-deep transition-colors group-hover:text-primary">
                      Senior Power Electronics Engineer
                    </h3>
                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                      <MapPin className="h-4 w-4" />
                      Greater Noida, India
                    </div>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 text-primary transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </div>
              </a>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200 text-center">
              <p className="text-slate-600">
                Did not find the right opportunity or have questions? Email us at <a href="mailto:hr@voltworks.in" className="text-primary hover:underline font-semibold">hr@voltworks.in</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
