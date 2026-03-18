/**
 * Deep mode questions (40 questions).
 * 10 questions per axis × 4 axes = 40 total.
 * Mix of question types: ab, scenario, swipe.
 */

import type { Question } from '@/types/question';

export const deepQuestions: Question[] = [
  // =========================================================================
  // EI axis (외향 / 내향) — 10 questions
  // =========================================================================
  {
    id: 'dq01',
    type: 'ab',
    axis: 'EI',
    mode: 'deep',
    question: '주말에 에너지를 충전하는 방법은?',
    options: [
      { text: '친구들과 신나게 놀러 나간다 🎉', value: 'E' },
      { text: '집에서 혼자 조용히 쉰다 🏠', value: 'I' },
    ],
  },
  {
    id: 'dq02',
    type: 'scenario',
    axis: 'EI',
    mode: 'deep',
    scenario: '오늘은 동아리 첫 모임이다. 아는 사람은 한 명도 없다.',
    question: '새로운 동아리에 가입한 첫날! 어떻게 행동할까?',
    options: [
      { text: '먼저 다가가서 말을 건다', value: 'E' },
      { text: '누군가 말을 걸어주길 기다린다', value: 'I' },
      { text: '옆에 앉은 사람에게 조용히 인사한다', value: 'I' },
    ],
  },
  {
    id: 'dq03',
    type: 'swipe',
    axis: 'EI',
    mode: 'deep',
    card: {
      statement: '사람들과 함께 있으면 에너지가 충전된다',
      emoji: '⚡',
      agreeValue: 'E',
      disagreeValue: 'I',
    },
  },
  {
    id: 'dq04',
    type: 'ab',
    axis: 'EI',
    mode: 'deep',
    question: '점심시간에 보통 어떻게 보내?',
    options: [
      { text: '여러 사람과 함께 밥 먹으며 수다 떤다 🍽️', value: 'E' },
      { text: '혼자 또는 친한 한두 명과 조용히 먹는다 🍱', value: 'I' },
    ],
  },
  {
    id: 'dq05',
    type: 'scenario',
    axis: 'EI',
    mode: 'deep',
    scenario: '회사 워크숍에서 자유 시간이 주어졌다.',
    question: '자유 시간에 무엇을 할까?',
    options: [
      { text: '다른 팀 사람들과 어울려 놀이를 한다', value: 'E' },
      { text: '조용한 곳에서 혼자 산책한다', value: 'I' },
      { text: '소수의 친한 동료와 카페에 간다', value: 'I' },
    ],
  },
  {
    id: 'dq06',
    type: 'swipe',
    axis: 'EI',
    mode: 'deep',
    card: {
      statement: '파티에서 새로운 사람을 만나는 게 즐겁다',
      emoji: '🥳',
      agreeValue: 'E',
      disagreeValue: 'I',
    },
  },
  {
    id: 'dq07',
    type: 'ab',
    axis: 'EI',
    mode: 'deep',
    question: '고민이 있을 때 나는?',
    options: [
      { text: '주변 사람들에게 이야기하며 정리한다 💬', value: 'E' },
      { text: '혼자 조용히 생각하며 정리한다 🤔', value: 'I' },
    ],
  },
  {
    id: 'dq08',
    type: 'scenario',
    axis: 'EI',
    mode: 'deep',
    scenario: '친구가 대규모 생일파티를 열었다. 50명 넘게 왔다.',
    question: '파티에서 나의 모습은?',
    options: [
      { text: '이리저리 다니며 여러 그룹과 대화한다', value: 'E' },
      { text: '아는 사람 곁에 붙어서 대화한다', value: 'I' },
    ],
  },
  {
    id: 'dq09',
    type: 'swipe',
    axis: 'EI',
    mode: 'deep',
    card: {
      statement: '전화 통화보다 문자가 더 편하다',
      emoji: '📱',
      agreeValue: 'I',
      disagreeValue: 'E',
    },
  },
  {
    id: 'dq10',
    type: 'ab',
    axis: 'EI',
    mode: 'deep',
    question: '발표나 프레젠테이션을 할 때?',
    options: [
      { text: '사람들 앞에 서면 오히려 신이 난다 🎤', value: 'E' },
      { text: '긴장되지만 준비를 철저히 해서 해낸다 📝', value: 'I' },
    ],
  },

  // =========================================================================
  // SN axis (감각 / 직관) — 10 questions
  // =========================================================================
  {
    id: 'dq11',
    type: 'ab',
    axis: 'SN',
    mode: 'deep',
    question: '여행 계획을 세울 때 나는?',
    options: [
      { text: '맛집, 숙소, 교통편을 꼼꼼히 검색한다 📋', value: 'S' },
      { text: '대략적인 방향만 정하고 즉흥적으로 다닌다 🌈', value: 'N' },
    ],
  },
  {
    id: 'dq12',
    type: 'scenario',
    axis: 'SN',
    mode: 'deep',
    scenario: '선생님이 새로운 이론을 설명하고 있다.',
    question: '수업 시간에 새로운 개념을 배울 때?',
    options: [
      { text: '구체적인 예시를 들어달라고 한다', value: 'S' },
      { text: '이 이론이 다른 분야에 어떻게 적용될지 상상한다', value: 'N' },
    ],
  },
  {
    id: 'dq13',
    type: 'swipe',
    axis: 'SN',
    mode: 'deep',
    card: {
      statement: '나는 현실적인 것보다 상상하는 걸 더 좋아한다',
      emoji: '💭',
      agreeValue: 'N',
      disagreeValue: 'S',
    },
  },
  {
    id: 'dq14',
    type: 'ab',
    axis: 'SN',
    mode: 'deep',
    question: '길을 설명할 때 나는?',
    options: [
      { text: '"편의점 지나서 두 번째 골목에서 좌회전" 🗺️', value: 'S' },
      { text: '"대충 그쪽 방향으로 가면 느낌이 올 거야" 🧭', value: 'N' },
    ],
  },
  {
    id: 'dq15',
    type: 'scenario',
    axis: 'SN',
    mode: 'deep',
    scenario: '친구가 창업 아이디어를 이야기한다.',
    question: '친구의 사업 아이디어를 들었을 때?',
    options: [
      { text: '시장 규모, 비용, 수익성부터 따져본다', value: 'S' },
      { text: '아이디어의 가능성과 미래 비전에 흥분한다', value: 'N' },
      { text: '비슷한 성공 사례가 있는지 찾아본다', value: 'S' },
    ],
  },
  {
    id: 'dq16',
    type: 'swipe',
    axis: 'SN',
    mode: 'deep',
    card: {
      statement: '디테일보다 큰 그림을 보는 편이다',
      emoji: '🎨',
      agreeValue: 'N',
      disagreeValue: 'S',
    },
  },
  {
    id: 'dq17',
    type: 'ab',
    axis: 'SN',
    mode: 'deep',
    question: '영화를 볼 때 더 끌리는 장르는?',
    options: [
      { text: '실화 기반, 다큐멘터리 같은 현실적인 이야기 🎬', value: 'S' },
      { text: 'SF, 판타지 같은 상상력 넘치는 이야기 🚀', value: 'N' },
    ],
  },
  {
    id: 'dq18',
    type: 'scenario',
    axis: 'SN',
    mode: 'deep',
    scenario: '새 프로젝트를 시작하게 되었다.',
    question: '프로젝트를 시작할 때 먼저 하는 것은?',
    options: [
      { text: '과거 유사 프로젝트의 자료를 찾아본다', value: 'S' },
      { text: '새로운 접근법을 브레인스토밍한다', value: 'N' },
    ],
  },
  {
    id: 'dq19',
    type: 'swipe',
    axis: 'SN',
    mode: 'deep',
    card: {
      statement: '경험해보지 않은 것도 직감으로 판단할 수 있다',
      emoji: '🔮',
      agreeValue: 'N',
      disagreeValue: 'S',
    },
  },
  {
    id: 'dq20',
    type: 'ab',
    axis: 'SN',
    mode: 'deep',
    question: '요리할 때 나는?',
    options: [
      { text: '레시피를 정확히 따라 만든다 📏', value: 'S' },
      { text: '재료를 보고 즉석에서 창작한다 🧑‍🍳', value: 'N' },
    ],
  },

  // =========================================================================
  // TF axis (사고 / 감정) — 10 questions
  // =========================================================================
  {
    id: 'dq21',
    type: 'ab',
    axis: 'TF',
    mode: 'deep',
    question: '친구가 고민을 이야기할 때 나는?',
    options: [
      { text: '해결 방법을 찾아서 조언해준다 🧠', value: 'T' },
      { text: '일단 공감하며 들어준다 💗', value: 'F' },
    ],
  },
  {
    id: 'dq22',
    type: 'scenario',
    axis: 'TF',
    mode: 'deep',
    scenario: '팀원 두 명의 의견이 완전히 다르다. 네가 결정해야 한다.',
    question: '팀 프로젝트에서 의견이 갈릴 때?',
    options: [
      { text: '논리적으로 더 타당한 쪽을 선택한다', value: 'T' },
      { text: '모두의 기분을 살피며 절충안을 찾는다', value: 'F' },
      { text: '소수 의견이라도 감정이 상하지 않게 배려한다', value: 'F' },
    ],
  },
  {
    id: 'dq23',
    type: 'swipe',
    axis: 'TF',
    mode: 'deep',
    card: {
      statement: '결정할 때 감정보다 논리를 우선시한다',
      emoji: '⚖️',
      agreeValue: 'T',
      disagreeValue: 'F',
    },
  },
  {
    id: 'dq24',
    type: 'ab',
    axis: 'TF',
    mode: 'deep',
    question: '슬픈 영화를 볼 때 나는?',
    options: [
      { text: '"스토리 전개가 아쉬웠어"라고 분석한다 🎬', value: 'T' },
      { text: '같이 울면서 감정에 푹 빠진다 😢', value: 'F' },
    ],
  },
  {
    id: 'dq25',
    type: 'scenario',
    axis: 'TF',
    mode: 'deep',
    scenario: '후배가 실수를 해서 팀 전체에 피해가 갔다.',
    question: '후배에게 어떻게 할까?',
    options: [
      { text: '실수의 원인과 개선 방법을 명확히 알려준다', value: 'T' },
      { text: '먼저 괜찮다고 위로하고 다음에 잘하자고 한다', value: 'F' },
      { text: '사실관계만 정리하고 감정은 배제한다', value: 'T' },
    ],
  },
  {
    id: 'dq26',
    type: 'swipe',
    axis: 'TF',
    mode: 'deep',
    card: {
      statement: '공정함이 배려보다 더 중요하다',
      emoji: '⚖️',
      agreeValue: 'T',
      disagreeValue: 'F',
    },
  },
  {
    id: 'dq27',
    type: 'ab',
    axis: 'TF',
    mode: 'deep',
    question: '선물을 고를 때 나는?',
    options: [
      { text: '실용적이고 필요한 것을 고른다 🎁', value: 'T' },
      { text: '상대방이 감동받을 것을 고른다 💝', value: 'F' },
    ],
  },
  {
    id: 'dq28',
    type: 'scenario',
    axis: 'TF',
    mode: 'deep',
    scenario: '친구가 이직을 고민하고 있다.',
    question: '친구에게 어떤 조언을 할까?',
    options: [
      { text: '연봉, 성장 가능성, 시장 전망을 분석해준다', value: 'T' },
      { text: '친구가 정말 하고 싶은 일이 뭔지 물어본다', value: 'F' },
    ],
  },
  {
    id: 'dq29',
    type: 'swipe',
    axis: 'TF',
    mode: 'deep',
    card: {
      statement: '다른 사람의 기분에 쉽게 영향을 받는다',
      emoji: '🥺',
      agreeValue: 'F',
      disagreeValue: 'T',
    },
  },
  {
    id: 'dq30',
    type: 'ab',
    axis: 'TF',
    mode: 'deep',
    question: '논쟁이 벌어졌을 때 나는?',
    options: [
      { text: '사실과 근거를 들어 자기 입장을 지킨다 📊', value: 'T' },
      { text: '분위기가 나빠지면 양보하는 편이다 🕊️', value: 'F' },
    ],
  },

  // =========================================================================
  // JP axis (판단 / 인식) — 10 questions
  // =========================================================================
  {
    id: 'dq31',
    type: 'ab',
    axis: 'JP',
    mode: 'deep',
    question: '시험 기간에 나의 모습은?',
    options: [
      { text: '계획표를 만들고 차근차근 공부한다 📅', value: 'J' },
      { text: '벼락치기의 달인! 마감 직전에 집중한다 🔥', value: 'P' },
    ],
  },
  {
    id: 'dq32',
    type: 'scenario',
    axis: 'JP',
    mode: 'deep',
    scenario: '오늘 친구와의 약속이 갑자기 취소되었다.',
    question: '갑자기 약속이 취소됐을 때?',
    options: [
      { text: '이미 세워둔 다른 계획으로 전환한다', value: 'J' },
      { text: '오히려 좋아! 자유 시간이 생겼다며 즐긴다', value: 'P' },
    ],
  },
  {
    id: 'dq33',
    type: 'swipe',
    axis: 'JP',
    mode: 'deep',
    card: {
      statement: '나는 계획 없이 움직이는 게 더 편하다',
      emoji: '🎲',
      agreeValue: 'P',
      disagreeValue: 'J',
    },
  },
  {
    id: 'dq34',
    type: 'ab',
    axis: 'JP',
    mode: 'deep',
    question: '여행 가방을 쌀 때 나는?',
    options: [
      { text: '체크리스트를 만들어 빠짐없이 챙긴다 ✅', value: 'J' },
      { text: '대충 넣고 부족하면 현지에서 사면 된다 🧳', value: 'P' },
    ],
  },
  {
    id: 'dq35',
    type: 'scenario',
    axis: 'JP',
    mode: 'deep',
    scenario: '마감이 2주 남은 큰 프로젝트가 있다.',
    question: '프로젝트를 어떻게 진행할까?',
    options: [
      { text: '일정을 나눠 매일 조금씩 진행한다', value: 'J' },
      { text: '영감이 올 때 몰아서 한다', value: 'P' },
      { text: '중간중간 계획을 수정하며 유연하게 한다', value: 'P' },
    ],
  },
  {
    id: 'dq36',
    type: 'swipe',
    axis: 'JP',
    mode: 'deep',
    card: {
      statement: 'To-do 리스트를 만들면 뿌듯하다',
      emoji: '📝',
      agreeValue: 'J',
      disagreeValue: 'P',
    },
  },
  {
    id: 'dq37',
    type: 'ab',
    axis: 'JP',
    mode: 'deep',
    question: '옷장 정리 스타일은?',
    options: [
      { text: '종류별, 색상별로 깔끔하게 정리한다 👔', value: 'J' },
      { text: '입을 때 찾기만 하면 되지~ 대충 넣는다 🧺', value: 'P' },
    ],
  },
  {
    id: 'dq38',
    type: 'scenario',
    axis: 'JP',
    mode: 'deep',
    scenario: '친구들과 저녁 메뉴를 고르고 있다.',
    question: '메뉴를 고를 때 나는?',
    options: [
      { text: '빨리 정해서 예약까지 끝내고 싶다', value: 'J' },
      { text: '가면서 분위기 보고 정하자고 한다', value: 'P' },
    ],
  },
  {
    id: 'dq39',
    type: 'swipe',
    axis: 'JP',
    mode: 'deep',
    card: {
      statement: '마감이 있어야 일이 더 잘 된다',
      emoji: '⏰',
      agreeValue: 'P',
      disagreeValue: 'J',
    },
  },
  {
    id: 'dq40',
    type: 'ab',
    axis: 'JP',
    mode: 'deep',
    question: '하루 일과를 마치고 나면?',
    options: [
      { text: '내일 할 일을 미리 정리해둔다 📒', value: 'J' },
      { text: '내일은 내일의 내가 알아서 하겠지~ 😌', value: 'P' },
    ],
  },
];
