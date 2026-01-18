import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Eye, BookOpen, Mail, Phone, MapPin, MessageCircle, Download } from 'lucide-react';
import { supabase } from '../src/supabaseClient'; // Ensure this path is correct

const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const [stats, setStats] = useState({
    views: 0,
    downloads: 0,
    articles: 0
  });

  const LOGO_URL = "https://i.postimg.cc/br5pw9Fn/IMG-20260114-WA0099.jpg"
  useEffect(() => {
    const fetchLiveStats = async () => {
      try {
        // 1. Fetch Published Articles Count
        const { count: articleCount } = await supabase
          .from('articles')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'published');

        // 2. Fetch Global Stats (Assuming you have a 'site_settings' or 'stats' table)
        // If you don't have a table yet, this will fallback to your local values
        const { data: globalStats } = await supabase
          .from('site_stats')
          .select('views, downloads')
          .single();

        setStats({
          articles: articleCount || 0,
          views: globalStats?.views || 1280, // Default fallback
          downloads: globalStats?.downloads || 450 // Default fallback
        });

        // 3. Increment Page View (Simple logic)
        await supabase.rpc('increment_view_count'); // Requires a simple SQL function in Supabase
      } catch (err) {
        console.error("Error fetching footer stats:", err);
      }
    };

    fetchLiveStats();
  }, []);

  return (
    <footer className="bg-emerald-950 text-gray-400 py-20 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-20">
          
          {/* Brand & Stats Column */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <img src={LOGO_URL} alt="Footer Logo" className="w-16 h-16 object-contain" />
              <div className="flex flex-col">
                <h2 className="text-2xl font-serif font-bold text-white tracking-widest leading-none">
                  RASS<span className="text-yellow-500">JOURNAL</span>
                </h2>
                <span className="text-[10px] text-emerald-500 font-black tracking-[0.3em] uppercase mt-1">Academic Excellence</span>
              </div>
            </div>
            
            <p className="max-w-sm text-sm leading-relaxed mb-10 text-emerald-100/50 font-light italic">
              "{t('heroSubtitle')}"
            </p>

            {/* LIVE STATS BAR */}
            <div className="flex flex-wrap gap-10 mt-6 border-l border-yellow-500/30 pl-8">
              {/* VISITS */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-white font-serif font-bold text-2xl">
                  <Eye size={18} className="text-yellow-500" />
                  {stats.views.toLocaleString()}
                </div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-600 font-black mt-1">
                  {language === 'en' ? 'Reader Visits' : 'Visiteurs'}
                </span>
              </div>

              {/* DOWNLOADS */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-white font-serif font-bold text-2xl">
                  <Download size={18} className="text-yellow-500" />
                  {stats.downloads.toLocaleString()}
                </div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-600 font-black mt-1">
                  {language === 'en' ? 'Downloads' : 'Téléchargements'}
                </span>
              </div>

              {/* ARTICLES */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-white font-serif font-bold text-2xl">
                  <BookOpen size={18} className="text-yellow-500" />
                  {stats.articles}
                </div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-600 font-black mt-1">
                  {language === 'en' ? 'Articles' : 'Articles'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Contact Columns ... (Douala & Ngaoundéré kept the same) */}
          <div>
            <h3 className="text-yellow-500 font-serif mb-6 font-bold text-lg border-b border-white/5 pb-2 inline-block">
               {language === 'en' ? 'Douala HQ' : 'Siège Douala'}
            </h3>
            <ul className="space-y-4 text-sm font-light text-emerald-100/70">
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-yellow-500/50" />
                (+237) 699 00 00 00
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-yellow-500/50 mt-1" />
                <span>Boulevard de la Liberté, Akwa<br/>Douala, Cameroon</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-yellow-500 font-serif mb-6 font-bold text-lg border-b border-white/5 pb-2 inline-block">
              {language === 'en' ? 'Contact Us' : 'Contactez-nous'}
            </h3>
            <ul className="space-y-4 text-sm font-light text-emerald-100/70">
              <li className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail size={14} className="text-yellow-500/50" />
                <a href="mailto:revueafricainedessciencessocia@gmail.com" className="break-all">revueafricainedessciencessocia@gmail.com</a>
              </li>
              <li className="flex items-center gap-3 hover:text-green-400 transition-colors">
                <MessageCircle size={14} className="text-green-500" />
                <a href="https://wa.me/237696479828" target="_blank" rel="noopener noreferrer">
                  +237 696 47 98 28
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright Bar */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-800">
            &copy; {new Date().getFullYear()} Revue Africaine des Sciences Sociales.
          </div>
        </div>   
      </div>
    </footer>
  );
};

export default Footer;