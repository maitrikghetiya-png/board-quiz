import React, { useState } from 'react';
import {
  BookOpen,
  Atom,
  FlaskConical,
  Binary,
  PlayCircle,
  ExternalLink,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { SUBJECTS, CHAPTERS } from '../data/syllabus';
import { SubjectId, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface SyllabusBrowserViewProps {
  initialSubject?: SubjectId;
  onStartChapterPractice: (subjectId: SubjectId, chapterId: string) => void;
  onBackToDashboard: () => void;
  currentLanguage: SupportedLanguage;
}

export const SyllabusBrowserView: React.FC<SyllabusBrowserViewProps> = ({
  initialSubject = 'physics',
  onStartChapterPractice,
  onBackToDashboard,
  currentLanguage
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [activeSubject, setActiveSubject] = useState<SubjectId>(initialSubject);
  const [expandedChapterId, setExpandedChapterId] = useState<string | null>(null);

  const chapters = CHAPTERS.filter(c => c.subjectId === activeSubject);
  const subjectMeta = SUBJECTS[activeSubject];

  const toggleExpand = (id: string) => {
    setExpandedChapterId(expandedChapterId === id ? null : id);
  };

  const getSubjectIcon = (subId: SubjectId) => {
    switch (subId) {
      case 'physics': return <Atom className="w-5 h-5 text-blue-600" />;
      case 'chemistry': return <FlaskConical className="w-5 h-5 text-emerald-600" />;
      case 'mathematics': return <Binary className="w-5 h-5 text-purple-600" />;
    }
  };

  const getSubjectName = (subId: SubjectId) => {
    if (subId === 'physics') return t.subjectPhysics;
    if (subId === 'chemistry') return t.subjectChemistry;
    return t.subjectMathematics;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2">
            <span>{t.appSession}</span>
            <span>•</span>
            <span>{t.navSyllabus}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            {t.navSyllabus} & Blueprint
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {t.curriculumAdvisoryText}
          </p>
        </div>

        <button
          onClick={onBackToDashboard}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 transition cursor-pointer self-start sm:self-auto"
        >
          {t.resultReturnHomeBtn}
        </button>
      </div>

      {/* Subject Switcher Tabs */}
      <div className="grid grid-cols-3 gap-3">
        {(['physics', 'chemistry', 'mathematics'] as SubjectId[]).map(subId => {
          const isSelected = activeSubject === subId;
          const meta = SUBJECTS[subId];
          return (
            <button
              key={subId}
              onClick={() => setActiveSubject(subId)}
              className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD43B] ${
                isSelected
                  ? 'border-[#FFD43B] bg-white ring-2 ring-[#FFD43B]/60 shadow-xs'
                  : 'border-slate-200 bg-white/70 hover:bg-white text-slate-600'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {getSubjectIcon(subId)}
                <div>
                  <div className={`font-bold text-sm ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                    {getSubjectName(subId)}
                  </div>
                  <div className="text-[11px] text-slate-400">Code {meta.code}</div>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-500 hidden sm:inline">
                {meta.totalTheoryMarks} Th
              </span>
            </button>
          );
        })}
      </div>

      {/* Subject Overview Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>{getSubjectName(activeSubject)}</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              {chapters.length} Chapters
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            {subjectMeta.description}
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 shrink-0">
          <div>
            <span className="text-slate-400 block text-[11px]">Theory Marks</span>
            <span className="text-sm font-bold text-blue-600">{subjectMeta.totalTheoryMarks}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Practical / IA</span>
            <span className="text-sm font-bold text-emerald-600">{subjectMeta.totalPracticalMarks}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Duration</span>
            <span className="text-sm font-bold text-slate-900">{subjectMeta.durationHours} Hours</span>
          </div>
        </div>
      </div>

      {/* Chapters Accordion / List */}
      <div className="space-y-3">
        {chapters.map((ch, index) => {
          const isExpanded = expandedChapterId === ch.id;

          return (
            <div
              key={ch.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all shadow-2xs"
            >
              <div
                onClick={() => toggleExpand(ch.id)}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{ch.name}</h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Unit {ch.unitNumber}: {ch.unitName}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 hidden sm:inline">
                    ~{ch.weightageMarks} Marks
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartChapterPractice(activeSubject, ch.id);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <PlayCircle className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{t.navPracticeChapter}</span>
                  </button>

                  <div className="text-slate-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-700 block mb-1.5">
                      Key NCERT Syllabus Topics & Sub-Units:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                      {ch.topicsSummary.map((topic, tIdx) => (
                        <li key={tIdx} className="flex items-center gap-1.5 bg-white p-2 rounded border border-slate-200/70">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => onStartChapterPractice(activeSubject, ch.id)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>{t.navPracticeChapter}: {ch.name} →</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
