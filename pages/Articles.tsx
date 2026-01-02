import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { 
  Download, 
  Calendar, 
  Search, 
  Loader2, 
  X, 
  BookOpen,
  FileText 
} from 'lucide-react';
import Preview from './Preview.tsx';
import { useLanguage } from '../context/LanguageContext'; // Adjust path to your actual context
import ArticlesHero from './ArticleHero.tsx';

interface Article {
  id: number;
  title: { en: string; fr: string };
  author: string;
  date: string;
  pdf_path: string;
  status: string;
}



const Articles = () => {
  // Use your existing global language context
  const { language } = useLanguage(); 
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [activePdf, setActivePdf] = useState<{ url: string; title: string } | null>(null);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const API_BASE = "http://localhost:8000";

  useEffect(() => {
    axios.get(`${API_BASE}/api/articles`)
      .then(res => {
        // Sort: Newest documents appear first
        const sorted = res.data.sort((a: Article, b: Article) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setArticles(sorted);
      })
      .catch(err => console.error("API Error:", err))
      .finally(() => setLoading(false));
  }, []);

  // Use the API Proxy route to avoid CORS errors from /storage
  const getProxyUrl = (path: string) => {
    if (!path) return '';
    const fileName = path.split('/').pop();
    return `${API_BASE}/api/view-pdf/${fileName}`;
  };

  const handleDownload = async (url: string, title: string, id: number) => {
    setDownloadingId(id);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${title.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      window.open(url, '_blank');
    } finally {
      setDownloadingId(null);
    }
  };

  const filtered = useMemo(() => {
    return articles.filter(a => {
      const title = language === 'en' ? a.title.en : a.title.fr;
      const matchesSearch = title.toLowerCase().includes(search.toLowerCase());
      const articleMonth = new Date(a.date).getMonth().toString();
      const matchesMonth = selectedMonth === 'all' || articleMonth === selectedMonth;
      
      return a.status === 'published' && matchesSearch && matchesMonth;
    });
  }, [articles, search, selectedMonth, language]);

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
      <Loader2 className="animate-spin text-emerald-900" size={32} />
    </div>
  );

  return (
    
    
    <div className="bg-[#f8fafb] min-h-screen p-6 md:p-12">
      <ArticlesHero />
      {/* PDF VIEWER MODAL */}
      {activePdf && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col p-4 md:p-8">
          <div className="flex justify-between items-center mb-4 text-white">
            <h2 className="font-serif text-xl">{activePdf.title}</h2>
            <button onClick={() => setActivePdf(null)} className="p-2 hover:bg-white/20 rounded-full">
              <X size={28} />
            </button>
          </div>
          <iframe src={activePdf.url} className="flex-1 w-full bg-white rounded-xl shadow-2xl" />
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <h1 className="text-4xl font-serif font-bold text-emerald-950">
            {language === 'en' ? 'Archives' : 'Archives '}
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {/* MONTH FILTER */}
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl shadow-sm outline-none text-sm font-medium text-slate-600 cursor-pointer"
            >
              <option value="all">{language === 'en' ? 'All Months' : 'Tous les mois'}</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i.toString()}>
                  {new Date(2000, i).toLocaleString(language === 'en' ? 'en-US' : 'fr-FR', { month: 'long' })}
                </option>
              ))}
            </select>

            {/* SEARCH */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder={language === 'en' ? 'Search journals...' : 'Rechercher...'}
                className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-xl shadow-sm w-full sm:w-64 focus:ring-2 focus:ring-emerald-900/10 transition-all"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* ARTICLES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((article) => {
            const proxyUrl = getProxyUrl(article.pdf_path);
            const displayTitle = language === 'en' ? article.title.en : article.title.fr;

            return (
              <div key={article.id} className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-500">
                <div className="h-64 bg-slate-50 relative">
                  {proxyUrl && (
                    <Preview 
                      url={proxyUrl} 
                      onClick={() => setActivePdf({ url: proxyUrl, title: displayTitle })} 
                    />
                  )}
                </div>

                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                    <Calendar size={14} /> 
                    {new Date(article.date).toLocaleDateString(language === 'en' ? 'en-US' : 'fr-FR', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  
                  <h3 className="text-lg font-serif font-bold text-emerald-950 mb-6 line-clamp-2 leading-tight">
                    {displayTitle}
                  </h3>

                  <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium italic">
                      {language === 'en' ? 'By' : 'Par'} Dr. {article.author}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      {/* NEW READ BUTTON */}
                      <button 
                        onClick={() => setActivePdf({ url: proxyUrl, title: displayTitle })}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-900 rounded-xl text-xs font-bold hover:bg-emerald-900 hover:text-white transition-all shadow-sm"
                      >
                        <BookOpen size={14} />
                        {language === 'en' ? 'Read' : 'Lire'}
                      </button>

                      {/* DOWNLOAD BUTTON */}
                      <button 
                        onClick={() => handleDownload(proxyUrl, displayTitle, article.id)}
                        disabled={downloadingId === article.id}
                        className="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-emerald-900 hover:text-white transition-all disabled:opacity-50"
                        title={language === 'en' ? 'Download PDF' : 'Télécharger PDF'}
                      >
                        {downloadingId === article.id ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <FileText size={32} />
            </div>
            <p className="text-slate-500 font-medium">
              {language === 'en' ? 'No articles found.' : 'Aucun article trouvé.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;