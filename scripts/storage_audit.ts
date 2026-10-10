// Mock browser localStorage
const store: Record<string, string> = {};
(globalThis as any).localStorage = {
  getItem: (k: string) => store[k] || null,
  setItem: (k: string, v: string) => { store[k] = v; },
  removeItem: (k: string) => { delete store[k]; },
  clear: () => { Object.keys(store).forEach(k => delete store[k]); }
};

import { StorageService } from '../src/services/storage';
import { ExamResult, SupportedLanguage } from '../src/types';

console.log('=== STORAGE SERVICE & CLEAR HISTORY AUDIT ===');

// Step 1: Set user language
StorageService.saveLanguage('gu');
if (StorageService.getLanguage() !== 'gu') {
  console.error('Failed to save language preference');
  process.exit(1);
}
console.log('1. Language preference set to "gu": OK');

// Step 2: Save dummy results history
const sampleResult: ExamResult = {
  id: 'res-test-1',
  examSessionId: 'sess-1',
  config: {
    subjectId: 'physics',
    chapterId: 'all',
    difficulty: 'mixed',
    questionCount: 10,
    durationMinutes: 20,
    markingScheme: 'practice_standard',
    language: 'gu'
  },
  questions: [],
  responses: {},
  submittedAt: Date.now(),
  totalTimeTakenSeconds: 300,
  totalQuestions: 10,
  answeredCount: 8,
  unansweredCount: 2,
  correctCount: 6,
  incorrectCount: 2,
  marksEarned: 22,
  maxMarks: 40,
  accuracyPercentage: 75,
  chapterPerformance: {},
  strengths: [],
  areasToImprove: []
};
StorageService.saveExamResult(sampleResult);

const historyBefore = StorageService.getResultsHistory();
if (historyBefore.length !== 1 || historyBefore[0].id !== 'res-test-1') {
  console.error('Failed to save exam result');
  process.exit(1);
}
console.log('2. Result saved to history (count: 1): OK');

// Step 3: Simulate "Cancel" on Clear History
console.log('3. Simulating user clicking "Cancel" in Clear History dialog:');
// No clear method called, verifying state
const historyAfterCancel = StorageService.getResultsHistory();
const langAfterCancel = StorageService.getLanguage();
if (historyAfterCancel.length !== 1 || langAfterCancel !== 'gu') {
  console.error('Cancel failed to preserve history or language');
  process.exit(1);
}
console.log('   -> History preserved: 1 item. Language preserved: "gu": OK');

// Step 4: Simulate user clicking "Confirm" in Clear History dialog
console.log('4. Simulating user clicking "Confirm" in Clear History dialog:');
StorageService.clearResultsHistory();

const historyAfterConfirm = StorageService.getResultsHistory();
const langAfterConfirm = StorageService.getLanguage();

if (historyAfterConfirm.length !== 0) {
  console.error('Failed to clear exam history');
  process.exit(1);
}
if (langAfterConfirm !== 'gu') {
  console.error('Language preference was incorrectly wiped during clear history!');
  process.exit(1);
}
console.log('   -> Results history is cleared: 0 items. Language remains "gu": OK');

console.log('\nSTORAGE AUDIT COMPLETED SUCCESSFULLY!');
