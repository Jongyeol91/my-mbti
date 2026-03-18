/**
 * Simple mode questions (12 questions).
 * 3 questions per axis × 4 axes = 12 total.
 *
 * These are a TRUE SUBSET of the deep mode questions — same IDs, same objects.
 * For each axis we pick 3 questions with a mix of types (ab, scenario, swipe).
 */

import type { Question } from '@/types/question';
import { deepQuestions } from './deep';

/**
 * IDs of deep-mode questions selected for simple mode.
 * 3 per axis, one of each question type (ab, scenario, swipe).
 */
const SIMPLE_QUESTION_IDS: string[] = [
  // EI axis (외향 / 내향)
  'dq01', // ab
  'dq02', // scenario
  'dq03', // swipe

  // SN axis (감각 / 직관)
  'dq11', // ab
  'dq12', // scenario
  'dq13', // swipe

  // TF axis (사고 / 감정)
  'dq21', // ab
  'dq22', // scenario
  'dq23', // swipe

  // JP axis (판단 / 인식)
  'dq31', // ab
  'dq32', // scenario
  'dq33', // swipe
];

const idSet = new Set(SIMPLE_QUESTION_IDS);

/**
 * Simple mode question set — a curated 12-question subset of the deep mode pool.
 * Maintains the same ordering as the IDs above (EI → SN → TF → JP).
 */
export const simpleQuestions: Question[] = SIMPLE_QUESTION_IDS
  .map((id) => deepQuestions.find((q) => q.id === id))
  .filter((q): q is Question => q !== undefined);

/**
 * Check whether a given question ID belongs to the simple subset.
 * Useful for marking questions in the deep set that also appear in simple mode.
 */
export function isSimpleQuestion(questionId: string): boolean {
  return idSet.has(questionId);
}
