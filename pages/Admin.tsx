import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, FileText, Plus, Save, LogOut, Home, Lock, 
  Menu, X, Trash2, User, Check, Edit, Loader2, Eye, BookOpen, 
  Clock, ArrowUpRight, FileCheck, BarChart2, Upload, Languages
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Article } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { supabase } from '../src/supabaseClient'; 

const Admin: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  // --- AUTH & UI STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('rass_admin_session') === 'true');
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'articles' | 'editor'>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [greeting, setGreeting] = useState('');

  // --- DATA STATE ---
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
    status: 'published' as 'published' | 'pending',
    pdf_path: ''
  });

  // Calculate greeting based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting(language === 'en' ? 'Good Morning' : 'Bonjour');
    else if (hour < 18) setGreeting(language === 'en' ? 'Good Afternoon' : 'Bon après-midi');
    else setGreeting(language === 'en' ? 'Good Evening' : 'Bonsoir');
  }, [language]);

  useEffect(() => {
    if (isAuthenticated) fetchArticles();
  }, [isAuthenticated]);

  // --- ACTIONS ---

  const fetchArticles = async () => {
    setIsGlobalLoading(true);
    try {
      const { data, error } = await supabase.from('articles').select('*').order('date', { ascending: false });
      if (error) throw error;
      setArticles(data || []);
    } catch (err: any) {
      console.error("Database fetch error:", err.message);
    } finally {
      setIsGlobalLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGlobalLoading(true);
    setAuthError('');
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: adminEmail, password });
      if (error) throw error;
      if (data.user) {
        localStorage.setItem('rass_admin_session', 'true');
        setIsAuthenticated(true);
      }
    } catch (err: any) {
      setAuthError(language === 'en' ? "Login failed: " + err.message : "Échec: " + err.message);
    } finally {
      setIsGlobalLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editorData.title_en || !editorData.author) {
      alert(language === 'en' ? "Missing required fields" : "Champs obligatoires manquants");
      return;
    }

    setIsGlobalLoading(true);
    try {
      let finalPath = editorData.pdf_path;
      const fileInput = document.querySelector<HTMLInputElement>('#pdf-upload');
      const file = fileInput?.files?.[0];

      if (file) {
        if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith('.pdf')) {
            throw new Error(language === 'en' ? "Only PDF documents are permitted" : "Seuls les documents PDF sont autorisés");
        }
        const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
        const { data: upData, error: upErr } = await supabase.storage
          .from('article-pdfs')
          .upload(fileName, file, { contentType: 'application/pdf', upsert: true });

        if (upErr) throw upErr;
        finalPath = upData.path;
      }

      const payload = {
        title: { en: editorData.title_en, fr: editorData.title_fr },
        author: editorData.author,
        date: editorData.date,
        status: editorData.status,
        pdf_path: finalPath
      };

      const { error: dbErr } = editingId 
        ? await supabase.from('articles').update(payload).eq('id', editingId)
        : await supabase.from('articles').insert([payload]);

      if (dbErr) throw dbErr;

      setSaveSuccess(true);
      await fetchArticles();
      setTimeout(() => {
        setSaveSuccess(false);
        setActiveTab('articles');
      }, 1500);

    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsGlobalLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(language === 'en' ? "Permanent delete?" : "Suppression permanente ?")) return;
    setIsGlobalLoading(true);
    await supabase.from('articles').delete().eq('id', id);
    setArticles(articles.filter(a => a.id !== id));
    setIsGlobalLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-emerald-950 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/40 via-emerald-950 to-black opacity-50"></div>
        <form onSubmit={handleLogin} className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl w-full max-w-sm border border-white/10 shadow-2xl relative z-10">
          <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3">
            <Lock className="text-emerald-950" size={28} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-white text-center mb-6">{t('adminDashboard')}</h2>
          <div className="space-y-4">
            <input type="email" placeholder="Email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-yellow-500 transition-all" required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-yellow-500 transition-all" required />
          </div>
          {authError && <p className="text-red-400 text-xs mt-4 text-center font-bold">{authError}</p>}
          <button className="w-full bg-yellow-500 py-4 rounded-xl font-bold text-emerald-950 mt-6 hover:bg-yellow-400 transition-all active:scale-95 shadow-xl">{t('login')}</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row font-sans text-emerald-950">
      {isGlobalLoading && (
        <div className="fixed inset-0 bg-emerald-950/20 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-xl flex items-center gap-3">
            <Loader2 className="animate-spin text-emerald-900" size={24} />
            <span className="font-bold text-xs uppercase tracking-widest">Processing...</span>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`w-full md:w-80 bg-emerald-950 text-white p-6 flex flex-col fixed md:relative z-50 h-screen transition-transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center font-black text-emerald-950">RA</div>
            <h2 className="font-serif font-bold text-2xl">RASS <span className="text-yellow-500 text-xs font-sans uppercase">Admin</span></h2>
          </div>
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(false)}><X/></button>
        </div>

        {/* User Profile Info */}
        <div className="mb-8 p-4 bg-white/5 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center border border-emerald-700">
              <User size={18} className="text-yellow-500"/>
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-tighter">Administrator</p>
              <p className="text-sm font-bold truncate">Sapitoden Elie</p>
            </div>
          </div>
          
          {/* Language Toggle Inside Sidebar */}
          <button 
            onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
            className="w-full flex items-center justify-between px-3 py-2 bg-emerald-900/50 rounded-xl hover:bg-yellow-500 hover:text-emerald-950 transition-all group"
          >
            <div className="flex items-center gap-2">
              <Languages size={14}/>
              <span className="text-xs font-bold uppercase tracking-widest">{language === 'en' ? 'English' : 'Français'}</span>
            </div>
            <span className="text-[10px] font-black opacity-40 group-hover:opacity-100 uppercase">{language === 'en' ? 'Switch to FR' : 'Passer en EN'}</span>
          </button>
        </div>
        
        <nav className="flex-1 space-y-2">
          <button onClick={() => {setActiveTab('dashboard'); setIsMobileMenuOpen(false)}} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'dashboard' ? 'bg-yellow-500 text-emerald-950 font-bold shadow-lg shadow-yellow-500/10' : 'hover:bg-white/5 text-emerald-100/60'}`}><LayoutDashboard size={20}/> {language === 'en' ? 'Dashboard' : 'Tableau de bord'}</button>
          <button onClick={() => {setActiveTab('articles'); setIsMobileMenuOpen(false)}} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'articles' ? 'bg-yellow-500 text-emerald-950 font-bold shadow-lg shadow-yellow-500/10' : 'hover:bg-white/5 text-emerald-100/60'}`}><FileText size={20}/> {language === 'en' ? 'Library' : 'Bibliothèque'}</button>
          <button onClick={() => {setEditingId(null); setActiveTab('editor'); setIsMobileMenuOpen(false)}} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'editor' ? 'bg-yellow-500 text-emerald-950 font-bold shadow-lg shadow-yellow-500/10' : 'hover:bg-white/5 text-emerald-100/60'}`}><Plus size={20}/> {language === 'en' ? 'New Upload' : 'Nouveau dépôt'}</button>
        </nav>

        <div className="pt-6 border-t border-white/5 mt-auto">
          <Link to="/" className="flex items-center gap-4 p-4 text-emerald-100/60 hover:text-white transition-colors mb-2">
            <Home size={20}/> {language === 'en' ? 'View Website' : 'Voir le site'}
          </Link>
          <button onClick={() => {supabase.auth.signOut(); localStorage.removeItem('rass_admin_session'); setIsAuthenticated(false)}} className="w-full flex items-center gap-4 p-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-colors font-bold text-left"><LogOut size={20}/> {language === 'en' ? 'Logout' : 'Déconnexion'}</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto h-screen bg-[#f8fafc]">
        <button className="md:hidden mb-6 p-3 bg-white rounded-xl shadow-sm border border-slate-200" onClick={() => setIsMobileMenuOpen(true)}><Menu/></button>

        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-emerald-950">{greeting}, Sapitoden Elie</h1>
                    <p className="text-slate-400 font-medium mt-1">
                      {language === 'en' ? "Here is an overview of your research library." : "Voici un aperçu de votre bibliothèque de recherche."}
                    </p>
                </div>
                <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  {new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: BookOpen, label: language === 'en' ? 'Total Articles' : 'Total Articles', val: articles.length, color: 'text-blue-500', bg: 'bg-blue-50' },
                  { icon: Clock, label: language === 'en' ? 'Drafts' : 'Brouillons', val: articles.filter(a => a.status === 'pending').length, color: 'text-orange-500', bg: 'bg-orange-50' },
                  { icon: Check, label: language === 'en' ? 'Published' : 'Publiés', val: articles.filter(a => a.status === 'published').length, color: 'text-emerald-500', bg: 'bg-emerald-50' }
                ].map((card, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-6 hover:shadow-md transition-shadow">
                    <div className={`w-14 h-14 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center`}>
                      <card.icon size={28}/>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{card.label}</p>
                      <p className="text-3xl font-black mt-1">{card.val}</p>
                    </div>
                  </div>
                ))}
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                <h3 className="font-bold mb-10 flex items-center gap-2"><BarChart2 size={20}/> {language === 'en' ? 'Research Activity' : 'Activité de Recherche'}</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[{n: 'Jan', v: 4}, {n: 'Feb', v: 7}, {n: 'Mar', v: 5}, {n: 'Apr', v: 8}]}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                            <Bar dataKey="v" fill="#064e3b" radius={[10, 10, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
          </div>
        )}

        {/* ... Rest of the tabs (articles and editor) remain the same as the previous code ... */}
        {/* Note: I'm keeping the list and editor logic consistent with your working version */}
        
        {activeTab === 'articles' && (
          <div className="animate-in fade-in duration-500">
            <div className="flex justify-between items-end mb-8">
                <h2 className="text-3xl font-serif font-bold">{language === 'en' ? 'Publication Library' : 'Bibliothèque des publications'}</h2>
                <button onClick={() => setActiveTab('editor')} className="bg-emerald-950 text-yellow-500 px-6 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg active:scale-95 transition-all"><Plus size={20}/> {language === 'en' ? 'New Article' : 'Nouvel Article'}</button>
            </div>
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 text-[10px] uppercase font-black text-slate-400 tracking-widest border-b border-slate-100">
                        <tr>
                            <th className="px-10 py-6">{language === 'en' ? 'Article Title & Author' : 'Titre de l\'article & Auteur'}</th>
                            <th className="px-10 py-6">{language === 'en' ? 'Status' : 'Statut'}</th>
                            <th className="px-10 py-6 text-right">{language === 'en' ? 'Actions' : 'Actions'}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {articles.map(a => (
                            <tr key={a.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-10 py-8">
                                    <p className="font-bold text-lg mb-1 leading-tight">{a.title[language] || a.title['en']}</p>
                                    <div className="flex gap-4 text-xs text-slate-400 font-bold uppercase tracking-tighter">
                                        <span className="flex items-center gap-1"><User size={12}/> {a.author}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1"><Clock size={12}/> {a.date}</span>
                                    </div>
                                </td>
                                <td className="px-10 py-8">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${a.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                                        {a.status}
                                    </span>
                                </td>
                                <td className="px-10 py-8 text-right space-x-2">
                                    <button onClick={() => {
                                        setEditingId(a.id);
                                        setEditorData({
                                            title_en: a.title.en,
                                            title_fr: a.title.fr,
                                            author: a.author,
                                            date: a.date,
                                            status: a.status as any,
                                            pdf_path: a.pdf_path || ''
                                        });
                                        setActiveTab('editor');
                                    }} className="p-3 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"><Edit size={20}/></button>
                                    <button onClick={() => handleDelete(a.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"><Trash2 size={20}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
        )}

        {activeTab === 'editor' && (
          <div className="max-w-3xl mx-auto animate-in zoom-in-95 duration-500">
            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl p-10 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-3 bg-yellow-500"></div>
              <h2 className="text-3xl font-serif font-bold mb-10 flex items-center gap-4">
                <div className="p-3 bg-yellow-100 text-yellow-700 rounded-2xl"><Upload size={24}/></div>
                {editingId ? (language === 'en' ? 'Edit Publication' : 'Modifier la publication') : (language === 'en' ? 'Upload New Article' : 'Déposer un nouvel article')}
              </h2>

              {saveSuccess ? (
                <div className="py-20 text-center animate-in zoom-in">
                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"><Check size={48}/></div>
                    <p className="text-2xl font-serif font-bold text-emerald-950">{language === 'en' ? 'Successfully Saved' : 'Enregistré avec succès'}</p>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-slate-400">{language === 'en' ? 'Title (English)' : 'Titre (Anglais)'}</label>
                        <input value={editorData.title_en} onChange={e => setEditorData({...editorData, title_en: e.target.value})} className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-900/10" placeholder="Human Rights in Sahel..." />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-slate-400">{language === 'en' ? 'Title (French)' : 'Titre (Français)'}</label>
                        <input value={editorData.title_fr} onChange={e => setEditorData({...editorData, title_fr: e.target.value})} className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-900/10" placeholder="Les droits de l'homme..." />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-slate-400">{language === 'en' ? 'Author' : 'Auteur'}</label>
                        <input value={editorData.author} onChange={e => setEditorData({...editorData, author: e.target.value})} className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none" placeholder="Dr. Jane Doe" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-slate-400">{language === 'en' ? 'Status' : 'Statut'}</label>
                        <select value={editorData.status} onChange={e => setEditorData({...editorData, status: e.target.value as any})} className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none font-bold">
                          <option value="published">{language === 'en' ? 'Published' : 'Publié'}</option>
                          <option value="pending">{language === 'en' ? 'Draft' : 'Brouillon'}</option>
                        </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-400">{language === 'en' ? 'PDF Document' : 'Document PDF'}</label>
                    <div className="border-4 border-dashed border-slate-100 rounded-[2.5rem] p-16 text-center relative hover:bg-emerald-50/50 transition-all group">
                        <input type="file" id="pdf-upload" accept="application/pdf" className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                        <FileCheck className="text-emerald-900 mx-auto mb-4 group-hover:scale-110 transition-transform" size={48}/>
                        <p className="text-lg font-bold">{language === 'en' ? 'Drop your PDF here' : 'Déposez votre PDF ici'}</p>
                        <p className="text-[10px] text-red-500 font-black mt-2 uppercase tracking-widest">MAX: 10MB</p>
                    </div>
                  </div>

                  <button onClick={handleSave} className="w-full bg-emerald-950 text-yellow-500 py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 shadow-xl">
                    <Save size={28}/> {editingId ? (language === 'en' ? 'Update Library' : 'Mettre à jour') : (language === 'en' ? 'Save Publication' : 'Enregistrer')}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;