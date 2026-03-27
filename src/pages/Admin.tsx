import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  GraduationCap, 
  Settings, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  Search,
  Filter,
  BookOpen
} from 'lucide-react';
import { db, collection, onSnapshot, query, orderBy, doc, deleteDoc, updateDoc, addDoc } from '../firebase';
import { cn } from '../lib/utils';

const Admin = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('inquiries');
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [developers, setDevelopers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.role !== 'admin') return;

    const unsubInquiries = onSnapshot(query(collection(db, 'inquiries'), orderBy('createdAt', 'desc')), (snap) => {
      setInquiries(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubApplications = onSnapshot(query(collection(db, 'applications'), orderBy('createdAt', 'desc')), (snap) => {
      setApplications(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubCourses = onSnapshot(collection(db, 'courses'), (snap) => {
      setCourses(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubDevelopers = onSnapshot(collection(db, 'developers'), (snap) => {
      setDevelopers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    setLoading(false);

    return () => {
      unsubInquiries();
      unsubApplications();
      unsubCourses();
      unsubDevelopers();
    };
  }, [profile]);

  if (profile?.role !== 'admin') {
    return (
      <div className="pt-32 px-6 text-center h-screen flex flex-col items-center justify-center">
        <XCircle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Accès Refusé</h1>
        <p className="text-muted">Vous n'avez pas les privilèges administratifs pour accéder à cette zone.</p>
      </div>
    );
  }

  const handleDelete = async (coll: string, id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
      try {
        await deleteDoc(doc(db, coll, id));
      } catch (error) {
        console.error('La suppression a échoué :', error);
      }
    }
  };

  const seedData = async () => {
    if (!window.confirm('Cela ajoutera des exemples de développeurs et de cours. Continuer ?')) return;
    
    try {
      // Seed Courses
      const sampleCourses = [
        {
          title: "Maîtrise du Full Stack",
          description: "Maîtrisez React, Node.js et l'architecture cloud moderne pour créer des applications web évolutives.",
          duration: "24 Semaines",
          level: "Intermédiaire",
          icon: "Terminal",
          color: "#00FF94"
        },
        {
          title: "Spécialisation Backend",
          description: "Plongez dans Python, Go et PostgreSQL. Apprenez la conception de systèmes et les microservices.",
          duration: "16 Semaines",
          level: "Avancé",
          icon: "BookOpen",
          color: "#007AFF"
        }
      ];

      for (const course of sampleCourses) {
        await addDoc(collection(db, 'courses'), course);
      }

      // Seed Developers
      const sampleDevelopers = [
        {
          name: "Kofi Mensah",
          role: "Ingénieur Full Stack Senior",
          location: "Accra, Ghana",
          experience: "8+ Ans",
          skills: ["React", "Node.js", "PostgreSQL", "AWS"],
          rating: 4.9,
          image: "https://picsum.photos/seed/kofi/200/200",
          isVetted: true
        },
        {
          name: "Amara Okoro",
          role: "Spécialiste Backend",
          location: "Lagos, Nigeria",
          experience: "5+ Ans",
          skills: ["Python", "Django", "Go", "Docker"],
          rating: 5.0,
          image: "https://picsum.photos/seed/amara/200/200",
          isVetted: true
        }
      ];

      for (const dev of sampleDevelopers) {
        await addDoc(collection(db, 'developers'), dev);
      }

      alert('Données d\'exemple ajoutées avec succès !');
    } catch (error) {
      console.error('L\'ajout a échoué :', error);
      alert('Échec de l\'ajout des données. Vérifiez la console.');
    }
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-display font-bold mb-2">Tableau de Bord Admin</h1>
            <p className="text-muted">Gérez les demandes, les candidatures et le contenu de la plateforme.</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={seedData}
              className="glass px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-white/5 transition-colors text-brand-green"
            >
              <Plus className="w-4 h-4" />
              Données d'Exemple
            </button>
            <button className="glass px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-white/5 transition-colors">
              <Settings className="w-4 h-4" />
              Paramètres
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass p-4 rounded-3xl space-y-2 sticky top-32">
              {[
                { id: 'inquiries', label: 'Entreprises', icon: <Briefcase className="w-4 h-4" />, count: inquiries.filter(i => i.type === 'enterprise').length },
                { id: 'learners', label: 'Apprenants', icon: <GraduationCap className="w-4 h-4" />, count: inquiries.filter(i => i.type === 'learner').length },
                { id: 'applications', label: 'Développeurs', icon: <Users className="w-4 h-4" />, count: applications.length },
                { id: 'courses', label: 'Cours', icon: <BookOpen className="w-4 h-4" />, count: courses.length },
                { id: 'developers', label: 'Marché', icon: <LayoutDashboard className="w-4 h-4" />, count: developers.length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    activeTab === tab.id ? "bg-white text-black" : "text-muted hover:text-white hover:bg-white/5"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {tab.icon}
                    {tab.label}
                  </div>
                  <span className={cn(
                    "px-2 py-0.5 rounded-md text-[10px] font-bold",
                    activeTab === tab.id ? "bg-black/10 text-black" : "bg-white/10 text-muted"
                  )}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-8 rounded-[40px] min-h-[600px]"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold capitalize">
                  {activeTab === 'inquiries' ? 'Demandes Entreprises' : 
                   activeTab === 'learners' ? 'Demandes Apprenants' :
                   activeTab === 'applications' ? 'Candidatures Développeurs' : 
                   activeTab === 'courses' ? 'Catalogue de Cours' : 
                   'Marché des Talents'}
                </h2>
                {(activeTab === 'courses' || activeTab === 'developers') && (
                  <button className="px-4 py-2 bg-brand-green text-black text-xs font-bold rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
                    <Plus className="w-4 h-4" />
                    Ajouter
                  </button>
                )}
              </div>

              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  {inquiries.filter(i => i.type === 'enterprise').length === 0 ? (
                    <div className="text-center py-20 text-muted">Aucune demande entreprise pour le moment.</div>
                  ) : (
                    inquiries.filter(i => i.type === 'enterprise').map((item) => (
                      <div key={item.id} className="glass p-6 rounded-2xl border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-lg">{item.company}</h3>
                            <p className="text-sm text-muted">{item.name} • {item.email}</p>
                          </div>
                          <button onClick={() => handleDelete('inquiries', item.id)} className="text-muted hover:text-red-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-muted mb-4 line-clamp-2">{item.needs}</p>
                        <div className="flex gap-4 text-[10px] uppercase tracking-widest font-bold text-brand-green">
                          <span>Budget: {item.budget || 'N/A'}</span>
                          <span>Échéance: {item.deadline || 'N/A'}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'learners' && (
                <div className="space-y-4">
                  {inquiries.filter(i => i.type === 'learner').length === 0 ? (
                    <div className="text-center py-20 text-muted">Aucune demande apprenant pour le moment.</div>
                  ) : (
                    inquiries.filter(i => i.type === 'learner').map((item) => (
                      <div key={item.id} className="glass p-6 rounded-2xl border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-lg">{item.name}</h3>
                            <p className="text-sm text-muted">{item.email}</p>
                          </div>
                          <button onClick={() => handleDelete('inquiries', item.id)} className="text-muted hover:text-red-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex gap-4 text-[10px] uppercase tracking-widest font-bold text-brand-green">
                          <span>Niveau: {item.level || 'N/A'}</span>
                          <span>Intérêt: {item.interest || 'N/A'}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'applications' && (
                <div className="space-y-4">
                  {applications.length === 0 ? (
                    <div className="text-center py-20 text-muted">Aucune candidature pour le moment.</div>
                  ) : (
                    applications.map((item) => (
                      <div key={item.id} className="glass p-6 rounded-2xl border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-lg">{item.name}</h3>
                            <p className="text-sm text-muted">{item.email}</p>
                          </div>
                          <button onClick={() => handleDelete('applications', item.id)} className="text-muted hover:text-red-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-[10px] uppercase tracking-widest text-muted mb-1">Stack</div>
                            <div className="text-sm">{item.stack}</div>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase tracking-widest text-muted mb-1">Expérience</div>
                            <div className="text-sm capitalize">{item.experience}</div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <a href={item.portfolio} target="_blank" rel="noreferrer" className="text-xs text-brand-blue hover:underline">Voir Portfolio</a>
                          <span className="text-[10px] uppercase tracking-widest font-bold text-brand-green">{item.availability}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'courses' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courses.map((item) => (
                    <div key={item.id} className="glass p-6 rounded-2xl border-white/5">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold">{item.title}</h3>
                        <button onClick={() => handleDelete('courses', item.id)} className="text-muted hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-muted mb-4 line-clamp-2">{item.description}</p>
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                        <span className="text-brand-green">{item.duration}</span>
                        <span className="text-brand-blue">{item.level}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'developers' && (
                <div className="space-y-4">
                  {developers.map((item) => (
                    <div key={item.id} className="glass p-4 rounded-2xl border-white/5 flex items-center gap-4">
                      <img src={item.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-grow">
                        <h3 className="font-bold text-sm">{item.name}</h3>
                        <p className="text-xs text-muted">{item.role}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-[10px] font-bold text-brand-green">{item.rating} ⭐</div>
                          <div className="text-[10px] text-muted uppercase">{item.isVetted ? 'Vérifié' : 'En attente'}</div>
                        </div>
                        <button onClick={() => handleDelete('developers', item.id)} className="text-muted hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
