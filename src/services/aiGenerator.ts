import { Question, SubjectId, Difficulty } from '../types';
import { CHAPTERS } from '../data/syllabus';

export interface AIGenerationRequest {
  subjectId: SubjectId;
  chapterId?: string;
  difficulty?: Difficulty;
  count: number;
}

export interface AIGenerationResponse {
  success: boolean;
  questions?: Question[];
  error?: string;
  source: 'ai' | 'fallback';
}

export function validateQuestionSchema(q: any, defaultSubject: SubjectId): Question | null {
  if (!q || typeof q !== 'object') return null;

  if (typeof q.questionText !== 'string' || q.questionText.trim().length < 15) {
    return null;
  }

  if (!Array.isArray(q.options) || q.options.length !== 4) {
    return null;
  }

  const validOptions = q.options.every((opt: any) => typeof opt === 'string' && opt.trim().length > 0);
  if (!validOptions) return null;

  // Verify unique options (no duplicates)
  const uniqueOpts = new Set(q.options.map((o: string) => o.trim().toLowerCase()));
  if (uniqueOpts.size < 4) return null;

  const correctIdx = Number(q.correctOptionIndex);
  if (!Number.isInteger(correctIdx) || correctIdx < 0 || correctIdx > 3) {
    return null;
  }

  const explanation = typeof q.explanation === 'string' && q.explanation.trim().length > 10
    ? q.explanation.trim()
    : 'Refer to CBSE Class XII NCERT textbook concepts.';

  const steps = Array.isArray(q.stepByStepSolution) && q.stepByStepSolution.length > 0
    ? q.stepByStepSolution.map((s: any) => String(s).trim()).filter(Boolean)
    : [
        'Step 1: Identify given parameters and fundamental principles.',
        `Step 2: Solve systematically to establish correct option: ${q.options[correctIdx]}.`
      ];

  const conceptTakeaway = typeof q.conceptTakeaway === 'string' && q.conceptTakeaway.trim().length > 5
    ? q.conceptTakeaway.trim()
    : 'Mastery of fundamental definitions and step-by-step reasoning is essential for CBSE Class XII boards.';

  // Resolve chapter info
  let chapter = CHAPTERS.find(c => c.id === q.chapterId);
  if (!chapter) {
    chapter = CHAPTERS.find(c => c.subjectId === defaultSubject) || CHAPTERS[0];
  }

  const id = typeof q.id === 'string' && q.id.length > 0
    ? `ai-${q.id}`
    : `ai-gen-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  const difficulty: Difficulty = ['easy', 'moderate', 'challenging'].includes(q.difficulty)
    ? q.difficulty
    : 'moderate';

  return {
    id,
    subjectId: defaultSubject,
    chapterId: chapter.id,
    chapterName: chapter.name,
    difficulty,
    questionText: q.questionText.trim(),
    options: [q.options[0].trim(), q.options[1].trim(), q.options[2].trim(), q.options[3].trim()],
    correctOptionIndex: correctIdx,
    explanation,
    stepByStepSolution: steps,
    conceptTakeaway,
    formulasUsed: Array.isArray(q.formulasUsed) ? q.formulasUsed.map(String) : undefined,
    isAIGenerated: true
  };
}

export async function requestAIPracticeQuestions(
  request: AIGenerationRequest
): Promise<AIGenerationResponse> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

    const response = await fetch('/api/generate-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return {
        success: false,
        source: 'fallback',
        error: errData.error || `Server responded with status ${response.status}`
      };
    }

    const data = await response.json();
    if (!data || !Array.isArray(data.questions)) {
      return {
        success: false,
        source: 'fallback',
        error: 'Invalid AI response format'
      };
    }

    const validatedList: Question[] = [];
    for (const rawQ of data.questions) {
      const validated = validateQuestionSchema(rawQ, request.subjectId);
      if (validated) {
        validatedList.push(validated);
      }
    }

    if (validatedList.length === 0) {
      return {
        success: false,
        source: 'fallback',
        error: 'Generated questions did not pass CBSE curriculum validation checks'
      };
    }

    return {
      success: true,
      questions: validatedList,
      source: 'ai'
    };
  } catch (err: any) {
    const message = err.name === 'AbortError'
      ? 'AI question generation request timed out'
      : (err.message || 'Network error reaching question generator');

    return {
      success: false,
      source: 'fallback',
      error: message
    };
  }
}
