/**
 * Barrel file for MBTI quiz questions.
 *
 * Re-exports both question sets (simple & deep) and provides helper
 * functions for filtering, shuffling, and retrieving questions.
 */

import type {
  Question,
  TestMode,
  QuestionType,
} from '@/types/question';
import type { MBTIDimension } from '@/types/mbti';

import { simpleQuestions } from './simple';
import { deepQuestions } from './deep';

// ---------------------------------------------------------------------------
// Re-exports
// ---------------------------------------------------------------------------

export { simpleQuestions, isSimpleQuestion } from './simple';
export { deepQuestions } from './deep';

export type {
  Question,
  ABQuestion,
  ScenarioQuestion,
  SwipeQuestion,
  ABOption,
  ScenarioOption,
  SwipeContent,
  BaseQuestion,
  QuestionType,
  TestMode,
  AxisScore,
  QuestionResponse,
  QuizSession,
} from '@/types/question';

export type {
  MBTIDimension,
  MBTIPreference,
  MBTIType,
  MBTIResult,
} from '@/types/mbti';

// ---------------------------------------------------------------------------
// Combined question bank
// ---------------------------------------------------------------------------

/** All questions from both sets, deduplicated by id (lazy-initialized) */
let _allQuestions: Question[] | null = null;

export function getAllQuestions(): Question[] {
  if (!_allQuestions) {
    const seen = new Set<string>();
    _allQuestions = [];
    for (const q of [...simpleQuestions, ...deepQuestions]) {
      if (!seen.has(q.id)) {
        seen.add(q.id);
        _allQuestions.push(q);
      }
    }
  }
  return _allQuestions;
}

/** All questions from both sets, deduplicated by id */
export const allQuestions: Question[] = getAllQuestions();

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

/**
 * Get questions for a specific test mode.
 * - 'simple' → returns the 12-question simple set
 * - 'deep'   → returns the 40-question deep set
 */
export function getQuestionsByMode(mode: TestMode): Question[] {
  if (mode === 'simple') {
    return simpleQuestions;
  }
  return deepQuestions;
}

/**
 * Filter questions by MBTI axis (dimension).
 */
export function filterByAxis(
  questions: Question[],
  axis: MBTIDimension,
): Question[] {
  return questions.filter((q) => q.axis === axis);
}

/**
 * Filter questions by question type (ab, scenario, swipe).
 */
export function filterByType(
  questions: Question[],
  type: QuestionType,
): Question[] {
  return questions.filter((q) => q.type === type);
}

/**
 * Filter questions by both mode and axis.
 */
export function filterByModeAndAxis(
  mode: TestMode,
  axis: MBTIDimension,
): Question[] {
  return getQuestionsByMode(mode).filter((q) => q.axis === axis);
}

/**
 * Get a question by its unique ID.
 * Returns undefined if not found.
 */
export function getQuestionById(id: string): Question | undefined {
  return getAllQuestions().find((q) => q.id === id);
}

/**
 * Shuffle an array of questions using Fisher-Yates algorithm.
 * Returns a new array (does not mutate the original).
 */
export function shuffleQuestions<T extends Question>(questions: T[]): T[] {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get a summary of question distribution for a given mode.
 * Useful for debugging and validation.
 */
export function getQuestionDistribution(mode: TestMode): {
  total: number;
  byAxis: Record<MBTIDimension, number>;
  byType: Record<QuestionType, number>;
} {
  const questions = getQuestionsByMode(mode);
  const byAxis: Record<MBTIDimension, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };
  const byType: Record<QuestionType, number> = { ab: 0, scenario: 0, swipe: 0 };

  for (const q of questions) {
    byAxis[q.axis]++;
    byType[q.type]++;
  }

  return { total: questions.length, byAxis, byType };
}
