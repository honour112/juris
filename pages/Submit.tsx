import React, { useState } from 'react';
import { Send, FileText, AlertCircle, BookOpen, Clock, ShieldAlert, Paperclip, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Submit: React.FC = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    title: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Updated Recipient
    const recipient = "revueafricainedessciencessocia@gmail.com";
    const subject = encodeURIComponent(`Submission: ${formData.title}`);
    const body = encodeURIComponent(
      `Author Name: ${formData.name}\n` +
      `Contact: ${formData.contact}\n` +
      `Article Title: ${formData.title}\n\n` +
      `[IMPORTANT: I have attached the Word document to this email.]`
    );

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center bg-emerald-950 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://th.bing.com/th/id/OIP.XMYO4YVCQKnlWD5GgCO6FQHaE8?w=254&h=180&c=7&r=0&o=5&cb=ucfimg2&pid=1.7&ucfimg=1')] bg-cover bg-center opacity-20 animate-fade-in"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-emerald-950/70 to-emerald-950/80"></div>
        
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6 pt-20">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-lg animate-fade-in-up">
             {t('submitHeroTitle')}
          </h1>
          <p className="text-emerald-100 text-lg md:text-xl font-light leading-relaxed animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            {t('submitHeroSubtitle')}
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 -mt-24 relative z-20 pb-20">
        
        {/* Editorial Policy / Politique de Rédaction */}
        <div className="bg-white rounded-lg shadow-xl border border-gray-100 mb-10 overflow-hidden animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
           <div className="bg-emerald-900 p-8 text-white">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 flex items-center gap-3">
                 <BookOpen className="text-yellow-500" size={32} />
                 {t('editorialPolicyTitle')}
              </h2>
              <p className="text-emerald-100 leading-relaxed text-lg max-w-3xl">
                 {t('epIntro')}
              </p>
           </div>
           
           <div className="p-8 grid md:grid-cols-3 gap-8 bg-white">
              {/* Formatting */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:border-yellow-500 transition-colors group animate-fade-in opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                 <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:bg-yellow-500 group-hover:text-emerald-950 transition-colors duration-300">
                   <FileText size={20} />
                 </div>
                 <h3 className="font-bold text-lg text-emerald-950 mb-3">{t('epFormatTitle')}</h3>
                 <p className="text-sm text-gray-600 leading-relaxed">{t('epFormatDesc')}</p>
              </div>

              {/* Evaluation */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:border-yellow-500 transition-colors group animate-fade-in opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                 <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:bg-yellow-500 group-hover:text-emerald-950 transition-colors duration-300">
                   <ShieldAlert size={20} />
                 </div>
                 <h3 className="font-bold text-lg text-emerald-950 mb-3">{t('epReviewTitle')}</h3>
                 <p className="text-sm text-gray-600 leading-relaxed">{t('epReviewDesc')}</p>
              </div>

              {/* Deadlines */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:border-yellow-500 transition-colors group animate-fade-in opacity-0" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
                 <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:bg-yellow-500 group-hover:text-emerald-950 transition-colors duration-300">
                   <Clock size={20} />
                 </div>
                 <h3 className="font-bold text-lg text-emerald-950 mb-3">{t('epDeadlineTitle')}</h3>
                 <p className="text-sm text-gray-600 leading-relaxed">{t('epDeadlineDesc')}</p>
              </div>
           </div>
        </div>

        {/* Submission Form */}
        <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          <div className="bg-gray-50 p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div>
               <h2 className="font-serif font-bold text-xl text-emerald-950 flex items-center gap-2">
                 <Send size={20} className="text-emerald-700" />
                 {t('submitBtn')}
               </h2>
               <p className="text-gray-500 text-sm mt-1">{t('sendTo')} <span className="font-mono font-bold text-emerald-800">revueafricainedessciencessocia@gmail.com</span></p>
             </div>
             <div className="bg-yellow-50 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full border border-yellow-200 uppercase tracking-wide self-start md:self-center">
                {t('wordDocOnly')}
             </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-emerald-900 mb-2">{t('submitName')}</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all bg-gray-50 focus:bg-white"
                  placeholder={language === 'en' ? "Full Name & Title" : "Nom Complet & Titre"}
                />
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-bold text-emerald-900 mb-2">{t('submitContact')}</label>
                <input 
                  type="text" 
                  name="contact"
                  required
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all bg-gray-50 focus:bg-white"
                  placeholder="email@institution.edu"
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-bold text-emerald-900 mb-2">{t('submitTopic')}</label>
              <input 
                type="text" 
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all bg-gray-50 focus:bg-white"
                placeholder={language === 'en' ? "Title of your manuscript" : "Titre de votre manuscrit"}
              />
            </div>

            {/* Instruction Visual - No Input */}
            <div>
              <label className="block text-sm font-bold text-emerald-900 mb-2">{t('submitFile')}</label>
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-8 text-center flex flex-col items-center gap-4 hover:bg-emerald-100/50 transition-colors duration-300">
                 <div className="flex gap-4 mb-2">
                   <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-emerald-600 border border-emerald-100 animate-bounce" style={{ animationDuration: '2s' }}>
                      <Mail size={28} />
                   </div>
                   <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-yellow-600 border border-emerald-100 animate-bounce" style={{ animationDuration: '2.5s' }}>
                      <Paperclip size={28} />
                   </div>
                 </div>
                 
                 <h3 className="text-lg font-serif font-bold text-emerald-950">{t('emailRedirectTitle')}</h3>
                 <p className="text-gray-600 max-w-lg mx-auto leading-relaxed">
                   {t('emailRedirectInfo')}
                 </p>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 flex gap-3">
              <AlertCircle className="text-yellow-700 shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-yellow-900 leading-relaxed font-medium">
                {t('submitNote')}
              </p>
            </div>

            <button 
              type="submit" 
              className="w-full bg-emerald-950 text-white font-bold py-4 rounded-sm hover:bg-emerald-900 transition-all flex items-center justify-center gap-3 shadow-lg transform active:scale-[0.99] hover:shadow-xl duration-200"
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