import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  FileText,
  Calendar,
  User,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Upload,
  Loader2,
  Globe,
  ChevronRight
} from 'lucide-react';
import { supabase } from '../src/supabaseClient';
import { useLanguage } from '../context/LanguageContext';

interface Article {
  id: string;
  title: { en: string; fr: string };
  author: string;
  date: string;
  pdf_path: string;
  status: 'published' | 'draft';
  category: string;
}

const AdminArticles = () => {
  // --- STATE MANAGEMENT ---
  const { language, setLanguage } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    titleEn: '',
    titleFr: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    status: 'published',
    category: 'Social Sciences'
  });
  const [file, setFile] = useState<File | null>(null);

  // --- FETCH DATA ---
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (err) {
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLERS ---
  const handleFileUpload = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('article-pdfs')
      .upload(filePath, file);

    if (uploadError) throw uploadError;
    return filePath;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Please select a PDF file');
    
    setIsSubmitting(true);
    try {
      const pdf_path = await handleFileUpload(file);

      const { error } = await supabase
        .from('articles')
        .insert([{
          title: { en: formData.titleEn, fr: formData.titleFr },
          author: formData.author,
          date: formData.date,
          status: formData.status,
          category: formData.category,
          pdf_path
        }]);

      if (error) throw error;
      
      setIsModalOpen(false);
      fetchArticles();
      // Reset Form
      setFormData({
        titleEn: '', titleFr: '', author: '', 
        date: new Date().toISOString().split('T')[0], 
        status: 'published', category: 'Social Sciences'
      });
      setFile(null);
    } catch (err) {
      console.error('Submit error:', err);
      alert('Failed to upload article');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, path: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      await supabase.storage.from('article-pdfs').remove([path]);
      const { error } = await supabase.from('articles').delete().eq('id', id);
      if (error) throw error;
      setArticles(articles.filter(a => a.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const filteredArticles = articles.filter(article => {
    const title = language === 'en' ? article.title.en : article.title.fr;
    return title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           article.author.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#f8fafb] p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-serif font-bold text-emerald-950 mb-2">Editorial Dashboard</h1>
            <p className="text-slate-500 font-medium">Manage and publish academic research papers</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* FIXED LANGUAGE TOGGLE */}
            <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
              <button 
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${language === 'en' ? 'bg-emerald-950 text-white shadow-lg' : 'text-slate-400 hover:text-emerald-900'}`}
              >
                ENGLISH
              </button>
              <button 
                onClick={() => setLanguage('fr')}
                className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${language === 'fr' ? 'bg-emerald-950 text-white shadow-lg' : 'text-slate-400 hover:text-emerald-900'}`}
              >
                FRANÇAIS
              </button>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-emerald-950 px-6 py-3 rounded-2xl font-bold transition-all shadow-lg hover:shadow-yellow-500/20 active:scale-95"
            >
              <Plus size={20} strokeWidth={3} />
              New Article
            </button>
          </div>
        </div>

        {/* --- STATS CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Articles', value: articles.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Published', value: articles.filter(a => a.status === 'published').length, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Drafts', value: articles.filter(a => a.status === 'draft').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Categories', value: '08', icon: Globe, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
              <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-serif font-bold text-emerald-950">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* --- MAIN TABLE AREA (FULLY RESPONSIVE) --- */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          
          {/* Table Toolbar */}
          <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-3 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-900/10 outline-none transition-all text-sm"
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">
                <Filter size={18} /> Filter
              </button>
            </div>
          </div>

          {/* Table Container with Horizontal Scroll */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Article Information</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Author</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Date</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center">
                      <Loader2 className="animate-spin mx-auto text-emerald-900" size={32} />
                    </td>
                  </tr>
                ) : filteredArticles.map((article) => (
                  <tr key={article.id} className="group hover:bg-slate-50/80 transition-all duration-300">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                          <FileText size={20} />
                        </div>
                        <div className="flex flex-col max-w-md">
                          {/* DYNAMIC TITLE BASED ON TOGGLE */}
                          <span className="font-serif font-bold text-emerald-950 leading-tight mb-1">
                            {language === 'en' ? article.title.en : article.title.fr}
                          </span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Globe size={10} className="text-emerald-500" />
                            {language === 'en' ? 'English & French' : 'Anglais et Français'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-600 font-medium">
                        <User size={14} className="text-slate-400" />
                        {article.author}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-500 text-sm font-mono">
                        <Calendar size={14} className="text-slate-400" />
                        {new Date(article.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        article.status === 'published' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-amber-100 text-amber-700'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${article.status === 'published' ? 'bg-emerald-600' : 'bg-amber-600'}`}></span>
                        {article.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"><Edit size={18} /></button>
                        <button 
                          onClick={() => handleDelete(article.id, article.pdf_path)}
                          className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Swipe Indicator */}
          <div className="p-4 bg-slate-50 text-center lg:hidden">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center justify-center gap-2">
              Scroll horizontally to see all columns <ChevronRight size={12} />
            </span>
          </div>
        </div>
      </div>

      {/* --- ADD ARTICLE MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-950/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="text-2xl font-serif font-bold text-emerald-950">Publish New Research</h3>
                <p className="text-sm text-slate-500">Enter details and upload the PDF document</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white rounded-full transition-all text-slate-400 hover:text-emerald-950">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Title (English)</label>
                  <input 
                    required
                    className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-900/10 focus:bg-white outline-none transition-all"
                    placeholder="Enter English title"
                    value={formData.titleEn}
                    onChange={e => setFormData({...formData, titleEn: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Titre (Français)</label>
                  <input 
                    required
                    className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-900/10 focus:bg-white outline-none transition-all"
                    placeholder="Entrez le titre français"
                    value={formData.titleFr}
                    onChange={e => setFormData({...formData, titleFr: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Author Name</label>
                  <input 
                    required
                    className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-900/10 focus:bg-white outline-none transition-all"
                    placeholder="Dr. John Doe"
                    value={formData.author}
                    onChange={e => setFormData({...formData, author: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Publication Date</label>
                  <input 
                    type="date"
                    required
                    className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-emerald-900/10 focus:bg-white outline-none transition-all"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>

              {/* File Upload Zone */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">PDF Document</label>
                <div className={`relative border-2 border-dashed rounded-[2rem] p-8 text-center transition-all ${file ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-200 hover:border-emerald-900/20 bg-slate-50/50'}`}>
                  <input 
                    type="file" 
                    accept=".pdf"
                    onChange={e => setFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center gap-3">
                    {file ? (
                      <>
                        <div className="p-4 bg-emerald-500 text-white rounded-full shadow-lg shadow-emerald-500/20">
                          <CheckCircle size={24} />
                        </div>
                        <p className="font-bold text-emerald-900">{file.name}</p>
                      </>
                    ) : (
                      <>
                        <div className="p-4 bg-white text-slate-400 rounded-full shadow-sm">
                          <Upload size={24} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-600">Click to upload or drag & drop</p>
                          <p className="text-xs text-slate-400 mt-1">PDF files only (Max 20MB)</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-100 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] py-4 bg-emerald-950 text-white rounded-2xl font-bold shadow-xl shadow-emerald-950/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle size={20} />}
                  {isSubmitting ? 'Uploading...' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminArticles;