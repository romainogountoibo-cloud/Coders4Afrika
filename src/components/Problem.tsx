import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, Globe, Users, Zap } from 'lucide-react';

const Problem = () => {
  const problems = [
    {
      icon: <Globe className="w-6 h-6 text-brand-green" />,
      title: "Pénurie Mondiale de Talents",
      description: "Les entreprises du monde entier ont du mal à trouver des ingénieurs logiciels qualifiés pour alimenter leur croissance."
    },
    {
      icon: <Users className="w-6 h-6 text-brand-blue" />,
      title: "Potentiel Inexploité",
      description: "L'Afrique possède une population massive, jeune et motivée avec un incroyable potentiel technologique qui reste largement inexploité."
    },
    {
      icon: <Zap className="w-6 h-6 text-brand-green" />,
      title: "Écart de Compétences",
      description: "L'éducation traditionnelle échoue souvent à doter les développeurs des compétences pratiques et prêtes pour l'industrie nécessaires aux rôles mondiaux."
    }
  ];

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6">
              <AlertCircle className="w-4 h-4 text-brand-green" />
              <span className="text-xs font-medium tracking-wider uppercase text-muted">Le Défi</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
              L'Écart de Talents Tech <br />
              <span className="gradient-text">S'élargit Chaque Jour</span>
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-12 max-w-xl">
              Alors que l'économie numérique s'accélère, la demande de talents en ingénierie de haute qualité dépasse de loin l'offre. Les entreprises perdent des millions en productivité tandis que les esprits brillants en Afrique manquent de pont vers ces opportunités.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass p-8 rounded-2xl flex gap-6 group hover:border-white/20 transition-all"
              >
                <div className="flex-shrink-0 w-12 h-12 glass rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {problem.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">{problem.title}</h3>
                  <p className="text-muted leading-relaxed">{problem.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
