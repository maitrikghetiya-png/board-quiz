import React from 'react';
import { Languages, Check } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface LanguageSelectorProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  variant?: 'compact' | 'cards';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  variant = 'compact',
  className = ''
}) => {
  const languages: { id: SupportedLanguage; label: string; nativeName: string; region: string }[] = [
    { id: 'en', label: 'English', nativeName: 'English', region: 'CBSE Standard' },
    { id: 'gu', label: 'Gujarati', nativeName: 'ગુજરાતી', region: 'ગુજરાતી માધ્યમ' },
    { id: 'hi', label: 'Hindi', nativeName: 'हिंदी', region: 'हिंदी माध्यम' }
  ];

  if (variant === 'cards') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 ${className}`}>
        {languages.map(lang => {
          const isSelected = currentLanguage === lang.id;
          return (
            <button
              key={lang.id}
              type="button"
              onClick={() => onLanguageChange(lang.id)}
              className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD43B] ${
                isSelected
                  ? 'border-[#FFD43B] bg-[#FFF3C4]/40 text-[#111318] font-bold ring-2 ring-[#FFD43B]/60 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div>
                <div className="text-sm font-bold flex items-center gap-1.5">
                  <span>{lang.nativeName}</span>
                  {lang.id !== 'en' && <span className="text-xs font-normal text-slate-500">({lang.label})</span>}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">{lang.region}</div>
              </div>
              {isSelected && (
                <div className="w-5 h-5 rounded-full bg-[#FFD43B] text-[#111318] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Compact dropdown or button group for Navbar
  return (
    <div className={`inline-flex items-center rounded-xl bg-[#292D35] p-0.5 border border-[#3A3F4B] ${className}`}>
      {languages.map(lang => {
        const isSelected = currentLanguage === lang.id;
        return (
          <button
            key={lang.id}
            type="button"
            onClick={() => onLanguageChange(lang.id)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD43B] ${
              isSelected
                ? 'bg-[#FFD43B] text-[#111318] font-bold shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-[#3A3F4B]/60'
            }`}
            title={`Switch to ${lang.label}`}
          >
            {lang.nativeName}
          </button>
        );
      })}
    </div>
  );
};
