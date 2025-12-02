import React, { useState } from 'react';
import { Send, UploadCloud, File, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Submit: React.FC = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    title: ''
  });
  const [fileName, setFileName] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct mailto link
    const recipient = "keblehonour@gmail.com";
    const subject = encodeURIComponent(`Submission: ${formData.title}`);
    const body = encodeURIComponent(
      `Author Name: ${formData.name}\n` +
      `Contact: ${formData.contact}\n` +
      `Article Title: ${formData.title}\n\n` +
      `[IMPORTANT: Please attach the file '${fileName || 'your document'}' to this email before sending.]`
    );

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center bg-emerald-950 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-emerald-950/70 to-emerald-950/80"></div>
        
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6 pt-20">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-lg">
             {t('submitHeroTitle')}
          </h1>
          <p className="text-emerald-100 text-lg md:text-xl font-light leading-relaxed">
            {t('submitHeroSubtitle')}
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 -mt-20 relative z-20 pb-20">
        
        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-emerald-900 p-6 text-white flex items-center gap-4 border-b border-emerald-800">
             <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center shrink-0 shadow-lg">
               <Send size={24} className="text-emerald-950" />
             </div>
             <div>
               <h2 className="font-serif font-bold text-xl">{t('submitHeroTitle')}</h2>
               <p className="text-emerald-200 text-sm">Douala Office Inbox</p>
             </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-6">
            
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">{t('submitName')}</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
                placeholder={language === 'en' ? "e.g., Dr. Samuel Eto'o" : "ex. Dr. Samuel Eto'o"}
              />
            </div>

            {/* Title (Previously Topic) */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">{t('submitTopic')}</label>
              <input 
                type="text" 
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
                placeholder={language === 'en' ? "e.g., Land Tenure Reform in West Region" : "ex. Réforme Foncier à l'Ouest"}
              />
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">{t('submitContact')}</label>
              <input 
                type="text" 
                name="contact"
                required
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
                placeholder="email@example.com / +237..."
              />
            </div>

            {/* File Upload Visual */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">{t('submitFile')}</label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-emerald-50 transition-colors group cursor-pointer">
                <input 
                  type="file" 
                  accept=".pdf"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center gap-3">
                  {fileName ? (
                    <>
                      <File size={48} className="text-emerald-600" />
                      <span className="font-medium text-slate-900">{fileName}</span>
                      <span className="text-xs text-green-600 font-semibold uppercase tracking-wide">Ready to Attach</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud size={48} className="text-gray-400 group-hover:text-yellow-500 transition-colors" />
                      <span className="text-gray-500 font-medium">
                        {language === 'en' ? 'Click to select PDF file' : 'Cliquez pour sélectionner le fichier PDF'}
                      </span>
                      <span className="text-xs text-gray-400">PDF Only</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 flex gap-3">
              <AlertCircle className="text-emerald-600 shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-emerald-800 leading-relaxed">
                {t('submitNote')}
              </p>
            </div>

            <button 
              type="submit" 
              className="w-full bg-emerald-900 text-white font-bold py-4 rounded-sm hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              {t('submitBtn')} <Send size={18} />
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Submit;