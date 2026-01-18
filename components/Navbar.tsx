import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, PenTool, ArrowRight as ArrowRightIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  const LOGO_URL = "https://i.postimg.cc/br5pw9Fn/IMG-20260114-WA0099.jpg";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: t('navHome') },
    { path: '/articles', label: t('navArticles') },
    { path: '/profile', label: t('navProfile') },
    // { path: '/admin', label: t('navAdmin') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Main Navbar - Hidden when menu is open */}
      <nav className={`fixed w-full z-[60] transition-all duration-700 ease-in-out ${
        isOpen ? 'opacity-0 pointer-events-none -translate-y-4' : 'opacity-100'
      } ${
        scrolled 
          ? 'bg-emerald-950/95 backdrop-blur-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] py-3' 
          : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="group flex items-center gap-3 animate-slide-in-left">
              <div className="relative w-14 h-14 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                <img 
                  src={LOGO_URL} 
                  alt="RASS Logo" 
                  className="w-full h-full object-contain filter drop-shadow-2xl"
                />
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="text-yellow-500 text-[10px] font-black tracking-[0.5em] uppercase leading-none">RASS</span>
                <span className="text-white text-xl font-serif font-bold tracking-widest group-hover:text-yellow-100 transition-colors">JOURNAL</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-10 animate-fade-in">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 py-2 group overflow-hidden ${
                    isActive(link.path) ? 'text-yellow-400' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-yellow-400 transition-all duration-700 ${
                    isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              ))}
              
              <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                <button
                  onClick={toggleLanguage}
                  className="group flex items-center gap-2 bg-white/5 hover:bg-yellow-500 border border-white/5 hover:border-yellow-500 px-4 py-2 rounded-sm transition-all duration-500"
                >
                  <Globe size={14} className="text-yellow-500 group-hover:text-emerald-950 transition-colors" />
                  <span className="font-black text-[10px] tracking-widest text-white group-hover:text-emerald-950 uppercase">
                    {language === 'en' ? 'FR' : 'EN'}
                  </span>
                </button>
                
                <Link 
                  to="/submit"
                  className="relative bg-yellow-500 hover:bg-white text-emerald-950 px-8 py-3 rounded-sm text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-xl shadow-yellow-500/10 flex items-center gap-3 transform hover:-translate-y-1 overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-sheen"></span>
                  <PenTool size={16} className="relative z-10" />
                  <span className="relative z-10">{t('navSubmit')}</span>
                </Link>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-4 animate-fade-in">
              <button
                onClick={() => setIsOpen(true)}
                className="p-3 rounded-full transition-all duration-500 bg-white/5 text-white shadow-xl hover:bg-white/10"
              >
                <Menu size={24} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 3D Book Menu Overlay */}
      <div className={`fixed inset-0 z-[100] perspective-2000 transition-all duration-500 ${
        isOpen ? 'bg-emerald-950/90 backdrop-blur-xl pointer-events-auto' : 'bg-transparent pointer-events-none'
      }`} onClick={() => setIsOpen(false)}>
        
        <div 
          className={`absolute inset-y-0 left-0 w-full sm:w-[450px] bg-emerald-900 shadow-[30px_0_100px_rgba(0,0,0,0.8)] book-menu flex flex-col ${
            isOpen ? 'book-open' : 'book-closed'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Menu Close Button - Integrated into Menu */}
          <div className="flex justify-end p-8">
            <button 
              onClick={() => setIsOpen(false)}
              className="p-3 bg-white/5 hover:bg-yellow-500 text-white hover:text-emerald-950 rounded-full transition-all duration-300"
            >
              <X size={28} strokeWidth={2} />
            </button>
          </div>

          {/* Menu Items - Scrollbar Hidden */}
          <div className="flex-grow p-12 space-y-10 overflow-y-auto no-scrollbar">
            {navLinks.map((link, idx) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center justify-between text-3xl font-serif font-bold transition-all duration-500 ${
                  isActive(link.path) ? 'text-yellow-500 translate-x-4' : 'text-emerald-50 hover:text-yellow-400 hover:translate-x-4'
                }`}
                style={{ 
                  transitionDelay: isOpen ? `${idx * 100 + 200}ms` : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateX(0)' : 'translateX(-40px)'
                }}
              >
                <div className="flex items-center gap-6">
                  <span className="text-[10px] font-sans text-white/30 tracking-tighter uppercase font-black">Section 0{idx + 1}</span>
                  <span>{link.label}</span>
                </div>
                <ArrowRightIcon size={24} className={`transition-transform duration-500 ${isActive(link.path) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-2'}`} />
              </Link>
            ))}
            
            {/* Call to Action in Menu */}
            <div 
              className="pt-10 transition-all duration-500"
              style={{ 
                transitionDelay: isOpen ? `${navLinks.length * 100 + 200}ms` : '0ms',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              <Link 
                to="/submit"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-yellow-500 text-emerald-950 font-black text-xs uppercase tracking-[0.3em] py-5 rounded-sm shadow-2xl hover:bg-white transition-all"
              >
                {t('navSubmit')}
              </Link>
            </div>
          </div>

          {/* Menu Footer */}
          <div className="p-12 bg-emerald-950/40 border-t border-white/5">
            <button
              onClick={toggleLanguage}
              className="w-full flex items-center justify-center gap-4 py-4 border border-white/10 text-white font-black text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-emerald-950 transition-all duration-500"
            >
              <Globe size={18} />
              {language === 'en' ? 'Passer en Français' : 'Switch to English'}
            </button>
            
            <div className="mt-8 text-center">
               <div className="text-[9px] font-black tracking-[0.5em] uppercase text-emerald-500/30">Revue Africaine des Sciences Sociales</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;