import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Upload,
  Plus, 
  BarChart2, 
  Wand2, 
  Loader2, 
  Save,
  LogOut,
  Home,
  Lock,
  Menu,
  X,
  MapPin,
  File,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useArticles } from '../context/ArticleContext';
import { generateArticleIdea } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { SAMPLE_PDF } from '../constants';

const Admin: React.FC = () => {
  const { t, language } = useLanguage();
  const { articles, addArticle, deleteArticle } = useArticles();
  const useNavigateRef = useNavigate();
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // UI State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'articles' | 'upload'>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // AI Generation State
  const [aiTopic, setAiTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdea, setGeneratedIdea] = useState<{title: string, summary: string} | null>(null);
  const [generationError, setGenerationError] = useState('');

  // Upload Form State
  const [uploadData, setUploadData] = useState({
    title: '',
    author: '',
    fileName: ''
  });
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Mock Stats Data (Cameroon Context)
  const data = [
    { name: 'Lun', views: 120000 },
    { name: 'Mar', views: 240000 },
    { name: 'Mer', views: 450000 },
    { name: 'Jeu', views: 320000 },
    { name: 'Ven', views: 510000 },
    { name: 'Sam', views: 180000 },
    { name: 'Dim', views: 210000 },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Passcode: 09871234
    if (password === '09871234') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Mot de passe incorrect / Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleGenerateIdea = async () => {
    if (!aiTopic) return;
    setIsGenerating(true);
    setGenerationError('');
    setGeneratedIdea(null);
    
    try {
      const result = await generateArticleIdea(aiTopic, language);
      if (result.title && result.summary) {
        setGeneratedIdea(result);
        setUploadData(prev => ({...prev, title: result.title}));
      } else {
        setGenerationError('Failed to parse AI response.');
      }
    } catch (e) {
      setGenerationError('Error connecting to AI service.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadData({...uploadData, fileName: e.target.files[0].name});
    }
  };

  const handlePublish = () => {
    if (!uploadData.title || !uploadData.author) return;
    
    // Create a new article object
    const newArticle = {
      id: Date.now().toString(),
      title: { en: uploadData.title, fr: uploadData.title }, // Using same title for both just for demo if not provided
      excerpt: { en: `Authored by ${uploadData.author}`, fr: `Rédigé par ${uploadData.author}` },
      category: 'Uploaded',
      date: new Date().toLocaleDateString(),
      imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      readTime: 'PDF',
      pdfUrl: SAMPLE_PDF // In a real app, this would be the actual uploaded file URL
    };

    addArticle(newArticle);
    setUploadSuccess(true);
    
    // Reset form after delay and switch to articles view
    setTimeout(() => {
      setUploadSuccess(false);
      setUploadData({ title: '', author: '', fileName: '' });
      setActiveTab('articles');
    }, 1500);
  };

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-emerald-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Abstract Cameroon Flag Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-950 to-red-900/20"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>

        <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl max-w-md w-full relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/20">
              <Lock className="text-emerald-950" size={32} />
            </div>
          </div>
          <h2 className="text-3xl font-serif font-bold text-center text-white mb-2">{t('adminDashboard')}</h2>
          <p className="text-emerald-200 text-center text-sm mb-8">Douala • Yaoundé • Bamenda</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-emerald-100 text-sm font-medium mb-2">Access Code</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="09871234"
                className="w-full px-4 py-3 bg-emerald-900/50 border border-emerald-700 rounded-lg text-white placeholder-emerald-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all text-center tracking-widest"
              />
            </div>
            {authError && <p className="text-red-400 text-sm text-center font-medium bg-red-900/20 py-2 rounded">{authError}</p>}
            
            <div className="flex gap-4">
              <button 
                type="button"
                onClick={() => useNavigateRef('/')}
                className="flex-1 py-3 px-4 rounded-lg border border-emerald-700 text-emerald-200 hover:bg-emerald-800 transition-colors text-sm font-semibold"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-emerald-950 font-bold py-3 px-4 rounded-lg shadow-lg shadow-yellow-900/20 transition-all transform hover:scale-[1.02]"
              >
                Login
              </button>
            </div>
          </form>
          <p className="mt-8 text-center text-xs text-emerald-400/60">
            Protected by Industry Standards
          </p>
        </div>
      </div>
    );
  }

  // --- DASHBOARD UI ---
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-emerald-900 text-white p-4 flex justify-between items-center z-20 sticky top-0 shadow-md">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center text-emerald-900 font-bold text-xs">J</div>
           <span className="font-serif font-bold">Juris Admin</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-10 w-64 bg-emerald-900 text-emerald-100 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-emerald-800 bg-emerald-950/30">
           <span className="text-xs uppercase tracking-wider font-semibold text-yellow-500">Cameroon Office</span>
           <h2 className="text-xl font-bold text-white mt-1 font-serif">Maître Sterling</h2>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium w-full text-left rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-yellow-500 text-emerald-900 shadow-md' : 'hover:bg-emerald-800'}`}
          >
            <LayoutDashboard size={18} />
            {t('adminDashboard')}
          </button>
          <button 
             onClick={() => { setActiveTab('articles'); setIsMobileMenuOpen(false); }}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium w-full text-left rounded-lg transition-colors ${activeTab === 'articles' ? 'bg-yellow-500 text-emerald-900 shadow-md' : 'hover:bg-emerald-800'}`}
          >
            <FileText size={18} />
            Articles
          </button>
          <button 
             onClick={() => { setActiveTab('upload'); setIsMobileMenuOpen(false); }}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium w-full text-left rounded-lg transition-colors ${activeTab === 'upload' ? 'bg-yellow-500 text-emerald-900 shadow-md' : 'hover:bg-emerald-800'}`}
          >
            <Upload size={18} />
            Upload PDF
          </button>
          
          <div className="pt-4 mt-4 border-t border-emerald-800">
             <Link 
              to="/" 
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium w-full text-left rounded-lg hover:bg-emerald-800 transition-colors text-emerald-200"
            >
              <Home size={18} />
              Retour au Site
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium w-full text-left rounded-lg hover:bg-red-900/50 hover:text-red-200 transition-colors text-red-300"
            >
              <LogOut size={18} />
              Déconnexion
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-emerald-800 bg-emerald-950/30">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xs border border-red-500">CM</div>
             <div>
               <p className="text-sm text-white font-medium">Yaoundé HQ</p>
               <p className="text-xs text-emerald-400">Online</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content Panel */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-[calc(100vh-60px)] md:h-screen bg-gray-50">
        
        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <div className="animate-fade-in space-y-6">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
               <div>
                  <h2 className="text-3xl font-serif font-bold text-emerald-950">Aperçu / Overview</h2>
                  <p className="text-gray-500 text-sm">Welcome back to the Douala workspace.</p>
               </div>
               <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                 <MapPin size={16} className="text-red-600" />
                 <span className="text-sm font-bold text-slate-700">Akwa, Douala</span>
               </div>
            </header>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-emerald-600">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Revenue (XAF)</p>
                    <h3 className="text-2xl font-bold text-slate-900">2.4M <span className="text-sm text-gray-400 font-normal">FCFA</span></h3>
                  </div>
                  <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                    <BarChart2 size={24} />
                  </div>
                </div>
                <p className="text-xs text-emerald-600 font-bold bg-emerald-50 inline-block px-2 py-1 rounded">+12% vs last month</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Documents</p>
                    <h3 className="text-2xl font-bold text-slate-900">{articles.length}</h3>
                  </div>
                  <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
                    <FileText size={24} />
                  </div>
                </div>
                <p className="text-xs text-gray-500 font-medium">Published in Library</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Pending Cases</p>
                    <h3 className="text-2xl font-bold text-slate-900">7</h3>
                  </div>
                  <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                    <Plus size={24} />
                  </div>
                </div>
                <p className="text-xs text-red-600 font-medium bg-red-50 inline-block px-2 py-1 rounded">2 Urgent (Tribunal)</p>
              </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-8">
               <h3 className="text-lg font-bold text-emerald-950 mb-6 flex items-center gap-2">
                 <span className="w-2 h-6 bg-yellow-500 rounded-sm"></span>
                 Weekly Engagement (Douala vs Yaoundé)
               </h3>
               <div className="h-72 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" fontSize={12} stroke="#64748b" tickLine={false} axisLine={false} />
                     <YAxis fontSize={12} stroke="#64748b" tickLine={false} axisLine={false} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#064e3b', border: 'none', borderRadius: '8px', color: '#fff' }}
                        itemStyle={{ color: '#fbbf24' }}
                        cursor={{fill: '#ecfdf5'}}
                     />
                     <Bar dataKey="views" fill="#059669" radius={[4, 4, 0, 0]} barSize={32} />
                   </BarChart>
                 </ResponsiveContainer>
               </div>
            </div>
          </div>
        )}

        {/* Articles List View */}
        {activeTab === 'articles' && (
          <div className="animate-fade-in max-w-6xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-emerald-950 mb-6">
              Published Documents
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-emerald-900 text-emerald-100">
                    <tr>
                      <th className="px-6 py-4 font-semibold">{t('adminTableTitle')}</th>
                      <th className="px-6 py-4 font-semibold">{t('adminTableCategory')}</th>
                      <th className="px-6 py-4 font-semibold">{t('adminTableDate')}</th>
                      <th className="px-6 py-4 font-semibold text-right">{t('adminTableActions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {articles.length > 0 ? (
                      articles.map((article) => (
                        <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900">
                            {article.title[language]}
                          </td>
                          <td className="px-6 py-4">
                            <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-sm text-xs font-bold uppercase">
                              {article.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-500">
                            {article.date}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => deleteArticle(article.id)}
                              className="text-gray-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-full"
                              title={t('adminDelete')}
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500 italic">
                          {t('adminEmpty')}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Upload/New Article View */}
        {(activeTab === 'upload') && (
           <div className="animate-fade-in max-w-4xl mx-auto">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h2 className="text-2xl font-serif font-bold text-emerald-950">
                  Upload New Document
                </h2>
             </div>

             {/* Contextual AI Widget */}
             <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 rounded-xl p-6 md:p-8 mb-8 text-white shadow-xl relative overflow-hidden border-t-4 border-yellow-500">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4 text-yellow-400">
                      <Wand2 size={20} />
                      <span className="font-bold text-sm uppercase tracking-wide">Assistant IA Juridique</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif font-medium mb-2">Generate a Title</h3>
                    <p className="text-emerald-200 text-sm mb-6">Need a professional title for your document?</p>
                    
                    <div className="flex flex-col md:flex-row gap-4 items-start">
                      <div className="flex-1 w-full">
                        <input 
                          type="text" 
                          value={aiTopic}
                          onChange={(e) => setAiTopic(e.target.value)}
                          placeholder="Ex: Droit foncier, Création d'entreprise SARL..."
                          className="w-full bg-black/20 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-emerald-300/50 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
                        />
                        {generationError && <p className="text-red-300 text-xs mt-2 bg-red-900/40 p-1 rounded inline-block">{generationError}</p>}
                      </div>
                      <button 
                        onClick={handleGenerateIdea}
                        disabled={isGenerating || !aiTopic}
                        className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-emerald-950 px-6 py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 shadow-md"
                      >
                        {isGenerating ? <Loader2 size={18} className="animate-spin" /> : 'Générer'}
                      </button>
                    </div>
                  </div>
             </div>

             {/* Upload Form */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                {uploadSuccess ? (
                  <div className="flex flex-col items-center justify-center py-10 text-emerald-600 animate-fade-in">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                      <Save size={32} />
                    </div>
                    <h3 className="text-xl font-bold">Document Published Successfully!</h3>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Author Name</label>
                      <input 
                        type="text" 
                        value={uploadData.author}
                        onChange={(e) => setUploadData({...uploadData, author: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-all"
                        placeholder="Enter author name"
                      />
                    </div>

                    {/* Title */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Article Title</label>
                      <input 
                        type="text" 
                        value={uploadData.title}
                        onChange={(e) => setUploadData({...uploadData, title: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-all"
                        placeholder="Enter article title"
                      />
                    </div>

                    {/* PDF Upload */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Upload PDF</label>
                      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-10 text-center hover:bg-emerald-50 transition-colors group cursor-pointer">
                        <input 
                          type="file" 
                          accept=".pdf"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center gap-3">
                          {uploadData.fileName ? (
                            <>
                              <File size={48} className="text-emerald-600" />
                              <span className="font-medium text-slate-900">{uploadData.fileName}</span>
                              <span className="text-xs text-emerald-600 font-bold bg-emerald-100 px-2 py-1 rounded">PDF READY</span>
                            </>
                          ) : (
                            <>
                              <Upload size={48} className="text-gray-400 group-hover:text-emerald-500 transition-colors" />
                              <span className="text-gray-500 font-medium">Click to upload PDF</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button 
                        onClick={handlePublish}
                        disabled={!uploadData.title || !uploadData.author}
                        className="w-full bg-emerald-900 hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-4 rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
                      >
                        <Save size={18} /> Publish to Library
                      </button>
                    </div>
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
