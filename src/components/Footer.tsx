import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Twitter, Linkedin, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center gap-3 mb-6">
            <div className="flex items-center">
              <span className="text-xl font-display font-bold tracking-tight text-[#00A651] flex items-center">
                C<span className="inline-flex items-center justify-center translate-y-[1px] mx-[-1.5px]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                    <circle cx="12" cy="13" r="8" fill="#00A651"/>
                    <rect x="11.5" y="2" width="1" height="3" fill="#00A651"/>
                    <circle cx="12" cy="2" r="1.5" fill="#00A651"/>
                    <circle cx="9" cy="13" r="1.5" fill="white"/>
                    <path d="M14 13L16 13" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </span>ders
              </span>
              <div className="relative mx-1 w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full fill-current text-brand-blue opacity-20 absolute">
                  <path d="M100,20 C120,20 140,30 150,50 C160,70 160,90 150,110 C140,130 120,140 100,140 C80,140 60,130 50,110 C40,90 40,70 50,50 C60,30 80,20 100,20 Z" />
                </svg>
                <span className="relative z-10 text-sm font-bold text-white">4</span>
              </div>
              <span className="text-xl font-display font-bold tracking-tight text-[#ED1C24]">
                Afrika
              </span>
            </div>
          </Link>
          <p className="text-muted text-sm leading-relaxed mb-6">
            Libérer le potentiel technologique africain pour l'innovation mondiale. Nous comblons le fossé entre les développeurs de classe mondiale et les entreprises visionnaires.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-muted hover:text-brand-green transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-muted hover:text-brand-green transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="text-muted hover:text-brand-green transition-colors"><Github className="w-5 h-5" /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Navigation</h4>
          <ul className="space-y-4">
            <li><Link to="/" className="text-muted text-sm hover:text-brand-green transition-colors">Accueil</Link></li>
            <li><Link to="/talent" className="text-muted text-sm hover:text-brand-green transition-colors">Talents</Link></li>
            <li><Link to="/training" className="text-muted text-sm hover:text-brand-green transition-colors">Formation</Link></li>
            <li><Link to="/find-talent" className="text-muted text-sm hover:text-brand-green transition-colors">Recruter des développeurs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Ressources</h4>
          <ul className="space-y-4">
            <li><a href="#" className="text-muted text-sm hover:text-brand-green transition-colors">FAQ</a></li>
            <li><a href="#" className="text-muted text-sm hover:text-brand-green transition-colors">Contact</a></li>
            <li><a href="#" className="text-muted text-sm hover:text-brand-green transition-colors">Preuves Sociales</a></li>
            <li><a href="#" className="text-muted text-sm hover:text-brand-green transition-colors">Blog</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Newsletter</h4>
          <p className="text-muted text-sm mb-4">Recevez les dernières mises à jour sur les talents tech africains.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="vous@email.com" 
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-brand-green transition-colors"
            />
            <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-green transition-colors">
              Rejoindre
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-4">
        <p className="text-muted text-xs">
          © 2026 Coders 4 Afrika. Tous droits réservés.
        </p>
        <div className="flex gap-8">
          <a href="#" className="text-muted text-xs hover:text-white transition-colors">Politique de confidentialité</a>
          <a href="#" className="text-muted text-xs hover:text-white transition-colors">Conditions d'utilisation</a>
          <a href="#" className="text-muted text-xs hover:text-white transition-colors">Politique de cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
