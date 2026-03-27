import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Briefcase, GraduationCap, Settings, LogOut } from 'lucide-react';
import { auth, signOut } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  if (loading) return <div className="pt-32 text-center">Chargement...</div>;
  if (!user) return <div className="pt-32 text-center">Veuillez vous connecter pour voir votre profil.</div>;

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass p-8 rounded-3xl text-center">
              <div className="relative inline-block mb-4">
                <img 
                  src={profile?.photoURL || "https://picsum.photos/seed/user/200/200"} 
                  alt="Profil" 
                  className="w-24 h-24 rounded-full border-2 border-brand-green p-1"
                />
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-brand-green rounded-full border-4 border-black flex items-center justify-center">
                  <div className="w-2 h-2 bg-black rounded-full" />
                </div>
              </div>
              <h2 className="text-xl font-bold">{profile?.displayName || 'Utilisateur'}</h2>
              <p className="text-sm text-muted mb-6 uppercase tracking-widest">{profile?.role || 'Apprenant'}</p>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3 glass rounded-xl text-sm font-bold text-red-400 hover:bg-red-400/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </div>

            <div className="glass p-4 rounded-3xl space-y-2">
              {[
                { id: 'overview', label: 'Aperçu', icon: <User className="w-4 h-4" /> },
                { id: 'applications', label: 'Candidatures', icon: <Briefcase className="w-4 h-4" /> },
                { id: 'courses', label: 'Mes Cours', icon: <GraduationCap className="w-4 h-4" /> },
                { id: 'settings', label: 'Paramètres', icon: <Settings className="w-4 h-4" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    activeTab === tab.id ? "bg-white text-black" : "text-muted hover:text-white hover:bg-white/5"
                  )}
                >
                  {tab.icon}
                  {tab.label}
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
              className="glass p-10 rounded-[40px] min-h-[600px]"
            >
              {activeTab === 'overview' && (
                <div className="space-y-10">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Aperçu du Profil</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="glass p-6 rounded-2xl border-white/5">
                        <div className="text-xs font-bold text-muted uppercase tracking-widest mb-2">Adresse Email</div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-brand-green" />
                          <span>{profile?.email}</span>
                        </div>
                      </div>
                      <div className="glass p-6 rounded-2xl border-white/5">
                        <div className="text-xs font-bold text-muted uppercase tracking-widest mb-2">Statut du Compte</div>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-brand-blue" />
                          <span className="text-brand-blue">Membre Vérifié</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold mb-4">Activité Récente</h4>
                    <div className="space-y-4">
                      {[1, 2].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 glass rounded-xl border-white/5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-brand-green/10 rounded-lg flex items-center justify-center">
                              <GraduationCap className="w-5 h-5 text-brand-green" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Inscrit à Full Stack Mastery</p>
                              <p className="text-xs text-muted">Il y a 2 jours</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Actif</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab !== 'overview' && (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <div className="w-20 h-20 glass rounded-3xl flex items-center justify-center mb-6">
                    <Settings className="w-10 h-10 text-muted animate-spin-slow" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Bientôt Disponible</h3>
                  <p className="text-muted max-w-xs">Nous travaillons dur pour apporter cette fonctionnalité à votre tableau de bord. Restez à l'écoute !</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper for cn in this file
const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default Profile;
