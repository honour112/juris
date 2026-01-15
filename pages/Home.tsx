import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Shield, Users, Building, Send, Sparkles, FileCheck, Globe, BarChart2, Gavel, GraduationCap, MapPin, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useArticles } from '../context/ArticleContext';

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const { articles } = useArticles();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const latestEditionName = articles[0]?.edition || 'Current Issue';
  const latestEditionArticles = articles.filter(a => a.edition === latestEditionName);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* 1. INTERNAL ANIMATIONS */}
      <style>{`
        @keyframes shadow-pulse {
          0% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0.5); }
          70% { box-shadow: 0 0 0 25px rgba(234, 179, 8, 0); }
          100% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        .animate-glow-pulse {
          animation: shadow-pulse 2s infinite;
        }
        .animate-float {
          animation: float-slow 4s ease-in-out infinite;
        }
      `}</style>

      {/* Premium Hero Section */}
      <section className="relative h-screen min-h-[750px] flex items-center justify-center overflow-hidden bg-[#022c22]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-30 animate-zoom-out scale-110"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#022c22]/50 via-[#022c22]/90 to-[#022c22]"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="flex flex-col items-center">
            <div className={`mb-10 inline-flex items-center gap-3 py-2 px-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-1000 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Sparkles size={16} className="text-yellow-500 animate-pulse" />
              <span className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.4em]">{t('issnLabel')}</span>
            </div>
            
            <div className="overflow-hidden mb-10">
              <h1 className={`text-6xl md:text-9xl font-serif font-bold text-white leading-[0.95] tracking-tight transition-all duration-[1.5s] delay-300 transform ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
                {t('heroTitle').split(' ').slice(0, 2).join(' ')}<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-600">
                  {t('heroTitle').split(' ').slice(2).join(' ')}
                </span>
              </h1>
            </div>

            <p className={`text-lg md:text-2xl text-emerald-100/70 mb-14 max-w-2xl mx-auto font-light leading-relaxed transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              {t('heroSubtitle')}
            </p>

            <div className={`flex flex-col sm:flex-row gap-8 justify-center transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Link to="/articles" className="group relative bg-yellow-500 text-emerald-950 px-12 py-5 rounded-sm font-black text-xs uppercase tracking-[0.3em] transition-all duration-500 shadow-[0_20px_50px_rgba(234,179,8,0.2)] hover:-translate-y-2 overflow-hidden">
                <span className="relative z-10 flex items-center gap-3">
                  {t('heroCta')} <ArrowRight size={18} />
                </span>
              </Link>
              <Link to="/submit" className="group border-2 border-white/10 text-white px-12 py-5 rounded-sm font-black text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-emerald-950 transition-all duration-500 backdrop-blur-md">
                {t('navSubmit')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage & Values */}
      <section className="py-40 bg-white relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-20 items-center">
            <div className="md:col-span-7">
               <div className="w-24 h-1 bg-yellow-500 mb-10"></div>
               <h2 className="text-5xl md:text-7xl font-serif font-bold text-emerald-950 mb-10 leading-tight">
                 {t('aboutFirm')}
               </h2>
               <p className="text-gray-500 text-xl leading-relaxed mb-12 font-light italic border-l-4 border-yellow-500/30 pl-8">
                 "{t('aboutFirmText')}"
               </p>
               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <h4 className="font-black text-emerald-900 text-3xl">1,500+</h4>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">{t('readers')}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-black text-emerald-900 text-3xl">2004</h4>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">ESTABLISHED</p>
                  </div>
               </div>
            </div>
            <div className="md:col-span-5 relative">
               <div className="aspect-[4/5] bg-emerald-950 rounded-sm overflow-hidden shadow-2xl rotate-3 group">
                 <img src="https://i.postimg.cc/br5pw9Fn/IMG-20260114-WA0099.jpg" alt="Legacy" className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[2s]"/>
                 <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 to-transparent"></div>
                 <div className="absolute bottom-10 left-10 right-10">
                    <p className="text-white font-serif italic text-lg leading-snug">"Dedicated to the intellectual sovereignty of the African continent."</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Preferred Disciplines Section - With Icons and Explanations */}
      <section className="py-32 bg-emerald-950 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 text-[20rem] font-serif font-bold text-white leading-none select-none">RASS</div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              {language === 'en' ? 'Our Key Research Disciplines' : 'Nos Principales Disciplines de Recherche'}
            </h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { 
                fr: "Sociologie", en: "Sociology", icon: Users, 
                desc_fr: "Étude des dynamiques et structures sociales.", 
                desc_en: "Study of social dynamics and structures." 
              },
              { 
                fr: "Anthropologie", en: "Anthropology", icon: Globe, 
                desc_fr: "Analyse des cultures et de l'évolution humaine.", 
                desc_en: "Analysis of cultures and human evolution." 
              },
              { 
                fr: "Science Politique", en: "Political Science", icon: Shield, 
                desc_fr: "Examen des systèmes de pouvoir et gouvernance.", 
                desc_en: "Examination of power systems and governance." 
              },
              { 
                fr: "Économie", en: "Economics", icon: BarChart2, 
                desc_fr: "Compréhension des marchés et des ressources.", 
                desc_en: "Understanding markets and resources." 
              },
              { 
                fr: "Histoire", en: "History", icon: BookOpen, 
                desc_fr: "Reconstruction et interprétation du passé.", 
                desc_en: "Reconstruction and interpretation of the past." 
              },
              { 
                fr: "Géographie", en: "Geography", icon: MapPin, // Replaced Building with MapPin for Geography
                desc_fr: "Étude des espaces, territoires et environnements.", 
                desc_en: "Study of spaces, territories, and environments." 
              },
              { 
                fr: "Sciences de l’Éducation", en: "Education Sciences", icon: GraduationCap, 
                desc_fr: "Analyse des processus d'apprentissage et d'enseignement.", 
                desc_en: "Analysis of learning and teaching processes." 
              },
              { 
                fr: "Droit", en: "Law", icon: Gavel, // Use Gavel icon for Law
                desc_fr: "Exploration des systèmes juridiques et de la justice.", 
                desc_en: "Exploration of legal systems and justice." 
              },
              { 
                fr: "Science de la Communication", en: "Communication Science", icon: MessageSquare, 
                desc_fr: "Décryptage des flux d'information et médias.", 
                desc_en: "Deciphering information flows and media." 
              },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="group px-8 py-10 bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-yellow-500 transition-all duration-500 flex-grow basis-[calc(33%-1rem)] min-w-[280px] flex flex-col items-center justify-center text-center cursor-default hover:shadow-xl relative overflow-hidden"
              >
                {/* Animated Icon */}
                <div className="w-16 h-16 rounded-full bg-emerald-700/50 flex items-center justify-center text-yellow-300 mb-6 group-hover:bg-emerald-950 group-hover:text-yellow-500 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                  <item.icon size={28} />
                </div>

                <span className="text-yellow-500 text-[10px] font-black tracking-[.3em] uppercase mb-2 group-hover:text-emerald-950 transition-colors opacity-70">
                  DISCIPLINE {idx + 1}
                </span>
                <h4 className="text-2xl font-serif font-bold text-white group-hover:text-emerald-950 transition-colors duration-500 mb-3">
                  {language === 'en' ? item.en : item.fr}
                </h4>
                <p className="text-emerald-100/60 text-sm font-light leading-relaxed group-hover:text-emerald-950 transition-colors">
                  {language === 'en' ? item.desc_en : item.desc_fr}
                </p>
                {/* Small animated line on hover */}
                <div className="mt-6 w-0 group-hover:w-16 h-px bg-emerald-950/40 transition-all duration-500"></div>
              </div>
            ))}
            
            {/* CTA Card to invite more disciplines */}
            <div className="px-8 py-10 bg-emerald-900/40 border border-emerald-500/20 flex-grow basis-[calc(33%-1rem)] min-w-[280px] flex flex-col items-center justify-center text-center italic">
              <p className="text-emerald-100/40 text-sm">
                {language === 'en' 
                  ? "& other Social Science branches, you may suggest yours upon submission." 
                  : "& autres branches des Sciences Sociales, vous pouvez suggérer la vôtre lors de la soumission."}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Latest Edition Section */}
      <section className="py-40 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-4 text-yellow-600 font-black uppercase tracking-[0.4em] text-[10px] mb-6">
                 <div className="w-12 h-px bg-yellow-600"></div>
                 {latestEditionName} EDITION
              </span>
              <h2 className="text-6xl md:text-8xl font-serif font-bold text-emerald-950 tracking-tight">{t('latestArticles')}</h2>
            </div>
            <Link to="/articles" className="group flex items-center gap-6 text-emerald-900 hover:text-yellow-600 transition-all font-black text-[11px] tracking-[0.3em] uppercase">
              {t('viewAll')} 
              <div className="w-14 h-14 rounded-full border border-emerald-900/20 flex items-center justify-center group-hover:bg-yellow-500 group-hover:border-yellow-500 group-hover:text-emerald-950 transition-all duration-500">
                <ArrowRight size={20} />
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {latestEditionArticles.length > 0 && (
              <div className="lg:col-span-8 group relative animate-fade-in-up">
                <Link to="/articles" className="block">
                  <article className="bg-white shadow-xl hover:shadow-2xl transition-all duration-700 rounded-sm overflow-hidden flex flex-col md:flex-row">
                    <div className="md:w-1/2 overflow-hidden relative">
                      <img src={latestEditionArticles[0].imageUrl} alt={latestEditionArticles[0].title[language]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
                    </div>
                    <div className="md:w-1/2 p-12 flex flex-col justify-center">
                      <div className="text-[10px] font-black uppercase text-yellow-600 mb-6 bg-yellow-50 px-3 py-1 self-start">{latestEditionArticles[0].category}</div>
                      <h3 className="text-3xl font-serif font-bold text-emerald-950 mb-8 leading-tight">{latestEditionArticles[0].title[language]}</h3>
                      <div className="mt-auto flex items-center justify-between">
                         <div className="flex items-center gap-2 text-emerald-950 font-black text-[10px] tracking-widest uppercase border-b-2 border-yellow-500 pb-1">
                           {t('readFull')} <ArrowRight size={14} />
                         </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            )}
            <div className="lg:col-span-4 flex flex-col gap-10">
               {latestEditionArticles.slice(1, 4).map((article) => (
                  <Link key={article.id} to="/articles" className="group animate-fade-in-up">
                    <article className="bg-white p-10 shadow-sm border border-gray-100 hover:border-yellow-200 transition-all">
                       <h3 className="text-xl font-serif font-bold text-emerald-950 mb-4 group-hover:text-yellow-600 transition-colors">{article.title[language]}</h3>
                       <span className="text-[9px] font-black uppercase tracking-widest text-emerald-800">{t('read')}</span>
                    </article>
                  </Link>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE STANDOUT SUBMISSION PORTAL (REPLACES NEWSLETTER) */}
      <section className="relative py-40 bg-[#011a14] overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-emerald-900/20 border border-white/5 rounded-3xl p-12 md:p-24 text-center">
            <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-yellow-500 text-emerald-950 mb-12 animate-glow-pulse shadow-2xl relative">
              <div className="absolute inset-0 rounded-full border-4 border-yellow-500/30 animate-ping"></div>
              <Send size={44} className="animate-float" />
            </div>

            <h2 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 tracking-tighter">
              {language === 'en' ? 'Shape the Future of' : 'Façonnez l\'Avenir de'} <br/>
              <span className="text-yellow-500 italic">
                {language === 'en' ? 'African Research' : 'la Recherche Africaine'}
              </span>
            </h2>

            <p className="text-emerald-100/60 text-xl md:text-2xl font-light mb-16 max-w-3xl mx-auto leading-relaxed">
              {language === 'en' 
                ? 'Submit your original manuscript to the RASS Volume 1, Number 1. Join a community committed to academic sovereignty.' 
                : 'Soumettez votre manuscrit original au Volume 1, Numéro 1 de la RASS. Rejoignez une communauté engagée pour la souveraineté académique.'}
            </p>

            <div className="flex flex-col items-center gap-8">
              <Link 
                to="/submit" 
                className="group relative inline-flex items-center gap-6 bg-yellow-500 text-emerald-950 px-16 py-8 rounded-full font-black text-sm uppercase tracking-[0.4em] transition-all duration-500 hover:scale-110 hover:bg-white shadow-[0_30px_60px_rgba(234,179,8,0.2)]"
              >
                <span className="relative z-10 flex items-center gap-4 font-bold">
                  {language === 'en' ? 'START SUBMISSION PORTAL' : 'OUVRIR LE PORTAIL DE SOUMISSION'}
                  <ArrowRight size={22} className="group-hover:translate-x-3 transition-transform duration-500" />
                </span>
              </Link>

              <div className="flex flex-wrap justify-center gap-12 mt-8 opacity-60">
                <div className="flex items-center gap-3">
                  <FileCheck size={20} className="text-yellow-500" />
                  <span className="text-white text-xs font-bold tracking-widest uppercase">Max 30 Pages</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={20} className="text-yellow-500" />
                  <span className="text-white text-xs font-bold tracking-widest uppercase">Bilingual (FR/EN)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;