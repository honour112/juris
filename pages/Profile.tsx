import React from 'react';
import { Mail, Phone, Calendar, MapPin, Scale, Award, BookOpen, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LAWYER_PROFILE } from '../constants';

const Profile: React.FC = () => {
  const { language } = useLanguage();
  const profile = LAWYER_PROFILE;

  // Icon mapping
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scale': return <Scale size={24} className="text-yellow-600" />;
      case 'Shield': return <Shield size={24} className="text-yellow-600" />;
      case 'BookOpen': return <BookOpen size={24} className="text-yellow-600" />;
      default: return <Award size={24} className="text-yellow-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Profile Hero */}
      <div className="relative bg-emerald-950 text-white pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-emerald-900/40 via-emerald-950/90 to-emerald-950"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl z-10"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-20">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
            
            {/* Image Card */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-emerald-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-64 h-80 md:w-80 md:h-96 rounded-lg overflow-hidden border-4 border-emerald-900 shadow-2xl">
                 <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Maître Eleanor Sterling" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white text-emerald-950 p-4 rounded-sm shadow-xl hidden md:block border-l-4 border-yellow-500">
                <p className="font-serif font-bold text-2xl">{profile.yearsExperience}+</p>
                <p className="text-xs uppercase tracking-wider font-semibold text-gray-500">Years Exp.</p>
              </div>
            </div>

            {/* Basic Info */}
            <div className="text-center md:text-left flex-1">
              <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-4">
                Senior Partner
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-2 tracking-wide text-white">{profile.name}</h1>
              <p className="text-xl text-yellow-500 font-medium mb-8 tracking-wide">{profile.title[language]}</p>
              
              <div className="flex flex-col md:flex-row gap-6 mb-10 justify-center md:justify-start">
                <a href="mailto:eleanor@juris.cm" className="flex items-center gap-3 text-emerald-100 hover:text-white transition-colors">
                  <div className="w-10 h-10 rounded-full bg-emerald-800/80 flex items-center justify-center border border-emerald-700">
                    <Mail size={18} />
                  </div>
                  <span>eleanor@juris.cm</span>
                </a>
                <a href="tel:+237699000000" className="flex items-center gap-3 text-emerald-100 hover:text-white transition-colors">
                  <div className="w-10 h-10 rounded-full bg-emerald-800/80 flex items-center justify-center border border-emerald-700">
                    <Phone size={18} />
                  </div>
                  <span>+237 699 00 00 00</span>
                </a>
              </div>

              <button className="bg-yellow-500 text-emerald-950 px-8 py-3 rounded-sm font-bold hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-900/20 flex items-center gap-2 mx-auto md:mx-0">
                <Calendar size={18} />
                {language === 'en' ? 'Schedule Consultation' : 'Prendre Rendez-vous'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Left Column: Bio */}
          <div className="lg:col-span-2 space-y-12">
            {/* About */}
            <section>
              <h2 className="text-3xl font-serif font-bold text-emerald-950 mb-6 flex items-center gap-4">
                 {language === 'en' ? 'About Me' : 'À propos de moi'}
                 <span className="h-px bg-gray-200 flex-1"></span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                {profile.bio[language]}
              </p>
            </section>

             {/* Specialties */}
             <section>
              <h2 className="text-3xl font-serif font-bold text-emerald-950 mb-8 flex items-center gap-4">
                 {language === 'en' ? 'Areas of Expertise' : 'Domaines d\'expertise'}
                 <span className="h-px bg-gray-200 flex-1"></span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profile.specialties.map((spec, idx) => (
                  <div key={idx} className="p-6 bg-gray-50 border border-gray-100 rounded-sm hover:border-yellow-200 hover:shadow-md transition-all group">
                    <div className="mb-4 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      {getIcon(spec.icon)}
                    </div>
                    <h3 className="font-serif font-bold text-xl text-emerald-900 mb-2">{spec.title[language]}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{spec.description[language]}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-12">
            
            {/* Achievements */}
            <div className="bg-emerald-50 p-8 border border-emerald-100 rounded-sm shadow-sm">
               <h3 className="font-serif font-bold text-xl text-emerald-900 mb-6 border-b border-emerald-200 pb-2">
                 {language === 'en' ? 'Credentials' : 'Titres et Certifications'}
               </h3>
               <ul className="space-y-4">
                 {profile.achievements.map((item, idx) => (
                   <li key={idx} className="flex items-start gap-3">
                     <div className="mt-1.5 w-2 h-2 rounded-full bg-yellow-500 shrink-0"></div>
                     <span className="text-emerald-800 font-medium">{item[language]}</span>
                   </li>
                 ))}
               </ul>
            </div>

            {/* Location */}
             <div className="p-8 border border-gray-200 rounded-sm text-center bg-white shadow-sm">
               <MapPin size={32} className="mx-auto text-emerald-300 mb-4" />
               <h4 className="font-serif font-bold text-emerald-900 mb-2">Douala HQ</h4>
               <p className="text-gray-500 text-sm mb-4">
                 Boulevard de la Liberté<br/>
                 Akwa, Douala
               </p>
               <a href="#" className="text-yellow-600 font-semibold text-sm hover:underline">Get Directions</a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;