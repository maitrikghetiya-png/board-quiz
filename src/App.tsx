import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { ExamSetupView } from './components/ExamSetupView';
import { ExamScreenView } from './components/ExamScreenView';
import { ResultDashboardView } from './components/ResultDashboardView';
import { AnswerReviewView } from './components/AnswerReviewView';
import { SyllabusBrowserView } from './components/SyllabusBrowserView';
import { QuestionBankBrowserView } from './components/QuestionBankBrowserView';
import { ResultsHistoryView } from './components/ResultsHistoryView';

import { VERIFIED_QUESTIONS } from './data/questionBank';
import { CHAPTERS, SUBJECTS } from './data/syllabus';
import {
  ActiveExamSession,
  ExamConfig,
  ExamResult,
  Question,
  SubjectId,
  SupportedLanguage
} from './types';
import { StorageService } from './services/storage';
import { calculateExamResult, filterQuestionsForExam } from './services/examEngine';
import { requestAIPracticeQuestions } from './services/aiGenerator';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { TRANSLATIONS } from './i18n/translations';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [activeSession, setActiveSession] = useState<ActiveExamSession | null>(null);
  const [activeResult, setActiveResult] = useState<ExamResult | null>(null);
  const [userStats, setUserStats] = useState(StorageService.getUserStats());
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(() => StorageService.getLanguage());
  const [showResetModal, setShowResetModal] = useState<boolean>(false);

  // Setup props
  const [setupSubject, setSetupSubject] = useState<SubjectId | 'all'>('physics');
  const [setupChapterId, setSetupChapterId] = useState<string | 'all'>('all');
  const [isStartingExam, setIsStartingExam] = useState<boolean>(false);

  // Mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<{ type: 'info' | 'success' | 'warn'; text: string } | null>(null);

  const showToast = (text: string, type: 'info' | 'success' | 'warn' = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setCurrentLanguage(lang);
    StorageService.saveLanguage(lang);
    const langNames: Record<SupportedLanguage, string> = {
      en: 'English',
      gu: 'ગુજરાતી (Gujarati)',
      hi: 'हिंदी (Hindi)'
    };
    showToast(`Language switched to ${langNames[lang]}`, 'info');
  };

  // 1. Initial Mount: Check for existing active session (Refresh Recovery)
  useEffect(() => {
    const savedSession = StorageService.getActiveSession();
    if (savedSession) {
      const now = Date.now();
      if (savedSession.targetEndTime > now) {
        // Test is still active! Restore it seamlessly
        setActiveSession(savedSession);
        setCurrentView('exam');
        showToast('Resumed active mock examination attempt.', 'info');
      } else {
        // Test expired while user was away: auto-submit it
        const finalResult = calculateExamResult(savedSession);
        StorageService.saveExamResult(finalResult);
        StorageService.clearActiveSession();
        setActiveResult(finalResult);
        setUserStats(StorageService.getUserStats());
        setCurrentView('result');
        showToast('Active exam time expired. Final score has been recorded.', 'warn');
      }
    }
  }, []);

  // 2. Start a New Exam
  const handleStartExam = async (config: ExamConfig) => {
    setIsStartingExam(true);

    let chosenQuestions: Question[] = [];

    // Optional AI Generation Mode
    if (config.useAI && config.subjectId !== 'all') {
      showToast('Generating CBSE Class 12 questions via Gemini AI...', 'info');
      const aiResponse = await requestAIPracticeQuestions({
        subjectId: config.subjectId,
        chapterId: config.chapterId !== 'all' ? config.chapterId : undefined,
        difficulty: config.difficulty !== 'mixed' ? config.difficulty : undefined,
        count: config.questionCount
      });

      if (aiResponse.success && aiResponse.questions && aiResponse.questions.length > 0) {
        chosenQuestions = aiResponse.questions;
        showToast('AI practice questions generated and validated against CBSE syllabus.', 'success');
      } else {
        // Fallback to local verified bank
        showToast(
          aiResponse.error
            ? `AI generation unavailable (${aiResponse.error}). Using verified NCERT question bank.`
            : 'Using verified CBSE curriculum question bank.',
          'warn'
        );
        chosenQuestions = filterQuestionsForExam(VERIFIED_QUESTIONS, config);
      }
    } else {
      // Local Verified Question Bank
      chosenQuestions = filterQuestionsForExam(VERIFIED_QUESTIONS, config);
    }

    if (chosenQuestions.length === 0) {
      // Fallback safeguard: take any questions available
      chosenQuestions = VERIFIED_QUESTIONS.slice(0, Math.min(config.questionCount, VERIFIED_QUESTIONS.length));
    }

    const now = Date.now();
    const durationMs = config.durationMinutes * 60 * 1000;
    const targetEndTime = now + durationMs;

    // Initialize initial response records for all questions
    const initialResponses: Record<string, { questionId: string; selectedOptionIndex: number | null; isMarkedForReview: boolean }> = {};
    chosenQuestions.forEach(q => {
      initialResponses[q.id] = {
        questionId: q.id,
        selectedOptionIndex: null,
        isMarkedForReview: false
      };
    });

    const newSession: ActiveExamSession = {
      id: `exam-${Date.now()}`,
      config,
      questions: chosenQuestions,
      responses: initialResponses,
      currentQuestionIndex: 0,
      startedAt: now,
      targetEndTime,
      status: 'in_progress'
    };

    StorageService.saveActiveSession(newSession);
    setActiveSession(newSession);
    setIsStartingExam(false);
    setCurrentView('exam');
  };

  // 3. Update Answer or Mark for Review
  const handleUpdateResponse = (
    questionId: string,
    optionIndex: number | null,
    isMarkedForReview: boolean
  ) => {
    if (!activeSession) return;

    const updatedResponses = {
      ...activeSession.responses,
      [questionId]: {
        questionId,
        selectedOptionIndex: optionIndex,
        isMarkedForReview
      }
    };

    const updatedSession: ActiveExamSession = {
      ...activeSession,
      responses: updatedResponses
    };

    setActiveSession(updatedSession);
    StorageService.saveActiveSession(updatedSession);
  };

  // 4. Change current active question index
  const handleSetCurrentQuestion = (index: number) => {
    if (!activeSession) return;
    const updated: ActiveExamSession = {
      ...activeSession,
      currentQuestionIndex: index
    };
    setActiveSession(updated);
    StorageService.saveActiveSession(updated);
  };

  // 5. Submit Exam
  const handleSubmitExam = useCallback(() => {
    if (!activeSession) return;

    const result = calculateExamResult(activeSession);
    StorageService.saveExamResult(result);
    StorageService.clearActiveSession();

    setActiveSession(null);
    setActiveResult(result);
    setUserStats(StorageService.getUserStats());
    setCurrentView('result');
    showToast('Mock test submitted successfully! Detailed report generated.', 'success');
  }, [activeSession]);

  // 6. Navigation router
  const handleNavigate = (view: string, extra?: any) => {
    if (view === 'setup-full') {
      setSetupSubject('all');
      setSetupChapterId('all');
      setCurrentView('setup');
    } else if (view === 'setup-chapter') {
      setSetupSubject('physics');
      setSetupChapterId(CHAPTERS[0].id);
      setCurrentView('setup');
    } else if (view === 'setup') {
      if (extra?.subjectId) {
        setSetupSubject(extra.subjectId);
      }
      if (extra?.chapterId) {
        setSetupChapterId(extra.chapterId);
      }
      setCurrentView('setup');
    } else {
      setCurrentView(view);
    }
  };

  // 7. Retake Exam
  const handleRetakeExam = () => {
    if (!activeResult) return;
    handleStartExam(activeResult.config);
  };

  // 8. View specific past result
  const handleViewResult = (resultId: string) => {
    const history = StorageService.getResultsHistory();
    const found = history.find(r => r.id === resultId);
    if (found) {
      setActiveResult(found);
      setCurrentView('result');
    }
  };

  // 9. Reset Application Data Modal Triggers
  const handleResetData = () => {
    setShowResetModal(true);
  };

  const handleConfirmResetData = () => {
    StorageService.clearActiveSession();
    StorageService.clearResultsHistory();
    setActiveSession(null);
    setActiveResult(null);
    setUserStats(StorageService.getUserStats());
    setShowResetModal(false);
    setCurrentView('dashboard');
    showToast('All mock test progress and history have been reset.', 'info');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-xs sm:text-sm font-medium ${
              toastMessage.type === 'success'
                ? 'bg-emerald-900 text-emerald-100 border-emerald-700'
                : toastMessage.type === 'warn'
                ? 'bg-amber-900 text-amber-100 border-amber-700'
                : 'bg-slate-900 text-slate-100 border-slate-700'
            }`}
          >
            {toastMessage.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
            {toastMessage.type === 'warn' && <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />}
            {toastMessage.type === 'info' && <Info className="w-4 h-4 text-blue-400 shrink-0" />}
            <span>{toastMessage.text}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="ml-2 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Top Navigation */}
      <Navbar
        activeSession={activeSession}
        onNavigate={handleNavigate}
        currentView={currentView}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        onOpenSyllabusModal={() => handleNavigate('syllabus')}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />

      {/* Body Layout: Sidebar + Main Workspace */}
      <div className="flex-1 flex">
        {/* Deep Navy Sidebar */}
        <Sidebar
          currentView={currentView}
          onNavigate={handleNavigate}
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          onResetData={handleResetData}
          currentLanguage={currentLanguage}
        />

        {/* Content Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {currentView === 'dashboard' && (
            <DashboardView
              stats={userStats}
              onStartMock={(subId) => {
                setSetupSubject(subId || 'all');
                setSetupChapterId('all');
                setCurrentView('setup');
              }}
              onPracticeByChapter={(subId) => {
                setSetupSubject(subId || 'physics');
                setSetupChapterId(CHAPTERS.find(c => c.subjectId === (subId || 'physics'))?.id || 'all');
                setCurrentView('setup');
              }}
              onViewResult={handleViewResult}
              onViewAllResults={() => setCurrentView('history')}
              onViewSyllabus={(subId) => {
                setSetupSubject(subId || 'physics');
                setCurrentView('syllabus');
              }}
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />
          )}

          {currentView === 'setup' && (
            <ExamSetupView
              initialSubject={setupSubject}
              initialChapterId={setupChapterId}
              onStartExam={handleStartExam}
              onBackToDashboard={() => setCurrentView('dashboard')}
              isStartingExam={isStartingExam}
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />
          )}

          {currentView === 'exam' && activeSession && (
            <ExamScreenView
              session={activeSession}
              onUpdateResponse={handleUpdateResponse}
              onSetCurrentQuestion={handleSetCurrentQuestion}
              onSubmitExam={handleSubmitExam}
              currentLanguage={currentLanguage}
            />
          )}

          {currentView === 'result' && activeResult && (
            <ResultDashboardView
              result={activeResult}
              onReviewAnswers={() => setCurrentView('review')}
              onRetakeTest={handleRetakeExam}
              onReturnHome={() => setCurrentView('dashboard')}
              currentLanguage={currentLanguage}
            />
          )}

          {currentView === 'review' && activeResult && (
            <AnswerReviewView
              result={activeResult}
              onBackToResult={() => setCurrentView('result')}
              onBackToDashboard={() => setCurrentView('dashboard')}
              currentLanguage={currentLanguage}
            />
          )}

          {currentView === 'syllabus' && (
            <SyllabusBrowserView
              initialSubject={setupSubject !== 'all' ? setupSubject : 'physics'}
              onStartChapterPractice={(subId, chId) => {
                setSetupSubject(subId);
                setSetupChapterId(chId);
                setCurrentView('setup');
              }}
              onBackToDashboard={() => setCurrentView('dashboard')}
              currentLanguage={currentLanguage}
            />
          )}

          {currentView === 'question-bank' && (
            <QuestionBankBrowserView
              onBackToDashboard={() => setCurrentView('dashboard')}
              onStartExamWithSubject={(subId) => {
                setSetupSubject(subId);
                setCurrentView('setup');
              }}
              currentLanguage={currentLanguage}
            />
          )}

          {currentView === 'history' && (
            <ResultsHistoryView
              results={StorageService.getResultsHistory()}
              onViewResult={handleViewResult}
              onClearHistory={() => {
                StorageService.clearResultsHistory();
                setUserStats(StorageService.getUserStats());
                showToast('Exam history cleared.', 'info');
              }}
              onBackToDashboard={() => setCurrentView('dashboard')}
              onStartNewExam={() => {
                setSetupSubject('all');
                setCurrentView('setup');
              }}
              currentLanguage={currentLanguage}
            />
          )}
        </main>
      </div>

      {/* App Data Reset Confirmation Modal */}
      {showResetModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="reset-modal-title" className="text-base font-bold text-slate-900">
                    {TRANSLATIONS[currentLanguage].navResetAttempts}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Reset application records
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowResetModal(false)}
                aria-label="Close dialog"
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {TRANSLATIONS[currentLanguage].navResetConfirm}
            </p>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 space-y-1">
              <p className="font-semibold">Language Preference Intact:</p>
              <p>Your selected language preference ({currentLanguage.toUpperCase()}) will be kept intact.</p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition cursor-pointer"
              >
                {TRANSLATIONS[currentLanguage].clearHistoryCancelBtn}
              </button>
              <button
                type="button"
                onClick={handleConfirmResetData}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition cursor-pointer"
              >
                {TRANSLATIONS[currentLanguage].clearHistoryConfirmBtn}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
