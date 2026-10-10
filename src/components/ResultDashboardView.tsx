import React from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  Target,
  RotateCcw,
  BookOpen,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  Share2,
  Check,
  ChevronRight
} from 'lucide-react';
import { ExamResult, SupportedLanguage } from '../types';
import { SUBJECTS, MARKING_SCHEMES } from '../data/syllabus';
import { MathRenderer } from './MathRenderer';
import { TRANSLATIONS } from '../i18n/translations';
import { getLocalizedQuestion } from '../data/questionTranslations';
import { Footer } from './Footer';

interface ResultDashboardViewProps {
  result: ExamResult;
  onReviewAnswers: () => void;
  onRetakeTest: () => void;
  onReturnHome: () => void;
  currentLanguage: SupportedLanguage;
}

export const ResultDashboardView: React.FC<ResultDashboardViewProps> = ({
  result,
  onReviewAnswers,
  onRetakeTest,
  onReturnHome,
  currentLanguage
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const percentage = result.maxMarks > 0
    ? Math.round((result.marksEarned / result.maxMarks) * 100)
    : 0;

  const getSubjectTitle = () => {
    if (result.config.subjectId === 'all') return t.subjectAll;
    if (result.config.subjectId === 'physics') return t.subjectPhysics;
    if (result.config.subjectId === 'chemistry') return t.subjectChemistry;
    return t.subjectMathematics;
  };

  const scheme = MARKING_SCHEMES[result.config.markingScheme] || MARKING_SCHEMES.practice_standard;

  // Feedback badge based on percentage
  const getPerformanceFeedback = (pct: number) => {
    if (pct >= 90) return {
      title: currentLanguage === 'gu' ? 'ઉત્કૃષ્ટ પ્રદર્શન (Outstanding)' : currentLanguage === 'hi' ? 'उत्कृष्ट प्रदर्शन (Outstanding)' : 'Outstanding Mastery',
      note: currentLanguage === 'gu' ? 'CBSE બોર્ડ 95%+ માટે ઉત્તમ તૈયારી.' : currentLanguage === 'hi' ? 'CBSE बोर्ड 95%+ के लिए श्रेष्ठ तैयारी।' : 'Top tier performance! Ready for CBSE Board 95%+ bracket.'
    };
    if (pct >= 75) return {
      title: currentLanguage === 'gu' ? 'મજબૂત પ્રદર્શન (Strong)' : currentLanguage === 'hi' ? 'सशक्त प्रदर्शन (Strong)' : 'Strong Performance',
      note: currentLanguage === 'gu' ? 'મજબૂત વૈચારિક સ્પષ્ટતા. નીચે જણાવેલ ભૂલો સુધારો.' : currentLanguage === 'hi' ? 'मजबूत वैचारिक समझ। छोटी त्रुटियों का पुनरावलोकन करें।' : 'Great conceptual clarity. Review minor numerical slips below.'
    };
    if (pct >= 50) return {
      title: currentLanguage === 'gu' ? 'સાધારણ પ્રગતિ (Moderate)' : currentLanguage === 'hi' ? 'मध्यम प्रगति (Moderate)' : 'Moderate Progress',
      note: currentLanguage === 'gu' ? 'નબળા પ્રકરણો પર વધુ પ્રેક્ટિસ જરૂરી છે.' : currentLanguage === 'hi' ? 'कमजोर अध्यायों पर अधिक अभ्यास की आवश्यकता है।' : 'Decent grasp of fundamentals. Practice weaker chapters highlighted below.'
    };
    return {
      title: currentLanguage === 'gu' ? 'સઘન પુનરાવર્તનની જરૂર' : currentLanguage === 'hi' ? 'सघन पुनरावृत्ति की आवश्यकता' : 'Needs Focused Revision',
      note: currentLanguage === 'gu' ? 'NCERT ઉદાહરણો અને સૂત્રોનો ફરી અભ્યાસ કરો.' : currentLanguage === 'hi' ? 'NCERT उदाहरणों और सूत्रों का गहन अध्ययन करें।' : 'Focus on NCERT in-text examples and formula derivation steps.'
    };
  };

  const feedback = getPerformanceFeedback(percentage);

  const formatMinutesSeconds = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      
      {/* Top Banner / Hero Score Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 sm:p-8 bg-[#111318] border-b border-[#292D35] text-white relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#292D35] text-[#FFD43B] text-xs font-bold mb-2 border border-[#3A3F4B]">
                <span>{t.resultReportTitle}</span>
                <span>•</span>
                <span>{t.appSession}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {getSubjectTitle()} {t.resultReportTitle}
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                {t.resultCompletedOn} {new Date(result.submittedAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex items-center gap-3">
              <button
                onClick={onReviewAnswers}
                className="px-5 py-2.5 rounded-xl bg-[#FFD43B] hover:bg-[#F5C518] text-[#111318] font-bold text-xs sm:text-sm shadow-xs transition cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD43B]"
              >
                <BookOpen className="w-4 h-4" />
                <span>{t.resultOpenFullReviewBtn}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Score Overview Bar */}
        <div className="p-6 sm:p-8 bg-slate-50/50 border-b border-slate-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            {/* Score */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{t.resultTotalScore}</div>
              <div className="text-3xl font-extrabold text-slate-900 mt-1 flex items-baseline gap-1">
                <span className={result.marksEarned >= 0 ? 'text-blue-600' : 'text-rose-600'}>
                  {result.marksEarned}
                </span>
                <span className="text-sm text-slate-400 font-medium">/ {result.maxMarks}</span>
              </div>
              <div className="text-xs font-semibold text-slate-600 mt-1">
                {percentage}% Score ({scheme.name})
              </div>
            </div>

            {/* Accuracy */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{t.resultAccuracy}</div>
              <div className="text-3xl font-extrabold text-emerald-600 mt-1">
                {result.accuracyPercentage}%
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {result.correctCount} / {result.answeredCount} {t.resultStatus.toLowerCase()}
              </div>
            </div>

            {/* Time Taken */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{t.resultTimeTaken}</div>
              <div className="text-3xl font-extrabold text-slate-900 mt-1">
                {formatMinutesSeconds(result.totalTimeTakenSeconds)}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {t.resultAllocated}: {result.config.durationMinutes} mins
              </div>
            </div>

            {/* Performance Grade */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{t.resultStatus}</div>
              <div className="text-lg font-bold text-slate-900 mt-1">
                {feedback.title}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {feedback.note}
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Question Breakdown Stats */}
        <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <div className="text-lg font-bold text-emerald-950">{result.correctCount} {t.resultCorrectCount}</div>
              <div className="text-xs text-emerald-700">+{result.correctCount * scheme.correct} {t.resultMarksGained}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-rose-50/70 border border-rose-200/60">
            <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
            <div>
              <div className="text-lg font-bold text-rose-950">{result.incorrectCount} {t.resultIncorrectCount}</div>
              <div className="text-xs text-rose-700">
                {scheme.incorrect < 0 ? `${result.incorrectCount * scheme.incorrect} ${t.resultMarksDeducted}` : t.resultNoPenalty}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-100/70 border border-slate-200">
            <HelpCircle className="w-6 h-6 text-slate-500 shrink-0" />
            <div>
              <div className="text-lg font-bold text-slate-900">{result.unansweredCount} {t.resultUnansweredCount}</div>
              <div className="text-xs text-slate-600">0 marks change</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter-wise Breakdown & Analytics */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{t.resultChapterPerfTitle}</h2>
          <p className="text-xs text-slate-500 mt-1">
            {t.resultChapterPerfSub}
          </p>
        </div>

        <div className="space-y-4">
          {Object.values(result.chapterPerformance).map(ch => {
            return (
              <div key={ch.chapterId} className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <span className="font-bold text-slate-900 text-sm">{ch.chapterName}</span>
                  <div className="flex items-center gap-3 text-slate-600">
                    <span className="text-emerald-600 font-semibold">{ch.correct} {t.resultCorrectCount}</span>
                    <span>•</span>
                    <span className="text-rose-600 font-semibold">{ch.incorrect} {t.resultIncorrectCount}</span>
                    <span>•</span>
                    <span className="text-slate-400">{ch.unanswered} {t.resultUnansweredCount}</span>
                    <span>•</span>
                    <span className="font-bold text-slate-900">{ch.accuracy}% Acc</span>
                  </div>
                </div>

                {/* Progress Visual Bar */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                  <div
                    className="bg-emerald-500 h-full"
                    style={{ width: `${(ch.correct / ch.total) * 100}%` }}
                    title={`${ch.correct} Correct`}
                  />
                  <div
                    className="bg-rose-500 h-full"
                    style={{ width: `${(ch.incorrect / ch.total) * 100}%` }}
                    title={`${ch.incorrect} Incorrect`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Strengths and Revision Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Strengths */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-3">
          <div className="flex items-center gap-2 text-emerald-700">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-sm uppercase tracking-wide">{t.resultStrengthsTitle}</h3>
          </div>
          {result.strengths.length > 0 ? (
            <ul className="space-y-2 text-xs text-slate-700">
              {result.strengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-500">Attempt more questions to reveal your primary strengths.</p>
          )}
        </div>

        {/* Areas to Improve */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-3">
          <div className="flex items-center gap-2 text-amber-700">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-sm uppercase tracking-wide">{t.resultAreasTitle}</h3>
          </div>
          {result.areasToImprove.length > 0 ? (
            <ul className="space-y-2 text-xs text-slate-700">
              {result.areasToImprove.map((area, idx) => (
                <li key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50/60 border border-amber-100">
                  <span className="text-amber-600 font-bold mt-0.5">!</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-500">No major weakness patterns observed in this attempt!</p>
          )}
        </div>

      </div>

      {/* Answer Explanations Section on Result Screen */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>{t.resultExplanationsTitle}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.resultExplanationsSub}
            </p>
          </div>
          <button
            onClick={onReviewAnswers}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>{t.resultOpenFullReviewBtn}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-4">
          {result.questions.map((rawQ, qIdx) => {
            const q = getLocalizedQuestion(rawQ, currentLanguage);
            const resp = result.responses[q.id];
            const studentChoice = resp?.selectedOptionIndex ?? null;
            const isCorrect = studentChoice !== null && studentChoice === q.correctOptionIndex;
            const isIncorrect = studentChoice !== null && studentChoice !== q.correctOptionIndex;
            const isUnanswered = studentChoice === null;
            const optionLetters = ['A', 'B', 'C', 'D'];

            return (
              <div
                key={q.id}
                className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">Q{qIdx + 1}.</span>
                    <span className="font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800 uppercase text-[11px]">
                      {q.subjectId}
                    </span>
                    <span className="text-slate-600 font-medium">{q.chapterName}</span>
                  </div>

                  <div>
                    {isCorrect && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {t.resultCorrectCount} (+{scheme.correct})
                      </span>
                    )}
                    {isIncorrect && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-xs">
                        <XCircle className="w-3.5 h-3.5" />
                        {t.resultIncorrectCount} ({scheme.incorrect})
                      </span>
                    )}
                    {isUnanswered && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold text-xs">
                        <HelpCircle className="w-3.5 h-3.5" />
                        {t.resultUnansweredCount} (0)
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-sm font-semibold text-slate-900">
                  <MathRenderer text={q.questionText} />
                </div>

                {/* Compact Answer Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                      : isIncorrect
                      ? 'bg-rose-50 border-rose-300 text-rose-950 font-medium'
                      : 'bg-slate-100 border-slate-200 text-slate-600'
                  }`}>
                    <span>{t.resultYourAnswer}</span>
                    <span className="font-bold">
                      {studentChoice !== null
                        ? `(${optionLetters[studentChoice]}) ${q.options[studentChoice]}`
                        : t.resultNotAttempted}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg border border-emerald-300 bg-emerald-50/80 text-emerald-950 font-medium flex items-center justify-between">
                    <span>{t.resultCorrectAnswer}</span>
                    <span className="font-bold">
                      ({optionLetters[q.correctOptionIndex]}) {q.options[q.correctOptionIndex]}
                    </span>
                  </div>
                </div>

                {/* Explanation text */}
                <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-slate-900 block">{t.resultExplanationLabel}</span>
                  <p className="leading-relaxed">
                    <MathRenderer text={q.explanation} />
                  </p>
                  <div className="pt-1 text-[11px] text-blue-700 font-medium">
                    {t.resultTakeawayLabel} {q.conceptTakeaway}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Action Footer Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={onReturnHome}
          className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition cursor-pointer"
        >
          {t.resultReturnHomeBtn}
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onRetakeTest}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.resultRetakeBtn}</span>
          </button>

          <button
            onClick={onReviewAnswers}
            className="px-6 py-2.5 rounded-xl bg-[#FFD43B] hover:bg-[#F5C518] active:bg-[#E6B800] text-[#111318] font-extrabold text-xs shadow-xs transition cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD43B]"
          >
            <span>{t.resultReviewSolutionsBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Made By Footer */}
      <Footer />

    </div>
  );
};
