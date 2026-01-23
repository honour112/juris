import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Eye, BookOpen, Mail, MessageCircle, Download, ShieldCheck, Globe, GraduationCap } from 'lucide-react';
import { supabase } from '../src/supabaseClient';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const [stats, setStats] = useState({ views: 0, downloads: 0, articles: 0 });

  const LOGO_URL = "https://i.postimg.cc/br5pw9Fn/IMG-20260114-WA0099.jpg"

  useEffect(() => {
    const updateAndViewStats = async () => {
      try {
        // 1. Increment View Count in Database
        // This uses a Supabase RPC or a simple update to add +1 to the current view count
        const { data: currentStats } = await supabase
          .from('site_stats')
          .select('views')
          .eq('page_path', '/')
          .maybeSingle();

        if (currentStats) {
          await supabase
            .from('site_stats')
            .update({ views: (currentStats.views || 0) + 1 })
            .eq('page_path', '/');
        }

        // 2. Fetch Article Count
        const { count: articleCount } = await supabase
          .from('articles')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'published');

        // 3. Fetch Final Stats to Display
        const { data: globalStats } = await supabase
          .from('site_stats')
          .select('views, downloads')
          .eq('page_path', '/')
          .maybeSingle();

        setStats({
          articles: articleCount || 0,
          views: globalStats?.views || 1280,
          downloads: globalStats?.downloads || 450
        });
      } catch (err) {
        console.error("Error with footer stats/counter:", err);
      }
    };

    updateAndViewStats();
  }, []);

  return (
    <footer className="bg-emerald-950 text-gray-400 py-20 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-20">
          
          {/* Brand & Stats Column */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <img src={LOGO_URL} alt="RASS Logo" className="w-16 h-16 object-contain" />
              <div className="flex flex-col">
                <h2 className="text-2xl font-serif font-bold text-white tracking-widest leading-none">
                  RASS<span className="text-yellow-500">JOURNAL</span>
                </h2>
                <span className="text-[10px] text-emerald-500 font-black tracking-[0.3em] uppercase mt-1">
                  {language === 'en' ? 'African Journal of Social Sciences' : 'Revue Africaine des Sciences Sociales'}
                </span>
              </div>
            </div>
            
            <p className="max-w-md text-sm leading-relaxed mb-10 text-emerald-100/60 font-light">
              {language === 'en' 
                ? "The premier bilingual platform for Social Science research, Law reviews, and Academic publications in Cameroon and across Africa."
                : "La plateforme bilingue de référence pour la recherche en Sciences Sociales, les revues de Droit et les publications académiques au Cameroun."}
            </p>

            <div className="flex flex-wrap gap-10 mt-6 border-l border-yellow-500/30 pl-8">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-white font-serif font-bold text-2xl">
                  <Eye size={18} className="text-yellow-500" />
                  {stats.views.toLocaleString()}
                </div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-600 font-black mt-1">
                  {language === 'en' ? 'Reader Visits' : 'Visites Lecteurs'}
                </span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-white font-serif font-bold text-2xl">
                  <Download size={18} className="text-yellow-500" />
                  {stats.downloads.toLocaleString()}
                </div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-600 font-black mt-1">
                  Downloads
                </span>
              </div>
            </div>
          </div>
          
          {/* Research Areas */}
          <div>
            <h3 className="text-yellow-500 font-serif mb-6 font-bold text-lg border-b border-white/5 pb-2 inline-block">
                {language === 'en' ? 'Research Areas' : 'Domaines de Recherche'}
            </h3>
            <ul className="space-y-3 text-xs font-bold uppercase tracking-tighter text-emerald-100/50">
              <li className="flex items-center gap-2"><ShieldCheck size={12} className="text-emerald-700"/> Law & Jurisprudence</li>
              <li className="flex items-center gap-2"><Globe size={12} className="text-emerald-700"/> Social Sciences</li>
              <li className="flex items-center gap-2"><GraduationCap size={12} className="text-emerald-700"/> African Studies</li>
              <li className="flex items-center gap-2"><BookOpen size={12} className="text-emerald-700"/> Academic Reviews</li>
            </ul>
          </div>
          
          {/* Contact Section */}
          <div>
            <h3 className="text-yellow-500 font-serif mb-6 font-bold text-lg border-b border-white/5 pb-2 inline-block">
              Digital Office
            </h3>
            <ul className="space-y-4 text-sm font-light text-emerald-100/70">
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail size={14} className="text-yellow-500/50" />
                <a href="mailto:revueafricainedessciencessocia@gmail.com" className="break-all">Email Us</a>
              </li>
              <li className="flex items-center gap-3 hover:text-green-400 transition-colors">
                <MessageCircle size={14} className="text-green-500" />
                <a href="https://wa.me/237696479828" target="_blank" rel="noopener noreferrer">WhatsApp Support</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright Bar */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-800 text-center md:text-left">
            &copy; {new Date().getFullYear()} RASS | Revue Africaine des Sciences Sociales et Droit.
          </div>
          <div className="flex gap-4 text-[9px] uppercase tracking-widest font-bold text-emerald-900">
            <span>Cameroon</span>
            <span>•</span>
            <span>Africa</span>
          </div>
        </div>   
      </div>
    </footer>
  );
};

export default Footer;