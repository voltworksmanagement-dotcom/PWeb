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
    <div className="bg-industrial-bg min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 grid-schematic opacity-30 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-headline font-bold text-navy-deep leading-[1.1] mb-6">
                Do what you <span className="text-primary">💙</span> and help change future of mobility at <span className="text-primary">VoltWorks.</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg text-slate-600 font-body mb-8 leading-relaxed">
                Join one of the world's fastest growing automotive tech companies where you can help shape the future of connected mobility for people everywhere. We look forward to meeting you.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <p className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">Find your next role:</p>
                <button 
                  onClick={scrollToPositions}
                  className="bg-navy-deep hover:bg-primary transition-colors duration-300 text-white font-medium px-8 py-4 rounded-xl shadow-lg hover:shadow-xl flex items-center gap-2 group"
                >
                  See Open Positions
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:block h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" 
                alt="VoltWorks Team" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Life at VoltWorks Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="bg-surface-low rounded-3xl p-8 lg:p-16 border border-outline-v/30 shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="flex flex-col justify-center">
                <motion.h2 variants={fadeInUp} className="text-4xl font-headline font-bold text-navy-deep mb-6">
                  Life at VoltWorks
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-lg text-slate-600 mb-12 leading-relaxed">
                  We believe in bringing the best out of people, all we see is to have a passion for it.
                </motion.p>
                
                <motion.h3 variants={fadeInUp} className="text-2xl font-headline font-bold text-navy-deep mb-4">
                  What drives us?
                </motion.h3>
                <motion.p variants={fadeInUp} className="text-lg text-slate-600 leading-relaxed">
                  Bringing the paradigm shift in connected mobility enabling an AI enabled smart ecosystem.
                </motion.p>
              </div>

              {/* Bento Box Image Grid */}
              <motion.div variants={fadeInUp} className="grid grid-cols-2 grid-rows-2 gap-4 h-[500px]">
                <div className="col-span-2 row-span-1 rounded-2xl overflow-hidden shadow-md">
                  <img src={life1} alt="Life at VoltWorks 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-md">
                  <img src={life2} alt="Life at VoltWorks 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-md">
                  <img src={life3} alt="Life at VoltWorks 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-headline font-bold text-navy-deep">
              Benefits
            </motion.h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: Activity, title: 'Work Life Balance', color: 'bg-emerald-100 text-emerald-600' },
              { icon: Briefcase, title: 'Career Growth', color: 'bg-blue-100 text-blue-600' },
              { icon: Heart, title: 'Healthcare', color: 'bg-rose-100 text-rose-600' },
            ].map((benefit, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl p-10 text-center shadow-sm border border-outline-v/20 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center ${benefit.color} mb-6 shadow-inner`}>
                  <benefit.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-headline font-bold text-navy-deep">{benefit.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section ref={openPositionsRef} className="py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="bg-surface-low rounded-3xl p-8 lg:p-12 border border-outline-v/30 shadow-sm"
          >
            <div className="mb-10">
              <motion.h2 variants={fadeInUp} className="text-4xl font-headline font-bold text-navy-deep mb-4">
                Open Positions
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-slate-600">
                Help build products that will drive the new era of future automotive
              </motion.p>
            </div>

            <motion.div variants={fadeInUp} className="space-y-4">
              <a 
                href="https://forms.gle/962KMM5jiy5k5nCEA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white border border-outline-v/30 rounded-2xl p-6 flex items-center justify-between hover:shadow-md hover:border-primary/40 transition-all duration-300 cursor-pointer group w-full text-left"
              >
                <div>
                  <h4 className="text-xl font-bold font-headline text-navy-deep mb-2 group-hover:text-primary transition-colors">
                    Senior Power Electronics Engineer
                  </h4>
                  <div className="flex items-center text-slate-500 text-sm font-medium">
                    <MapPin className="w-4 h-4 mr-1.5" />
                    Greater Noida, India
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full border border-outline-v flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                  <ChevronRight className="w-6 h-6" />
                </div>
              </a>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-12 pt-8 border-t border-outline-v/30 text-center">
              <p className="text-slate-500 font-medium">
                Did not find the right opportunity or have any queries, write us at <a href="mailto:hr@voltworks.in" className="text-primary hover:underline font-semibold">hr@voltworks.in</a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
