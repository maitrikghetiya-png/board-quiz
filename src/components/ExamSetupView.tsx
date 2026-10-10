import React, { useState, useEffect } from 'react';
import {
  Settings,
  Clock,
  HelpCircle,
  Sparkles,
  Play,
  ArrowLeft,
  Check,
  Shield,
  AlertCircle,
  FileCheck2,
  Atom,
  FlaskConical,
  Binary,
  Languages
} from 'lucide-react';
import { SUBJECTS, CHAPTERS, MARKING_SCHEMES } from '../data/syllabus';
import { SubjectId, Difficulty, MarkingScheme, ExamConfig, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { LanguageSelector } from './LanguageSelector';

interface ExamSetupViewProps {
  initialSubject?: SubjectId | 'all';
  initialChapterId?: string | 'all';
  onStartExam: (config: ExamConfig) => void;
  onBackToDashboard: () => void;
  isStartingExam: boolean;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const ExamSetupView: React.FC<ExamSetupViewProps> = ({
  initialSubject = 'physics',
  initialChapterId = 'all',
  onStartExam,
  onBackToDashboard,
  isStartingExam,
  currentLanguage,
  onLanguageChange
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>(initialSubject);
  const [selectedChapterId, setSelectedChapterId] = useState<string | 'all'>(initialChapterId);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'mixed'>('moderate');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [durationMinutes, setDurationMinutes] = useState<number>(15);
  const [markingScheme, setMarkingScheme] = useState<MarkingScheme>('practice_standard');
  const [useAI, setUseAI] = useState<boolean>(false);

  // Sync chapter selection when subject changes
  useEffect(() => {
    if (selectedSubject === 'all') {
      setSelectedChapterId('all');
    } else {
      if (selectedChapterId !== 'all') {
        const ch = CHAPTERS.find(c => c.id === selectedChapterId);
        if (!ch || ch.subjectId !== selectedSubject) {
          setSelectedChapterId('all');
        }
      }
    }
  }, [selectedSubject]);

  // Adjust duration default when question count changes
  const handleQuestionCountChange = (count: number) => {
    setQuestionCount(count);
    if (count === 10) setDurationMinutes(15);
    else if (count === 20) setDurationMinutes(30);
    else if (count === 30) setDurationMinutes(45);
  };

  const availableChapters = selectedSubject === 'all'
    ? CHAPTERS
    : CHAPTERS.filter(c => c.subjectId === selectedSubject);

  const currentScheme = MARKING_SCHEMES[markingScheme] || MARKING_SCHEMES.practice_standard;
  const maxPossibleMarks = questionCount * currentScheme.correct;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartExam({
      subjectId: selectedSubject,
      chapterId: selectedChapterId,
      difficulty: selectedDifficulty,
      questionCount,
      durationMinutes,
      markingScheme,
      useAI
    });
  };

  const getSubjectName = (subId: SubjectId | 'all') => {
    if (subId === 'physics') return t.subjectPhysics;
    if (subId === 'chemistry') return t.subjectChemistry;
    if (subId === 'mathematics') return t.subjectMathematics;
    return t.subjectAll;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.resultReturnHomeBtn}</span>
        </button>
        <span className="text-xs font-medium text-slate-500">
          {t.setupTitle}
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Title Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Settings className="w-4 h-4" />
            <span>{t.setupTitle}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.setupHeading}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
            {t.setupSubheading}
          </p>
        </div>

        {/* Form Controls */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">

          {/* Language Selection Section (Mandatory Feature with Cards) */}
          <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-950">
                <Languages className="w-4 h-4 text-blue-600" />
                <span>{t.setupLanguageLabel}</span>
              </label>
              <span className="text-[11px] font-medium text-blue-700">
                {currentLanguage === 'en' ? 'English Medium' : currentLanguage === 'gu' ? 'ગુજરાતી માધ્યમ' : 'हिंदी माध्यम'}
              </span>
            </div>
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={onLanguageChange}
              variant="cards"
            />
          </div>
          
          {/* 1. Subject Selector */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              {t.setupSubjectLabel}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'physics', label: t.subjectPhysics, code: '042', icon: Atom, color: 'text-blue-600' },
                { id: 'chemistry', label: t.subjectChemistry, code: '043', icon: FlaskConical, color: 'text-emerald-600' },
                { id: 'mathematics', label: t.subjectMathematics, code: '041', icon: Binary, color: 'text-purple-600' },
                { id: 'all', label: t.subjectAll, code: 'Combined', icon: Shield, color: 'text-amber-600' }
              ].map(sub => {
                const isSelected = selectedSubject === sub.id;
                const Icon = sub.icon;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setSelectedSubject(sub.id as any)}
                    className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <Icon className={`w-5 h-5 ${sub.color}`} />
                      {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                    </div>
                    <div className="mt-2">
                      <div className="font-bold text-slate-900 text-sm leading-tight">{sub.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{sub.code}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Chapter / Syllabus Coverage */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                {t.setupSyllabusLabel}
              </label>
              <span className="text-xs text-slate-500">
                {selectedChapterId === 'all' ? 'All Units included' : 'Targeted single chapter'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedChapterId('all')}
                className={`p-3 rounded-lg border text-left text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                  selectedChapterId === 'all'
                    ? 'border-blue-600 bg-blue-50/60 text-blue-900 font-bold'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <span>{t.setupFullSyllabus}</span>
                {selectedChapterId === 'all' && <Check className="w-4 h-4 text-blue-600" />}
              </button>

              <div className="relative">
                <select
                  value={selectedChapterId === 'all' ? '' : selectedChapterId}
                  onChange={(e) => setSelectedChapterId(e.target.value || 'all')}
                  className="w-full h-full p-2.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 bg-white hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t.setupSelectChapterPlaceholder}</option>
                  {availableChapters.map(ch => (
                    <option key={ch.id} value={ch.id}>
                      Unit {ch.unitNumber}: {ch.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 3. Difficulty & Question Count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Difficulty */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                {t.setupDifficultyLabel}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'easy', label: t.setupDiffEasy, desc: t.setupDiffEasySub },
                  { id: 'moderate', label: t.setupDiffModerate, desc: t.setupDiffModerateSub },
                  { id: 'challenging', label: t.setupDiffChallenging, desc: t.setupDiffChallengingSub }
                ].map(d => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setSelectedDifficulty(d.id as Difficulty)}
                    className={`p-2.5 rounded-lg border text-center transition cursor-pointer ${
                      selectedDifficulty === d.id
                        ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold ring-1 ring-blue-500'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-semibold">{d.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{d.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                {t.setupQuestionsLabel}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[10, 20, 30].map(cnt => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => handleQuestionCountChange(cnt)}
                    className={`p-2.5 rounded-lg border text-center transition cursor-pointer ${
                      questionCount === cnt
                        ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold ring-1 ring-blue-500'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-sm font-extrabold">{cnt} MCQs</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {cnt === 10 ? 'Quick Drill' : cnt === 20 ? 'Standard Mock' : 'Full Exam'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* 4. Duration Controls */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                {t.setupDurationLabel}
              </label>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {durationMinutes} {currentLanguage === 'gu' ? 'મિનિટ' : currentLanguage === 'hi' ? 'मिनट' : 'Minutes'} ({(durationMinutes * 60 / questionCount).toFixed(0)}s per question)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="range"
                min="5"
                max="90"
                step="5"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>5m</span>
              <span>15m (10Q)</span>
              <span>30m (20Q)</span>
              <span>45m (30Q)</span>
              <span>90m</span>
            </div>
          </div>

          {/* 5. Marking Scheme (Configurable Practice Scheme) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                {t.setupSchemeLabel}
              </label>
              <span className="text-[11px] text-slate-500">{t.setupSchemeSub}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.values(MARKING_SCHEMES).map(scheme => {
                const isSelected = markingScheme === scheme.id;
                return (
                  <button
                    key={scheme.id}
                    type="button"
                    onClick={() => setMarkingScheme(scheme.id)}
                    className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs text-slate-900">{scheme.name}</div>
                      <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                        {scheme.description}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-[11px] font-bold">
                      <span className="text-emerald-600">+{scheme.correct}</span>
                      <span className={scheme.incorrect < 0 ? 'text-rose-600' : 'text-slate-400'}>
                        {scheme.incorrect}
                      </span>
                      <span className="text-slate-400">0</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6. AI Practice Mode Toggle */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  AI Practice Question Mode
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">
                  Optional
                </span>
              </div>
              <p className="text-xs text-slate-600 max-w-xl">
                Generate new on-demand questions via Gemini API matching this exact syllabus criteria.
                If API keys are unavailable or validation fails, Board Quiz seamlessly falls back to the verified NCERT question bank.
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
              <input
                type="checkbox"
                checked={useAI}
                onChange={(e) => setUseAI(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {/* Test Summary Card Before Starting */}
          <div className="bg-[#111318] text-white rounded-xl p-5 space-y-4 border border-[#292D35]">
            <div className="flex items-center justify-between border-b border-[#292D35] pb-3">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-[#FFD43B]" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  {t.setupPreSummary}
                </span>
              </div>
              <span className="text-xs text-[#FFD43B] font-semibold">
                {t.setupPatternLabel}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">{t.setupSubjectScope}</span>
                <span className="font-bold text-white capitalize">
                  {getSubjectName(selectedSubject)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">{t.setupQuestionsTime}</span>
                <span className="font-bold text-white">
                  {questionCount} MCQs · {durationMinutes} mins
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">{t.setupMaxMarks}</span>
                <span className="font-bold text-[#FFD43B]">
                  {maxPossibleMarks} Marks (+{currentScheme.correct} / {currentScheme.incorrect})
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">{t.setupTimerRule}</span>
                <span className="font-bold text-white">
                  Auto-submit on expiry
                </span>
              </div>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isStartingExam}
              className="w-full py-3.5 px-6 rounded-xl bg-[#FFD43B] hover:bg-[#F5C518] active:bg-[#E6B800] disabled:bg-slate-300 text-[#111318] font-black text-sm shadow-xs flex items-center justify-center gap-2 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD43B] focus-visible:ring-offset-2"
            >
              {isStartingExam ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#111318] border-t-transparent rounded-full animate-spin" />
                  <span>{t.setupPreparing}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-[#111318]" />
                  <span>{t.setupStartBtn}</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
