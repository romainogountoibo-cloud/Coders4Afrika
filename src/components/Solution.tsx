import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Cpu, GraduationCap, ShieldCheck } from 'lucide-react';

const Solution = () => {
  const solutions = [
    {
      icon: <GraduationCap className="w-6 h-6 text-brand-green" />,
      title: "Formation de Classe Mondiale",
      description: "Notre programme intensif est conçu par des vétérans de l'industrie pour produire des développeurs prêts pour les défis mondiaux."
    },
    {
      icon: <Cpu className="w-6 h-6 text-brand-blue" />,
      title: "Marché des Talents",
      description: "Une plateforme organisée où les entreprises peuvent découvrir et recruter des talents tech africains de premier plan, pré-évalués."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-green" />,
      title: "Assurance Qualité",
      description: "Nous ne nous contentons pas de connecter ; nous garantissons la qualité grâce à des tests rigoureux et un mentorat continu."
    }
  ];

  return (
    <section className="py-32 px-6 bg-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6"
          >
            <CheckCircle2 className="w-4 h-4 text-brand-green" />
            <span className="text-xs font-medium tracking-wider uppercase text-muted">La Solution</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold mb-8"
          >
            Comblez l'Écart avec <br />
            <span className="brand-gradient-text">Coders 4 Afrika</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass p-10 rounded-3xl hover:border-brand-green/30 transition-all group"
            >
              <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-green group-hover:text-black transition-all">
                {solution.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{solution.title}</h3>
              <p className="text-muted leading-relaxed">{solution.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solution;
