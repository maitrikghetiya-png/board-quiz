import React, { useState } from 'react';
import {
  History,
  ArrowLeft,
  Calendar,
  Clock,
  Award,
  ChevronRight,
  Trash2,
  PlayCircle,
  AlertTriangle,
  X
} from 'lucide-react';
import { ExamResult, SupportedLanguage } from '../types';
import { SUBJECTS } from '../data/syllabus';
import { TRANSLATIONS } from '../i18n/translations';

interface ResultsHistoryViewProps {
  results: ExamResult[];
  onViewResult: (resultId: string) => void;
  onClearHistory: () => void;
  onBackToDashboard: () => void;
  onStartNewExam: () => void;
  currentLanguage: SupportedLanguage;
}

export const ResultsHistoryView: React.FC<ResultsHistoryViewProps> = ({
  results,
  onViewResult,
  onClearHistory,
  onBackToDashboard,
  onStartNewExam,
  currentLanguage
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [showClearConfirm, setShowClearConfirm] = useState<boolean>(false);

  const filteredResults = results.filter(r => {
    if (filterSubject === 'all') return true;
    return r.config.subjectId === filterSubject;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2">
            <History className="w-3.5 h-3.5" />
            <span>{t.navResults}</span>
            <span>•</span>
            <span>{results.length} Attempts</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            {t.recentResultsTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {t.recentResultsSub}
          </p>
        </div>

        <button
          onClick={onBackToDashboard}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 transition cursor-pointer self-start sm:self-auto"
        >
          {t.resultReturnHomeBtn}
        </button>
      </div>

      {/* Filter and Clear bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2">
          {[
            { id: 'all', label: t.subjectAll },
            { id: 'physics', label: t.subjectPhysics.split(' ')[0] },
            { id: 'chemistry', label: t.subjectChemistry.split(' ')[0] },
            { id: 'mathematics', label: t.subjectMathematics.split(' ')[0] }
          ].map(s => (
            <button
              key={s.id}
              onClick={() => setFilterSubject(s.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD43B] ${
                filterSubject === s.id
                  ? 'bg-[#FFD43B] text-[#111318] shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {results.length > 0 && (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 flex items-center gap-1.5 transition cursor-pointer px-2.5 py-1.5 rounded-lg border border-rose-200 font-medium"
            title={t.clearHistoryTitle}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.clearHistoryTitle}</span>
          </button>
        )}
      </div>

      {/* Results List */}
      <div className="space-y-3">
        {filteredResults.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-slate-300 p-10 text-center space-y-3">
            <History className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-semibold text-slate-800 text-sm">{t.noAttemptsTitle}</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {t.noAttemptsSub}
            </p>
            <button
              onClick={onStartNewExam}
              className="mt-2 px-4 py-2 rounded-lg bg-[#FFD43B] hover:bg-[#F5C518] text-[#111318] text-xs font-bold transition cursor-pointer inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD43B]"
            >
              <PlayCircle className="w-4 h-4 fill-[#111318] text-[#FFD43B]" />
              <span>{t.takeFirstMockBtn}</span>
            </button>
          </div>
        ) : (
          filteredResults.map(res => {
            const dateStr = new Date(res.submittedAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });
            const pct = res.maxMarks > 0 ? Math.round((res.marksEarned / res.maxMarks) * 100) : 0;
            const subName = res.config.subjectId === 'all'
              ? t.subjectAll
              : (res.config.subjectId === 'physics' ? t.subjectPhysics : res.config.subjectId === 'chemistry' ? t.subjectChemistry : t.subjectMathematics);

            return (
              <div
                key={res.id}
                onClick={() => onViewResult(res.id)}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {subName} Mock Test
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {res.totalQuestions} Questions
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span>{dateStr}</span>
                    <span>{t.resultTimeTaken}: {Math.floor(res.totalTimeTakenSeconds / 60)}m {res.totalTimeTakenSeconds % 60}s</span>
                    <span>{t.resultAccuracy}: {res.accuracyPercentage}%</span>
                    <span>{t.resultCorrectCount}: {res.correctCount}/{res.answeredCount}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-5">
                  <div className="text-right">
                    <div className="text-xl font-black text-slate-900">
                      <span className={res.marksEarned >= 0 ? 'text-blue-600' : 'text-rose-600'}>
                        {res.marksEarned}
                      </span>
                      <span className="text-xs text-slate-400 font-medium"> / {res.maxMarks}</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-600">{pct}% Score</div>
                  </div>

                  <span className="text-blue-600 text-xs font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>{t.reviewAnswersBtn}</span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Clear History Confirmation Modal */}
      {showClearConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="clear-history-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="clear-history-title" className="text-base font-bold text-slate-900">
                    {t.clearHistoryTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {results.length} {results.length === 1 ? 'attempt' : 'attempts'} recorded
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowClearConfirm(false)}
                aria-label="Close dialog"
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {t.clearHistoryConfirmPrompt}
            </p>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 space-y-1">
              <p className="font-semibold">Note on Data Safety:</p>
              <p>Only completed test history will be deleted. Your selected language preference and any active tests remain fully intact.</p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition cursor-pointer"
              >
                {t.clearHistoryCancelBtn}
              </button>
              <button
                type="button"
                onClick={() => {
                  onClearHistory();
                  setShowClearConfirm(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition cursor-pointer inline-flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.clearHistoryConfirmBtn}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
