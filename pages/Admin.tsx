import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, FileText, Plus, Save, LogOut, Home, Lock, 
  Menu, X, Trash2, User, Check, Edit, Loader2, BookOpen, 
  Clock, BarChart2, Upload, Languages, FileCheck
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Article } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
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

  // Salutations en Français par défaut
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting(language === 'fr' ? 'Bonjour' : 'Good Morning');
    else if (hour < 18) setGreeting(language === 'fr' ? 'Bon après-midi' : 'Good Afternoon');
    else setGreeting(language === 'fr' ? 'Bonsoir' : 'Good Evening');
  }, [language]);

  useEffect(() => {
    if (isAuthenticated) fetchArticles();
  }, [isAuthenticated]);

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
      setAuthError(language === 'fr' ? "Échec de connexion: " + err.message : "Login failed: " + err.message);
    } finally {
      setIsGlobalLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editorData.title_fr || !editorData.author) {
      alert(language === 'fr' ? "Champs obligatoires manquants" : "Missing required fields");
      return;
    }
    setIsGlobalLoading(true);
    try {
      let finalPath = editorData.pdf_path;
      const fileInput = document.querySelector<HTMLInputElement>('#pdf-upload');
      const file = fileInput?.files?.[0];

      if (file) {
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
    if (!window.confirm(language === 'fr' ? "Supprimer définitivement ?" : "Permanent delete?")) return;
    setIsGlobalLoading(true);
    await supabase.from('articles').delete().eq('id', id);
    setArticles(articles.filter(a => a.id !== id));
    setIsGlobalLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-emerald-950 flex items-center justify-center p-6 relative overflow-hidden">
        <form onSubmit={handleLogin} className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl w-full max-w-sm border border-white/10 shadow-2xl relative z-10">
          <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3">
            <Lock className="text-emerald-950" size={28} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-white text-center mb-6">{language === 'fr' ? 'Connexion Admin' : 'Admin Login'}</h2>
          <div className="space-y-4">
            <input type="email" placeholder="Email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-yellow-500 transition-all" required />
            <input type="password" placeholder={language === 'fr' ? "Mot de passe" : "Password"} value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-yellow-500 transition-all" required />
          </div>
          {authError && <p className="text-red-400 text-xs mt-4 text-center font-bold">{authError}</p>}
          <button className="w-full bg-yellow-500 py-4 rounded-xl font-bold text-emerald-950 mt-6 hover:bg-yellow-400 transition-all active:scale-95 shadow-xl">
            {language === 'fr' ? 'Se connecter' : 'Login'}
          </button>
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
            <span className="font-bold text-xs uppercase tracking-widest">{language === 'fr' ? 'Traitement...' : 'Processing...'}</span>
          </div>
        </div>
      )}

      {/* Sidebar - Mobile Responsive */}
      <aside className={`w-full md:w-80 bg-emerald-950 text-white p-6 flex flex-col fixed md:sticky top-0 z-50 h-screen transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center font-black text-emerald-950">RA</div>
            <h2 className="font-serif font-bold text-2xl">RASS <span className="text-yellow-500 text-xs font-sans uppercase">Admin</span></h2>
          </div>
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(false)}><X/></button>
        </div>

        <div className="mb-8 p-4 bg-white/5 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center border border-emerald-700">
              <User size={18} className="text-yellow-500"/>
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-tighter">Administrateur</p>
              <p className="text-sm font-bold truncate">Sapitoden Elie</p>
            </div>
          </div>
          
          <button 
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className="w-full flex items-center justify-between px-3 py-2 bg-emerald-900/50 rounded-xl hover:bg-yellow-500 hover:text-emerald-950 transition-all group"
          >
            <div className="flex items-center gap-2">
              <Languages size={14}/>
              <span className="text-xs font-bold uppercase tracking-widest">{language === 'fr' ? 'Français' : 'English'}</span>
            </div>
            <span className="text-[10px] font-black opacity-40 group-hover:opacity-100 uppercase">{language === 'fr' ? 'Switch to EN' : 'Passer en FR'}</span>
          </button>
        </div>
        
        <nav className="flex-1 space-y-2">
          <button onClick={() => {setActiveTab('dashboard'); setIsMobileMenuOpen(false)}} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'dashboard' ? 'bg-yellow-500 text-emerald-950 font-bold' : 'hover:bg-white/5 text-emerald-100/60'}`}><LayoutDashboard size={20}/> {language === 'fr' ? 'Tableau de bord' : 'Dashboard'}</button>
          <button onClick={() => {setActiveTab('articles'); setIsMobileMenuOpen(false)}} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'articles' ? 'bg-yellow-500 text-emerald-950 font-bold' : 'hover:bg-white/5 text-emerald-100/60'}`}><FileText size={20}/> {language === 'fr' ? 'Bibliothèque' : 'Library'}</button>
          <button onClick={() => {setEditingId(null); setActiveTab('editor'); setIsMobileMenuOpen(false)}} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'editor' ? 'bg-yellow-500 text-emerald-950 font-bold' : 'hover:bg-white/5 text-emerald-100/60'}`}><Plus size={20}/> {language === 'fr' ? 'Nouveau dépôt' : 'New Upload'}</button>
        </nav>

        <div className="pt-6 border-t border-white/5 mt-auto">
          <Link to="/" className="flex items-center gap-4 p-4 text-emerald-100/60 hover:text-white transition-colors mb-2">
            <Home size={20}/> {language === 'fr' ? 'Voir le site' : 'View Website'}
          </Link>
          <button onClick={() => {supabase.auth.signOut(); localStorage.removeItem('rass_admin_session'); setIsAuthenticated(false)}} className="w-full flex items-center gap-4 p-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-colors font-bold text-left"><LogOut size={20}/> {language === 'fr' ? 'Déconnexion' : 'Logout'}</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-12 overflow-y-auto min-h-screen">
        <button className="md:hidden mb-6 p-3 bg-white rounded-xl shadow-sm border border-slate-200" onClick={() => setIsMobileMenuOpen(true)}><Menu/></button>

        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-emerald-950">{greeting}, Sapitoden Elie</h1>
                    <p className="text-slate-400 font-medium mt-1">
                      {language === 'fr' ? "Voici un aperçu de votre bibliothèque de recherche." : "Here is an overview of your research library."}
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: BookOpen, label: language === 'fr' ? 'Articles Totaux' : 'Total Articles', val: articles.length, color: 'text-blue-500', bg: 'bg-blue-50' },
                  { icon: Clock, label: language === 'fr' ? 'Brouillons' : 'Drafts', val: articles.filter(a => a.status === 'pending').length, color: 'text-orange-500', bg: 'bg-orange-50' },
                  { icon: Check, label: language === 'fr' ? 'Publiés' : 'Published', val: articles.filter(a => a.status === 'published').length, color: 'text-emerald-500', bg: 'bg-emerald-50' }
                ].map((card, idx) => (
                  <div key={idx} className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-6">
                    <div className={`w-14 h-14 shrink-0 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center`}>
                      <card.icon size={28}/>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{card.label}</p>
                      <p className="text-3xl font-black mt-1">{card.val}</p>
                    </div>
                  </div>
                ))}
            </div>

            <div className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <h3 className="font-bold mb-10 flex items-center gap-2"><BarChart2 size={20}/> {language === 'fr' ? 'Activité de Recherche' : 'Research Activity'}</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[{n: 'Jan', v: 4}, {n: 'Feb', v: 7}, {n: 'Mar', v: 5}, {n: 'Apr', v: 8}]}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="n" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '16px', border: 'none'}} />
                            <Bar dataKey="v" fill="#064e3b" radius={[10, 10, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'articles' && (
          <div className="animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-serif font-bold">{language === 'fr' ? 'Bibliothèque des publications' : 'Publication Library'}</h2>
                <button onClick={() => setActiveTab('editor')} className="bg-emerald-950 text-yellow-500 px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg transition-all"><Plus size={20}/> {language === 'fr' ? 'Nouvel Article' : 'New Article'}</button>
            </div>

            {/* RESPONSIVE CARD GRID INSTEAD OF TABLE */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {articles.map(a => (
                    <div key={a.id} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${a.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                                    {a.status === 'published' ? (language === 'fr' ? 'Publié' : 'Published') : (language === 'fr' ? 'Brouillon' : 'Draft')}
                                </span>
                                <div className="flex gap-1">
                                    <button onClick={() => {
                                        setEditingId(a.id);
                                        setEditorData({
                                            title_en: a.title.en, title_fr: a.title.fr, author: a.author,
                                            date: a.date, status: a.status as any, pdf_path: a.pdf_path || ''
                                        });
                                        setActiveTab('editor');
                                    }} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"><Edit size={18}/></button>
                                    <button onClick={() => handleDelete(a.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
                                </div>
                            </div>
                            <h3 className="font-bold text-lg leading-tight mb-4 min-h-[3rem] line-clamp-2">
                                {language === 'fr' ? (a.title.fr || a.title.en) : (a.title.en || a.title.fr)}
                            </h3>
                        </div>
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-bold">
                            <span className="flex items-center gap-1 truncate max-w-[150px]"><User size={12}/> {a.author}</span>
                            <span className="flex items-center gap-1"><Clock size={12}/> {a.date}</span>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        )}

        {activeTab === 'editor' && (
          <div className="max-w-3xl mx-auto animate-in zoom-in-95 duration-500">
            <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] border border-slate-200 shadow-2xl p-6 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-3 bg-yellow-500"></div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-10 flex items-center gap-4">
                <div className="p-3 bg-yellow-100 text-yellow-700 rounded-2xl"><Upload size={24}/></div>
                {editingId ? (language === 'fr' ? 'Modifier la publication' : 'Edit Publication') : (language === 'fr' ? 'Déposer un nouvel article' : 'Upload New Article')}
              </h2>

              {saveSuccess ? (
                <div className="py-20 text-center animate-in zoom-in">
                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"><Check size={48}/></div>
                    <p className="text-2xl font-serif font-bold text-emerald-950">{language === 'fr' ? 'Enregistré avec succès' : 'Successfully Saved'}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-slate-400">{language === 'fr' ? 'Titre (Français)' : 'Title (French)'}</label>
                        <input value={editorData.title_fr} onChange={e => setEditorData({...editorData, title_fr: e.target.value})} className="w-full p-4 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-emerald-900/10" placeholder="Les droits de l'homme..." />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-slate-400">{language === 'fr' ? 'Titre (Anglais)' : 'Title (English)'}</label>
                        <input value={editorData.title_en} onChange={e => setEditorData({...editorData, title_en: e.target.value})} className="w-full p-4 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-emerald-900/10" placeholder="Human Rights..." />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-slate-400">{language === 'fr' ? 'Auteur' : 'Author'}</label>
                        <input value={editorData.author} onChange={e => setEditorData({...editorData, author: e.target.value})} className="w-full p-4 bg-slate-50 border-none rounded-xl outline-none" placeholder="Sapitoden Elie" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-slate-400">{language === 'fr' ? 'Statut' : 'Status'}</label>
                        <select value={editorData.status} onChange={e => setEditorData({...editorData, status: e.target.value as any})} className="w-full p-4 bg-slate-50 border-none rounded-xl outline-none font-bold">
                          <option value="published">{language === 'fr' ? 'Publié' : 'Published'}</option>
                          <option value="pending">{language === 'fr' ? 'Brouillon' : 'Draft'}</option>
                        </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-400">{language === 'fr' ? 'Document PDF' : 'PDF Document'}</label>
                    <div className="border-4 border-dashed border-slate-100 rounded-[2rem] p-8 md:p-16 text-center relative hover:bg-emerald-50/50 transition-all group">
                        <input type="file" id="pdf-upload" accept="application/pdf" className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                        <FileCheck className="text-emerald-900 mx-auto mb-4 group-hover:scale-110 transition-transform" size={48}/>
                        <p className="text-lg font-bold">{language === 'fr' ? 'Glissez votre PDF ici' : 'Drop your PDF here'}</p>
                        <p className="text-[10px] text-red-500 font-black mt-2 uppercase tracking-widest">PDF MAX: 10MB</p>
                    </div>
                  </div>

                  <button onClick={handleSave} className="w-full bg-emerald-950 text-yellow-500 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-4 hover:shadow-xl active:scale-95 transition-all">
                    <Save size={24}/> {editingId ? (language === 'fr' ? 'Mettre à jour' : 'Update') : (language === 'fr' ? 'Enregistrer la publication' : 'Save Publication')}
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