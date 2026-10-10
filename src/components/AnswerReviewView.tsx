import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Bookmark,
  Sparkles,
  BookOpen,
  Filter,
  Check,
  Lightbulb
} from 'lucide-react';
import { ExamResult, Question, SupportedLanguage } from '../types';
import { MathRenderer } from './MathRenderer';
import { SUBJECTS } from '../data/syllabus';
import { TRANSLATIONS } from '../i18n/translations';
import { getLocalizedQuestion } from '../data/questionTranslations';

interface AnswerReviewViewProps {
  result: ExamResult;
  onBackToResult: () => void;
  onBackToDashboard: () => void;
  currentLanguage: SupportedLanguage;
}

export const AnswerReviewView: React.FC<AnswerReviewViewProps> = ({
  result,
  onBackToResult,
  onBackToDashboard,
  currentLanguage
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [filter, setFilter] = useState<'all' | 'incorrect' | 'correct' | 'unanswered' | 'marked'>('all');

  const filteredQuestions = result.questions.filter((q) => {
    const resp = result.responses[q.id];
    const isAnswered = resp && resp.selectedOptionIndex !== null && resp.selectedOptionIndex !== undefined;
    const isCorrect = isAnswered && resp.selectedOptionIndex === q.correctOptionIndex;
    const isIncorrect = isAnswered && resp.selectedOptionIndex !== q.correctOptionIndex;
    const isUnanswered = !isAnswered;
    const isMarked = resp?.isMarkedForReview;

    if (filter === 'incorrect') return isIncorrect;
    if (filter === 'correct') return isCorrect;
    if (filter === 'unanswered') return isUnanswered;
    if (filter === 'marked') return isMarked;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToResult}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            title="Back to Score Summary"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">
              {t.reviewTitle}
            </h1>
            <p className="text-xs text-slate-500">
              {t.reviewSub}
            </p>
          </div>
        </div>

        <button
          onClick={onBackToDashboard}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer self-start sm:self-auto"
        >
          {t.resultReturnHomeBtn}
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 flex flex-wrap gap-1.5 text-xs shadow-2xs">
        {[
          { id: 'all', label: `${t.reviewFilterAll} (${result.questions.length})`, badge: null },
          { id: 'incorrect', label: `${t.reviewFilterIncorrect} (${result.incorrectCount})`, badge: 'bg-rose-500' },
          { id: 'correct', label: `${t.reviewFilterCorrect} (${result.correctCount})`, badge: 'bg-emerald-500' },
          { id: 'unanswered', label: `${t.reviewFilterUnanswered} (${result.unansweredCount})`, badge: 'bg-slate-400' },
          { id: 'marked', label: t.reviewFilterMarked, badge: 'bg-amber-500' }
        ].map(tab => {
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD43B] ${
                isActive
                  ? 'bg-[#FFD43B] text-[#111318] shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {tab.badge && (
                <span className={`w-2 h-2 rounded-full ${tab.badge}`} />
              )}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Question Cards List */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 text-sm">
            {t.reviewEmptyFilter}
          </div>
        ) : (
          filteredQuestions.map((rawQ) => {
            const q = getLocalizedQuestion(rawQ, currentLanguage);
            const originalIndex = result.questions.findIndex(item => item.id === q.id);
            const resp = result.responses[q.id];
            const studentChoice = resp?.selectedOptionIndex ?? null;
            const isCorrect = studentChoice !== null && studentChoice === q.correctOptionIndex;
            const isIncorrect = studentChoice !== null && studentChoice !== q.correctOptionIndex;
            const isUnanswered = studentChoice === null;
            const optionLetters = ['A', 'B', 'C', 'D'];

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden"
              >
                {/* Question Header Bar */}
                <div className="p-4 sm:p-5 bg-slate-50/80 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-slate-800 text-sm">
                      {t.examQTracker} {originalIndex + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold uppercase text-[11px]">
                      {q.subjectId}
                    </span>
                    <span className="text-slate-500">{q.chapterName}</span>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center gap-2">
                    {isCorrect && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {t.resultCorrectCount}
                      </span>
                    )}
                    {isIncorrect && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-rose-100 text-rose-800 font-bold text-xs border border-rose-200">
                        <XCircle className="w-3.5 h-3.5" />
                        {t.resultIncorrectCount}
                      </span>
                    )}
                    {isUnanswered && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-200 text-slate-700 font-semibold text-xs">
                        <HelpCircle className="w-3.5 h-3.5" />
                        {t.resultNotAttempted}
                      </span>
                    )}
                    {resp?.isMarkedForReview && (
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold text-xs flex items-center gap-1">
                        <Bookmark className="w-3 h-3 fill-amber-700" />
                        {t.examStatusMarked}
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Statement */}
                <div className="p-6 space-y-5">
                  <div className="text-base font-semibold text-slate-900 leading-relaxed">
                    <MathRenderer text={q.questionText} />
                  </div>

                  {/* Options Comparison */}
                  <div className="space-y-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isStudentSelected = studentChoice === optIdx;
                      const isVerifiedCorrect = q.correctOptionIndex === optIdx;

                      let rowStyle = 'border-slate-200 bg-white text-slate-700';
                      let badgeStyle = 'bg-slate-100 text-slate-600';

                      if (isVerifiedCorrect) {
                        rowStyle = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-medium ring-1 ring-emerald-500/20';
                        badgeStyle = 'bg-emerald-600 text-white';
                      } else if (isStudentSelected && !isVerifiedCorrect) {
                        rowStyle = 'border-rose-400 bg-rose-50/70 text-rose-950 ring-1 ring-rose-400/20';
                        badgeStyle = 'bg-rose-600 text-white';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-3.5 rounded-xl border flex items-start gap-3 text-sm transition-all ${rowStyle}`}
                        >
                          <span className={`w-6 h-6 rounded-md text-xs font-bold shrink-0 flex items-center justify-center ${badgeStyle}`}>
                            {optionLetters[optIdx]}
                          </span>

                          <div className="flex-1 pt-0.5">
                            <MathRenderer text={opt} />
                          </div>

                          <div className="shrink-0 flex items-center gap-1.5 text-xs font-semibold">
                            {isVerifiedCorrect && (
                              <span className="text-emerald-700 flex items-center gap-1 bg-emerald-100/80 px-2 py-0.5 rounded">
                                <Check className="w-3.5 h-3.5" /> {t.resultCorrectAnswer}
                              </span>
                            )}
                            {isStudentSelected && !isVerifiedCorrect && (
                              <span className="text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded">
                                {t.resultYourAnswer}
                              </span>
                            )}
                            {isStudentSelected && isVerifiedCorrect && (
                              <span className="text-emerald-700 bg-emerald-200/80 px-2 py-0.5 rounded">
                                {t.resultYourAnswer} ({t.resultCorrectCount})
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Step-by-Step Mathematical / Conceptual Solution */}
                  <div className="mt-6 pt-5 border-t border-slate-100 space-y-4">
                    <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
                      <BookOpen className="w-4 h-4" />
                      <span>{t.reviewStepByStep}</span>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/70 space-y-2 text-xs sm:text-sm text-slate-800">
                      {q.stepByStepSolution.map((step, sIdx) => (
                        <div key={sIdx} className="leading-relaxed flex items-start gap-2">
                          <span className="font-bold text-blue-600 shrink-0">•</span>
                          <MathRenderer text={step} />
                        </div>
                      ))}
                    </div>

                    {/* Key Takeaway / Concept Note */}
                    <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/60 text-xs text-blue-950 flex items-start gap-2.5">
                      <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">{t.resultTakeawayLabel} </span>
                        <span>{q.conceptTakeaway}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
