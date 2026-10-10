import { ActiveExamSession, ExamResult, ChapterPerformance, Question, ExamConfig } from '../types';
import { MARKING_SCHEMES } from '../data/syllabus';

export function calculateExamResult(session: ActiveExamSession): ExamResult {
  const scheme = MARKING_SCHEMES[session.config.markingScheme] || MARKING_SCHEMES.practice_standard;
  const questions = session.questions;
  const responses = session.responses;

  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  const chapterPerfMap: Record<string, ChapterPerformance> = {};

  questions.forEach(q => {
    if (!chapterPerfMap[q.chapterId]) {
      chapterPerfMap[q.chapterId] = {
        chapterId: q.chapterId,
        chapterName: q.chapterName,
        total: 0,
        correct: 0,
        incorrect: 0,
        unanswered: 0,
        accuracy: 0
      };
    }
    chapterPerfMap[q.chapterId].total += 1;

    const response = responses[q.id];
    if (response && response.selectedOptionIndex !== null && response.selectedOptionIndex !== undefined) {
      if (response.selectedOptionIndex === q.correctOptionIndex) {
        correctCount += 1;
        chapterPerfMap[q.chapterId].correct += 1;
      } else {
        incorrectCount += 1;
        chapterPerfMap[q.chapterId].incorrect += 1;
      }
    } else {
      unansweredCount += 1;
      chapterPerfMap[q.chapterId].unanswered += 1;
    }
  });

  // Calculate chapter accuracies
  Object.values(chapterPerfMap).forEach(ch => {
    const attempted = ch.correct + ch.incorrect;
    ch.accuracy = attempted > 0 ? Math.round((ch.correct / attempted) * 100) : 0;
  });

  const marksEarned = (correctCount * scheme.correct) + (incorrectCount * scheme.incorrect);
  const maxMarks = questions.length * scheme.correct;
  const attemptedCount = correctCount + incorrectCount;
  const accuracyPercentage = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

  const now = Date.now();
  const timeTakenSeconds = Math.max(1, Math.min(
    Math.round((now - session.startedAt) / 1000),
    session.config.durationMinutes * 60
  ));

  const strengths: string[] = [];
  const areasToImprove: string[] = [];

  Object.values(chapterPerfMap).forEach(ch => {
    if (ch.total > 0) {
      if (ch.correct === ch.total || (ch.accuracy >= 75 && ch.total >= 2)) {
        strengths.push(`${ch.chapterName} (${ch.correct}/${ch.total} correct)`);
      } else if (ch.incorrect > 0 || ch.accuracy < 60) {
        areasToImprove.push(`${ch.chapterName} (${ch.incorrect} incorrect, ${ch.unanswered} unattempted)`);
      }
    }
  });

  if (strengths.length === 0 && correctCount > 0) {
    strengths.push('Solid attempt across tested syllabus domains');
  }
  if (areasToImprove.length === 0 && (incorrectCount > 0 || unansweredCount > 0)) {
    areasToImprove.push('Target 100% question attempt rate and eliminate minor calculation slips');
  }

  return {
    id: `result-${session.id}`,
    examSessionId: session.id,
    config: session.config,
    questions,
    responses,
    submittedAt: now,
    totalTimeTakenSeconds: timeTakenSeconds,
    totalQuestions: questions.length,
    answeredCount: attemptedCount,
    unansweredCount,
    correctCount,
    incorrectCount,
    marksEarned,
    maxMarks,
    accuracyPercentage,
    chapterPerformance: chapterPerfMap,
    strengths,
    areasToImprove
  };
}

export function filterQuestionsForExam(
  allQuestions: Question[],
  config: ExamConfig
): Question[] {
  let primaryPool: Question[] = [...allQuestions];
  let subjectPool: Question[] = [...allQuestions];

  // Filter by subject
  if (config.subjectId !== 'all') {
    primaryPool = primaryPool.filter(q => q.subjectId === config.subjectId);
    subjectPool = [...primaryPool];
  }

  // Filter by chapter if requested
  if (config.chapterId !== 'all') {
    const chapterQuestions = primaryPool.filter(q => q.chapterId === config.chapterId);
    if (chapterQuestions.length >= config.questionCount) {
      primaryPool = chapterQuestions;
    } else {
      // Prioritize the chapter's questions, then fill remainder from subject pool
      const otherQuestions = subjectPool.filter(q => q.chapterId !== config.chapterId);
      const shuffledOthers = [...otherQuestions].sort(() => 0.5 - Math.random());
      primaryPool = [...chapterQuestions, ...shuffledOthers];
    }
  }

  // Filter by difficulty if requested and sufficient pool exists
  if (config.difficulty !== 'mixed') {
    const diffFiltered = primaryPool.filter(q => q.difficulty === config.difficulty);
    if (diffFiltered.length >= config.questionCount) {
      primaryPool = diffFiltered;
    }
  }

  // Shuffle and slice to exact requested question count
  const shuffled = [...primaryPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(config.questionCount, shuffled.length));
}

