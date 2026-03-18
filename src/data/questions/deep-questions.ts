import type { Question } from '@/types/question';

/**
 * 심화 모드 전용 28문항 (축별 7문항)
 *
 * 심화 모드(deep)는 기본 12문항 + 이 28문항 = 총 40문항으로 구성됩니다.
 * 질문 형식은 ab(A/B 선택), scenario(시나리오), swipe(카드 스와이프)를 혼합합니다.
 *
 * ID 규칙: deep-{axis}-{number}
 * 예: deep-ei-1, deep-sn-3
 */

// ============================================================
// E/I 축 심화 질문 7문항
// ============================================================
const deepEIQuestions: Question[] = [
  {
    id: 'deep-ei-1',
    axis: 'EI',
    type: 'ab',
    mode: 'deep',
    weight: 1,
    tags: ['사회생활', '에너지'],
    question: '일주일간의 힘든 프로젝트가 끝났어요. 금요일 저녁, 어떻게 보내고 싶나요?',
    options: [
      { text: '친구들이랑 맛집 가서 수다 떨면서 스트레스 풀기! 🍕', value: 'E' },
      { text: '집에서 좋아하는 드라마 정주행하면서 혼자만의 시간 보내기 🛋️', value: 'I' },
    ],
  },
  {
    id: 'deep-ei-2',
    axis: 'EI',
    type: 'scenario',
    mode: 'deep',
    weight: 1,
    tags: ['직장', '소통'],
    scenario: '새로운 팀에 합류했습니다. 첫 주가 지나고 팀원들과 아직 어색한 상태예요.',
    question: '어떻게 하시겠어요?',
    options: [
      { text: '먼저 다가가서 점심 같이 먹자고 말을 건다', value: 'E' },
      { text: '업무를 잘 해내면서 자연스럽게 친해지길 기다린다', value: 'I' },
    ],
  },
  {
    id: 'deep-ei-3',
    axis: 'EI',
    type: 'swipe',
    mode: 'deep',
    weight: 1,
    tags: ['성격', '선호'],
    card: {
      statement: '나는 혼자 밥 먹는 것보다 누군가와 함께 먹는 게 항상 더 좋다 🍜',
      agreeValue: 'E',
      disagreeValue: 'I',
    },
  },
  {
    id: 'deep-ei-4',
    axis: 'EI',
    type: 'ab',
    mode: 'deep',
    weight: 1,
    tags: ['여행', '활동'],
    question: '해외여행 중 자유시간이 반나절 생겼어요!',
    options: [
      { text: '현지인 추천 맛집이나 핫플 찾아서 돌아다니기 🗺️', value: 'E' },
      { text: '조용한 카페에서 책 읽거나 숙소에서 느긋하게 쉬기 ☕', value: 'I' },
    ],
  },
  {
    id: 'deep-ei-5',
    axis: 'EI',
    type: 'scenario',
    mode: 'deep',
    weight: 1,
    tags: ['모임', '에너지'],
    scenario: '오랜만에 대학 동기 모임이 있어요. 20명 정도 모이는 큰 모임인데, 아는 사람도 있고 모르는 사람도 있어요.',
    question: '모임에 대한 나의 마음은?',
    options: [
      { text: '오~ 새로운 사람들도 만나고 재밌겠다! 기대된다 ✨', value: 'E' },
      { text: '가긴 가야지... 근데 좀 부담스럽다. 일찍 빠져나올 수 있을까? 😅', value: 'I' },
    ],
  },
  {
    id: 'deep-ei-6',
    axis: 'EI',
    type: 'swipe',
    mode: 'deep',
    weight: 1,
    tags: ['일상', '습관'],
    card: {
      statement: '생각을 정리할 때 누군가에게 말하면서 정리하는 편이다 💬',
      agreeValue: 'E',
      disagreeValue: 'I',
    },
  },
  {
    id: 'deep-ei-7',
    axis: 'EI',
    type: 'ab',
    mode: 'deep',
    weight: 1,
    tags: ['업무', '스타일'],
    question: '중요한 발표 준비를 해야 해요. 어떤 방식이 더 편한가요?',
    options: [
      { text: '동료들이랑 아이디어 브레인스토밍하면서 같이 준비하기 🧠', value: 'E' },
      { text: '혼자 조용히 자료 조사하고 구상한 뒤에 공유하기 📝', value: 'I' },
    ],
  },
];

// ============================================================
// S/N 축 심화 질문 7문항
// ============================================================
const deepSNQuestions: Question[] = [
  {
    id: 'deep-sn-1',
    axis: 'SN',
    type: 'ab',
    mode: 'deep',
    weight: 1,
    tags: ['사고방식', '문제해결'],
    question: '새로운 가전제품을 샀어요. 설명서가 같이 왔는데...',
    options: [
      { text: '설명서를 꼼꼼히 읽고 순서대로 따라하기 📖', value: 'S' },
      { text: '일단 이것저것 눌러보면서 감으로 익히기 🎮', value: 'N' },
    ],
  },
  {
    id: 'deep-sn-2',
    axis: 'SN',
    type: 'scenario',
    mode: 'deep',
    weight: 1,
    tags: ['직장', '기획'],
    scenario: '팀에서 새로운 서비스를 기획하게 되었어요. 첫 회의에서 의견을 나누는 시간입니다.',
    question: '나는 주로 어떤 의견을 내는 편인가요?',
    options: [
      { text: '시장 데이터와 기존 사례를 분석해서 현실적인 방향을 제시한다', value: 'S' },
      { text: '아직 아무도 시도하지 않은 새로운 콘셉트와 가능성을 제안한다', value: 'N' },
    ],
  },
  {
    id: 'deep-sn-3',
    axis: 'SN',
    type: 'swipe',
    mode: 'deep',
    weight: 1,
    tags: ['성격', '관점'],
    card: {
      statement: '나는 "만약에~" 하는 상상을 자주 하는 편이다 🌈',
      agreeValue: 'N',
      disagreeValue: 'S',
    },
  },
  {
    id: 'deep-sn-4',
    axis: 'SN',
    type: 'ab',
    mode: 'deep',
    weight: 1,
    tags: ['학습', '정보처리'],
    question: '새로운 요리를 배울 때 나는...',
    options: [
      { text: '레시피대로 계량컵, 계량스푼 정확하게 맞춰서 만들기 ⚖️', value: 'S' },
      { text: '대충 감으로 넣으면서 나만의 방식으로 변형해보기 🍳', value: 'N' },
    ],
  },
  {
    id: 'deep-sn-5',
    axis: 'SN',
    type: 'scenario',
    mode: 'deep',
    weight: 1,
    tags: ['대화', '소통'],
    scenario: '친구가 최근 읽은 책에 대해 이야기하고 있어요.',
    question: '나는 어떤 부분에 더 관심이 가나요?',
    options: [
      { text: '구체적인 줄거리와 인상 깊었던 장면, 문장들', value: 'S' },
      { text: '책의 전체적인 메시지와 작가가 전달하려는 깊은 의미', value: 'N' },
    ],
  },
  {
    id: 'deep-sn-6',
    axis: 'SN',
    type: 'swipe',
    mode: 'deep',
    weight: 1,
    tags: ['일상', '시간관'],
    card: {
      statement: '과거의 경험보다 미래의 가능성에 대해 생각하는 시간이 더 많다 🔮',
      agreeValue: 'N',
      disagreeValue: 'S',
    },
  },
  {
    id: 'deep-sn-7',
    axis: 'SN',
    type: 'ab',
    mode: 'deep',
    weight: 1,
    tags: ['여행', '관심사'],
    question: '여행지에서 박물관을 방문했어요. 어떤 전시가 더 끌리나요?',
    options: [
      { text: '실제 유물과 역사적 사실을 상세히 설명하는 전시 🏺', value: 'S' },
      { text: '추상적인 현대미술이나 미래를 상상하는 콘셉트 전시 🎨', value: 'N' },
    ],
  },
];

// ============================================================
// T/F 축 심화 질문 7문항
// ============================================================
const deepTFQuestions: Question[] = [
  {
    id: 'deep-tf-1',
    axis: 'TF',
    type: 'ab',
    mode: 'deep',
    weight: 1,
    tags: ['인간관계', '갈등'],
    question: '친한 친구가 회사를 그만두겠다고 합니다. 객관적으로 보면 아직 그만둘 때가 아닌 것 같아요.',
    options: [
      { text: '솔직하게 지금 그만두면 불리한 점을 논리적으로 설명해준다 📊', value: 'T' },
      { text: '일단 친구의 힘든 마음을 먼저 공감하고 들어준다 🤗', value: 'F' },
    ],
  },
  {
    id: 'deep-tf-2',
    axis: 'TF',
    type: 'scenario',
    mode: 'deep',
    weight: 1,
    tags: ['직장', '의사결정'],
    scenario: '팀 프로젝트에서 두 가지 방안이 나왔어요. A안은 효율적이지만 팀원 한 명에게 업무가 몰리고, B안은 공평하지만 시간이 더 걸립니다.',
    question: '어떤 방안을 선택하시겠어요?',
    options: [
      { text: 'A안 - 결과적으로 효율이 더 중요하니까 합리적인 선택을 한다', value: 'T' },
      { text: 'B안 - 팀원 모두가 만족할 수 있는 공평한 방식이 더 낫다', value: 'F' },
    ],
  },
  {
    id: 'deep-tf-3',
    axis: 'TF',
    type: 'swipe',
    mode: 'deep',
    weight: 1,
    tags: ['성격', '판단'],
    card: {
      statement: '누군가의 실수를 지적할 때, 상대 기분보다 정확한 피드백이 더 중요하다 🎯',
      agreeValue: 'T',
      disagreeValue: 'F',
    },
  },
  {
    id: 'deep-tf-4',
    axis: 'TF',
    type: 'ab',
    mode: 'deep',
    weight: 1,
    tags: ['소비', '결정'],
    question: '생일 선물을 고르고 있어요. 어떤 기준으로 선택하나요?',
    options: [
      { text: '가성비, 실용성, 받는 사람이 실제로 쓸 수 있는지 따져보기 🧐', value: 'T' },
      { text: '받았을 때 감동할 만한 의미 있는 선물, 마음이 전해지는 걸로! 💝', value: 'F' },
    ],
  },
  {
    id: 'deep-tf-5',
    axis: 'TF',
    type: 'scenario',
    mode: 'deep',
    weight: 1,
    tags: ['영화', '감상'],
    scenario: '친구와 영화를 보고 나왔어요. 슬픈 결말이었는데 친구가 "어떻게 생각해?"라고 물어봅니다.',
    question: '나의 첫 반응은?',
    options: [
      { text: '"스토리 전개가 좀 아쉬웠어. 저 부분은 이렇게 했으면 더 좋았을텐데..."', value: 'T' },
      { text: '"아 진짜 너무 슬펐어... 주인공 마지막 장면에서 눈물 날 뻔했어 😢"', value: 'F' },
    ],
  },
  {
    id: 'deep-tf-6',
    axis: 'TF',
    type: 'swipe',
    mode: 'deep',
    weight: 1,
    tags: ['자기인식', '가치관'],
    card: {
      statement: '중요한 결정을 할 때 머리(논리)보다 가슴(감정)을 더 따르는 편이다 💓',
      agreeValue: 'F',
      disagreeValue: 'T',
    },
  },
  {
    id: 'deep-tf-7',
    axis: 'TF',
    type: 'ab',
    mode: 'deep',
    weight: 1,
    tags: ['토론', '의견'],
    question: '온라인에서 논쟁이 벌어지고 있어요. 한쪽 의견이 틀렸다고 생각할 때...',
    options: [
      { text: '논리적 근거를 들어 정확한 정보를 바로잡아야 한다고 생각한다 ⚔️', value: 'T' },
      { text: '굳이 기분 나쁘게 할 필요 없으니 넘어가거나 부드럽게 말한다 🕊️', value: 'F' },
    ],
  },
];

// ============================================================
// J/P 축 심화 질문 7문항
// ============================================================
const deepJPQuestions: Question[] = [
  {
    id: 'deep-jp-1',
    axis: 'JP',
    type: 'ab',
    mode: 'deep',
    weight: 1,
    tags: ['일상', '계획'],
    question: '이번 주말에 뭐 할지 생각 중이에요!',
    options: [
      { text: '금요일까지 계획 세워서 시간표 만들어놓기 📋', value: 'J' },
      { text: '일단 주말 되면 그때 기분 따라 정하기~ 🎲', value: 'P' },
    ],
  },
  {
    id: 'deep-jp-2',
    axis: 'JP',
    type: 'scenario',
    mode: 'deep',
    weight: 1,
    tags: ['업무', '마감'],
    scenario: '2주 뒤 마감인 중요한 과제가 있습니다.',
    question: '나는 보통 어떻게 하는 편인가요?',
    options: [
      { text: '바로 계획을 세우고 매일 조금씩 진행해서 마감 며칠 전에 완료한다', value: 'J' },
      { text: '여러 가지 자료를 모으다가 마감이 다가오면 집중해서 한번에 끝낸다', value: 'P' },
    ],
  },
  {
    id: 'deep-jp-3',
    axis: 'JP',
    type: 'swipe',
    mode: 'deep',
    weight: 1,
    tags: ['성격', '유연성'],
    card: {
      statement: '갑자기 계획이 바뀌면 스트레스를 받기보다는 오히려 재밌다 🎢',
      agreeValue: 'P',
      disagreeValue: 'J',
    },
  },
  {
    id: 'deep-jp-4',
    axis: 'JP',
    type: 'ab',
    mode: 'deep',
    weight: 1,
    tags: ['여행', '스타일'],
    question: '여행 짐을 싸는 나의 스타일은?',
    options: [
      { text: '체크리스트 만들어서 하나씩 확인하며 빠짐없이 챙기기 ✅', value: 'J' },
      { text: '대충 필요한 것만 챙기고, 부족하면 현지에서 사면 되지~ 🎒', value: 'P' },
    ],
  },
  {
    id: 'deep-jp-5',
    axis: 'JP',
    type: 'scenario',
    mode: 'deep',
    weight: 1,
    tags: ['쇼핑', '결정'],
    scenario: '마음에 드는 옷을 발견했어요. 근데 다른 가게에 더 좋은 게 있을 수도 있어요.',
    question: '어떻게 하시겠어요?',
    options: [
      { text: '마음에 드니까 바로 사자! 결정은 빠르게 하는 게 좋아 💳', value: 'J' },
      { text: '일단 다른 가게도 둘러보고, 비교해본 다음에 결정할래 👀', value: 'P' },
    ],
  },
  {
    id: 'deep-jp-6',
    axis: 'JP',
    type: 'swipe',
    mode: 'deep',
    weight: 1,
    tags: ['습관', '정리'],
    card: {
      statement: '내 방 책상은 항상 깔끔하게 정리되어 있는 편이다 🗂️',
      agreeValue: 'J',
      disagreeValue: 'P',
    },
  },
  {
    id: 'deep-jp-7',
    axis: 'JP',
    type: 'ab',
    mode: 'deep',
    weight: 1,
    tags: ['생활', '루틴'],
    question: '나의 하루 루틴은 어떤 편인가요?',
    options: [
      { text: '정해진 시간에 일어나고, 할 일 순서가 대체로 일정해요 ⏰', value: 'J' },
      { text: '매일 다르게 살아요. 그날 기분에 따라 유연하게! 🌊', value: 'P' },
    ],
  },
];

/**
 * 심화 모드 전용 28개 질문
 * 기본 12문항(simple)과 합쳐서 총 40문항으로 심화 테스트를 구성합니다.
 */
export const deepQuestions: Question[] = [
  ...deepEIQuestions,
  ...deepSNQuestions,
  ...deepTFQuestions,
  ...deepJPQuestions,
];

/**
 * 축별로 심화 질문을 가져오는 헬퍼 함수
 */
export function getDeepQuestionsByAxis(axis: Question['axis']): Question[] {
  return deepQuestions.filter((q) => q.axis === axis);
}

/**
 * 질문 유형별로 심화 질문을 가져오는 헬퍼 함수
 */
export function getDeepQuestionsByType(type: Question['type']): Question[] {
  return deepQuestions.filter((q) => q.type === type);
}
