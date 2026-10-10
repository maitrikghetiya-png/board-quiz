import React from 'react';
import { BookOpen, ShieldCheck, Timer, Menu, X, ExternalLink } from 'lucide-react';
import { ActiveExamSession, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { LanguageSelector } from './LanguageSelector';

interface NavbarProps {
  activeSession: ActiveExamSession | null;
  onNavigate: (view: string) => void;
  currentView: string;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  onOpenSyllabusModal: () => void;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSession,
  onNavigate,
  currentView,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  onOpenSyllabusModal,
  currentLanguage,
  onLanguageChange
}) => {
  const t = TRANSLATIONS[currentLanguage];

  return (
    <header className="sticky top-0 z-30 bg-[#111318] text-white border-b border-[#292D35] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#292D35] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD43B]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD43B] rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FFD43B] text-[#111318] flex items-center justify-center font-black shadow-xs group-hover:bg-[#F5C518] transition-colors">
              <span className="text-base font-extrabold tracking-tight">BQ</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white group-hover:text-yellow-200 transition-colors">
                  Board <span className="text-[#FFD43B]">Quiz</span>
                </span>
                <span className="hidden sm:inline-block text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-[#292D35] text-amber-300 border border-[#3A3F4B]">
                  CBSE Class XII
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                {t.appSession}
              </p>
            </div>
          </button>
        </div>

        {/* Center / Right: Language Selector, Quick Navigation & Active Exam Indicator */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Selector */}
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
            variant="compact"
          />

          {activeSession && currentView !== 'exam' && (
            <button
              onClick={() => onNavigate('exam')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFD43B]/20 text-[#FFD43B] border border-[#FFD43B]/40 hover:bg-[#FFD43B]/30 text-xs font-semibold animate-pulse transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD43B]"
            >
              <Timer className="w-3.5 h-3.5 text-[#FFD43B]" />
              <span className="hidden sm:inline">{t.navResumeTest}</span>
            </button>
          )}

          <button
            onClick={onOpenSyllabusModal}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-[#292D35] border border-slate-700/70 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD43B]"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#FFD43B]" />
            <span>CBSE 2026–27</span>
          </button>

          <a
            href="https://cbseacademic.nic.in/curriculum_2027.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-[#292D35]/80 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD43B]"
            title="Official CBSE Academic Portal"
          >
            <span className="text-[11px]">cbseacademic.nic.in</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>

        </div>

      </div>
    </header>
  );
};
