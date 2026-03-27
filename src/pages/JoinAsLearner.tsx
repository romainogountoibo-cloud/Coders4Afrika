import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, GraduationCap, BookOpen, Target, Sparkles } from 'lucide-react';
import { db, collection, addDoc } from '../firebase';

const JoinAsLearner = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    level: '',
    interest: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        type: 'learner',
        createdAt: new Date().toISOString()
      });
      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting learner application:', error);
    }
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="pt-32 pb-20 px-6 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-16 rounded-[40px] text-center max-w-2xl"
        >
          <div className="w-20 h-20 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-black" />
          </div>
          <h2 className="text-4xl font-display font-bold mb-6">Inscription Reçue !</h2>
          <p className="text-lg text-muted mb-12 leading-relaxed">
            Merci de votre intérêt pour les formations de Coders 4 Afrika. Notre équipe pédagogique examinera votre profil et vous contactera pour les prochaines étapes de sélection.
          </p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-brand-green transition-all"
          >
            Retour à l'Accueil
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6">
            <GraduationCap className="w-4 h-4 text-brand-green" />
            <span className="text-xs font-medium tracking-wider uppercase text-muted">Pour les Apprenants</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
            Lancez votre Carrière <br />
            <span className="brand-gradient-text">dans la Tech Mondiale</span>
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-12 max-w-xl">
            Apprenez les compétences les plus demandées par le marché international. Nos formations sont conçues pour vous rendre opérationnel et prêt à travailler sur des projets réels.
          </p>
          
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 glass rounded-xl flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-brand-green" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Curriculum Pratique</h3>
                <p className="text-muted">Pas seulement de la théorie. Apprenez en construisant des projets réels utilisés par l'industrie.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 glass rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-brand-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Mentorat d'Experts</h3>
                <p className="text-muted">Soyez guidé par des ingénieurs seniors travaillant dans des entreprises technologiques internationales.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 glass rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-brand-green" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Accès au Marché</h3>
                <p className="text-muted">Les meilleurs diplômés sont directement connectés à notre réseau d'entreprises partenaires pour un placement rapide.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass p-10 md:p-12 rounded-[40px] relative overflow-hidden"
        >
          <div className="glow w-[300px] h-[300px] bg-brand-green top-[-150px] right-[-150px] opacity-10" />
          
          <h2 className="text-2xl font-bold mb-8">Formulaire d'Inscription</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted">Nom Complet</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Jean Dupont" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-green transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted">Adresse Email</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="jean@exemple.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-green transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted">Niveau Actuel</label>
              <select 
                required
                value={formData.level}
                onChange={(e) => setFormData({...formData, level: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-green transition-colors appearance-none"
              >
                <option value="" className="bg-black">Sélectionner votre niveau</option>
                <option value="beginner" className="bg-black">Débutant (Aucune expérience)</option>
                <option value="intermediate" className="bg-black">Intermédiaire (Quelques bases)</option>
                <option value="advanced" className="bg-black">Avancé (Déjà développeur)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted">Domaine d'Intérêt</label>
              <select 
                required
                value={formData.interest}
                onChange={(e) => setFormData({...formData, interest: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-green transition-colors appearance-none"
              >
                <option value="" className="bg-black">Sélectionner un domaine</option>
                <option value="web" className="bg-black">Développement Web (Fullstack)</option>
                <option value="ai" className="bg-black">Intelligence Artificielle & Data</option>
                <option value="cloud" className="bg-black">Cloud & DevOps</option>
                <option value="cyber" className="bg-black">Cybersécurité</option>
              </select>
            </div>
            <button 
              disabled={isSubmitting}
              className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-brand-green transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isSubmitting ? 'Envoi en cours...' : 'S\'inscrire à la Formation'}
              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default JoinAsLearner;
