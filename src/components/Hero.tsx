import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden px-6">
      {/* Background Glows */}
      <div className="glow w-[600px] h-[600px] bg-brand-green top-[-200px] left-[-100px]" />
      <div className="glow w-[500px] h-[500px] bg-brand-blue bottom-[-100px] right-[-100px]" />
      
      {/* Background Animation */}
      <div className="absolute inset-0 z-[-1] opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--glass-border)_1px,_transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-5xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-8"
        >
          <Sparkles className="w-4 h-4 text-brand-green" />
          <span className="text-xs font-medium tracking-wider uppercase text-muted">Autonomiser l'écosystème technologique africain</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-8 leading-[1.1]"
        >
          Libérer les <br />
          <span className="brand-gradient-text">Talents Tech</span> Africains pour <br />
          l'Innovation Mondiale
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Nous connectons les entreprises visionnaires avec les meilleurs esprits de l'ingénierie d'Afrique, formés aux standards internationaux et prêts à relever vos défis techniques.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/find-talent"
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-brand-green transition-all flex items-center justify-center gap-2 group"
          >
            Trouver des Talents Tech
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/training"
            className="w-full sm:w-auto px-8 py-4 glass text-white font-bold rounded-xl hover:bg-white/10 transition-all"
          >
            Devenir un Pro de la Tech
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
