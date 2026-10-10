import React, { useState } from 'react';
import {
  Database,
  Search,
  Filter,
  CheckCircle,
  Eye,
  EyeOff,
  BookOpen,
  ArrowLeft,
  Sparkles,
  Lightbulb
} from 'lucide-react';
import { VERIFIED_QUESTIONS } from '../data/questionBank';
import { MathRenderer } from './MathRenderer';
import { SubjectId, Difficulty, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { getLocalizedQuestion } from '../data/questionTranslations';

interface QuestionBankBrowserViewProps {
  onBackToDashboard: () => void;
  onStartExamWithSubject: (subjectId: SubjectId) => void;
  currentLanguage: SupportedLanguage;
}

export const QuestionBankBrowserView: React.FC<QuestionBankBrowserViewProps> = ({
  onBackToDashboard,
  onStartExamWithSubject,
  currentLanguage
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  const toggleSolution = (id: string) => {
    setRevealedSolutions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredQuestions = VERIFIED_QUESTIONS.filter(q => {
    if (selectedSubject !== 'all' && q.subjectId !== selectedSubject) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    if (searchQuery.trim().length > 0) {
      const localized = getLocalizedQuestion(q, currentLanguage);
      const qText = (localized.questionText + localized.chapterName + localized.explanation).toLowerCase();
      if (!qText.includes(searchQuery.toLowerCase())) return false;
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-2">
            <Database className="w-3.5 h-3.5" />
            <span>{t.navQuestionBank}</span>
            <span>•</span>
            <span>{VERIFIED_QUESTIONS.length} Questions</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            {currentLanguage === 'gu' ? 'NCERT અભ્યાસક્રમ પ્રશ્ન બેંક' : currentLanguage === 'hi' ? 'NCERT पाठ्यक्रम प्रश्न बैंक' : 'Browse NCERT Syllabus Question Bank'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {currentLanguage === 'gu' ? 'મોક ટેસ્ટ આપતા પહેલા પુનરાવર્તન માટે ચકાસાયેલ પ્રેક્ટિસ પ્રશ્નો' : currentLanguage === 'hi' ? 'मॉक टेस्ट देने से पहले पुनरावृत्ति हेतु सत्यापित अभ्यास प्रश्न' : 'Independently verified practice problems for revision before taking timed mock tests'}
          </p>
        </div>

        <button
          onClick={onBackToDashboard}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 transition cursor-pointer self-start sm:self-auto"
        >
          {t.resultReturnHomeBtn}
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder={currentLanguage === 'gu' ? 'પ્રશ્ન, સૂત્ર અથવા પ્રકરણ શોધો...' : currentLanguage === 'hi' ? 'प्रश्न, सूत्र या अध्याय खोजें...' : 'Search concepts, formulas, chapters...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Subject Filter */}
          <div className="flex gap-1.5">
            {[
              { id: 'all', label: t.subjectAll },
              { id: 'physics', label: t.subjectPhysics.split(' ')[0] },
              { id: 'chemistry', label: t.subjectChemistry.split(' ')[0] },
              { id: 'mathematics', label: t.subjectMathematics.split(' ')[0] }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedSubject(tab.id as any)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                  selectedSubject === tab.id
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Question Cards List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 text-xs">
            {t.reviewEmptyFilter}
          </div>
        ) : (
          filteredQuestions.map((rawQ, idx) => {
            const q = getLocalizedQuestion(rawQ, currentLanguage);
            const isRevealed = !!revealedSolutions[q.id];
            const optionLetters = ['A', 'B', 'C', 'D'];

            return (
              <div
                key={q.id}
                className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden"
              >
                <div className="p-4 bg-slate-50 border-b border-slate-200/70 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{t.examQTracker} {idx + 1}.</span>
                    <span className="font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800 uppercase text-[11px]">
                      {q.subjectId}
                    </span>
                    <span className="text-slate-600 font-medium">{q.chapterName}</span>
                  </div>

                  <span className="text-[11px] font-semibold text-slate-500 capitalize">
                    {q.difficulty}
                  </span>
                </div>

                <div className="p-5 space-y-4">
                  <div className="text-sm font-semibold text-slate-900 leading-relaxed">
                    <MathRenderer text={q.questionText} />
                  </div>

                  {/* 4 Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, oIdx) => {
                      const isCorrect = isRevealed && q.correctOptionIndex === oIdx;

                      return (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-lg border flex items-start gap-2.5 transition ${
                            isCorrect
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                              : 'bg-slate-50/60 border-slate-200 text-slate-700'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded text-[11px] font-bold shrink-0 flex items-center justify-center ${
                              isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {optionLetters[oIdx]}
                          </span>
                          <span className="pt-0.5">
                            <MathRenderer text={opt} />
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Reveal Solution Toggle */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <button
                      onClick={() => toggleSolution(q.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      {isRevealed ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>{currentLanguage === 'gu' ? 'ઉકેલ છુપાવો' : currentLanguage === 'hi' ? 'समाधान छिपाएं' : 'Hide Solution'}</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>{currentLanguage === 'gu' ? 'સત્યાપિત જવાબ અને પગલાં જુઓ' : currentLanguage === 'hi' ? 'सत्यापित उत्तर एवं चरण देखें' : 'Show Verified Answer & Steps'}</span>
                        </>
                      )}
                    </button>

                    <span className="text-[11px] text-slate-400">
                      ID: {q.id}
                    </span>
                  </div>

                  {/* Solution Expansion */}
                  {isRevealed && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs text-slate-800 animate-in fade-in duration-150">
                      <div className="font-bold text-emerald-700 flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>{t.resultCorrectAnswer} ({optionLetters[q.correctOptionIndex]}) {q.options[q.correctOptionIndex]}</span>
                      </div>

                      <div className="space-y-1.5 pl-2 border-l-2 border-blue-400">
                        {q.stepByStepSolution.map((st, sIdx) => (
                          <div key={sIdx} className="leading-relaxed">
                            <MathRenderer text={st} />
                          </div>
                        ))}
                      </div>

                      <div className="p-2.5 rounded-lg bg-blue-50 text-blue-900 flex items-start gap-2">
                        <Lightbulb className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">{t.resultTakeawayLabel} </span>
                          <span>{q.conceptTakeaway}</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
