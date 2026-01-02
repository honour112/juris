import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const ArticleHero: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="relative pt-44 pb-32 bg-[#022c22] overflow-hidden">
      {/* 1. CINEMATIC BACKGROUND */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
          alt="Scholarly Background" 
          className="w-full h-full object-cover opacity-40 scale-105"
          style={{ animation: 'slow-zoom 20s infinite alternate' }}
        />
        
        {/* Deep Radial Vignette - Replaces the white overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#022c22_85%)]"></div>
        
        {/* Solid bottom fade to deep emerald/black instead of white */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#022c22]/50 to-[#022c22]"></div>

        {/* Subtle grid pattern for technical texture */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
      </div>

      {/* 2. CONTENT */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          {/* Label with Gold Glow */}
          <div className="flex items-center gap-3 text-yellow-500 mb-8">
            <div className="w-16 h-[1px] bg-yellow-500 shadow-[0_0_12px_rgba(234,179,8,0.5)]"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] drop-shadow-md">
              {language === 'en' ? 'Research Archive' : 'Archives de Recherche'}
            </span>
          </div>

          {/* Heading with tight tracking */}
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-10 leading-[0.9] tracking-tighter">
            {language === 'en' ? 'Scholarly' : 'Publications'} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700">
              {language === 'en' ? 'Publications' : 'Académiques'}
            </span>
          </h1>

          {/* Intro with a transparent glass border */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/20"></div>
            <p className="text-emerald-50/60 text-xl md:text-2xl font-light leading-relaxed pl-10 max-w-2xl italic">
              {language === 'en' 
                ? 'A curated collection of peer-reviewed research and social science studies dedicated to the African continent.' 
                : 'Une collection rigoureuse de recherches évaluées par des pairs et d\'études en sciences sociales dédiées au continent africain.'}
            </p>
          </div>
        </div>
      </div>

      {/* 3. THE "BOTTOM CUT" - Creates a clean break between Hero and Grid */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#f8fafb] to-transparent opacity-100"></div>

      <style>{`
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `}</style>
    </section>
  );
};

export default ArticleHero;