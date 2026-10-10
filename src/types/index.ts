export type SubjectId = 'physics' | 'chemistry' | 'mathematics';

export type Difficulty = 'easy' | 'moderate' | 'challenging';

export type MarkingScheme = 'practice_standard' | 'no_negative' | 'board_mcq';

export interface Chapter {
  id: string;
  name: string;
  unitNumber: number;
  unitName: string;
  subjectId: SubjectId;
  weightageMarks: number;
  topicsSummary: string[];
}

export type SupportedLanguage = 'en' | 'gu' | 'hi';

export interface TranslatedQuestionContent {
  questionText: string;
  options: [string, string, string, string];
  explanation: string;
  stepByStepSolution: string[];
  conceptTakeaway: string;
}

export interface Question {
  id: string;
  subjectId: SubjectId;
  chapterId: string;
  chapterName: string;
  difficulty: Difficulty;
  questionText: string;
  options: [string, string, string, string];
  correctOptionIndex: number; // 0, 1, 2, 3
  explanation: string;
  stepByStepSolution: string[];
  conceptTakeaway: string;
  formulasUsed?: string[];
  isAIGenerated?: boolean;
  translations?: {
    gu?: TranslatedQuestionContent;
    hi?: TranslatedQuestionContent;
  };
}

export interface ExamConfig {
  subjectId: SubjectId | 'all';
  chapterId: string | 'all';
  difficulty: Difficulty | 'mixed';
  questionCount: number; // 10, 20, 30
  durationMinutes: number;
  markingScheme: MarkingScheme;
  useAI?: boolean;
  language?: SupportedLanguage;
}

export interface StudentResponse {
  questionId: string;
  selectedOptionIndex: number | null; // null if unattempted
  isMarkedForReview: boolean;
  timeSpentSeconds?: number;
}

export interface ActiveExamSession {
  id: string;
  config: ExamConfig;
  questions: Question[];
  responses: Record<string, StudentResponse>;
  currentQuestionIndex: number;
  startedAt: number;
  targetEndTime: number; // Absolute timestamp to prevent timer drift and restore on reload
  status: 'in_progress' | 'submitted';
}

export interface ChapterPerformance {
  chapterId: string;
  chapterName: string;
  total: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  accuracy: number;
}

export interface ExamResult {
  id: string;
  examSessionId: string;
  config: ExamConfig;
  questions: Question[];
  responses: Record<string, StudentResponse>;
  submittedAt: number;
  totalTimeTakenSeconds: number;
  totalQuestions: number;
  answeredCount: number;
  unansweredCount: number;
  correctCount: number;
  incorrectCount: number;
  marksEarned: number;
  maxMarks: number;
  accuracyPercentage: number;
  chapterPerformance: Record<string, ChapterPerformance>;
  strengths: string[];
  areasToImprove: string[];
}

export interface MarkingSchemeDetails {
  id: MarkingScheme;
  name: string;
  correct: number;
  incorrect: number;
  unanswered: number;
  description: string;
}
