import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  LayoutDashboard, FileText, Upload, Plus, BarChart2, Save, 
  LogOut, Home, Lock, Menu, X, MapPin, Trash2, User, Mail, 
  Check, Edit, AlertCircle, Loader2, Eye, BookOpen, Clock, 
  ArrowUpRight, FileCheck
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Article } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

const Admin: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // --- STATE (UPDATED FOR PERSISTENCE) ---
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if the admin was previously remembered in this browser
    return localStorage.getItem('rass_admin_session') === 'true';
  });
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'articles' | 'editor'>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [adminEmail, setAdminEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editorData, setEditorData] = useState({
    title_en: '',
    title_fr: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    status: 'published' as 'published' | 'pending' | 'rejected',
    pdf_path: ''
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  // --- ACTIONS ---

  const handleTabChange = (tab: 'dashboard' | 'articles' | 'editor') => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (isAuthenticated) fetchArticles();
  }, [isAuthenticated]);

  const fetchArticles = async () => {
    setIsGlobalLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/articles`);
      setArticles(res.data);
    } catch (error) {
      console.error("Fetch failed", error);
    } finally {
      setIsGlobalLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGlobalLoading(true);
    setAuthError('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/login`, {
        email: adminEmail,
        password: password,
      });
      if (response.data.message === 'Login successful') {
        // SET PERSISTENCE IN BROWSER
        localStorage.setItem('rass_admin_session', 'true');
        setIsAuthenticated(true);
      }
    } catch (error: any) {
      setAuthError(language === 'en' ? 'Invalid credentials' : 'Identifiants invalides');
    } finally {
      setIsGlobalLoading(false);
    }
  };

  // LOGOUT HANDLER (FORGET BROWSER)
  const handleLogout = () => {
    localStorage.removeItem('rass_admin_session');
    setIsAuthenticated(false);
    navigate('/admin');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(language === 'en' ? "Are you sure you want to delete this article?" : "Voulez-vous vraiment supprimer cet article ?")) return;
    setIsGlobalLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/articles/${id}`);
      setArticles(articles.filter(a => a.id !== id));
    } catch (error) {
      alert("Delete failed");
    } finally {
      setIsGlobalLoading(false);
    }
  };

  const startEdit = (article: Article) => {
    setEditingId(article.id);
    setEditorData({
      title_en: article.title.en || '',
      title_fr: article.title.fr || '',
      author: article.author,
      date: article.date,
      status: article.status,
      pdf_path: article.pdf_path || ''
    });
    handleTabChange('editor');
  };

  const handleSave = async () => {
    if (!editorData.title_en || !editorData.author) return;
    setIsGlobalLoading(true);
    try {
      const formData = new FormData();
      formData.append('title[en]', editorData.title_en);
      formData.append('title[fr]', editorData.title_fr);
      formData.append('author', editorData.author);
      formData.append('date', editorData.date);
      formData.append('status', editorData.status);

      const fileInput = document.querySelector<HTMLInputElement>('#pdf-upload');
      if (fileInput?.files?.[0]) formData.append('pdf', fileInput.files[0]);

      const url = editingId 
        ? `${import.meta.env.VITE_API_URL}/api/articles/${editingId}?_method=PUT` 
        : `${import.meta.env.VITE_API_URL}/api/articles`;

      await axios.post(url, formData);
      setSaveSuccess(true);
      await fetchArticles();
      setTimeout(() => { 
        setSaveSuccess(false); 
        handleTabChange('articles'); 
      }, 1500);
    } catch (error) {
      alert("Error saving publication");
    } finally {
      setIsGlobalLoading(false);
    }
  };

  // --- AUTH PAGE ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-emerald-950 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900 via-emerald-950 to-black opacity-50"></div>
        <form onSubmit={handleLogin} className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl w-full max-w-md border border-white/20 shadow-2xl relative z-10">
          <div className="w-20 h-20 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg rotate-3">
            <Lock className="text-emerald-950" size={32} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-white text-center mb-2">{t('adminDashboard')}</h2>
          <p className="text-emerald-300/60 text-center mb-8 text-sm">Authorized Personnel Only</p>
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-emerald-400" size={18} />
              <input type="email" placeholder="Email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} className="w-full pl-10 pr-4 py-3.5 bg-emerald-900/40 border border-emerald-700/50 rounded-xl text-white focus:ring-2 focus:ring-yellow-500 outline-none transition-all" required />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-emerald-400" size={18} />
              <input type="password" placeholder={t('accessCode')} value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-3.5 bg-emerald-900/40 border border-emerald-700/50 rounded-xl text-white focus:ring-2 focus:ring-yellow-500 outline-none transition-all" required />
            </div>
          </div>
          {authError && <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-xs text-center font-medium">{authError}</div>}
          <button className="w-full bg-yellow-500 mt-8 py-4 rounded-xl font-bold text-emerald-950 hover:bg-yellow-400 transform hover:-translate-y-1 transition-all shadow-xl active:scale-95">{t('login')}</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row">
      {/* GLOBAL LOADER */}
      {isGlobalLoading && (
        <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-md z-[100] flex items-center justify-center">
          <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4 animate-scale-in">
            <Loader2 className="animate-spin text-emerald-900" size={40} />
            <span className="font-bold text-emerald-950 tracking-wide uppercase text-xs">Synchronizing...</span>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-80 bg-emerald-950 text-white transform transition-transform duration-500 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
        <div className="p-8 border-b border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center font-black text-emerald-950 text-xs">RA</div>
              <h2 className="font-serif font-bold text-xl tracking-tight">RASS <span className="text-yellow-500 text-sm font-sans uppercase">Panel</span></h2>
            </div>
            <button className="md:hidden absolute top-8 right-8 text-emerald-400" onClick={() => setIsMobileMenuOpen(false)}><X/></button>
        </div>
        
        <nav className="p-6 space-y-3">
          <p className="text-[10px] uppercase font-bold text-emerald-500 tracking-widest px-4 mb-2">Navigation</p>
          <button onClick={() => handleTabChange('dashboard')} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'dashboard' ? 'bg-yellow-500 text-emerald-950 font-bold shadow-lg' : 'hover:bg-white/5 text-emerald-100/70'}`}><LayoutDashboard size={20}/> {t('navDashboard')}</button>
          <button onClick={() => handleTabChange('articles')} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'articles' ? 'bg-yellow-500 text-emerald-950 font-bold shadow-lg' : 'hover:bg-white/5 text-emerald-100/70'}`}><FileText size={20}/> {t('navAdminArticles')}</button>
          <button onClick={() => {setEditingId(null); handleTabChange('editor')}} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'editor' && !editingId ? 'bg-yellow-500 text-emerald-950 font-bold shadow-lg' : 'hover:bg-white/5 text-emerald-100/70'}`}><Plus size={20}/> {t('uploadNew')}</button>
          
          <div className="pt-8 mt-8 border-t border-white/5">
            <Link to="/" className="flex items-center gap-4 px-4 py-3 text-emerald-400 hover:text-white transition-colors"><Home size={18}/> <span className="text-sm font-medium">{t('backToSite')}</span></Link>
            <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all mt-2"><LogOut size={18}/> <span className="text-sm font-medium">{t('logout') ?? 'Logout'}</span></button>
          </div>
        </nav>
      </aside>

      {/* MAIN PANEL */}
      <main className="flex-1 h-screen overflow-y-auto relative">
        <header className="bg-white/80 backdrop-blur-md border-b p-6 flex justify-between items-center sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <button className="md:hidden p-2 bg-emerald-50 text-emerald-900 rounded-lg" onClick={() => setIsMobileMenuOpen(true)}><Menu/></button>
              <h1 className="text-xl font-serif font-bold text-emerald-950 capitalize">{activeTab}</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-emerald-950">Administrator</p>
                <p className="text-[10px] text-slate-400">Sapitoden Elie</p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-900 font-bold border border-emerald-200">A</div>
            </div>
        </header>

        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Articles', val: articles.length, icon: BookOpen, col: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Monthly Readers', val: '1,482', icon: Eye, col: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: 'Pending Review', val: articles.filter(a => a.status === 'pending').length, icon: Clock, col: 'text-orange-600', bg: 'bg-orange-50' },
                  { label: 'Success Rate', val: '98%', icon: ArrowUpRight, col: 'text-purple-600', bg: 'bg-purple-50' }
                ].map((s, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4">
                    <div className={`w-12 h-12 ${s.bg} ${s.col} rounded-2xl flex items-center justify-center`}><s.icon size={24}/></div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{s.label}</p>
                      <p className="text-2xl font-black text-emerald-950 mt-1">{s.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="font-serif font-bold text-xl text-emerald-950">Publication Performance</h3>
                </div>
                <div style={{ width: '100%', height: 350 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      {m: 'Jan', v: 400}, {m: 'Feb', v: 300}, {m: 'Mar', v: 600}, 
                      {m: 'Apr', v: 800}, {m: 'May', v: 500}, {m: 'Jun', v: 900}, {m: 'Jul', v: 1100}
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#94a3b8'}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#94a3b8'}} />
                      <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                      <Bar dataKey="v" radius={[10, 10, 0, 0]} barSize={40}>
                        {[1,2,3,4,5,6,7].map((_, index) => (
                          <Cell key={`cell-${index}`} fill={index === 6 ? '#fbbf24' : '#064e3b'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* ARTICLES TAB */}
          {activeTab === 'articles' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-3xl font-serif font-bold text-emerald-950">{t('navAdminArticles')}</h2>
                <button 
                  onClick={() => {setEditingId(null); handleTabChange('editor')}} 
                  className="w-full sm:w-auto bg-emerald-950 text-yellow-500 px-8 py-4 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold shadow-xl shadow-emerald-950/20 hover:scale-105 transition-transform"
                >
                  <Plus size={20}/> {t('uploadNew')}
                </button>
              </div>

              <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="block md:hidden divide-y divide-slate-100">
                  {articles.map(a => (
                    <div key={a.id} className="p-6 space-y-4">
                      <div>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${a.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                          {a.status}
                        </span>
                        <p className="font-bold text-emerald-950 mt-2 leading-tight">{a.title[language]}</p>
                        <p className="text-xs text-slate-400 mt-1">{a.author} • {a.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => startEdit(a)} 
                          className="flex-1 flex justify-center items-center gap-2 py-3 bg-emerald-50 text-emerald-700 rounded-xl font-bold text-xs"
                        >
                          <Edit size={16}/> {t('adminEdit') || 'Edit'}
                        </button>
                        <button 
                          onClick={() => handleDelete(a.id)} 
                          className="flex-1 flex justify-center items-center gap-2 py-3 bg-red-50 text-red-600 rounded-xl font-bold text-xs"
                        >
                          <Trash2 size={16}/> {t('adminDelete') || 'Delete'}
                        </button>
                      </div>
                    </div>
                  ))}
                  {articles.length === 0 && <p className="p-10 text-center text-slate-400">No articles found.</p>}
                </div>

                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="px-8 py-6 text-[10px] uppercase font-black text-slate-400 tracking-widest">{t('adminTableTitle')}</th>
                        <th className="px-8 py-6 text-[10px] uppercase font-black text-slate-400 tracking-widest">Status</th>
                        <th className="px-8 py-6 text-[10px] uppercase font-black text-slate-400 tracking-widest text-right">{t('adminTableActions')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {articles.map(a => (
                        <tr key={a.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-8 py-6">
                            <p className="font-bold text-emerald-950 leading-tight mb-1 group-hover:text-emerald-700 transition-colors">{a.title[language]}</p>
                            <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                              <span className="flex items-center gap-1"><User size={10}/> {a.author}</span>
                              <span className="flex items-center gap-1"><Clock size={10}/> {a.date}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${a.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                              {a.status}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => startEdit(a)} className="p-3 bg-white border border-slate-200 text-emerald-700 hover:bg-emerald-900 hover:text-white rounded-xl transition-all shadow-sm"><Edit size={18}/></button>
                              <button onClick={() => handleDelete(a.id)} className="p-3 bg-white border border-slate-200 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm"><Trash2 size={18}/></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* EDITOR TAB */}
          {activeTab === 'editor' && (
            <div className="max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-500">
              <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-yellow-500"></div>
                <h2 className="text-3xl font-serif font-bold text-emerald-950 mb-8 flex items-center gap-3">
                  {editingId ? <Edit className="text-yellow-500"/> : <Plus className="text-yellow-500"/>}
                  {editingId ? t('adminEdit') : t('uploadNew')}
                </h2>
                
                {saveSuccess ? (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"><Check size={40}/></div>
                    <p className="text-2xl font-serif font-bold text-emerald-950">{t('uploadSuccessMsg')}</p>
                    <p className="text-slate-500">Redirecting to library...</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Title (English)</label>
                        <input value={editorData.title_en} onChange={e => setEditorData({...editorData, title_en: e.target.value})} className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-900 transition-all outline-none" placeholder="Scientific title in English..." />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Titre (Français)</label>
                        <input value={editorData.title_fr} onChange={e => setEditorData({...editorData, title_fr: e.target.value})} className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-900 transition-all outline-none" placeholder="Titre scientifique en français..." />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t('submitName')}</label>
                        <input value={editorData.author} onChange={e => setEditorData({...editorData, author: e.target.value})} className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-900 transition-all outline-none" placeholder="Lead Author" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Status</label>
                        <select value={editorData.status} onChange={e => setEditorData({...editorData, status: e.target.value as any})} className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-900 outline-none appearance-none font-bold text-emerald-950">
                          <option value="published">Published</option>
                          <option value="pending">Pending Review</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">PDF Document</label>
                      <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center relative group hover:border-emerald-900 transition-colors bg-slate-50/50">
                        <input type="file" id="pdf-upload" accept=".pdf" className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                        <div className="relative z-0">
                          <div className="w-16 h-16 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <FileCheck className="text-emerald-900" size={32}/>
                          </div>
                          <p className="font-bold text-emerald-950">{t('clickUploadPdf')}</p>
                          <p className="text-xs text-slate-400 mt-1">PDF only (Max 10MB)</p>
                        </div>
                      </div>
                    </div>

                    <button onClick={handleSave} className="w-full bg-emerald-950 text-yellow-500 py-6 rounded-[2rem] font-black text-lg flex items-center justify-center gap-4 hover:bg-emerald-900 shadow-2xl shadow-emerald-950/20 active:scale-95 transition-all">
                      <Save size={24}/> {editingId ? 'Update Publication' : t('publishLib')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;