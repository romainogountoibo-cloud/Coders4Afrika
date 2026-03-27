import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, BookOpen, Terminal, Users, Award, PlayCircle, 
  CheckCircle, TrendingUp, Target, Zap, ArrowRight, 
  Search, MessageSquare, Code, Briefcase, ChevronDown, HelpCircle
} from 'lucide-react';
import { db, collection, onSnapshot, addDoc } from '../firebase';
import { toast } from 'sonner';

const Training = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const defaultCourses = [
    {
      id: 'd1',
      title: "Développeur Fullstack Elite",
      description: "Maîtrisez React, Node.js et l'architecture cloud pour devenir un ingénieur complet.",
      duration: "24 semaines",
      level: "Avancé",
      icon: "Terminal",
      color: "#00FF00"
    },
    {
      id: 'd2',
      title: "Expert Data Science & AI",
      description: "Apprenez à construire des modèles de machine learning et à analyser des données massives.",
      duration: "18 semaines",
      level: "Intermédiaire",
      icon: "Target",
      color: "#0066FF"
    },
    {
      id: 'd3',
      title: "Ingénieur Mobile Flutter",
      description: "Créez des applications performantes pour iOS et Android avec un seul code source.",
      duration: "12 semaines",
      level: "Débutant",
      icon: "Zap",
      color: "#FFD700"
    },
    {
      id: 'd4',
      title: "Cyber-sécurité & Réseaux",
      description: "Protégez les infrastructures critiques et apprenez les techniques de hacking éthique.",
      duration: "20 semaines",
      level: "Avancé",
      icon: "Award",
      color: "#FF4444"
    }
  ];

  const displayCourses = courses.length > 0 ? courses : defaultCourses;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    track: 'Développeur Fullstack'
  });
  const [submitting, setSubmitting] = useState(false);

  const faqs = [
    {
      q: "Quels sont les prérequis pour rejoindre une formation ?",
      a: "Nous recherchons avant tout de la passion et une base logique. Selon le parcours, un test de niveau peut être requis, mais nous avons aussi des programmes pour débutants complets."
    },
    {
      q: "La formation est-elle certifiante ?",
      a: "Oui, chaque parcours réussi donne lieu à une certification Coders4Africa reconnue par nos entreprises partenaires internationales."
    },
    {
      q: "Proposez-vous un accompagnement pour l'emploi ?",
      a: "Absolument. Notre objectif est le placement. Nous vous préparons aux entretiens techniques et vous connectons directement à notre réseau de recruteurs."
    },
    {
      q: "Peut-on suivre la formation à distance ?",
      a: "Toutes nos formations sont conçues pour être suivies à 100% en ligne avec un mentorat en direct et des sessions de groupe régulières."
    }
  ];

  const steps = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Candidature",
      desc: "Soumettez votre profil et passez nos tests d'aptitude logique."
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Vetting Technique",
      desc: "Évaluation approfondie de vos compétences par nos experts seniors."
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Formation Intensive",
      desc: "12 à 24 semaines d'immersion totale sur des projets réels."
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Placement Elite",
      desc: "Accès direct aux opportunités dans les meilleures startups mondiales."
    }
  ];

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'courses'), (snap) => {
      setCourses(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'training_inquiries'), {
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'pending'
      });
      toast.success('Demande envoyée avec succès !');
      setFormData({ name: '', email: '', track: 'Développeur Fullstack' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Erreur lors de l\'envoi de la demande.');
    } finally {
      setSubmitting(false);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return <Terminal className="w-6 h-6" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      case 'Target': return <Target className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'Award': return <Award className="w-6 h-6" />;
      default: return <GraduationCap className="w-6 h-6" />;
    }
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/5 text-brand-green text-[10px] font-bold tracking-[0.2em] uppercase mb-8"
          >
            L'Élite de l'Ingénierie Africaine
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-[0.9] tracking-tighter">
            Devenez un <span className="brand-gradient-text">Ingénieur de Classe Mondiale</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            Accédez au top 1% des formations tech. Performance exceptionnelle, mentorat de haut niveau et insertion professionnelle garantie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/join-as-learner"
              className="px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-brand-green transition-all"
            >
              Postuler maintenant
            </Link>
            <button 
              onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/5 text-white rounded-xl font-bold text-lg border border-white/10 hover:bg-white/10 transition-colors"
            >
              Voir les programmes
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 py-12 border-y border-white/5">
          <div className="text-center">
            <p className="text-4xl font-black mb-1">5k+</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted font-bold">Apprenants</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-black mb-1">92%</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted font-bold">Taux d'Emploi</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-black mb-1">12+</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted font-bold">Mois de Mentorat</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-black mb-1">85%</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted font-bold">Progression Salaire</p>
          </div>
        </div>

        {/* Bento Grid Features */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Pourquoi se former avec nous ?</h2>
            <p className="text-muted">L'excellence technique n'a pas de géographie.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 glass rounded-3xl p-8 flex flex-col justify-between group hover:border-brand-green/30 transition-all">
              <div className="flex justify-between items-start">
                <div className="h-12 w-12 rounded-xl bg-brand-green/10 flex items-center justify-center">
                  <Award className="text-brand-green" />
                </div>
                <span className="text-brand-green text-4xl font-black">99.2%</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Vetting de Haute Volée</h3>
                <p className="text-muted max-w-md">Tests algorithmiques rigoureux, évaluation soft-skills et validation de projets réels pour ne garder que l'excellence.</p>
              </div>
            </div>
            <div className="glass rounded-3xl p-8 flex flex-col space-y-8 group hover:border-brand-green/30 transition-all">
              <div className="h-12 w-12 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                <TrendingUp className="text-brand-blue" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Rentabilité Optimale</h3>
                <p className="text-muted">Optimisez votre temps sans sacrifier la qualité. Un modèle pédagogique transparent et efficace.</p>
              </div>
            </div>
            <div className="glass rounded-3xl p-8 flex flex-col space-y-8 group hover:border-brand-green/30 transition-all">
              <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center">
                <Users className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Équipes Managées</h3>
                <p className="text-muted">Nous gérons l'infrastructure, l'administratif et le support local. Vous vous concentrez sur l'apprentissage.</p>
              </div>
            </div>
            <div className="md:col-span-2 glass rounded-3xl p-8 flex flex-col justify-between group hover:border-brand-green/30 transition-all">
              <div className="flex items-center gap-6 mb-8">
                <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <Zap className="text-white" />
                </div>
                <h3 className="text-2xl font-bold">Solutions Scalables</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 glass rounded-xl">
                  <p className="text-brand-green font-bold mb-1">Scale-up</p>
                  <p className="text-xs text-muted">Augmentez vos compétences en 48h.</p>
                </div>
                <div className="p-4 glass rounded-xl">
                  <p className="text-brand-blue font-bold mb-1">Expertise</p>
                  <p className="text-xs text-muted">Accès à des profils spécialisés (AI, Cloud, Blockchain).</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="programs" className="mb-32">
          <h2 className="text-3xl font-bold mb-12 text-center">Nos Parcours de Formation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading && courses.length === 0 ? (
            <div className="col-span-3 text-center py-20">Chargement des cours...</div>
          ) : (
            displayCourses.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass p-10 rounded-3xl hover:border-brand-green/30 transition-all group"
              >
                <div 
                  className="w-14 h-14 glass rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-green group-hover:text-black transition-all"
                  style={{ color: track.color }}
                >
                  {getIcon(track.icon)}
                </div>
                <h3 className="text-2xl font-bold mb-4">{track.title}</h3>
                <p className="text-muted leading-relaxed mb-8">{track.description}</p>
                
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="text-xs text-muted uppercase tracking-widest">{track.duration}</div>
                  <div className="text-xs text-brand-green font-bold uppercase tracking-widest">{track.level}</div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

        {/* Process Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Comment ça marche ?</h2>
            <p className="text-muted">Un parcours structuré vers l'excellence professionnelle.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="glass p-8 rounded-3xl h-full hover:border-brand-green/30 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center mb-6 text-brand-green">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-white/20" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-32 max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">FAQ</h2>
            <p className="text-muted">Tout ce que vous devez savoir sur nos formations.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="glass rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="p-6 pt-0 text-muted border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-12 rounded-[40px] flex flex-col md:flex-row items-center gap-12 mb-32">
          <div className="flex-grow">
            <h2 className="text-3xl font-bold mb-4">Prêt à commencer votre voyage ?</h2>
            <p className="text-muted mb-8 max-w-xl">
              Rejoignez notre prochaine cohorte et bénéficiez du mentorat d'experts des plus grandes entreprises technologiques. Nous fournissons les outils, le réseau et les opportunités.
            </p>
            <Link 
              to="/join-as-learner"
              className="inline-block px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-brand-green transition-all"
            >
              Postuler pour la Prochaine Cohorte
            </Link>
          </div>
          <div className="w-full md:w-1/3 aspect-video glass rounded-2xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
            <img src="https://picsum.photos/seed/training/600/400" alt="Training" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform" />
            <PlayCircle className="w-16 h-16 text-white relative z-10 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* CTA Form Area */}
        <section className="glass rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-bl from-brand-green to-transparent blur-3xl rounded-full"></div>
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Prêt à transformer votre carrière tech?</h2>
              <p className="text-muted text-lg leading-relaxed mb-8">
                Nos experts vous accompagnent pour définir votre parcours idéal et lancer votre carrière en moins d'une semaine.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <CheckCircle className="text-brand-green w-5 h-5" />
                  <span className="font-medium">Audit gratuit de vos compétences tech</span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle className="text-brand-green w-5 h-5" />
                  <span className="font-medium">Zéro risque : essai de 15 jours</span>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="glass p-8 md:p-10 rounded-3xl border-white/10 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Nom Complet</label>
                  <input 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border-none rounded-xl p-4 text-white focus:ring-2 focus:ring-brand-green transition-all" 
                    placeholder="Jean Dupont" 
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Email Professionnel</label>
                  <input 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border-none rounded-xl p-4 text-white focus:ring-2 focus:ring-brand-green transition-all" 
                    placeholder="jean@exemple.com" 
                    type="email"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Parcours souhaité</label>
                  <select 
                    value={formData.track}
                    onChange={(e) => setFormData({...formData, track: e.target.value})}
                    className="w-full bg-white/5 border-none rounded-xl p-4 text-white focus:ring-2 focus:ring-brand-green transition-all"
                  >
                    <option className="bg-neutral-900">Développeur Fullstack</option>
                    <option className="bg-neutral-900">Ingénieur Mobile (Flutter/RN)</option>
                    <option className="bg-neutral-900">Expert Data & AI</option>
                    <option className="bg-neutral-900">Cyber-sécurité</option>
                  </select>
                </div>
                <button 
                  disabled={submitting}
                  className="w-full py-4 bg-brand-green text-black font-bold rounded-xl text-lg hover:bg-white transition-all flex items-center justify-center gap-2"
                >
                  {submitting ? 'Envoi...' : 'Demander une Consultation'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Training;
