import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Problem from '../components/Problem';
import Solution from '../components/Solution';
import { motion } from 'motion/react';
import { Quote, Star, ArrowRight, CheckCircle2, Users, Zap, Target, Rocket } from 'lucide-react';
import { cn } from '../lib/utils';

const Home = () => {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />

      {/* Process Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
              Notre <span className="brand-gradient-text">Processus</span>
            </h2>
            <p className="text-muted max-w-2xl mx-auto">Un chemin clair vers l'excellence technologique et le succès professionnel.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Acquisition", desc: "Identification des talents prometteurs à travers le continent." },
              { step: "02", title: "Formation", desc: "Programmes intensifs alignés sur les standards mondiaux." },
              { step: "03", title: "Évaluation", desc: "Tests rigoureux de compétences techniques et relationnelles." },
              { step: "04", title: "Placement", desc: "Connexion directe avec des entreprises internationales." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass p-8 rounded-3xl relative group"
              >
                <div className="text-5xl font-display font-bold text-brand-green/10 mb-6 group-hover:text-brand-green/20 transition-colors">{item.step}</div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Talents Showcase Section */}
      <section className="py-32 px-6 bg-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                Découvrez nos <br />
                <span className="brand-gradient-text">Talents d'Élite</span>
              </h2>
              <p className="text-muted text-lg">Des ingénieurs passionnés, formés et prêts à transformer vos idées en réalité.</p>
            </div>
            <Link to="/talent" className="px-8 py-4 glass rounded-xl hover:bg-white/10 transition-all flex items-center gap-2 group">
              Voir tous les talents
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Amara Diallo", role: "Fullstack Developer", stack: "React, Node.js, AWS", img: "https://picsum.photos/seed/talent1/400/400" },
              { name: "Kofi Mensah", role: "AI Engineer", stack: "Python, TensorFlow, PyTorch", img: "https://picsum.photos/seed/talent2/400/400" },
              { name: "Zainab Okafor", role: "Cloud Architect", stack: "Docker, Kubernetes, GCP", img: "https://picsum.photos/seed/talent3/400/400" }
            ].map((talent, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass rounded-3xl overflow-hidden group"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img src={talent.img} alt={talent.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <h4 className="text-xl font-bold">{talent.name}</h4>
                    <p className="text-brand-green text-sm font-medium">{talent.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {talent.stack.split(', ').map((s, j) => (
                      <span key={j} className="text-[10px] uppercase tracking-widest px-2 py-1 glass rounded-md text-muted">{s}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Recruitment Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
              Rejoignez le <span className="brand-gradient-text">Réseau d'Élite</span>
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-12">
              Vous êtes un développeur talentueux en Afrique ? Nous vous aidons à passer au niveau supérieur et à accéder à des opportunités que vous ne trouverez nulle part ailleurs.
            </p>
            <div className="space-y-6 mb-12">
              {[
                { icon: <Zap className="w-5 h-5" />, text: "Accès à des missions internationales haut de gamme" },
                { icon: <Target className="w-5 h-5" />, text: "Mentorat par des experts de la Silicon Valley" },
                { icon: <Rocket className="w-5 h-5" />, text: "Communauté exclusive de développeurs seniors" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 glass rounded-lg flex items-center justify-center text-brand-green">{item.icon}</div>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
            <Link to="/join-as-developer" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-brand-green transition-all group">
              Postuler en tant que Développeur
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="glass aspect-square rounded-[40px] overflow-hidden relative">
              <img src="https://picsum.photos/seed/dev/800/800" alt="Developer" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-brand-green/10 mix-blend-overlay" />
            </div>
            <div className="absolute -bottom-10 -left-10 glass p-8 rounded-3xl max-w-[240px] animate-bounce-slow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-brand-green rounded-full animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest">Live Matching</span>
              </div>
              <p className="text-sm font-medium">Nouveau développeur placé chez TechFlow Global !</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-32 px-6 bg-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
              Nos <span className="brand-gradient-text">Offres</span>
            </h2>
            <p className="text-muted max-w-2xl mx-auto">Des solutions adaptées à chaque besoin, de l'apprentissage individuel à la croissance d'entreprise.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Apprenant", 
                price: "À partir de 0€", 
                desc: "Pour ceux qui veulent lancer leur carrière tech.",
                features: ["Accès aux cours de base", "Communauté Discord", "Webinaires mensuels", "Certificat de base"],
                cta: "S'inscrire",
                link: "/join-as-learner"
              },
              { 
                title: "Talent Pro", 
                price: "Commission %", 
                desc: "Pour les développeurs cherchant des missions.",
                features: ["Placement garanti", "Mentorat senior", "Gestion de contrat", "Paiement sécurisé"],
                cta: "Postuler",
                link: "/join-as-developer",
                highlight: true
              },
              { 
                title: "Entreprise", 
                price: "Sur mesure", 
                desc: "Pour les entreprises cherchant l'élite.",
                features: ["Matching intelligent", "Évaluation technique", "Support RH complet", "Garantie de remplacement"],
                cta: "Nous contacter",
                link: "/find-talent"
              }
            ].map((offer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={cn(
                  "glass p-10 rounded-[40px] flex flex-col relative overflow-hidden",
                  offer.highlight && "border-brand-green/50 ring-1 ring-brand-green/20"
                )}
              >
                {offer.highlight && <div className="absolute top-0 right-0 bg-brand-green text-black text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-bl-xl">Populaire</div>}
                <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                <div className="text-3xl font-display font-bold mb-4 text-brand-green">{offer.price}</div>
                <p className="text-muted text-sm mb-8">{offer.desc}</p>
                <div className="space-y-4 mb-10 flex-grow">
                  {offer.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <Link 
                  to={offer.link} 
                  className={cn(
                    "w-full py-4 text-center font-bold rounded-xl transition-all",
                    offer.highlight ? "bg-brand-green text-black hover:bg-brand-green/90" : "bg-white/5 hover:bg-white/10"
                  )}
                >
                  {offer.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
            Approuvé par les <span className="brand-gradient-text">Leaders Mondiaux</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass p-10 rounded-3xl relative"
            >
              <Quote className="w-10 h-10 text-brand-green/20 absolute top-8 left-8" />
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 text-brand-green fill-brand-green" />
                ))}
              </div>
              <p className="text-lg text-muted italic mb-8 relative z-10">
                "Coders 4 Afrika a complètement transformé notre équipe d'ingénierie. La qualité des talents que nous avons recrutés est exceptionnelle, et leur intégration culturelle a été parfaite."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10" />
                <div>
                  <h4 className="font-bold">Sarah Jenkins</h4>
                  <p className="text-xs text-muted uppercase tracking-wider">CTO, TechFlow Global</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 relative overflow-hidden bg-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Questions <span className="brand-gradient-text">Fréquemment Posées</span></h2>
            <p className="text-muted">Tout ce que vous devez savoir sur Coders 4 Afrika.</p>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "Comment évaluez-vous vos développeurs ?", a: "Notre processus d'évaluation comprend des tests techniques, des entretiens de codage en direct et des évaluations de compétences relationnelles menés par des experts de l'industrie." },
              { q: "Quel est le délai typique d'intégration ?", a: "La plupart des entreprises peuvent recruter et intégrer un développeur dans les 2 à 3 semaines suivant leur demande initiale." },
              { q: "Proposez-vous des formations pour les débutants ?", a: "Oui, nous avons des parcours allant du niveau débutant au niveau avancé, tous axés sur les compétences prêtes pour l'industrie." },
              { q: "Combien coûte le recrutement d'un talent ?", a: "Les tarifs varient en fonction du niveau d'expérience et de la portée du projet. Contactez-nous pour un devis personnalisé." }
            ].map((faq, i) => (
              <details key={i} className="glass rounded-2xl group overflow-hidden border-white/5">
                <summary className="p-6 cursor-pointer flex items-center justify-between font-bold list-none">
                  {faq.q}
                  <span className="text-brand-green group-open:rotate-180 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 text-muted leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-5xl mx-auto glass p-16 md:p-24 rounded-[40px] text-center relative overflow-hidden">
          <div className="glow w-[400px] h-[400px] bg-brand-green top-[-200px] left-[-200px] opacity-10" />
          <div className="glow w-[400px] h-[400px] bg-brand-blue bottom-[-200px] right-[-200px] opacity-10" />
          
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
            Prêt à Construire le <br />
            <span className="brand-gradient-text">Futur Ensemble ?</span>
          </h2>
          <p className="text-lg text-muted max-w-xl mx-auto mb-12">
            Que vous recherchiez des talents de premier plan ou que vous aspiriez à le devenir, Coders 4 Afrika est votre partenaire de croissance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/find-talent" className="w-full sm:w-auto px-10 py-5 bg-white text-black font-bold rounded-2xl hover:bg-brand-green transition-all">
              Recruter des Talents Tech
            </Link>
            <Link to="/join-as-developer" className="w-full sm:w-auto px-10 py-5 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-all">
              Rejoindre en tant que Développeur
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
