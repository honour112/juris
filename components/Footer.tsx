import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-emerald-950 text-gray-400 py-12 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-serif font-bold text-white mb-4 tracking-widest flex items-center gap-2">
              JURIS<span className="text-yellow-500">CM</span>
            </h2>
            <p className="max-w-xs text-sm leading-relaxed mb-6 text-emerald-100/70">
              {t('heroSubtitle')}
            </p>
          </div>
          <div>
            <h3 className="text-yellow-500 font-serif mb-4 font-bold">Douala Office</h3>
            <ul className="space-y-2 text-sm">
              <li>contact@juris.cm</li>
              <li>(+237) 699 00 00 00</li>
              <li>Bd de la Liberté, Akwa</li>
              <li>Douala, Cameroon</li>
            </ul>
          </div>
          <div>
            <h3 className="text-yellow-500 font-serif mb-4 font-bold">Yaoundé Office</h3>
            <ul className="space-y-2 text-sm">
              <li>yaounde@juris.cm</li>
              <li>(+237) 222 00 00 00</li>
              <li>Bastos, Rue 1.054</li>
              <li>Yaoundé, Cameroon</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-emerald-900 text-center text-xs text-emerald-600">
          &copy; {new Date().getFullYear()} Juris Law Firm Cameroon. Authorized Legal Practice.
        </div>
      </div>
    </footer>
  );
};

export default Footer;