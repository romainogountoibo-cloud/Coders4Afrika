import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Code, Terminal, Github, Link as LinkIcon } from 'lucide-react';
import { db, collection, addDoc } from '../firebase';

const JoinAsDeveloper = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    stack: '',
    experience: '',
    portfolio: '',
    availability: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'applications'), {
        ...formData,
        type: 'developer',
        createdAt: new Date().toISOString()
      });
      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting application:', error);
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
          <h2 className="text-4xl font-display font-bold mb-6">Candidature Envoyée !</h2>
          <p className="text-lg text-muted mb-12 leading-relaxed">
            Votre demande pour rejoindre Coders 4 Afrika a été reçue. Notre équipe examinera votre profil et vous contactera pour les prochaines étapes.
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
            <Code className="w-4 h-4 text-brand-green" />
            <span className="text-xs font-medium tracking-wider uppercase text-muted">Pour les Développeurs</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
            Rejoignez la Prochaine <br />
            <span className="brand-gradient-text">Génération de la Tech</span>
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-12 max-w-xl">
            Êtes-vous un développeur qualifié à la recherche d'opportunités mondiales ? Rejoignez notre réseau, soyez évalué et travaillez avec certaines des entreprises les plus innovantes au monde.
          </p>
          
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 glass rounded-xl flex items-center justify-center flex-shrink-0">
                <Terminal className="w-6 h-6 text-brand-green" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Projets Mondiaux</h3>
                <p className="text-muted">Travaillez sur des projets à fort impact pour des clients internationaux et des startups.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 glass rounded-xl flex items-center justify-center flex-shrink-0">
                <Github className="w-6 h-6 text-brand-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Croissance Continue</h3>
                <p className="text-muted">Accédez à un mentorat continu, des formations avancées et une communauté de pairs solidaire.</p>
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
          
          <h2 className="text-2xl font-bold mb-8">Candidature Développeur</h2>
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
              <label className="text-xs font-bold uppercase tracking-widest text-muted">Stack Technique</label>
              <input 
                required
                type="text" 
                value={formData.stack}
                onChange={(e) => setFormData({...formData, stack: e.target.value})}
                placeholder="React, Node.js, TypeScript, etc." 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-green transition-colors"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted">Niveau d'Expérience</label>
                <select 
                  required
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-green transition-colors appearance-none"
                >
                  <option value="" className="bg-black">Sélectionner l'Expérience</option>
                  <option value="junior" className="bg-black">Junior (1-2 ans)</option>
                  <option value="mid" className="bg-black">Intermédiaire (3-5 ans)</option>
                  <option value="senior" className="bg-black">Sénior (5+ ans)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted">Disponibilité</label>
                <select 
                  required
                  value={formData.availability}
                  onChange={(e) => setFormData({...formData, availability: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-green transition-colors appearance-none"
                >
                  <option value="" className="bg-black">Sélectionner la Disponibilité</option>
                  <option value="full-time" className="bg-black">Temps plein</option>
                  <option value="part-time" className="bg-black">Temps partiel</option>
                  <option value="freelance" className="bg-black">Freelance</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted">Portfolio / URL GitHub</label>
              <div className="relative">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted w-4 h-4" />
                <input 
                  required
                  type="url" 
                  value={formData.portfolio}
                  onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
                  placeholder="https://github.com/votrepseudo" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-brand-green transition-colors"
                />
              </div>
            </div>
            <button 
              disabled={isSubmitting}
              className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-brand-green transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Postuler Maintenant'}
              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default JoinAsDeveloper;
