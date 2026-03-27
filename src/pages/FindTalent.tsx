import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Building2, Users, DollarSign, Calendar } from 'lucide-react';
import { db, collection, addDoc } from '../firebase';

const FindTalent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    needs: '',
    budget: '',
    deadline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        type: 'enterprise',
        createdAt: new Date().toISOString()
      });
      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
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
          <h2 className="text-4xl font-display font-bold mb-6">Demande Reçue !</h2>
          <p className="text-lg text-muted mb-12 leading-relaxed">
            Merci de votre intérêt pour Coders 4 Afrika. Notre équipe examinera vos besoins et vous répondra dans les 24 à 48 heures.
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
            <Building2 className="w-4 h-4 text-brand-green" />
            <span className="text-xs font-medium tracking-wider uppercase text-muted">Pour les Entreprises</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
            Recrutez les Meilleurs <br />
            <span className="brand-gradient-text">Talents Tech Africains</span>
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-12 max-w-xl">
            Parlez-nous de votre projet ou des besoins de votre équipe. Nous vous aiderons à trouver, évaluer et intégrer des ingénieurs de classe mondiale de tout le continent.
          </p>
          
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 glass rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-brand-green" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Talents Pré-Évalués</h3>
                <p className="text-muted">Chaque développeur de notre réseau subit des évaluations techniques et de compétences relationnelles rigoureuses.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 glass rounded-xl flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-6 h-6 text-brand-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Rentable</h3>
                <p className="text-muted">Accédez à des talents d'ingénierie de premier plan à des tarifs compétitifs sans compromis sur la qualité.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 glass rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-brand-green" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Intégration Rapide</h3>
                <p className="text-muted">Nous gérons la logistique pour que vous puissiez vous concentrer sur la construction. Recrutez et intégrez en seulement 2 semaines.</p>
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
          
          <h2 className="text-2xl font-bold mb-8">Formulaire de Demande</h2>
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
                <label className="text-xs font-bold uppercase tracking-widest text-muted">Email Professionnel</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="jean@entreprise.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-green transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted">Nom de l'Entreprise</label>
              <input 
                required
                type="text" 
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                placeholder="TechCorp Inc." 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-green transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted">Besoins Spécifiques</label>
              <textarea 
                required
                rows={4}
                value={formData.needs}
                onChange={(e) => setFormData({...formData, needs: e.target.value})}
                placeholder="Parlez-nous des rôles ou des projets que vous cherchez à pourvoir..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-green transition-colors resize-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted">Budget Estimé</label>
                <input 
                  type="text" 
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  placeholder="5k€ - 10k€ / mois" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-green transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted">Échéance du Projet</label>
                <input 
                  type="text" 
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  placeholder="T3 2026" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-green transition-colors"
                />
              </div>
            </div>
            <button 
              disabled={isSubmitting}
              className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-brand-green transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer la Demande'}
              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default FindTalent;
