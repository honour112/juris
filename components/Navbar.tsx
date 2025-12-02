import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: t('navHome') },
    { path: '/articles', label: t('navArticles') },
    { path: '/submit', label: t('navSubmit') },
    { path: '/profile', label: t('navProfile') },
    { path: '/admin', label: t('navAdmin') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-emerald-950/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-serif font-bold text-white tracking-widest flex items-center gap-2">
            <span className="w-8 h-8 bg-yellow-500 flex items-center justify-center rounded-sm font-sans text-sm font-bold text-emerald-950">J</span>
            <span className="text-yellow-500">JURIS</span><span className="text-white">CM</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                  isActive(link.path) ? 'text-yellow-400' : 'text-gray-200 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Enhanced Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="group flex items-center gap-2 bg-white/10 hover:bg-yellow-500 border border-white/20 hover:border-yellow-500 px-4 py-2 rounded-full transition-all duration-300 ease-in-out"
            >
              <Globe size={16} className="text-gray-200 group-hover:text-emerald-950 transition-colors" />
              <span className="font-bold text-xs text-gray-200 group-hover:text-emerald-950 transition-colors">
                {language.toUpperCase()}
              </span>
              <span className="max-w-0 overflow-hidden group-hover:max-w-[140px] transition-all duration-500 ease-out text-xs font-bold text-emerald-950 whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:ml-1">
                {language === 'en' ? 'Changer de langue' : 'Change Language'}
              </span>
            </button>
            
            <button className="bg-yellow-500 hover:bg-yellow-400 text-emerald-950 px-5 py-2 rounded-sm text-sm font-bold transition-colors shadow-md shadow-yellow-500/10">
              {t('navContact')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-gray-200 text-xs font-semibold border border-gray-600 px-2 py-1 rounded-md"
            >
              {language.toUpperCase()}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-500 transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-emerald-950 border-t border-emerald-900 shadow-xl">
          <div className="px-4 pt-4 pb-8 space-y-4 flex flex-col items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium ${
                  isActive(link.path) ? 'text-yellow-500' : 'text-gray-200'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button className="w-full bg-yellow-500 text-emerald-900 font-bold py-3 mt-4 rounded-sm">
              {t('navContact')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;