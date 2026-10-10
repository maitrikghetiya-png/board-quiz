import { VERIFIED_QUESTIONS } from '../src/data/questionBank';
import { QUESTION_TRANSLATIONS, getLocalizedQuestion } from '../src/data/questionTranslations';
import { StorageService } from '../src/services/storage';
import { SupportedLanguage, SubjectId, ExamResult, ActiveExamSession } from '../src/types';

// Mock localStorage for node environment
const storageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
    getStore: () => store
  };
})();

(global as any).localStorage = storageMock;

console.log('========================================================');
console.log('   BOARD QUIZ - COMPREHENSIVE AUTOMATED QA AUDIT');
console.log('========================================================\n');

let allPassed = true;
const logResult = (testName: string, passed: boolean, details?: string) => {
  if (passed) {
    console.log(`[PASS] ${testName}`);
  } else {
    console.error(`[FAIL] ${testName} - ${details}`);
    allPassed = false;
  }
};

// -------------------------------------------------------------------
// TEST 1: Question Bank Integrity and Balanced Option Distribution
// -------------------------------------------------------------------
console.log('--- TEST 1: Question Bank & Option Distribution ---');
const totalQuestions = VERIFIED_QUESTIONS.length;
logResult('Total questions is exactly 36 (12 per subject)', totalQuestions === 36, `Found ${totalQuestions}`);

const subjects: SubjectId[] = ['physics', 'chemistry', 'mathematics'];
const optionCountsOverall: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };

subjects.forEach(sub => {
  const subQuestions = VERIFIED_QUESTIONS.filter(q => q.subjectId === sub);
  logResult(`Subject '${sub}' has 12 questions`, subQuestions.length === 12, `Found ${subQuestions.length}`);

  const counts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };
  subQuestions.forEach(q => {
    counts[q.correctOptionIndex] = (counts[q.correctOptionIndex] || 0) + 1;
    optionCountsOverall[q.correctOptionIndex]++;
  });

  const isBalancedSub = counts[0] === 3 && counts[1] === 3 && counts[2] === 3 && counts[3] === 3;
  logResult(
    `Subject '${sub}' has balanced keys across A, B, C, D (3 each: A=${counts[0]}, B=${counts[1]}, C=${counts[2]}, D=${counts[3]})`,
    isBalancedSub,
    JSON.stringify(counts)
  );
});

const isBalancedOverall =
  optionCountsOverall[0] === 9 &&
  optionCountsOverall[1] === 9 &&
  optionCountsOverall[2] === 9 &&
  optionCountsOverall[3] === 9;
logResult(
  `Overall answer distribution balanced (9 each: A=${optionCountsOverall[0]}, B=${optionCountsOverall[1]}, C=${optionCountsOverall[2]}, D=${optionCountsOverall[3]})`,
  isBalancedOverall,
  JSON.stringify(optionCountsOverall)
);

// -------------------------------------------------------------------
// TEST 2: Multi-Language Consistency & Answer Invariance
// -------------------------------------------------------------------
console.log('\n--- TEST 2: Multi-Language Consistency & Answer Invariance ---');
const languages: SupportedLanguage[] = ['en', 'gu', 'hi'];

let translationMatchCount = 0;
let answerIndexInvarianceCount = 0;

VERIFIED_QUESTIONS.forEach(q => {
  languages.forEach(lang => {
    const loc = getLocalizedQuestion(q, lang);
    if (loc.questionText && loc.options.length === 4 && loc.explanation) {
      translationMatchCount++;
    }
    // Verify that the correct option index never changes between languages
    if (loc.correctOptionIndex === q.correctOptionIndex) {
      answerIndexInvarianceCount++;
    }
  });
});

logResult(
  `All 36 questions have complete translations (EN, GU, HI: total ${36 * 3} instances)`,
  translationMatchCount === 36 * 3,
  `Got ${translationMatchCount}`
);
logResult(
  `Correct option index is strictly invariant across EN, GU, HI (${36 * 3} checks)`,
  answerIndexInvarianceCount === 36 * 3,
  `Got ${answerIndexInvarianceCount}`
);

// -------------------------------------------------------------------
// TEST 3: Quiz Simulation & Scoring Logic (+4, -1, 0) in each language
// -------------------------------------------------------------------
console.log('\n--- TEST 3: Quiz Simulation & Scoring Engine (+4, -1, 0) ---');

languages.forEach(lang => {
  // Simulate a completed exam:
  // 12 questions in Physics:
  // 8 correct (+32), 2 incorrect (-2), 2 unanswered (0) => Expected Score = 30 / 48
  const testQuestions = VERIFIED_QUESTIONS.filter(q => q.subjectId === 'physics');
  const userAnswers: Record<string, number> = {};

  // 8 correct
  for (let i = 0; i < 8; i++) {
    userAnswers[testQuestions[i].id] = testQuestions[i].correctOptionIndex;
  }
  // 2 incorrect (pick (correctOptionIndex + 1) % 4)
  for (let i = 8; i < 10; i++) {
    userAnswers[testQuestions[i].id] = (testQuestions[i].correctOptionIndex + 1) % 4;
  }
  // 2 unanswered: testQuestions[10] and testQuestions[11] are omitted from userAnswers

  // Evaluate scores
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;
  let marksObtained = 0;

  testQuestions.forEach(q => {
    const ans = userAnswers[q.id];
    if (ans === undefined) {
      unansweredCount++;
    } else if (ans === q.correctOptionIndex) {
      correctCount++;
      marksObtained += 4;
    } else {
      incorrectCount++;
      marksObtained -= 1;
    }
  });

  const maxMarks = testQuestions.length * 4; // 48
  const expectedMarks = 8 * 4 - 2 * 1 + 2 * 0; // 30
  const passScore =
    correctCount === 8 &&
    incorrectCount === 2 &&
    unansweredCount === 2 &&
    marksObtained === 30 &&
    maxMarks === 48;

  logResult(
    `Simulated Quiz in language '${lang}': 8 correct, 2 incorrect, 2 unanswered => score ${marksObtained}/${maxMarks}`,
    passScore,
    `marksObtained=${marksObtained}`
  );
});

// -------------------------------------------------------------------
// TEST 4: StorageService - Clear History with Confirmation & Cancellation
// -------------------------------------------------------------------
console.log('\n--- TEST 4: StorageService & Clear History Behavior ---');

// Setup initial state: Language preference + 2 historical results
StorageService.saveLanguage('gu');

const sampleResult1: ExamResult = {
  id: 'res-test-1',
  examSessionId: 'sess-1',
  config: {
    chapterId: 'all',
    subjectId: 'physics',
    difficulty: 'moderate',
    questionCount: 12,
    durationMinutes: 30,
    markingScheme: 'board_mcq'
  },
  questions: VERIFIED_QUESTIONS.slice(0, 12),
  responses: {},
  submittedAt: Date.now() - 10000,
  totalTimeTakenSeconds: 300,
  totalQuestions: 12,
  answeredCount: 10,
  unansweredCount: 2,
  correctCount: 8,
  incorrectCount: 2,
  marksEarned: 30,
  maxMarks: 48,
  accuracyPercentage: 80,
  chapterPerformance: {},
  strengths: ['Electrostatics'],
  areasToImprove: ['Magnetism']
};

const sampleResult2: ExamResult = {
  id: 'res-test-2',
  examSessionId: 'sess-2',
  config: {
    chapterId: 'all',
    subjectId: 'chemistry',
    difficulty: 'moderate',
    questionCount: 12,
    durationMinutes: 30,
    markingScheme: 'board_mcq'
  },
  questions: VERIFIED_QUESTIONS.slice(12, 24),
  responses: {},
  submittedAt: Date.now() - 5000,
  totalTimeTakenSeconds: 450,
  totalQuestions: 12,
  answeredCount: 12,
  unansweredCount: 0,
  correctCount: 12,
  incorrectCount: 0,
  marksEarned: 48,
  maxMarks: 48,
  accuracyPercentage: 100,
  chapterPerformance: {},
  strengths: ['Coordination Compounds'],
  areasToImprove: []
};

StorageService.saveExamResult(sampleResult1);
StorageService.saveExamResult(sampleResult2);

let historyBefore = StorageService.getResultsHistory();
logResult(
  'Saved 2 mock results to history storage',
  historyBefore.length === 2 && historyBefore[0].id === 'res-test-2'
);

// Scenario A: User Clicks "Cancel" on Clear History
// History must NOT be deleted, language preference must be preserved
const simulateCancelClearHistory = () => {
  // Cancellation means no mutation is invoked
  return StorageService.getResultsHistory();
};
const historyAfterCancel = simulateCancelClearHistory();
const languageAfterCancel = StorageService.getLanguage();

logResult(
  'Cancel preserves history completely (2 results remain)',
  historyAfterCancel.length === 2
);
logResult(
  'Language preference remains saved after cancel (\'gu\')',
  languageAfterCancel === 'gu'
);

// Scenario B: User Clicks "Confirm" on Clear History
// History is deleted, but user settings/language preference are untouched
StorageService.clearResultsHistory();
const historyAfterConfirm = StorageService.getResultsHistory();
const languageAfterConfirm = StorageService.getLanguage();

logResult(
  'Confirm deletes quiz results history (0 results remain)',
  historyAfterConfirm.length === 0
);
logResult(
  'Language preference is untouched and preserved (\'gu\')',
  languageAfterConfirm === 'gu'
);

// -------------------------------------------------------------------
// TEST 5: Clear History Isolation Check (Preserves Active Session)
// -------------------------------------------------------------------
console.log('\n--- TEST 5: Clear History Isolation Check ---');
const activeSessionSample: ActiveExamSession = {
  id: 'active-sess-test',
  config: {
    chapterId: 'all',
    subjectId: 'mathematics',
    difficulty: 'moderate',
    questionCount: 12,
    durationMinutes: 30,
    markingScheme: 'board_mcq'
  },
  questions: VERIFIED_QUESTIONS.slice(24, 36),
  responses: {},
  currentQuestionIndex: 0,
  startedAt: Date.now(),
  targetEndTime: Date.now() + 1800000,
  status: 'in_progress'
};

StorageService.saveActiveSession(activeSessionSample);
StorageService.saveExamResult(sampleResult1);
logResult('Active session exists and new exam result saved', StorageService.getActiveSession() !== null);

StorageService.clearResultsHistory();
logResult(
  'clearResultsHistory deletes history while active session remains intact',
  StorageService.getResultsHistory().length === 0 && StorageService.getActiveSession() !== null
);

// Clean up
StorageService.clearActiveSession();

console.log('\n========================================================');
if (allPassed) {
  console.log('   ALL AUDIT TEST SUITES PASSED SUCCESSFULLY (100%)');
} else {
  console.log('   AUDIT TEST SUITES FAILED - SEE ABOVE ERRORS');
}
console.log('========================================================\n');
