import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Code, 
  Briefcase, 
  MapPin, 
  Star, 
  Zap, 
  Target, 
  LayoutDashboard, 
  MessageSquare, 
  Clock, 
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Users,
  Mail,
  Phone,
  Plus,
  X
} from 'lucide-react';
import { db, collection, onSnapshot, addDoc } from '../firebase';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

const Talent = () => {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [talents, setTalents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [matchingStep, setMatchingStep] = useState(0);
  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false);
  const [newMission, setNewMission] = useState({ title: '', client: '', budget: '', description: '' });

  const [expandedTalentId, setExpandedTalentId] = useState<string | null>(null);

  const defaultTalents = [
    {
      id: 't1',
      name: "Sarah Kone",
      role: "Senior Full Stack Developer",
      location: "Abidjan, CI",
      experience: "6 ans",
      skills: ["React", "Node.js", "AWS", "TypeScript"],
      rating: 4.9,
      image: "https://picsum.photos/seed/sarah/200/200",
      isVetted: true,
      email: "sarah.kone@coders4afrika.com",
      phone: "+225 07 08 09 10 11"
    },
    {
      id: 't2',
      name: "Moussa Diop",
      role: "Expert Mobile & Flutter",
      location: "Dakar, SN",
      experience: "4 ans",
      skills: ["Flutter", "Dart", "Firebase", "GraphQL"],
      rating: 4.8,
      image: "https://picsum.photos/seed/moussa/200/200",
      isVetted: true,
      email: "moussa.diop@coders4afrika.com",
      phone: "+221 77 123 45 67"
    },
    {
      id: 't3',
      name: "Aminata Traore",
      role: "Data Scientist & AI Engineer",
      location: "Bamako, ML",
      experience: "5 ans",
      skills: ["Python", "TensorFlow", "PyTorch", "SQL"],
      rating: 4.9,
      image: "https://picsum.photos/seed/aminata/200/200",
      isVetted: true,
      email: "aminata.traore@coders4afrika.com",
      phone: "+223 66 77 88 99"
    },
    {
      id: 't4',
      name: "Koffi Mensah",
      role: "DevOps & Cloud Architect",
      location: "Accra, GH",
      experience: "7 ans",
      skills: ["Docker", "Kubernetes", "Terraform", "GCP"],
      rating: 5.0,
      image: "https://picsum.photos/seed/koffi/200/200",
      isVetted: true,
      email: "koffi.mensah@coders4afrika.com",
      phone: "+233 24 123 4567"
    }
  ];

  const displayTalents = talents.length > 0 ? talents : defaultTalents;

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'developers'), (snap) => {
      setTalents(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const filteredTalents = displayTalents.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.location && t.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
    t.skills.some((s: string) => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const matchingQuestions = [
    { q: "Quel est votre besoin principal ?", options: ["Développement Web", "Mobile App", "IA & Data", "Cloud & DevOps"] },
    { q: "Quel est le niveau d'expertise requis ?", options: ["Junior (1-3 ans)", "Intermédiaire (3-5 ans)", "Senior (5-8 ans)", "Expert (8+ ans)"] },
    { q: "Quelle est la durée estimée de la mission ?", options: ["Court terme (< 3 mois)", "Moyen terme (3-6 mois)", "Long terme (> 6 mois)", "Temps plein"] }
  ];

  const handleCreateMission = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'missions'), {
        ...newMission,
        status: 'En attente',
        progress: 0,
        createdAt: new Date().toISOString()
      });
      toast.success('Mission créée avec succès !');
      setIsMissionModalOpen(false);
      setNewMission({ title: '', client: '', budget: '', description: '' });
    } catch (error) {
      toast.error('Erreur lors de la création de la mission.');
    }
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-green/10 text-brand-green text-[10px] font-bold tracking-[0.2em] uppercase mb-6"
          >
            Écosystème Talent Elite
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter leading-[0.9]">
            Plateforme <span className="brand-gradient-text">Talent Pro</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            L'écosystème complet pour recruter, gérer et collaborer avec l'élite de la tech africaine. 
            Accédez à un vivier de talents vérifiés et gérez vos missions en toute simplicité.
          </p>
        </div>

        {/* Feature Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {[
            { title: "Marketplace", desc: "Top 1% des talents tech", icon: <Users className="w-5 h-5" />, color: "bg-brand-green/10 text-brand-green" },
            { title: "AI Matching", desc: "Trouvez le match parfait", icon: <Sparkles className="w-5 h-5" />, color: "bg-brand-blue/10 text-brand-blue" },
            { title: "Dashboard", desc: "Gestion centralisée", icon: <LayoutDashboard className="w-5 h-5" />, color: "bg-purple-500/10 text-purple-500" },
            { title: "Missions", desc: "Suivi en temps réel", icon: <Briefcase className="w-5 h-5" />, color: "bg-yellow-500/10 text-yellow-500" }
          ].map((feature, i) => (
            <div key={i} className="glass p-6 rounded-3xl border-white/5 hover:border-white/10 transition-all">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4", feature.color)}>
                {feature.icon}
              </div>
              <h3 className="font-bold mb-1">{feature.title}</h3>
              <p className="text-xs text-muted">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {[
            { id: 'marketplace', label: 'Marché des Talents', icon: <Users className="w-4 h-4" /> },
            { id: 'matching', label: 'Matching Intelligent', icon: <Sparkles className="w-4 h-4" /> },
            { id: 'dashboard', label: 'Espace Entreprise', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'missions', label: 'Gestion Missions', icon: <Briefcase className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold transition-all border",
                activeTab === tab.id 
                  ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                  : "glass border-white/5 text-muted hover:text-white hover:border-white/20"
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'marketplace' && (
            <motion.div
              key="marketplace"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <form 
                onSubmit={(e) => e.preventDefault()} 
                className="flex flex-col md:flex-row gap-6 mb-12"
              >
                <div className="flex-grow relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted w-5 h-5" />
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher par compétences, rôle ou lieu..." 
                    className="w-full glass border-white/10 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-brand-green transition-colors"
                  />
                </div>
                <button 
                  type="submit"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-brand-green text-black font-bold rounded-xl hover:opacity-90 transition-all shadow-[0_10px_20px_rgba(0,255,157,0.1)]"
                >
                  <Search className="w-5 h-5" />
                  <span>Valider</span>
                </button>
              </form>

              {loading ? (
                <div className="text-center py-20">Chargement des talents...</div>
              ) : filteredTalents.length === 0 ? (
                <div className="text-center py-20 text-muted">Aucun développeur trouvé.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredTalents.map((talent, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="glass p-8 rounded-3xl hover:border-brand-green/30 transition-all group relative overflow-hidden"
                    >
                      <div className="absolute top-4 right-4 bg-brand-green/10 text-brand-green text-[10px] font-bold px-2 py-1 rounded-md">DISPONIBLE</div>
                      <div className="flex items-center gap-4 mb-6">
                        <img src={talent.image || `https://picsum.photos/seed/${talent.name}/200/200`} alt={talent.name} className="w-16 h-16 rounded-2xl object-cover border border-white/10" />
                        <div>
                          <h3 className="text-xl font-bold">{talent.name}</h3>
                          <p className="text-sm text-muted">{talent.role}</p>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-sm text-muted">
                          <MapPin className="w-4 h-4" />
                          <span>{talent.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted">
                          <Briefcase className="w-4 h-4" />
                          <span>{talent.experience} d'expérience</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted">
                          <Star className="w-4 h-4 text-brand-green fill-brand-green" />
                          <span>Note: {talent.rating || '5.0'}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {(talent.skills || []).map((skill: string) => (
                          <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-muted">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <AnimatePresence>
                        {expandedTalentId === talent.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-6 p-4 glass border-brand-green/20 rounded-2xl space-y-3"
                          >
                            <div className="flex items-center gap-3 text-sm">
                              <Mail className="w-4 h-4 text-brand-green" />
                              <span className="truncate">{talent.email || `${talent.name.toLowerCase().replace(' ', '.')}@example.com`}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                              <Phone className="w-4 h-4 text-brand-green" />
                              <span>{talent.phone || "+225 00 00 00 00"}</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button 
                        onClick={() => setExpandedTalentId(expandedTalentId === talent.id ? null : talent.id)}
                        className={cn(
                          "w-full py-3 font-bold rounded-xl transition-all",
                          expandedTalentId === talent.id 
                            ? "bg-brand-green text-black" 
                            : "bg-white text-black hover:bg-brand-green"
                        )}
                      >
                        {expandedTalentId === talent.id ? "Masquer les Coordonnées" : "Voir le Profil Complet"}
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'matching' && (
            <motion.div
              key="matching"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass p-12 rounded-[40px] max-w-3xl mx-auto text-center"
            >
              <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <Sparkles className="w-10 h-10 text-brand-green animate-pulse" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Matching Intelligent IA</h2>
              <p className="text-muted mb-12">Laissez notre algorithme trouver le talent parfait pour votre projet en quelques secondes.</p>

              {matchingStep < matchingQuestions.length ? (
                <div className="space-y-8">
                  <div className="text-sm font-bold uppercase tracking-widest text-brand-green">Étape {matchingStep + 1} sur {matchingQuestions.length}</div>
                  <h3 className="text-2xl font-bold">{matchingQuestions[matchingStep].q}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {matchingQuestions[matchingStep].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setMatchingStep(prev => prev + 1)}
                        className="p-6 glass border-white/10 rounded-2xl hover:border-brand-green hover:bg-white/5 transition-all text-left group"
                      >
                        <div className="font-bold mb-1 group-hover:text-brand-green transition-colors">{opt}</div>
                        <div className="text-xs text-muted">Sélectionner cette option</div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  <div className="p-8 bg-brand-green/10 rounded-3xl border border-brand-green/20">
                    <CheckCircle2 className="w-12 h-12 text-brand-green mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Analyse Terminée !</h3>
                    <p className="text-muted">Nous avons identifié 3 profils correspondant à 98% à vos critères.</p>
                  </div>
                  <button 
                    onClick={() => { setActiveTab('marketplace'); setMatchingStep(0); }}
                    className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-brand-green transition-all"
                  >
                    Voir les Profils Recommandés
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { label: "Missions Actives", value: "2", icon: <Zap className="w-5 h-5" />, color: "text-brand-green" },
                    { label: "Talents Shortlistés", value: "12", icon: <Users className="w-5 h-5" />, color: "text-brand-blue" },
                    { label: "Heures Facturées", value: "156h", icon: <Clock className="w-5 h-5" />, color: "text-brand-red" }
                  ].map((stat, i) => (
                    <div key={i} className="glass p-6 rounded-3xl">
                      <div className={cn("w-10 h-10 glass rounded-xl flex items-center justify-center mb-4", stat.color)}>{stat.icon}</div>
                      <div className="text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="text-xs text-muted uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="glass p-8 rounded-[40px]">
                  <h3 className="text-xl font-bold mb-6">Activités Récentes</h3>
                  <div className="space-y-6">
                    {[
                      { user: "Amara Diallo", action: "a soumis son rapport hebdomadaire", time: "Il y a 2h" },
                      { user: "Kofi Mensah", action: "a terminé la phase de design", time: "Il y a 5h" },
                      { user: "Système", action: "Nouveau match trouvé pour 'Projet Mobile'", time: "Hier" }
                    ].map((act, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl transition-colors">
                        <div className="w-10 h-10 rounded-full bg-white/10" />
                        <div className="flex-grow">
                          <div className="text-sm font-bold">{act.user} <span className="font-normal text-muted">{act.action}</span></div>
                          <div className="text-[10px] text-muted uppercase tracking-widest mt-1">{act.time}</div>
                        </div>
                        <button className="text-muted hover:text-white"><ArrowRight className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

                  <div className="space-y-8">
                    <div className="glass p-8 rounded-[40px]">
                      <h3 className="text-xl font-bold mb-6">Talents Favoris</h3>
                      <div className="space-y-4">
                        {displayTalents.slice(0, 3).map((t, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 glass border-white/5 rounded-xl">
                            <img src={t.image || `https://picsum.photos/seed/${t.name}/100/100`} alt="" className="w-10 h-10 rounded-lg object-cover" />
                            <div className="flex-grow min-w-0">
                              <div className="text-sm font-bold truncate">{t.name}</div>
                              <div className="text-[10px] text-muted truncate">{t.role}</div>
                            </div>
                            <button className="text-brand-green"><MessageSquare className="w-4 h-4" /></button>
                          </div>
                        ))}
                      </div>
                      <button className="w-full mt-6 py-3 glass border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-colors">Gérer la Shortlist</button>
                    </div>
                  </div>
            </motion.div>
          )}

          {activeTab === 'missions' && (
            <motion.div
              key="missions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Suivi des Missions</h3>
                <button 
                  onClick={() => setIsMissionModalOpen(true)}
                  className="px-6 py-3 bg-brand-green text-black font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Nouvelle Mission
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {[
                  { title: "Refonte E-commerce", client: "Global Shop", talent: "Amara Diallo", progress: 75, status: "En cours", deadline: "15 Avril 2026" },
                  { title: "App Mobile Fitness", client: "FitTrack SA", talent: "Kofi Mensah", progress: 30, status: "Phase Design", deadline: "30 Mai 2026" },
                  { title: "Dashboard Analytics", client: "DataFlow", talent: "Zainab Okafor", progress: 100, status: "Terminé", deadline: "10 Mars 2026" }
                ].map((mission, i) => (
                  <div key={i} className="glass p-8 rounded-[32px] border-white/5 hover:border-white/10 transition-all">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-xl font-bold">{mission.title}</h4>
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                            mission.status === "Terminé" ? "bg-brand-green/20 text-brand-green" : "bg-brand-blue/20 text-brand-blue"
                          )}>
                            {mission.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted">Client: {mission.client} • Talent: {mission.talent}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted uppercase tracking-widest mb-1">Échéance</div>
                        <div className="font-bold">{mission.deadline}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                        <span>Progression</span>
                        <span>{mission.progress}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${mission.progress}%` }}
                          className="h-full bg-brand-green" 
                        />
                      </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <button className="px-4 py-2 glass border-white/10 rounded-lg text-xs font-bold hover:bg-white/10 transition-colors">Détails de la Mission</button>
                      <button className="px-4 py-2 glass border-white/10 rounded-lg text-xs font-bold hover:bg-white/10 transition-colors">Contacter le Talent</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Developer Recruitment Section */}
        <div className="mt-32 mb-32">
          <div className="glass p-12 md:p-20 rounded-[60px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-green/5 blur-[120px] -z-10 group-hover:bg-brand-green/10 transition-all duration-700" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="inline-block px-4 py-1.5 rounded-full bg-brand-green/10 text-brand-green text-[10px] font-bold tracking-[0.2em] uppercase mb-8"
                >
                  Pour les Développeurs
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-[0.9]">
                  Rejoignez l'élite de la <span className="brand-gradient-text">Tech Africaine</span>
                </h2>
                <p className="text-lg text-muted mb-12 leading-relaxed">
                  Vous êtes un développeur passionné avec une expertise pointue ? Intégrez notre réseau exclusif, accédez à des missions internationales et propulsez votre carrière.
                </p>
                <div className="space-y-6 mb-12">
                  {[
                    "Missions haut de gamme avec des clients internationaux",
                    "Paiements sécurisés et garantis",
                    "Communauté d'experts et mentorat",
                    "Accès à des outils et formations premium"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-brand-green" />
                      </div>
                      <span className="text-sm font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
                <Link 
                  to="/join-as-developer"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold rounded-2xl hover:bg-brand-green transition-all group shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:shadow-brand-green/20"
                >
                  Postuler maintenant
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="relative">
                <div className="aspect-square glass rounded-[40px] overflow-hidden border-white/10 p-4">
                  <img 
                    src="https://picsum.photos/seed/dev-elite/800/800" 
                    alt="Developer Elite" 
                    className="w-full h-full object-cover rounded-[32px] grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="absolute -bottom-10 -left-10 glass p-8 rounded-3xl border-white/10 shadow-2xl animate-float">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-brand-green/20 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-brand-green" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">500+</div>
                      <div className="text-[10px] text-muted uppercase tracking-widest">Missions complétées</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="text-center py-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
            Prêt à transformer votre <span className="brand-gradient-text">vision en réalité</span> ?
          </h2>
          <p className="text-muted max-w-2xl mx-auto mb-12">
            Que vous soyez une entreprise à la recherche de talents ou un développeur prêt à relever de nouveaux défis, Coders 4 Afrika est votre partenaire de confiance.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button 
              onClick={() => setActiveTab('matching')}
              className="px-10 py-5 bg-brand-green text-black font-bold rounded-2xl hover:opacity-90 transition-all"
            >
              Lancer un Matching IA
            </button>
            <Link 
              to="/contact"
              className="px-10 py-5 glass border-white/10 rounded-2xl font-bold hover:bg-white/5 transition-all"
            >
              Parler à un expert
            </Link>
          </div>
        </div>

        {/* Mission Modal */}
        <AnimatePresence>
          {isMissionModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMissionModalOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="glass p-10 rounded-[40px] w-full max-w-xl relative z-10"
              >
                <button 
                  onClick={() => setIsMissionModalOpen(false)}
                  className="absolute top-6 right-6 text-muted hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
                <h3 className="text-2xl font-bold mb-8">Créer une Nouvelle Mission</h3>
                <form onSubmit={handleCreateMission} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted">Titre du Projet</label>
                    <input 
                      required
                      type="text" 
                      value={newMission.title}
                      onChange={(e) => setNewMission({...newMission, title: e.target.value})}
                      placeholder="ex: Refonte Site Web" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-green transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted">Client / Entreprise</label>
                    <input 
                      required
                      type="text" 
                      value={newMission.client}
                      onChange={(e) => setNewMission({...newMission, client: e.target.value})}
                      placeholder="ex: TechCorp" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-green transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted">Budget Estimé</label>
                    <input 
                      required
                      type="text" 
                      value={newMission.budget}
                      onChange={(e) => setNewMission({...newMission, budget: e.target.value})}
                      placeholder="ex: 5000€" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-green transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted">Description</label>
                    <textarea 
                      required
                      rows={3}
                      value={newMission.description}
                      onChange={(e) => setNewMission({...newMission, description: e.target.value})}
                      placeholder="Décrivez brièvement les objectifs..." 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-green transition-colors resize-none"
                    />
                  </div>
                  <button className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-brand-green transition-all">
                    Lancer la Mission
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Talent;
