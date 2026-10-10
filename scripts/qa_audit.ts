import { VERIFIED_QUESTIONS } from '../src/data/questionBank';
import { QUESTION_TRANSLATIONS, getLocalizedQuestion } from '../src/data/questionTranslations';
import { calculateExamResult } from '../src/services/examEngine';
import { SupportedLanguage, ActiveExamSession } from '../src/types';

console.log('====================================================');
console.log('BOARD QUIZ - COMPREHENSIVE QA AUDIT SUITE');
console.log('====================================================');

let allPassed = true;

// TEST 1: Question Bank Integrity & Balanced Answer Distribution
console.log('\n[TEST 1] Question Bank Integrity & Balanced Answer Distribution:');
const subjects = ['physics', 'chemistry', 'mathematics'];
subjects.forEach(sub => {
  const qs = VERIFIED_QUESTIONS.filter(q => q.subjectId === sub);
  const counts = [0, 0, 0, 0];
  qs.forEach(q => counts[q.correctOptionIndex]++);
  console.log(`  - ${sub.toUpperCase()}: Total ${qs.length} | A: ${counts[0]}, B: ${counts[1]}, C: ${counts[2]}, D: ${counts[3]}`);
  if (counts.some(c => c !== 3)) {
    console.error(`    FAILED: Distribution not balanced (3 each) in ${sub}`);
    allPassed = false;
  }
});

// TEST 2: Multi-Language Equivalence & Translations Quality
console.log('\n[TEST 2] Multi-Language Equivalence & Translations Quality:');
const langs: SupportedLanguage[] = ['en', 'gu', 'hi'];
let totalTranslationsChecked = 0;

VERIFIED_QUESTIONS.forEach(q => {
  langs.forEach(lang => {
    const locQ = getLocalizedQuestion(q, lang);
    totalTranslationsChecked++;
    if (locQ.options.length !== 4) {
      console.error(`    FAILED: ${q.id} in ${lang} does not have 4 options`);
      allPassed = false;
    }
    if (locQ.correctOptionIndex !== q.correctOptionIndex) {
      console.error(`    FAILED: ${q.id} in ${lang} altered correctOptionIndex`);
      allPassed = false;
    }
    if (!locQ.questionText.trim()) {
      console.error(`    FAILED: ${q.id} in ${lang} has empty question text`);
      allPassed = false;
    }
    if (!locQ.explanation.trim()) {
      console.error(`    FAILED: ${q.id} in ${lang} has empty explanation`);
      allPassed = false;
    }
  });
});
console.log(`  - Verified ${totalTranslationsChecked} question representations across EN, GU, HI.`);

// TEST 3: Scoring Simulation (+4, -1, 0)
console.log('\n[TEST 3] Scoring Engine Validation (+4 correct, -1 incorrect, 0 unanswered):');
langs.forEach(lang => {
  const examQuestions = VERIFIED_QUESTIONS.slice(0, 6);
  const session: ActiveExamSession = {
    id: `test-session-${lang}`,
    config: {
      subjectId: 'physics',
      chapterId: 'all',
      difficulty: 'mixed',
      questionCount: 6,
      durationMinutes: 15,
      markingScheme: 'practice_standard',
      language: lang
    },
    questions: examQuestions.map(q => getLocalizedQuestion(q, lang)),
    responses: {
      [examQuestions[0].id]: { questionId: examQuestions[0].id, selectedOptionIndex: examQuestions[0].correctOptionIndex, isMarkedForReview: false, timeSpentSeconds: 30 },
      [examQuestions[1].id]: { questionId: examQuestions[1].id, selectedOptionIndex: examQuestions[1].correctOptionIndex, isMarkedForReview: false, timeSpentSeconds: 40 },
      [examQuestions[2].id]: { questionId: examQuestions[2].id, selectedOptionIndex: (examQuestions[2].correctOptionIndex + 1) % 4, isMarkedForReview: false, timeSpentSeconds: 25 },
      [examQuestions[3].id]: { questionId: examQuestions[3].id, selectedOptionIndex: (examQuestions[3].correctOptionIndex + 2) % 4, isMarkedForReview: false, timeSpentSeconds: 35 },
    },
    startedAt: Date.now() - 130000,
    targetEndTime: Date.now() + 770000,
    currentQuestionIndex: 5,
    status: 'in_progress'
  };

  const result = calculateExamResult(session);
  const isMatch = (
    result.correctCount === 2 &&
    result.incorrectCount === 2 &&
    result.unansweredCount === 2 &&
    result.marksEarned === 6 &&
    result.maxMarks === 24 &&
    result.accuracyPercentage === 50
  );

  console.log(`  - Lang ${lang.toUpperCase()}: Correct=${result.correctCount}, Incorrect=${result.incorrectCount}, Unanswered=${result.unansweredCount}, Score=${result.marksEarned}/${result.maxMarks}, Acc=${result.accuracyPercentage}% -> ${isMatch ? 'PASSED' : 'FAILED'}`);
  if (!isMatch) allPassed = false;
});

// TEST 4: Answer key invariance across language switches
console.log('\n[TEST 4] Language Switch Answer Key Invariance:');
let keyMatches = 0;
VERIFIED_QUESTIONS.forEach(q => {
  const enQ = getLocalizedQuestion(q, 'en');
  const guQ = getLocalizedQuestion(q, 'gu');
  const hiQ = getLocalizedQuestion(q, 'hi');
  if (enQ.correctOptionIndex === guQ.correctOptionIndex && guQ.correctOptionIndex === hiQ.correctOptionIndex) {
    keyMatches++;
  } else {
    console.error(`    FAILED: Key mismatch for ${q.id}`);
    allPassed = false;
  }
});
console.log(`  - All ${keyMatches} questions have 100% invariant correctOptionIndex across EN, GU, HI.`);

console.log('\n====================================================');
console.log(`AUDIT RESULT: ${allPassed ? 'ALL TESTS PASSED SUCCESSFULLY' : 'SOME TESTS FAILED'}`);
console.log('====================================================');
process.exit(allPassed ? 0 : 1);
