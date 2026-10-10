import React from 'react';
import {
  LayoutDashboard,
  PlayCircle,
  Layers,
  Database,
  History,
  BookMarked,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string, extra?: any) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onResetData: () => void;
  currentLanguage: SupportedLanguage;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  isOpenMobile,
  onCloseMobile,
  onResetData,
  currentLanguage
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const navItems = [
    {
      id: 'dashboard',
      label: t.navDashboard,
      icon: LayoutDashboard,
      description: 'Overview & subjects'
    },
    {
      id: 'setup-full',
      label: t.navStartMock,
      icon: PlayCircle,
      description: 'Full syllabus exam'
    },
    {
      id: 'setup-chapter',
      label: t.navPracticeChapter,
      icon: Layers,
      description: 'Targeted chapter drill'
    },
    {
      id: 'question-bank',
      label: t.navQuestionBank,
      icon: Database,
      description: '36+ verified MCQs'
    },
    {
      id: 'history',
      label: t.navResults,
      icon: History,
      description: 'Scores & weak areas'
    },
    {
      id: 'syllabus',
      label: t.navSyllabus,
      icon: BookMarked,
      description: 'Official blueprint'
    }
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`fixed md:sticky top-16 z-40 h-[calc(100vh-4rem)] w-64 bg-[#111318] text-slate-300 flex flex-col justify-between border-r border-[#292D35] transition-transform duration-200 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 space-y-6 overflow-y-auto">
          {/* Main Navigation */}
          <div className="space-y-1">
            <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#FFD43B]">
              Board Quiz
            </div>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive =
                currentView === item.id ||
                (item.id === 'setup-full' && currentView === 'setup' && !window.location.hash.includes('chapter'));

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD43B] ${
                    isActive
                      ? 'bg-[#FFD43B] text-[#111318] shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-[#292D35]/80'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${isActive ? 'text-[#111318]' : 'text-slate-400'}`} />
                  <div>
                    <div className="leading-tight">{item.label}</div>
                    <div className={`text-[11px] font-medium leading-tight mt-0.5 ${isActive ? 'text-[#111318]/80' : 'text-slate-500'}`}>
                      {item.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Subject Practice */}
          <div className="pt-2 border-t border-[#292D35]">
            <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {t.navDirectSubjects}
            </div>
            <div className="space-y-1">
              <button
                onClick={() => { onNavigate('setup', { subjectId: 'physics' }); onCloseMobile(); }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-[#292D35] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD43B]"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFD43B]" />
                  {t.subjectPhysics}
                </span>
                <span className="text-[11px] text-slate-500">042</span>
              </button>

              <button
                onClick={() => { onNavigate('setup', { subjectId: 'chemistry' }); onCloseMobile(); }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-[#292D35] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD43B]"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {t.subjectChemistry}
                </span>
                <span className="text-[11px] text-slate-500">043</span>
              </button>

              <button
                onClick={() => { onNavigate('setup', { subjectId: 'mathematics' }); onCloseMobile(); }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-[#292D35] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD43B]"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  {t.subjectMathematics}
                </span>
                <span className="text-[11px] text-slate-500">041</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info & Reset */}
        <div className="p-4 border-t border-[#292D35] bg-[#111318] text-xs space-y-3">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-[#292D35] text-slate-300 text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD43B] shrink-0" />
            <span>Quad AI School of Technology</span>
          </div>

          <button
            onClick={onResetData}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 rounded-lg transition text-[11px] cursor-pointer"
            title="Reset saved exam scores"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t.navResetAttempts}</span>
          </button>
        </div>
      </aside>
    </>
  );
};
