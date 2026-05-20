import React from 'react';
import { Mail, Phone, Calendar, MapPin, Scale, Award, BookOpen, Shield, MessageCircle, Users, FileText, CheckCircle, GraduationCap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Profile: React.FC = () => {
  const { t, language } = useLanguage();

  // Content keeping ALL names integrated systematically
  const journalInfo = {
    name: "Revue Africaine des Sciences Sociales",
    acronym: "RASS",
    issn: "ISSN en cours...",
    email: "revueafricainedessciencessocia@gmail.com",
    whatsapp: "+237696479828",
    editorialBoard: {
      director: {
        name: "Prof. NGOUYAMSA MEFIRE Marcel Bruce",
        titleEn: "Full Professor",
        titleFr: "Professeur Titulaire des Universités",
        deptEn: "Political Science / International Relations",
        deptFr: "Science Politique / Relations Internationales"
      },
      chief: {
        name: "Dr. MUMLAJA Emmanuel",
        titleEn: "Doctor / Ph.D",
        titleFr: "Docteur / Ph.D",
        deptEn: "Anthropology",
        deptFr: "Anthropologie"
      },
      members: [
        { name: "Dr. SAPITODEN Elie", titleEn: "Editorial Member", titleFr: "Membre du Comité" },
        { name: "Dr. TSALA Moise", titleEn: "Editorial Member", titleFr: "Membre du Comité" }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Profile Hero - Enhanced with RASS Branding */}
      <div className="relative bg-emerald-950 text-white pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-900/90 to-emerald-950"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            
            {/* Journal Visual Branding */}
            <div className="relative group shrink-0 animate-scale-in">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-emerald-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative w-64 h-80 md:w-80 md:h-96 rounded-lg overflow-hidden border-4 border-emerald-900 shadow-2xl bg-emerald-800 flex flex-col items-center justify-center p-8 text-center">
                 <BookOpen size={80} className="text-yellow-500 mb-6 animate-pulse-slow" />
                 <h2 className="font-serif font-bold text-3xl mb-2">{journalInfo.acronym}</h2>
                 <p className="text-sm text-emerald-100 uppercase tracking-widest">{journalInfo.issn}</p>
              </div>
            </div>

            {/* Basic Info & Mission */}
            <div className="text-center md:text-left flex-1 animate-fade-in-up">
              <span className="inline-block py-1 px-3 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-4">
                {language === 'en' ? 'Scientific Publication' : 'Publication Scientifique'}
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 tracking-wide text-white">
                {journalInfo.name}
              </h1>
              <p className="text-xl text-emerald-100/80 font-light mb-8 max-w-2xl leading-relaxed">
                {language === 'en' 
                  ? 'A leading platform for African social science research, fostering interdisciplinary dialogue and academic excellence.' 
                  : 'Une plateforme de premier plan pour la recherche en sciences sociales en Afrique, favorisant le dialogue interdisciplinaire.'}
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a href={`mailto:${journalInfo.email}`} className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-sm flex items-center gap-3 transition-all border border-white/10 group">
                  <Mail size={18} className="text-yellow-500 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">{journalInfo.email}</span>
                </a>
                <a 
                  href={`https://wa.me/${journalInfo.whatsapp.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-6 py-3 rounded-sm font-bold hover:bg-green-500 transition-all shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  <MessageCircle size={18} />
                  {language === 'en' ? 'More information' : 'Plus d\'informations'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Left Column: Editorial Policy & About */}
          <div className="lg:col-span-2 space-y-16">
            <section className="animate-fade-in-up">
              <h2 className="text-3xl font-serif font-bold text-emerald-950 mb-6 flex items-center gap-4">
                 {language === 'en' ? 'About RASS' : 'À propos de la RASS'}
                 <span className="h-px bg-gray-200 flex-1"></span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg italic border-l-4 border-yellow-500 pl-6">
                {language === 'en'
                  ? 'The African Social Science Review (RASS) is dedicated to publishing high-quality scientific contributions that adhere to the strict rules of political science and social research.'
                  : 'La Revue Africaine des Sciences Sociales (RASS) se consacre à la publication de contributions scientifiques de haute qualité, conformes aux règles de présentation des travaux scientifiques.'}
              </p>
            </section>

            {/* Editorial Board Section - Full Integrated List */}
            <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-3xl font-serif font-bold text-emerald-950 mb-8 flex items-center gap-4">
                 <Users className="text-yellow-600" />
                 {language === 'en' ? 'Editorial Board' : 'Comité de Rédaction'}
                 <span className="h-px bg-gray-200 flex-1"></span>
              </h2>
              
              <div className="space-y-6">
                {/* 1. Directeur de Publication (Top Premium Card) */}
                <div className="p-8 bg-gradient-to-br from-emerald-50 to-white rounded-sm border-l-4 border-emerald-950 shadow-sm">
                  <span className="text-[10px] uppercase font-black tracking-widest text-emerald-700 block mb-2">
                    {language === 'en' ? 'Publishing Director' : 'Directeur de Publication'}
                  </span>
                  <h3 className="text-emerald-950 font-serif font-bold text-2xl mb-1">
                    {journalInfo.editorialBoard.director.name}
                  </h3>
                  <p className="text-emerald-900 font-medium text-sm flex items-center gap-2 mt-2">
                    <GraduationCap size={16} className="text-yellow-600" />
                    {language === 'en' ? journalInfo.editorialBoard.director.titleEn : journalInfo.editorialBoard.director.titleFr}
                  </p>
                  <p className="text-gray-500 text-xs mt-1 pl-6">
                    {language === 'en' ? journalInfo.editorialBoard.director.deptEn : journalInfo.editorialBoard.director.deptFr}
                  </p>
                </div>

                {/* 2. Rédacteur en Chef Card */}
                <div className="p-8 bg-emerald-50/40 rounded-sm border-l-4 border-yellow-500 shadow-sm">
                  <span className="text-[10px] uppercase font-black tracking-widest text-yellow-600 block mb-2">
                    {language === 'en' ? 'Editor-in-Chief' : 'Rédacteur en Chef'}
                  </span>
                  <h3 className="text-emerald-950 font-bold text-xl mb-1">
                    {journalInfo.editorialBoard.chief.name}
                  </h3>
                  <p className="text-emerald-800 text-sm font-medium">
                    {language === 'en' ? journalInfo.editorialBoard.chief.titleEn : journalInfo.editorialBoard.chief.titleFr}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {language === 'en' ? journalInfo.editorialBoard.chief.deptEn : journalInfo.editorialBoard.chief.deptFr}
                  </p>
                </div>

                {/* 3. Original Board Members Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {journalInfo.editorialBoard.members.map((member, idx) => (
                    <div key={idx} className="p-6 bg-gray-50/80 rounded-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">
                        {language === 'en' ? member.titleEn : member.titleFr}
                      </span>
                      <h3 className="text-emerald-950 font-bold text-lg mb-1">{member.name}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Publication Process */}
            <section className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
               <h2 className="text-3xl font-serif font-bold text-emerald-950 mb-8 flex items-center gap-4">
                 <FileText className="text-yellow-600" />
                 {language === 'en' ? 'Publication Procedure' : 'Procédure de Publication'}
               </h2>
               <div className="space-y-4">
                 {[
                   { en: "Pre-evaluation for editorial compliance", fr: "Une pré-évaluation de conformité à la politique de rédaction" },
                   { en: "Scientific peer review (Form and Content)", fr: "Évaluation du caractère scientifique (Fond et Forme)" },
                   { en: "Final validation and management fee payment", fr: "Validation définitive et frais de gestion" }
                 ].map((step, i) => (
                   <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors group">
                     <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-sm group-hover:bg-yellow-500 group-hover:text-white transition-all">
                       {i + 1}
                     </div>
                     <p className="text-gray-700 font-medium">{step[language]}</p>
                   </div>
                 ))}
               </div>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-12">
            {/* Quick Submission Info */}
            <div className="bg-emerald-950 p-8 text-white rounded-sm shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                 <Scale size={100} />
               </div>
               <h3 className="font-serif font-bold text-xl text-yellow-500 mb-6">
                 {language === 'en' ? 'Submission Rules' : 'Règles de Soumission'}
               </h3>
               <ul className="space-y-4 text-sm relative z-10">
                 <li className="flex items-start gap-3">
                   <CheckCircle size={16} className="text-yellow-500 mt-1 shrink-0" />
                   <span>{language === 'en' ? 'Max 30 pages (Word format)' : 'Max 30 pages (Format Word)'}</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <CheckCircle size={16} className="text-yellow-500 mt-1 shrink-0" />
                   <span>Times New Roman, 12pt</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <CheckCircle size={16} className="text-yellow-500 mt-1 shrink-0" />
                   <span>{language === 'en' ? 'Abstract in EN and FR' : 'Résumé en FR et EN'}</span>
                 </li>
               </ul>
            </div>

            {/* Headquarters */}
            <div className="p-8 border border-gray-200 rounded-sm text-center bg-white shadow-sm">
               <MapPin size={32} className="mx-auto text-emerald-300 mb-4" />
               <h4 className="font-serif font-bold text-emerald-900 mb-2">RASS HQ</h4>
               <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                 {language === 'en' ? 'Cameroon Research Division' : 'Division de la Recherche, Cameroun'}<br/>
                 revueafricainedessciencessocia@gmail.com
               </p>
               <div className="pt-6 border-t border-gray-100">
                 <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">
                   {language === 'en' ? 'Powered By' : 'Propulsé Par'}
                 </p>
                 <span className="font-serif font-bold text-emerald-900 tracking-tighter">Rass</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;