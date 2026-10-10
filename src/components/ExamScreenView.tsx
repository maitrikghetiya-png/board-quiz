import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Timer,
  CheckCircle2,
  Bookmark,
  AlertTriangle,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Send,
  HelpCircle,
  X,
  FileText,
  Clock,
  ShieldCheck,
  Check
} from 'lucide-react';
import { ActiveExamSession, Question, StudentResponse, SupportedLanguage } from '../types';
import { MathRenderer } from './MathRenderer';
import { MARKING_SCHEMES, SUBJECTS } from '../data/syllabus';
import { TRANSLATIONS } from '../i18n/translations';
import { getLocalizedQuestion } from '../data/questionTranslations';

interface ExamScreenViewProps {
  session: ActiveExamSession;
  onUpdateResponse: (questionId: string, optionIndex: number | null, isMarkedForReview: boolean) => void;
  onSetCurrentQuestion: (index: number) => void;
  onSubmitExam: () => void;
  currentLanguage: SupportedLanguage;
}

export const ExamScreenView: React.FC<ExamScreenViewProps> = ({
  session,
  onUpdateResponse,
  onSetCurrentQuestion,
  onSubmitExam,
  currentLanguage
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(() => {
    const diff = Math.max(0, Math.floor((session.targetEndTime - Date.now()) / 1000));
    return diff;
  });

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [isPaletteOpenMobile, setIsPaletteOpenMobile] = useState<boolean>(false);

  const currentQIndex = session.currentQuestionIndex;
  const currentQuestionRaw: Question | undefined = session.questions[currentQIndex];
  const currentQuestion = currentQuestionRaw ? getLocalizedQuestion(currentQuestionRaw, currentLanguage) : undefined;
  const responses = session.responses;

  // Real-time countdown timer using target timestamp to prevent drift
  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((session.targetEndTime - now) / 1000));
      setTimeRemainingSeconds(remaining);

      if (remaining <= 0) {
        onSubmitExam();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [session.targetEndTime, onSubmitExam]);

  // Formatted countdown mm:ss or hh:mm:ss
  const formatTime = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isTimeCritical = timeRemainingSeconds <= 300; // Under 5 mins

  // Current response state
  const currentResponse: StudentResponse | undefined = currentQuestion ? responses[currentQuestion.id] : undefined;
  const selectedOption = currentResponse?.selectedOptionIndex ?? null;
  const isMarked = currentResponse?.isMarkedForReview ?? false;

  const handleSelectOption = (index: number) => {
    if (!currentQuestion) return;
    onUpdateResponse(currentQuestion.id, index, isMarked);
  };

  const handleClearResponse = () => {
    if (!currentQuestion) return;
    onUpdateResponse(currentQuestion.id, null, isMarked);
  };

  const handleToggleMarkForReview = () => {
    if (!currentQuestion) return;
    onUpdateResponse(currentQuestion.id, selectedOption, !isMarked);
  };

  const handleNext = () => {
    if (currentQIndex < session.questions.length - 1) {
      onSetCurrentQuestion(currentQIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQIndex > 0) {
      onSetCurrentQuestion(currentQIndex - 1);
    }
  };

  // Keyboard navigation & accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if inside input/modal
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || isSubmitModalOpen) {
        return;
      }

      switch (e.key) {
        case '1':
        case 'a':
        case 'A':
          e.preventDefault();
          handleSelectOption(0);
          break;
        case '2':
        case 'b':
        case 'B':
          e.preventDefault();
          handleSelectOption(1);
          break;
        case '3':
        case 'c':
        case 'C':
          e.preventDefault();
          handleSelectOption(2);
          break;
        case '4':
        case 'd':
        case 'D':
          e.preventDefault();
          handleSelectOption(3);
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          handleToggleMarkForReview();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handlePrev();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQIndex, session.questions.length, selectedOption, isMarked, currentQuestion, isSubmitModalOpen]);

  // Palette counts
  const paletteStats = useMemo(() => {
    let answered = 0;
    let unanswered = 0;
    let markedForReview = 0;
    let answeredAndMarked = 0;

    session.questions.forEach(q => {
      const resp = responses[q.id];
      const hasAnswer = resp && resp.selectedOptionIndex !== null && resp.selectedOptionIndex !== undefined;
      const isRev = resp && resp.isMarkedForReview;

      if (hasAnswer && isRev) {
        answeredAndMarked += 1;
        answered += 1;
      } else if (hasAnswer) {
        answered += 1;
      } else if (isRev) {
        markedForReview += 1;
      } else {
        unanswered += 1;
      }
    });

    return {
      answered,
      unanswered,
      markedForReview,
      answeredAndMarked,
      total: session.questions.length
    };
  }, [session.questions, responses]);

  const progressPercentage = Math.round((paletteStats.answered / paletteStats.total) * 100);
  const schemeDetails = MARKING_SCHEMES[session.config.markingScheme] || MARKING_SCHEMES.practice_standard;

  const getSubjectName = () => {
    if (session.config.subjectId === 'all') return t.subjectAll;
    if (session.config.subjectId === 'physics') return t.subjectPhysics;
    if (session.config.subjectId === 'chemistry') return t.subjectChemistry;
    return t.subjectMathematics;
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 space-y-4">
      
      {/* CBT Top Examination Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sticky top-16 z-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Exam Title & Subject Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#111318] text-[#FFD43B] font-extrabold flex items-center justify-center text-sm shadow-xs shrink-0 border border-[#292D35]">
              Q{currentQIndex + 1}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm sm:text-base">
                  {getSubjectName()}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {t.examQTracker} {currentQIndex + 1} / {session.questions.length}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                <span>{currentQuestion?.chapterName}</span>
                <span>•</span>
                <span className="font-semibold text-emerald-700">
                  +{schemeDetails.correct} / {schemeDetails.incorrect}
                </span>
              </div>
            </div>
          </div>

          {/* Right Status: Timer & Submit Action */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            
            {/* Mobile Question Palette Toggle */}
            <button
              type="button"
              onClick={() => setIsPaletteOpenMobile(!isPaletteOpenMobile)}
              className="lg:hidden px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              {t.examPaletteTitle} ({paletteStats.answered}/{paletteStats.total})
            </button>

            {/* Prominent CBT Countdown Clock */}
            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono font-bold text-sm sm:text-base transition-colors ${
                isTimeCritical
                  ? 'bg-rose-50 text-rose-700 border-rose-300'
                  : 'bg-[#111318] text-[#FFD43B] border-[#292D35]'
              }`}
              title="Time remaining until automatic submission"
            >
              <Clock className={`w-4 h-4 ${isTimeCritical ? 'text-rose-600 animate-pulse' : 'text-[#FFD43B]'}`} />
              <span>{formatTime(timeRemainingSeconds)}</span>
              {isTimeCritical && (
                <span className="text-[10px] font-sans font-bold text-rose-600 uppercase hidden sm:inline">
                  {t.examEndingSoon}
                </span>
              )}
            </div>

            {/* Submit Exam Button */}
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#FFD43B] hover:bg-[#F5C518] active:bg-[#E6B800] text-[#111318] font-bold text-xs sm:text-sm shadow-xs flex items-center gap-1.5 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD43B]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t.examSubmitBtn}</span>
            </button>
          </div>
        </div>

        {/* Global Progress Bar (Circuit Yellow) */}
        <div className="w-full bg-slate-200 h-2 rounded-full mt-3 overflow-hidden">
          <div
            className="bg-[#FFD43B] h-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Main Examination Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Left Column: Active Question Card */}
        <div className="lg:col-span-3 space-y-4">
          {currentQuestion && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
              
              {/* Question Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md">
                    {currentQuestion.subjectId}
                  </span>
                  <span className="text-xs font-medium text-slate-600">
                    {currentQuestion.chapterName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {currentQuestion.difficulty}
                  </span>
                  {isMarked && (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                      <Bookmark className="w-3 h-3 fill-amber-700 text-amber-700" />
                      {t.examStatusMarked}
                    </span>
                  )}
                </div>
              </div>

              {/* Question Statement */}
              <div className="text-slate-900 text-base sm:text-lg font-medium leading-relaxed">
                <div className="flex items-start gap-3">
                  <span className="font-bold text-slate-400 select-none shrink-0">
                    {currentQIndex + 1}.
                  </span>
                  <div className="flex-1 leading-relaxed">
                    <MathRenderer text={currentQuestion.questionText} />
                  </div>
                </div>
              </div>

              {/* 4 Selectable Answer Options */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t.examSelectOptionPrompt}
                </div>

                {currentQuestion.options.map((optText, idx) => {
                  const isSelected = selectedOption === idx;
                  const optionLetters = ['A', 'B', 'C', 'D'];

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-4 rounded-xl border text-left flex items-start gap-3.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD43B] ${
                        isSelected
                          ? 'border-[#FFD43B] bg-[#FFF3C4]/40 text-[#111318] font-medium ring-2 ring-[#FFD43B]/60 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 text-slate-800 bg-white'
                      }`}
                    >
                      {/* Radio Key Indicator */}
                      <span
                        className={`w-7 h-7 rounded-lg text-xs font-bold shrink-0 flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#FFD43B] text-[#111318] shadow-xs'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {optionLetters[idx]}
                      </span>

                      {/* Option Text with Math Formatting */}
                      <div className="flex-1 pt-0.5 text-sm sm:text-base leading-snug">
                        <MathRenderer text={optText} />
                      </div>

                      {/* Selection Checkmark */}
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-[#8F6B00] shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* CBT Action Toolbar */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                
                {/* Secondary Actions: Review / Clear */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleToggleMarkForReview}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                      isMarked
                        ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                        : 'bg-white text-amber-800 border-amber-300 hover:bg-amber-50'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isMarked ? 'fill-white' : ''}`} />
                    <span>{isMarked ? t.examUnmarkReviewBtn : t.examMarkReviewBtn}</span>
                  </button>

                  {selectedOption !== null && (
                    <button
                      type="button"
                      onClick={handleClearResponse}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{t.examClearResponseBtn}</span>
                    </button>
                  )}
                </div>

                {/* Primary Nav Actions */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentQIndex === 0}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{t.examPrevBtn}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={currentQIndex === session.questions.length - 1}
                    className="inline-flex items-center gap-1 px-5 py-2 rounded-xl text-xs font-bold text-[#111318] bg-[#FFD43B] hover:bg-[#F5C518] active:bg-[#E6B800] disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD43B]"
                  >
                    <span>{t.examNextBtn}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Accessible Keyboard Shortcuts Reminder */}
              <div className="pt-2 text-[11px] text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span>{t.examShortcutsPrompt}</span>
              </div>

            </div>
          )}
        </div>

        {/* Right Column: Question Palette */}
        <div
          className={`lg:block ${
            isPaletteOpenMobile ? 'block fixed inset-x-4 top-20 z-30 lg:static' : 'hidden'
          }`}
        >
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{t.examPaletteTitle}</h3>
                <p className="text-[11px] text-slate-500">{t.examPaletteSub}</p>
              </div>
              {isPaletteOpenMobile && (
                <button
                  type="button"
                  onClick={() => setIsPaletteOpenMobile(false)}
                  className="lg:hidden p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Palette Grid (1 to N) */}
            <div className="grid grid-cols-5 gap-2 max-h-80 overflow-y-auto p-1">
              {session.questions.map((q, idx) => {
                const resp = responses[q.id];
                const hasAnswer = resp && resp.selectedOptionIndex !== null && resp.selectedOptionIndex !== undefined;
                const isReview = resp && resp.isMarkedForReview;
                const isCurrent = idx === currentQIndex;

                let stateClasses = 'bg-white text-slate-700 border-slate-200 hover:border-slate-400';

                if (hasAnswer && isReview) {
                  // Answered and Marked for review
                  stateClasses = 'bg-amber-500 text-white border-amber-600 font-bold';
                } else if (hasAnswer) {
                  // Answered
                  stateClasses = 'bg-emerald-600 text-white border-emerald-700 font-bold shadow-2xs';
                } else if (isReview) {
                  // Marked for review (unanswered)
                  stateClasses = 'bg-amber-100 text-amber-900 border-amber-400 font-bold';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      onSetCurrentQuestion(idx);
                      setIsPaletteOpenMobile(false);
                    }}
                    className={`h-9 rounded-lg border text-xs font-semibold flex items-center justify-center relative transition-all cursor-pointer ${stateClasses} ${
                      isCurrent ? 'ring-2 ring-[#FFD43B] ring-offset-2 border-[#111318]' : ''
                    }`}
                    title={`Question ${idx + 1}`}
                  >
                    <span>{idx + 1}</span>
                    {hasAnswer && isReview && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white absolute top-1 right-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* CBT Status Legend */}
            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="w-3 h-3 rounded bg-emerald-600" />
                  {t.examStatusAnswered}
                </span>
                <span className="font-bold text-slate-900">{paletteStats.answered}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="w-3 h-3 rounded bg-white border border-slate-300" />
                  {t.examStatusNotAnswered}
                </span>
                <span className="font-bold text-slate-900">{paletteStats.unanswered}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="w-3 h-3 rounded bg-amber-500" />
                  {t.examStatusMarked}
                </span>
                <span className="font-bold text-slate-900">{paletteStats.markedForReview + paletteStats.answeredAndMarked}</span>
              </div>
            </div>

            {/* Finalize & Submit Button */}
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(true)}
              className="w-full py-2.5 rounded-xl bg-[#111318] hover:bg-[#292D35] active:bg-black text-[#FFD43B] font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer border border-[#292D35]"
            >
              <Send className="w-3.5 h-3.5 text-[#FFD43B]" />
              <span>{t.examSubmitBtn}</span>
            </button>

          </div>
        </div>

      </div>

      {/* Confirmation Modal before Submission */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{t.examModalTitle}</h3>
                  <p className="text-xs text-slate-500">{t.examModalSub}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Attempt Summary breakdown */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">{t.examQTracker}</span>
                <span className="font-bold text-slate-900">{paletteStats.total}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-emerald-700 font-semibold">{t.examStatusAnswered}</span>
                <span className="font-bold text-emerald-700">{paletteStats.answered}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-rose-700 font-semibold">{t.examStatusNotAnswered}</span>
                <span className="font-bold text-rose-700">{paletteStats.unanswered}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-800 font-semibold">{t.examStatusMarked}</span>
                <span className="font-bold text-amber-800">{paletteStats.markedForReview}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-slate-700">
                <span>{t.resultTimeTaken}</span>
                <span className="font-mono font-bold text-slate-900">{formatTime(timeRemainingSeconds)}</span>
              </div>
            </div>

            {paletteStats.unanswered > 0 && (
              <p className="text-xs text-amber-900 bg-amber-50 border border-amber-200/80 p-2.5 rounded-lg leading-relaxed">
                {t.examModalWarning}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                {t.examModalReturnBtn}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitModalOpen(false);
                  onSubmitExam();
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold shadow-xs transition cursor-pointer"
              >
                {t.examModalConfirmBtn}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
