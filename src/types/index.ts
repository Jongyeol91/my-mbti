/**
 * 타입 정의 배럴 익스포트
 *
 * mbti.ts - MBTI 유형 프로필, 점수, 결과 관련 타입
 * question.ts - 질문, 응답, 퀴즈 세션 관련 타입
 */
export * from './mbti';
export {
  type QuestionType,
  type TestMode,
  type ABOption,
  type ScenarioOption,
  type SwipeContent,
  type BaseQuestion,
  type ABQuestion,
  type ScenarioQuestion,
  type SwipeQuestion,
  type Question,
  type QuestionResponse,
  type AxisScore,
  type QuizSession,
} from './question';
