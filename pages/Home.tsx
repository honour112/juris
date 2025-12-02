import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Scale, Shield, Users, Building, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useArticles } from '../context/ArticleContext';

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const { articles } = useArticles();
  const latestArticles = articles.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-emerald-950">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900/80 to-emerald-900/60"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight animate-fade-in-up">
            {t('heroTitle')}
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/articles" 
              className="bg-yellow-500 text-emerald-950 px-8 py-4 rounded-sm font-bold hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-yellow-500/20"
            >
              {t('heroCta')}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/profile" 
              className="bg-transparent border border-emerald-500 text-emerald-100 px-8 py-4 rounded-sm font-semibold hover:bg-emerald-900/50 hover:text-white transition-all backdrop-blur-sm"
            >
              {t('navProfile')}
            </Link>
          </div>
        </div>
      </section>

      {/* About Firm Mini */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="w-16 h-1 bg-yellow-500 mx-auto mb-8"></div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-emerald-950 mb-6">
            {t('aboutFirm')}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {t('aboutFirmText')}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {[
              { icon: Scale, label: 'Business Law' },
              { icon: Building, label: 'Corporate' },
              { icon: Shield, label: 'Land Titles' },
              { icon: Users, label: 'Family' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 text-slate-700 hover:text-emerald-700 transition-colors cursor-default">
                <div className="p-4 bg-emerald-50 rounded-full mb-2 text-emerald-700">
                  <item.icon size={28} strokeWidth={1.5} />
                </div>
                <span className="font-serif font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-yellow-600 font-bold uppercase tracking-widest text-xs mb-2 block">Legal Updates</span>
              <h2 className="text-4xl font-serif font-bold text-emerald-950">{t('latestArticles')}</h2>
            </div>
            <Link to="/articles" className="hidden md:flex items-center gap-2 text-emerald-800 hover:text-yellow-600 transition-colors font-medium text-sm">
              {t('viewAll')} <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestArticles.map((article) => (
              <Link key={article.id} to={`/articles`} className="group">
                <article className="bg-white h-full shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden rounded-sm flex flex-col border border-gray-100">
                  <div className="h-56 overflow-hidden">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title[language]} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-4 font-medium uppercase tracking-wider">
                      <span className="text-emerald-700">{article.category}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-slate-900 mb-3 group-hover:text-emerald-800 transition-colors leading-snug">
                      {article.title[language]}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                      {article.excerpt[language]}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                       <div className="text-yellow-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More <ArrowRight size={14} />
                      </div>
                      
                      {article.pdfUrl && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const link = document.createElement('a');
                            link.href = article.pdfUrl!;
                            link.download = `${article.title.en}.pdf`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-emerald-50 hover:bg-emerald-900 hover:text-white text-emerald-800 text-xs font-bold uppercase tracking-wide transition-all z-10"
                          title={t('downloadBtn')}
                        >
                          <Download size={14} />
                          <span>PDF</span>
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/articles" className="inline-flex items-center gap-2 text-slate-900 font-semibold border-b border-slate-900 pb-1">
              {t('viewAll')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
