import { ActiveExamSession, ExamResult, SubjectId, SupportedLanguage } from '../types';

const STORAGE_KEYS = {
  ACTIVE_SESSION: 'board_quiz_active_session_v1',
  RESULTS_HISTORY: 'board_quiz_results_history_v1',
  USER_PREFERENCES: 'board_quiz_user_preferences_v1',
  LANGUAGE: 'board_quiz_language_v1'
};

export const StorageService = {
  getLanguage(): SupportedLanguage {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
      if (saved === 'gu' || saved === 'hi' || saved === 'en') {
        return saved;
      }
      return 'en';
    } catch {
      return 'en';
    }
  },

  saveLanguage(lang: SupportedLanguage): void {
    try {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    } catch (e) {
      console.warn('Failed to save language preference:', e);
    }
  },

  getActiveSession(): ActiveExamSession | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
      if (!data) return null;
      const parsed: ActiveExamSession = JSON.parse(data);
      // Validate structure
      if (parsed && parsed.id && Array.isArray(parsed.questions) && parsed.targetEndTime) {
        return parsed;
      }
      return null;
    } catch (e) {
      console.warn('Failed to read active session from localStorage:', e);
      return null;
    }
  },

  saveActiveSession(session: ActiveExamSession): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(session));
    } catch (e) {
      console.warn('Failed to save active session to localStorage:', e);
    }
  },

  clearActiveSession(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
    } catch (e) {
      console.warn('Failed to clear active session:', e);
    }
  },

  getResultsHistory(): ExamResult[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RESULTS_HISTORY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed.sort((a, b) => b.submittedAt - a.submittedAt);
      }
      return [];
    } catch (e) {
      console.warn('Failed to read exam results history:', e);
      return [];
    }
  },

  saveExamResult(result: ExamResult): void {
    try {
      const history = StorageService.getResultsHistory();
      // Avoid duplicate id
      const filtered = history.filter(item => item.id !== result.id);
      filtered.unshift(result);
      localStorage.setItem(STORAGE_KEYS.RESULTS_HISTORY, JSON.stringify(filtered.slice(0, 50)));
    } catch (e) {
      console.warn('Failed to save exam result to history:', e);
    }
  },

  clearResultsHistory(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.RESULTS_HISTORY);
    } catch (e) {
      console.warn('Failed to clear exam results history:', e);
    }
  },

  getUserStats() {
    const history = StorageService.getResultsHistory();
    const totalAttempted = history.length;

    let totalMarksEarned = 0;
    let totalMaxMarks = 0;
    let totalCorrect = 0;
    let totalQuestionsAnswered = 0;

    const bestScores: Record<SubjectId, { marks: number; maxMarks: number; percentage: number; date: number } | null> = {
      physics: null,
      chemistry: null,
      mathematics: null
    };

    history.forEach(res => {
      totalMarksEarned += res.marksEarned;
      totalMaxMarks += res.maxMarks;
      totalCorrect += res.correctCount;
      totalQuestionsAnswered += res.answeredCount;

      const subId = res.config.subjectId;
      if (subId !== 'all') {
        const currentBest = bestScores[subId];
        const pct = res.maxMarks > 0 ? (res.marksEarned / res.maxMarks) * 100 : 0;
        if (!currentBest || pct > currentBest.percentage) {
          bestScores[subId] = {
            marks: res.marksEarned,
            maxMarks: res.maxMarks,
            percentage: Math.round(pct),
            date: res.submittedAt
          };
        }
      }
    });

    const averageAccuracy = totalQuestionsAnswered > 0
      ? Math.round((totalCorrect / totalQuestionsAnswered) * 100)
      : 0;

    const overallPercentage = totalMaxMarks > 0
      ? Math.round((totalMarksEarned / totalMaxMarks) * 100)
      : 0;

    return {
      totalAttempted,
      averageAccuracy,
      overallPercentage,
      bestScores,
      recentResults: history.slice(0, 5)
    };
  }
};
