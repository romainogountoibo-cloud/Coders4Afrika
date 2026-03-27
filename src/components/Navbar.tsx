import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, User, Globe } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { signInWithPopup, googleProvider, signOut, auth } from '../firebase';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, profile } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Talents', path: '/talent' },
    { name: 'Formation', path: '/training' },
  ];

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Échec de la connexion:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Échec de la déconnexion:', error);
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent px-6 py-4',
        scrolled ? 'glass border-white/10 py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex items-center">
            <span className="text-2xl font-display font-bold tracking-tight text-[#00A651] flex items-center">
              C<span className="inline-flex items-center justify-center translate-y-[2px] mx-[-2px]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                  <circle cx="12" cy="13" r="8" fill="#00A651"/>
                  <rect x="11.5" y="2" width="1" height="3" fill="#00A651"/>
                  <circle cx="12" cy="2" r="1.5" fill="#00A651"/>
                  <circle cx="9" cy="13" r="1.5" fill="white"/>
                  <path d="M14 13L16 13" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </span>ders
            </span>
            <div className="relative mx-1 w-10 h-10 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-full h-full fill-current text-brand-blue opacity-20 absolute">
                <path d="M100,20 C120,20 140,30 150,50 C160,70 160,90 150,110 C140,130 120,140 100,140 C80,140 60,130 50,110 C40,90 40,70 50,50 C60,30 80,20 100,20 Z" />
              </svg>
              <span className="relative z-10 text-xl font-bold text-white">4</span>
            </div>
            <span className="text-2xl font-display font-bold tracking-tight text-[#ED1C24]">
              Afrika
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-brand-green',
                location.pathname === link.path ? 'text-brand-green' : 'text-muted'
              )}
            >
              {link.name}
            </Link>
          ))}
          
          {user ? (
            <div className="flex items-center gap-4">
              {profile?.role === 'admin' && (
                <Link to="/admin" className="text-sm font-medium text-brand-blue hover:text-white transition-colors">
                  Admin
                </Link>
              )}
              <Link to="/profile" className="flex items-center gap-2 text-sm font-medium text-muted hover:text-white transition-colors">
                {profile?.photoURL ? (
                  <img src={profile.photoURL} alt="Profil" className="w-8 h-8 rounded-full border border-white/10" />
                ) : (
                  <User className="w-5 h-5" />
                )}
                <span>Profil</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="text-sm font-medium text-muted hover:text-white transition-colors"
              >
                Déconnexion
              </button>
              <Link
                to="/find-talent"
                className="px-5 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-brand-green transition-colors"
              >
                Trouver un Talent
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button 
                onClick={handleLogin}
                className="text-sm font-medium text-muted hover:text-white transition-colors"
              >
                Connexion
              </button>
              <Link
                to="/find-talent"
                className="px-5 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-brand-green transition-colors"
              >
                Trouver un Talent
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-muted hover:text-brand-green"
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-white/5" />
            {user ? (
              <>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="text-lg font-medium text-muted">Profil</Link>
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-left text-lg font-medium text-muted">Déconnexion</button>
              </>
            ) : (
              <button onClick={() => { handleLogin(); setIsOpen(false); }} className="text-left text-lg font-medium text-muted">Connexion</button>
            )}
            <Link
              to="/find-talent"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 bg-white text-black text-center font-bold rounded-xl"
            >
              Trouver un Talent
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
