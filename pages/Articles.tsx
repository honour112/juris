import React, { useState, useMemo } from 'react';
import { Search, PenTool, ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useArticles } from '../context/ArticleContext';

const Articles: React.FC = () => {
  const { t, language } = useLanguage();
  const { articles } = useArticles();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(articles.map(a => a.category)))];

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = article.title[language].toLowerCase().includes(searchQuery.toLowerCase()) || 
                            article.excerpt[language].toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, language, articles]);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center bg-emerald-950 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-emerald-950/60 to-emerald-950/80"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-20">
          <span className="inline-block py-1 px-3 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-4 border border-yellow-500/30 backdrop-blur-sm">
            Knowledge Base
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-lg">
            {t('navArticles')}
          </h1>
          <p className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            {language === 'en' 
              ? 'Expert perspectives on Cameroonian Law, OHADA regulations, and regional business practices.' 
              : 'Perspectives d\'experts sur le droit camerounais, la réglementation OHADA et les pratiques commerciales régionales.'}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-16 relative z-20 pb-20">
        
        {/* Submission CTA Banner */}
        <div className="mb-10 md:mb-16 bg-white rounded-lg p-6 md:p-10 flex flex-col md:flex-row items-center justify-between shadow-xl border border-gray-100 gap-6 md:gap-0">
          <div className="max-w-xl text-center md:text-left">
             <div className="flex items-center justify-center md:justify-start gap-3 mb-3 text-yellow-600 font-bold uppercase tracking-wider text-xs">
                <PenTool size={16} />
                <span>Submit Your Work</span>
             </div>
             <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3 md:mb-4 text-emerald-950">{t('articleCtaTitle')}</h2>
             <p className="text-gray-600 leading-relaxed text-sm md:text-base">
               {language === 'en' 
                 ? 'Join our network of legal professionals. Submit your articles for review and get published on our platform.' 
                 : 'Rejoignez notre réseau de professionnels du droit. Soumettez vos articles pour révision et soyez publié sur notre plateforme.'}
             </p>
          </div>
          <Link 
            to="/submit" 
            className="w-full md:w-auto justify-center whitespace-nowrap bg-emerald-950 hover:bg-emerald-900 text-white px-8 py-4 rounded-sm font-bold transition-all flex items-center gap-2 shadow-lg text-sm md:text-base group"
          >
            {t('articleCtaBtn')} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 gap-4 md:gap-6">
          <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                    selectedCategory === cat 
                      ? 'bg-emerald-900 text-white shadow-md' 
                      : 'bg-white text-emerald-900 hover:bg-emerald-50 border border-emerald-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder={language === 'en' ? "Search articles..." : "Rechercher..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-sm border border-gray-300 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all bg-white text-sm shadow-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* Article Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredArticles.map((article) => (
              <div key={article.id} className="group bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
                <div className="h-52 md:h-64 overflow-hidden relative">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title[language]} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-900 shadow-sm border-l-2 border-yellow-500">
                    {article.category}
                  </div>
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="text-xs text-gray-500 mb-3 font-medium flex justify-between">
                    <span>{article.date}</span>
                    <span>{article.readTime} read</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-emerald-950 mb-4 group-hover:text-emerald-700 transition-colors">
                    {article.title[language]}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {article.excerpt[language]}
                  </p>
                  <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-yellow-600 text-sm font-semibold group-hover:text-yellow-700 flex items-center gap-1 cursor-pointer">
                      <span>Read Article</span>
                      <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                    </div>
                    
                    {article.pdfUrl && (
                      <a 
                        href={article.pdfUrl}
                        download={`${article.title.en}.pdf`}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-gray-100 hover:bg-emerald-900 hover:text-white text-slate-600 text-xs font-bold uppercase tracking-wide transition-all"
                        title={t('downloadBtn')}
                      >
                        <Download size={14} />
                        <span>PDF</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg border border-gray-100 shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
               <Search className="text-gray-400" size={24} />
            </div>
            <p className="text-gray-500 text-lg">
              {language === 'en' ? 'No articles found matching your criteria.' : 'Aucun article trouvé correspondant à vos critères.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;