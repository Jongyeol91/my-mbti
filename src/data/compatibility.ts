/**
 * MBTI 16유형 궁합 데이터 모듈
 *
 * 모든 유형 쌍에 대한 궁합 등급(best/good/neutral/bad)과
 * 한국어 설명을 제공합니다.
 *
 * 정적 데이터 파일로, 향후 CMS나 데이터베이스 연동 시
 * 이 파일의 인터페이스를 유지하면서 데이터 소스만 교체 가능
 */

import type { MBTIType, CompatibilityLevel } from '@/types/mbti';

// ─── 타입 정의 ─────────────────────────────────────

/** 두 유형 간의 상세 궁합 정보 */
export interface CompatibilityDetail {
  /** 궁합 등급 */
  level: CompatibilityLevel;
  /** 궁합 한줄 요약 */
  title: string;
  /** 궁합 상세 설명 */
  description: string;
  /** 관계 팁 */
  tip: string;
}

/** 궁합 등급별 메타 정보 */
export interface CompatibilityLevelMeta {
  level: CompatibilityLevel;
  label: string;
  emoji: string;
  color: string;
  description: string;
}

// ─── 궁합 등급 메타 정보 ─────────────────────────────

export const compatibilityLevelMeta: Record<CompatibilityLevel, CompatibilityLevelMeta> = {
  best: {
    level: 'best',
    label: '천생연분 💕',
    emoji: '💕',
    color: 'pink',
    description: '서로를 완벽하게 보완하는 최고의 궁합이에요!',
  },
  good: {
    level: 'good',
    label: '좋은 궁합 💚',
    emoji: '💚',
    color: 'green',
    description: '함께 성장할 수 있는 좋은 관계예요!',
  },
  neutral: {
    level: 'neutral',
    label: '보통 궁합 💛',
    emoji: '💛',
    color: 'yellow',
    description: '서로 이해하려는 노력이 필요한 관계예요.',
  },
  bad: {
    level: 'bad',
    label: '도전적 궁합 💔',
    emoji: '💔',
    color: 'red',
    description: '차이를 이해하고 존중하면 성장할 수 있어요.',
  },
};

// ─── 궁합 키 생성 유틸 ─────────────────────────────

/** 두 타입의 정렬된 키 생성 (양방향 조회용) */
function makeKey(a: MBTIType, b: MBTIType): string {
  return [a, b].sort().join('-');
}

// ─── 궁합 데이터 정의 ─────────────────────────────

/**
 * 전체 궁합 원본 데이터
 * 키: 정렬된 "TYPE1-TYPE2" 형태
 */
const compatibilityRawData: Record<string, CompatibilityDetail> = {
  // ═══════════════════════════════════════════
  // INTJ 궁합
  // ═══════════════════════════════════════════
  'ENFP-INTJ': {
    level: 'best',
    title: '호기심 폭발 천생연분',
    description: 'INTJ의 전략적 사고와 ENFP의 창의적 에너지가 만나면 놀라운 시너지를 내요. 서로 다른 세계를 보여주면서도 깊은 지적 교감을 나눌 수 있어요.',
    tip: 'INTJ는 ENFP의 감정을 더 존중해주고, ENFP는 INTJ의 혼자만의 시간을 이해해주세요.',
  },
  'ENTP-INTJ': {
    level: 'best',
    title: '지적 불꽃 튀는 조합',
    description: '두 유형 모두 지적 토론을 사랑해요! ENTP의 아이디어 폭발과 INTJ의 깊은 분석이 만나면, 끝없는 대화와 새로운 가능성이 펼쳐져요.',
    tip: '서로의 의견 차이를 인신공격으로 받아들이지 마세요. 토론은 토론일 뿐!',
  },
  'INTJ-INTJ': {
    level: 'good',
    title: '전략가끼리의 묵직한 동맹',
    description: '서로의 독립성과 지적 호기심을 깊이 이해해요. 말 안 해도 통하는 부분이 많지만, 둘 다 감정 표현에 서투를 수 있어요.',
    tip: '서로에게 감정적으로 다가가는 연습을 해보세요. 논리만으로는 관계가 완성되지 않아요.',
  },
  'INFJ-INTJ': {
    level: 'good',
    title: '깊은 통찰의 듀오',
    description: 'Ni(내향 직관)를 공유하는 두 유형은 깊은 대화와 미래 비전에 대해 놀라울 정도로 잘 통해요. 서로의 내면 세계를 이해할 수 있는 드문 조합이에요.',
    tip: 'INTJ는 INFJ의 감정적 필요를, INFJ는 INTJ의 논리적 접근을 존중해주세요.',
  },
  'ENTJ-INTJ': {
    level: 'good',
    title: '야망과 전략의 파워 콤비',
    description: '목표 지향적이고 효율적인 두 유형이 만나면 어떤 프로젝트든 성공적으로 이끌어요. 서로의 능력을 존경하는 관계!',
    tip: '주도권 다툼이 생길 수 있어요. 각자의 영역을 존중하는 것이 핵심이에요.',
  },
  'INFP-INTJ': {
    level: 'good',
    title: '이상주의와 현실주의의 만남',
    description: 'INFP의 따뜻한 이상과 INTJ의 냉철한 전략이 균형을 이루면, 꿈을 현실로 만드는 멋진 팀이 될 수 있어요.',
    tip: 'INTJ는 비판을 부드럽게 전달하고, INFP는 피드백을 개인적으로 받아들이지 않으려 노력해보세요.',
  },
  'INTJ-ISTJ': {
    level: 'neutral',
    title: '논리적 존중의 관계',
    description: '둘 다 독립적이고 책임감 있어서 안정적인 관계를 만들 수 있어요. 하지만 INTJ의 혁신성과 ISTJ의 전통 중시가 충돌할 수 있어요.',
    tip: '새로운 것과 검증된 것의 균형을 찾아보세요.',
  },
  'INTJ-ISTP': {
    level: 'neutral',
    title: '조용한 분석가 듀오',
    description: '둘 다 말이 적고 논리적이에요. 서로의 공간을 잘 존중하지만, 감정적 깊이가 부족할 수 있어요.',
    tip: '가끔은 분석을 내려놓고 함께 즐거운 경험을 해보세요.',
  },
  'INTJ-INTP': {
    level: 'neutral',
    title: '지식 탐구 동반자',
    description: '끝없는 지적 대화를 나눌 수 있는 사이! 하지만 둘 다 행동보다 생각에 머무를 수 있어요.',
    tip: '아이디어를 현실로 옮기는 연습을 함께 해보세요.',
  },
  'ESTJ-INTJ': {
    level: 'neutral',
    title: '효율의 두 가지 길',
    description: '둘 다 체계적이고 결과를 중시하지만, 접근 방식이 달라요. ESTJ는 규칙을, INTJ는 혁신을 추구해요.',
    tip: '서로의 방식에 장단점이 있다는 걸 인정해주세요.',
  },
  'ESTP-INTJ': {
    level: 'neutral',
    title: '생각 vs 행동의 조합',
    description: 'ESTP의 즉흥적 행동력과 INTJ의 장기적 전략이 만나면 서로에게 배울 점이 많아요. 하지만 속도 차이가 갈등을 만들 수 있어요.',
    tip: '서로의 템포를 이해하고 조율해보세요.',
  },
  'ENFJ-INTJ': {
    level: 'neutral',
    title: '비전 공유의 가능성',
    description: '둘 다 큰 그림을 보는 유형이에요. ENFJ의 사람 중심 리더십과 INTJ의 전략적 리더십이 시너지를 낼 수 있어요.',
    tip: 'ENFJ는 INTJ의 직접적 표현을 감정적으로 받아들이지 마세요.',
  },
  'ESFJ-INTJ': {
    level: 'bad',
    title: '서로 다른 언어를 쓰는 사이',
    description: 'ESFJ의 조화 중시와 INTJ의 효율 중시가 충돌해요. 서로의 가치관이 정반대처럼 느껴질 수 있어요.',
    tip: '다름을 틀림으로 보지 않는 연습이 필요해요. 서로에게서 배울 점이 있어요.',
  },
  'INTJ-ISFJ': {
    level: 'bad',
    title: '다정함과 냉철함의 충돌',
    description: 'ISFJ의 따뜻한 배려와 INTJ의 직설적 태도가 오해를 만들 수 있어요. 소통 방식의 차이를 이해하는 것이 중요해요.',
    tip: 'INTJ는 부드럽게 말하는 연습을, ISFJ는 직접적 소통에 덜 상처받는 연습을 해보세요.',
  },
  'ESFP-INTJ': {
    level: 'bad',
    title: '자유로운 영혼과 계획의 대가',
    description: 'ESFP의 즉흥적 라이프와 INTJ의 철저한 계획이 부딪혀요. 하지만 서로의 세계를 경험하면 시야가 넓어져요.',
    tip: '서로의 라이프스타일을 바꾸려 하지 말고 존중해주세요.',
  },
  'INTJ-ISFP': {
    level: 'bad',
    title: '논리와 감성의 평행선',
    description: 'INTJ의 논리적 세계와 ISFP의 감성적 세계가 교차하기 어려워요. 하지만 서로를 이해하면 풍요로운 관계가 될 수 있어요.',
    tip: 'INTJ는 감정의 언어를, ISFP는 논리의 언어를 배워보세요.',
  },

  // ═══════════════════════════════════════════
  // INTP 궁합
  // ═══════════════════════════════════════════
  'ENTJ-INTP': {
    level: 'best',
    title: '아이디어를 현실로!',
    description: 'INTP의 무한한 아이디어와 ENTJ의 강력한 실행력이 만나면 세상을 바꿀 수 있어요. 서로의 능력에 감탄하는 조합!',
    tip: 'ENTJ는 INTP에게 결정을 재촉하지 말고, INTP는 ENTJ의 계획에 좀 더 협조해주세요.',
  },
  'ENTP-INTP': {
    level: 'best',
    title: '아이디어 핑퐁의 달인들',
    description: '지적 호기심의 끝판왕 조합! 밤새 토론해도 지치지 않는 사이예요. 서로의 논리를 존중하면서 새로운 아이디어를 발전시켜요.',
    tip: '아이디어에만 머물지 말고 가끔은 실행으로 옮겨보세요!',
  },
  'INFJ-INTP': {
    level: 'good',
    title: '내면의 깊이를 나누는 사이',
    description: 'INTP의 논리적 탐구와 INFJ의 직관적 통찰이 만나면 깊고 의미 있는 대화가 끊이지 않아요.',
    tip: 'INTP는 INFJ의 감정을 무시하지 말고, INFJ는 INTP의 분석에 인내심을 가져주세요.',
  },
  'INFP-INTP': {
    level: 'good',
    title: '내향적 탐구자 듀오',
    description: '둘 다 내면 세계가 풍부하고 깊은 대화를 좋아해요. INTP의 논리와 INFP의 감성이 서로를 균형 잡아줘요.',
    tip: '서로의 표현 방식(논리 vs 감정)을 존중하고 배워보세요.',
  },
  'ENFP-INTP': {
    level: 'good',
    title: '호기심 가득한 탐험대',
    description: 'ENFP의 열정적 에너지와 INTP의 깊은 분석이 만나면 재미있으면서도 의미 있는 관계가 돼요.',
    tip: 'ENFP는 INTP의 혼자 시간을, INTP는 ENFP의 사교 활동을 이해해주세요.',
  },
  'INTP-ISTP': {
    level: 'good',
    title: '조용한 문제 해결사들',
    description: '둘 다 분석적이고 독립적이에요. 서로의 공간을 존중하면서 필요할 때 깊은 대화를 나눌 수 있어요.',
    tip: '감정적 교류를 위한 시간을 의도적으로 만들어보세요.',
  },
  'INTP-ISTJ': {
    level: 'neutral',
    title: '논리의 두 갈래',
    description: '둘 다 논리적이지만, INTP는 가능성을 ISTJ는 현실을 봐요. 서로의 관점이 다르지만 보완적이에요.',
    tip: '이론과 실전의 균형을 함께 찾아보세요.',
  },
  'ESTJ-INTP': {
    level: 'neutral',
    title: '체계와 자유의 긴장',
    description: 'ESTJ의 체계적 관리와 INTP의 자유로운 탐구가 충돌할 수 있지만, 서로에게서 배울 점이 많아요.',
    tip: 'ESTJ는 유연성을, INTP는 구조를 조금씩 받아들여보세요.',
  },
  'ESTP-INTP': {
    level: 'neutral',
    title: '이론가와 행동파',
    description: 'INTP의 이론과 ESTP의 실전 경험이 합쳐지면 강력해요. 하지만 에너지 레벨 차이가 갈등의 원인이 될 수 있어요.',
    tip: '서로의 속도에 맞춰주는 양보가 필요해요.',
  },
  'ENFJ-INTP': {
    level: 'neutral',
    title: '따뜻함과 논리의 교차',
    description: 'ENFJ의 따뜻한 리더십과 INTP의 냉철한 분석이 균형을 이루면 멋진 팀이에요.',
    tip: 'ENFJ는 논리적 비판을 감정적으로 받아들이지 말고, INTP는 공감 표현을 연습해보세요.',
  },
  'ESFJ-INTP': {
    level: 'bad',
    title: '관계 vs 논리의 갈등',
    description: 'ESFJ는 조화와 관계를, INTP는 진실과 논리를 최우선으로 해요. 가치관의 차이가 크게 느껴질 수 있어요.',
    tip: '서로의 가치관을 존중하고, 중간 지점을 찾는 연습을 해보세요.',
  },
  'INTP-ISFJ': {
    level: 'bad',
    title: '배려와 분석의 오해',
    description: 'ISFJ의 세심한 배려가 INTP에겐 부담으로, INTP의 객관적 분석이 ISFJ에겐 냉정함으로 느껴질 수 있어요.',
    tip: '좋은 의도를 서로 다른 방식으로 표현한다는 걸 기억하세요.',
  },
  'ESFP-INTP': {
    level: 'bad',
    title: '파티피플과 탐구자',
    description: 'ESFP의 활발한 사교와 INTP의 고독한 탐구가 서로를 이해하기 어려워요. 완전히 다른 세계에 사는 느낌!',
    tip: '서로의 세계를 체험해보는 데이트를 해보세요.',
  },
  'INTP-ISFP': {
    level: 'neutral',
    title: '내향적 창작자 모임',
    description: '둘 다 조용하고 독립적이에요. INTP의 논리적 창의성과 ISFP의 예술적 감성이 서로를 자극할 수 있어요.',
    tip: '각자의 표현 방식을 존중하고, 함께하는 활동을 찾아보세요.',
  },

  // ═══════════════════════════════════════════
  // INFJ 궁합
  // ═══════════════════════════════════════════
  'ENFP-INFJ': {
    level: 'best',
    title: '운명적 소울메이트',
    description: 'MBTI 궁합의 정석! ENFP의 밝은 에너지가 INFJ의 마음을 열게 하고, INFJ의 깊은 이해가 ENFP에게 안식처가 돼요.',
    tip: 'INFJ는 ENFP의 사교성에 질투하지 말고, ENFP는 INFJ의 혼자 시간을 빼앗지 마세요.',
  },
  'ENTP-INFJ': {
    level: 'best',
    title: '영감의 화학 반응',
    description: 'ENTP의 기발한 아이디어와 INFJ의 깊은 통찰이 만나면 마법 같은 대화가 시작돼요. 서로에게 끝없는 영감을 줘요.',
    tip: '깊은 대화를 즐기되, 가벼운 순간도 함께 만들어보세요.',
  },
  'INFJ-INFJ': {
    level: 'good',
    title: '거울 같은 영혼',
    description: '서로를 완벽히 이해하는 드문 경험을 해요. 말 안 해도 느낌이 통하는 신비로운 관계! 하지만 둘 다 완벽주의라 피로해질 수 있어요.',
    tip: '서로에게 완벽하지 않아도 괜찮다고 말해주세요.',
  },
  'ENFJ-INFJ': {
    level: 'good',
    title: '이상을 향한 동반자',
    description: '둘 다 사람에 대한 깊은 관심과 세상을 더 나은 곳으로 만들고 싶은 열정이 있어요. 가치관이 비슷해서 편안해요.',
    tip: '둘 다 남을 돌보다 자신을 잊기 쉬워요. 서로를 돌봐주세요.',
  },
  'INFJ-INFP': {
    level: 'good',
    title: '이상주의자들의 우정',
    description: '둘 다 깊은 내면 세계를 가지고 있어요. 서로의 꿈과 가치를 진심으로 지지해줄 수 있는 관계예요.',
    tip: '둘 다 갈등을 피하는 경향이 있어요. 불편한 이야기도 나눌 용기를 가지세요.',
  },
  'INFJ-ISTJ': {
    level: 'neutral',
    title: '직관과 현실의 조율',
    description: 'INFJ의 비전과 ISTJ의 실행력이 만나면 꿈을 현실로 만들 수 있어요. 하지만 소통 방식이 달라 오해가 생길 수 있어요.',
    tip: '구체적이고 명확한 소통을 연습해보세요.',
  },
  'INFJ-ISTP': {
    level: 'neutral',
    title: '신비로운 조합',
    description: '완전히 다른 세계관을 가진 두 유형이 만나면 서로에게 새로운 시야를 열어줄 수 있어요.',
    tip: '서로의 소통 스타일 차이를 이해하고 인내심을 가지세요.',
  },
  'ESTJ-INFJ': {
    level: 'neutral',
    title: '리더십의 두 얼굴',
    description: 'ESTJ의 실용적 리더십과 INFJ의 영감적 리더십이 만나면 효과적이지만, 가치관 차이로 갈등이 생길 수 있어요.',
    tip: '목표는 같되 방법이 다를 수 있다는 걸 인정하세요.',
  },
  'ESTP-INFJ': {
    level: 'bad',
    title: '속도와 깊이의 갈등',
    description: 'ESTP의 빠른 행동력과 INFJ의 깊은 숙고가 충돌해요. 서로의 리듬을 이해하기 어려울 수 있어요.',
    tip: '서로의 장점을 인정하고, 중간 속도를 찾아보세요.',
  },
  'ESFJ-INFJ': {
    level: 'neutral',
    title: '따뜻한 마음의 교차',
    description: '둘 다 다른 사람을 돌보는 것을 좋아해요. 하지만 ESFJ는 전통을, INFJ는 변화를 추구해서 갈등이 생길 수 있어요.',
    tip: '공통된 가치(배려, 조화)에 집중하고 방식의 차이를 존중하세요.',
  },
  'ESFP-INFJ': {
    level: 'bad',
    title: '현재와 미래의 시차',
    description: 'ESFP는 현재를 즐기고, INFJ는 미래를 그려요. 시간 감각의 차이가 오해를 불러일으킬 수 있어요.',
    tip: '때로는 현재를, 때로는 미래를 함께 바라보는 연습을 해보세요.',
  },
  'INFJ-ISFJ': {
    level: 'good',
    title: '조용한 돌봄의 관계',
    description: '둘 다 다른 사람을 위해 헌신하는 따뜻한 유형이에요. 안정적이고 깊은 관계를 만들 수 있어요.',
    tip: '서로의 필요를 표현하는 연습을 해보세요. 둘 다 참기만 하면 안 돼요!',
  },
  'INFJ-ISFP': {
    level: 'neutral',
    title: '감성적 이해의 다리',
    description: '둘 다 감정적으로 풍부하고 예술적 감각이 있어요. 조용하지만 의미 있는 시간을 보낼 수 있어요.',
    tip: '서로의 가치관을 말로 표현하는 시간을 가지세요.',
  },

  // ═══════════════════════════════════════════
  // INFP 궁합
  // ═══════════════════════════════════════════
  'ENFJ-INFP': {
    level: 'best',
    title: '영혼의 수호자',
    description: 'ENFJ의 따뜻한 리더십이 INFP의 꿈을 응원하고, INFP의 진실된 감성이 ENFJ에게 영감을 줘요. 서로의 존재 자체가 위로가 되는 관계!',
    tip: 'ENFJ는 INFP를 변화시키려 하지 말고, INFP는 ENFJ의 조언을 감사히 받아주세요.',
  },
  'ENTJ-INFP': {
    level: 'good',
    title: '꿈과 실행의 파트너십',
    description: 'INFP의 이상과 ENTJ의 실행력이 만나면, 불가능해 보이던 꿈도 현실이 돼요. 서로에게서 부족한 부분을 채워줄 수 있어요.',
    tip: '소통 방식의 차이를 이해하세요. INFP는 감정으로, ENTJ는 논리로 말해요.',
  },
  'INFP-INFP': {
    level: 'good',
    title: '꿈꾸는 자들의 안식처',
    description: '서로의 내면 세계를 깊이 이해하고 공감할 수 있어요. 하지만 둘 다 현실적인 문제를 피하기 쉬워요.',
    tip: '함께 꿈꾸되, 현실도 함께 마주하는 용기를 가지세요.',
  },
  'ENFP-INFP': {
    level: 'good',
    title: '창의적 영혼의 교감',
    description: 'NF를 공유하는 두 유형은 가치관과 이상에서 깊이 공감해요. ENFP의 에너지가 INFP를 세상 밖으로 이끌어줘요.',
    tip: 'ENFP는 INFP의 속도에 맞춰주고, INFP는 ENFP의 활동에 때때로 함께해주세요.',
  },
  'INFP-ISTJ': {
    level: 'neutral',
    title: '이상과 현실의 시소',
    description: 'INFP의 꿈과 ISTJ의 현실 감각이 서로를 균형 잡아줄 수 있지만, 가치관 차이로 갈등이 생길 수도 있어요.',
    tip: '서로의 관점이 모두 필요하다는 걸 인정하세요.',
  },
  'INFP-ISTP': {
    level: 'neutral',
    title: '조용한 탐구자들',
    description: '둘 다 독립적이고 자기만의 세계가 있어요. 서로의 공간을 존중하지만, 감정적 연결이 약해질 수 있어요.',
    tip: '의도적으로 함께하는 시간과 대화를 만들어보세요.',
  },
  'ESTJ-INFP': {
    level: 'bad',
    title: '규칙과 자유의 충돌',
    description: 'ESTJ의 체계와 규칙이 INFP에겐 답답하게, INFP의 자유로운 영혼이 ESTJ에겐 비현실적으로 느껴질 수 있어요.',
    tip: '서로의 가치관을 바꾸려 하지 말고, 차이를 통해 배우세요.',
  },
  'ESTP-INFP': {
    level: 'bad',
    title: '감성과 실전의 미스매치',
    description: 'ESTP의 즉각적 행동력과 INFP의 깊은 감정 세계가 서로를 이해하기 어려워요.',
    tip: '판단을 멈추고 서로의 세계를 경험해보는 시간을 가지세요.',
  },
  'ESFJ-INFP': {
    level: 'neutral',
    title: '따뜻한 마음의 다른 표현',
    description: '둘 다 다른 사람을 아끼는 따뜻한 유형이에요. 하지만 사회적 기대에 대한 태도가 달라요.',
    tip: '공통된 가치(배려)를 기반으로 차이를 이해해보세요.',
  },
  'ESFP-INFP': {
    level: 'neutral',
    title: '감성의 두 채널',
    description: 'ESFP는 감성을 밖으로, INFP는 안으로 표현해요. 둘 다 풍부한 감정을 가지고 있어서 공감할 수 있어요.',
    tip: '표현 방식은 다르지만 느끼는 감정은 비슷하다는 걸 기억하세요.',
  },
  'INFP-ISFJ': {
    level: 'neutral',
    title: '조용한 이상주의와 현실주의',
    description: '둘 다 따뜻하고 배려심이 깊지만, INFP는 이상을 ISFJ는 현실을 더 중시해요.',
    tip: '서로의 관점에서 배우려는 자세가 관계를 풍요롭게 해요.',
  },
  'INFP-ISFP': {
    level: 'good',
    title: '감성적 영혼의 교차',
    description: '둘 다 내면이 풍부하고 예술적 감성이 뛰어나요. 말 없이도 서로를 이해하는 편안한 관계가 될 수 있어요.',
    tip: '서로의 감정을 말로 표현하는 연습을 함께 해보세요.',
  },

  // ═══════════════════════════════════════════
  // ENFP 궁합
  // ═══════════════════════════════════════════
  'ENFP-ENFP': {
    level: 'good',
    title: '에너지 폭발 조합',
    description: '둘 다 열정적이고 창의적! 함께 있으면 아이디어가 끊이지 않아요. 하지만 둘 다 현실적인 부분에서 약해질 수 있어요.',
    tip: '즐거움 속에서도 책임감을 나누는 방법을 찾아보세요.',
  },
  'ENFP-ISTJ': {
    level: 'neutral',
    title: '자유와 안정의 줄다리기',
    description: 'ENFP의 자유로운 영혼과 ISTJ의 안정 지향이 서로를 보완하면 최강이지만, 갈등의 원인이 되기도 해요.',
    tip: '서로의 장점이 자신의 약점을 채워준다는 관점으로 보세요.',
  },
  'ENFP-ISTP': {
    level: 'neutral',
    title: '에너지와 침착함의 만남',
    description: 'ENFP의 밝은 에너지와 ISTP의 차분한 분석이 신선한 조합이에요. 서로에게 새로운 시야를 열어줘요.',
    tip: '에너지 레벨 차이를 이해하고, 각자의 충전 방식을 존중하세요.',
  },
  'ENFP-ENTJ': {
    level: 'good',
    title: '영감과 실행의 폭발',
    description: 'ENFP의 무한한 아이디어와 ENTJ의 강력한 추진력이 만나면 놀라운 결과를 만들어요!',
    tip: 'ENTJ는 ENFP의 변덕을 이해하고, ENFP는 ENTJ의 직설적 방식에 상처받지 마세요.',
  },
  'ENFP-ENFJ': {
    level: 'good',
    title: '열정의 시너지',
    description: '둘 다 사람을 사랑하고 열정적이에요. NF의 이상주의를 공유하며 서로를 깊이 이해해요.',
    tip: '둘 다 감정적으로 예민할 수 있어요. 서로의 감정을 가볍게 넘기지 마세요.',
  },
  'ENFP-ESTJ': {
    level: 'neutral',
    title: '자유 vs 질서',
    description: 'ENFP의 창의성과 ESTJ의 체계가 만나면 강력하지만, 통제에 대한 인식 차이가 갈등을 만들 수 있어요.',
    tip: '서로의 방식을 강요하지 말고, 각자의 강점을 살리는 역할 분담을 해보세요.',
  },
  'ENFP-ESTP': {
    level: 'neutral',
    title: '모험 정신의 공유',
    description: '둘 다 새로운 경험을 좋아해요! 함께라면 세상 어디든 갈 수 있지만, 깊은 감정적 대화에서 갈등이 생길 수 있어요.',
    tip: '재미있는 경험도 좋지만, 가끔은 깊은 대화의 시간도 가지세요.',
  },
  'ENFP-ESFJ': {
    level: 'good',
    title: '사교적 에너지의 합류',
    description: '둘 다 사람을 좋아하고 사교적이에요. 밝고 활기찬 관계를 만들 수 있어요.',
    tip: 'ENFP는 ESFJ의 전통을, ESFJ는 ENFP의 새로움을 존중해주세요.',
  },
  'ENFP-ESFP': {
    level: 'neutral',
    title: '파티의 주인공들',
    description: '둘 다 밝고 사교적이에요! 함께하면 즐거운 시간이 보장되지만, 깊이 있는 소통이 부족할 수 있어요.',
    tip: '즐거운 시간 외에도 진지한 대화의 시간을 만들어보세요.',
  },
  'ENFP-ISFJ': {
    level: 'neutral',
    title: '따뜻함의 다른 표현',
    description: 'ENFP의 열정적 따뜻함과 ISFJ의 조용한 따뜻함이 만나면 서로를 보완할 수 있지만, 속도 차이가 있어요.',
    tip: 'ENFP는 안정을, ISFJ는 변화를 조금씩 받아들여보세요.',
  },
  'ENFP-ISFP': {
    level: 'good',
    title: '감성 충전 파트너',
    description: 'NF/SF를 공유하는 감성적인 조합! ENFP의 에너지가 ISFP를 세상 밖으로 이끌고, ISFP의 차분함이 ENFP를 안정시켜요.',
    tip: '서로의 에너지 레벨을 존중하고 균형을 찾으세요.',
  },

  // ═══════════════════════════════════════════
  // ENTP 궁합
  // ═══════════════════════════════════════════
  'ENTP-ENTP': {
    level: 'good',
    title: '아이디어 불꽃놀이',
    description: '두 천재가 만나면 지적 불꽃이 터져요! 하지만 아무도 결론을 내리지 않는 문제가 생길 수 있어요.',
    tip: '토론을 즐기되, 가끔은 결론을 내리는 연습도 해보세요.',
  },
  'ENTP-ISTJ': {
    level: 'neutral',
    title: '혁신과 전통의 충돌',
    description: 'ENTP의 도전 정신과 ISTJ의 안정 추구가 서로를 이해하기 어렵지만, 균형을 찾으면 최강의 팀이 돼요.',
    tip: '서로의 강점을 인정하고, 팀으로서 역할을 나눠보세요.',
  },
  'ENTP-ISTP': {
    level: 'good',
    title: 'T(사고) 형제의 만남',
    description: '둘 다 논리적이고 호기심이 많아요. ENTP의 아이디어와 ISTP의 실전 기술이 만나면 놀라운 결과를 만들어요.',
    tip: '사교 활동에 대한 차이를 이해하세요. ISTP에겐 에너지 충전 시간이 필요해요.',
  },
  'ENTJ-ENTP': {
    level: 'good',
    title: 'NT 파워 콤보',
    description: '지적 토론과 야심찬 계획을 함께 나눌 수 있는 강력한 조합! 서로의 능력을 존경하며 성장해요.',
    tip: '주도권 다툼을 피하고, 서로의 영역을 존중하세요.',
  },
  'ENFJ-ENTP': {
    level: 'good',
    title: '카리스마의 합작',
    description: 'ENFJ의 인간적 매력과 ENTP의 지적 매력이 만나면 주변을 사로잡는 파워 커플이 돼요.',
    tip: 'ENFJ는 ENTP의 논쟁을 개인적으로 받아들이지 말고, ENTP는 감정 표현에 더 신경 써주세요.',
  },
  'ENTP-ESTJ': {
    level: 'neutral',
    title: '규칙 파괴자 vs 규칙 수호자',
    description: 'ENTP는 규칙을 도전하고, ESTJ는 규칙을 지켜요. 극과 극이지만 서로에게 배울 점이 많아요.',
    tip: '규칙은 때로 깨야 할 때도, 지켜야 할 때도 있다는 걸 함께 배우세요.',
  },
  'ENTP-ESTP': {
    level: 'good',
    title: '에너지 넘치는 도전자들',
    description: '둘 다 도전을 좋아하고 에너지가 넘쳐요! 함께라면 어떤 모험도 두렵지 않아요.',
    tip: '깊이 있는 감정적 대화의 시간도 만들어보세요.',
  },
  'ENTP-ESFJ': {
    level: 'neutral',
    title: '논쟁과 조화의 긴장',
    description: 'ENTP의 논쟁 사랑과 ESFJ의 조화 추구가 충돌할 수 있어요. 하지만 서로의 사교성은 잘 맞아요.',
    tip: '토론과 갈등의 차이를 이해하고, 서로의 소통 스타일을 존중하세요.',
  },
  'ENTP-ESFP': {
    level: 'neutral',
    title: '파티를 달구는 조합',
    description: '둘 다 사교적이고 재미를 추구해요! 하지만 깊이 있는 지적 대화에 대한 욕구 차이가 있을 수 있어요.',
    tip: '함께 즐기되, 서로의 대화 스타일 차이도 인정하세요.',
  },
  'ENTP-ISFJ': {
    level: 'bad',
    title: '도전과 안정의 갈등',
    description: 'ENTP의 끊임없는 변화 추구가 ISFJ에게는 불안하게, ISFJ의 안정 추구가 ENTP에게는 지루하게 느껴질 수 있어요.',
    tip: '변화 속에서도 안정을, 안정 속에서도 새로움을 찾아보세요.',
  },
  'ENTP-ISFP': {
    level: 'neutral',
    title: '외향과 내향의 T/F 교차',
    description: 'ENTP의 논리적 에너지와 ISFP의 감성적 차분함이 신선한 조합이에요. 서로 다른 세계를 보여줄 수 있어요.',
    tip: '에너지 레벨과 소통 방식의 차이를 인내심 있게 조율하세요.',
  },

  // ═══════════════════════════════════════════
  // ENTJ 궁합
  // ═══════════════════════════════════════════
  'ENTJ-ENTJ': {
    level: 'good',
    title: '야망의 충돌과 합작',
    description: '두 리더가 만나면 세상을 정복할 수도, 서로 부딪힐 수도 있어요. 방향이 같으면 최강의 팀!',
    tip: '서로의 리더십을 존중하고, 각자 빛나는 영역을 나누세요.',
  },
  'ENTJ-ISTJ': {
    level: 'good',
    title: '전략과 실행의 만남',
    description: 'ENTJ의 큰 그림과 ISTJ의 꼼꼼한 실행이 만나면 어떤 프로젝트든 성공해요!',
    tip: 'ENTJ는 ISTJ의 신중함을, ISTJ는 ENTJ의 대담함을 존중하세요.',
  },
  'ENTJ-ISTP': {
    level: 'neutral',
    title: '지휘관과 장인',
    description: 'ENTJ의 리더십과 ISTP의 기술력이 만나면 효율적인 팀이 돼요. 하지만 독립성에 대한 충돌이 있을 수 있어요.',
    tip: 'ISTP에게 자율성을 주면 최고의 결과를 이끌어낼 수 있어요.',
  },
  'ENFJ-ENTJ': {
    level: 'good',
    title: '카리스마 리더 듀오',
    description: '둘 다 타고난 리더! ENTJ의 전략적 리더십과 ENFJ의 인간적 리더십이 합쳐지면 조직을 이끄는 최강의 팀이 돼요.',
    tip: '리더십 스타일의 차이를 인정하고, 서로의 강점을 활용하세요.',
  },
  'ENTJ-ESTJ': {
    level: 'good',
    title: '체계의 마스터들',
    description: '둘 다 효율과 결과를 중시해요. 빠르게 목표를 달성하는 파워 콤비!',
    tip: '둘 다 양보하기 어려운 성격이에요. 타협의 기술을 연습하세요.',
  },
  'ENTJ-ESTP': {
    level: 'good',
    title: '행동파 리더들',
    description: '둘 다 결과 중심적이고 에너지가 넘쳐요. 빠른 의사결정과 실행을 함께할 수 있어요.',
    tip: 'ENTJ는 장기적, ESTP는 단기적 시야를 가져요. 서로의 시야를 결합하세요.',
  },
  'ESFJ-ENTJ': {
    level: 'neutral',
    title: '조화와 효율의 긴장',
    description: 'ESFJ의 조화 추구와 ENTJ의 효율 추구가 갈등을 만들 수 있지만, 서로의 강점을 인정하면 강해져요.',
    tip: '인간관계와 성과 모두 중요하다는 걸 함께 인정하세요.',
  },
  'ENTJ-ISFJ': {
    level: 'neutral',
    title: '지휘관과 수호자',
    description: 'ENTJ의 추진력과 ISFJ의 헌신이 만나면 안정적인 팀이 돼요. 하지만 소통 방식의 차이가 클 수 있어요.',
    tip: 'ENTJ는 부드럽게, ISFJ는 직접적으로 소통하는 연습을 해보세요.',
  },
  'ENTJ-ESFP': {
    level: 'neutral',
    title: '일과 놀이의 균형',
    description: 'ENTJ의 성취 지향과 ESFP의 즐거움 추구가 균형을 이루면 풍요로운 삶이 돼요.',
    tip: '일할 때는 일하고, 놀 때는 놀기! 서로에게서 그 균형을 배우세요.',
  },
  'ENTJ-ISFP': {
    level: 'bad',
    title: '속도와 여유의 갈등',
    description: 'ENTJ의 빠른 추진력이 ISFP에겐 압박으로, ISFP의 여유로운 태도가 ENTJ에겐 답답하게 느껴질 수 있어요.',
    tip: '서로의 속도를 존중하고, 중간 지점을 찾으세요.',
  },

  // ═══════════════════════════════════════════
  // ENFJ 궁합
  // ═══════════════════════════════════════════
  'ENFJ-ENFJ': {
    level: 'good',
    title: '따뜻한 리더 듀오',
    description: '둘 다 사람에 대한 깊은 관심과 리더십이 있어요. 서로를 깊이 이해하는 관계!',
    tip: '서로를 돌보느라 자신을 잊지 마세요. 각자의 필요도 표현하세요.',
  },
  'ENFJ-ISTJ': {
    level: 'neutral',
    title: '배려와 원칙의 만남',
    description: 'ENFJ의 인간적 접근과 ISTJ의 원칙적 접근이 만나면 균형 잡힌 팀이 되지만, 소통 스타일 차이가 있어요.',
    tip: '감정과 논리 모두 중요하다는 걸 서로 인정하세요.',
  },
  'ENFJ-ISTP': {
    level: 'neutral',
    title: '열정과 냉정의 조합',
    description: 'ENFJ의 열정적 소통과 ISTP의 과묵한 행동이 서로를 이해하기 어려울 수 있지만, 새로운 시야를 열어줘요.',
    tip: '소통 방식의 차이를 이해하고 인내심을 가지세요.',
  },
  'ENFJ-ESTJ': {
    level: 'good',
    title: '리더십의 교차',
    description: '둘 다 리더십이 강해요! ENFJ는 사람 중심, ESTJ는 과제 중심이라 역할을 잘 나누면 최강의 팀이에요.',
    tip: '서로의 리더십 스타일을 존중하고 배우세요.',
  },
  'ENFJ-ESTP': {
    level: 'neutral',
    title: '에너지의 다른 방향',
    description: '둘 다 에너지가 넘치지만, ENFJ는 관계에, ESTP는 경험에 에너지를 쏟아요.',
    tip: '서로의 에너지 방향을 이해하고, 함께할 수 있는 활동을 찾아보세요.',
  },
  'ESFJ-ENFJ': {
    level: 'good',
    title: '따뜻한 마음의 공명',
    description: '둘 다 사람을 돌보는 것을 좋아하고 조화를 추구해요. 편안하고 따뜻한 관계가 자연스럽게 형성돼요.',
    tip: '서로의 필요를 챙기되, 자신의 필요도 잊지 마세요.',
  },
  'ENFJ-ESFP': {
    level: 'good',
    title: '밝은 에너지의 합류',
    description: '둘 다 사교적이고 밝아요! ENFJ의 깊이와 ESFP의 즐거움이 균형을 이루면 최고의 관계!',
    tip: '깊은 대화와 가벼운 즐거움의 균형을 함께 찾아보세요.',
  },
  'ENFJ-ISFJ': {
    level: 'good',
    title: '헌신적 보호자 듀오',
    description: '둘 다 다른 사람을 위해 헌신하는 FJ 유형! 서로를 깊이 이해하고 돌봐줄 수 있어요.',
    tip: '서로에게 받기만 하지 말고, 자신의 필요도 표현하세요.',
  },
  'ENFJ-ISFP': {
    level: 'neutral',
    title: '따뜻함의 다른 스펙트럼',
    description: 'ENFJ의 적극적 배려와 ISFP의 조용한 따뜻함이 만나면 서로를 보완해줘요.',
    tip: 'ENFJ는 ISFP의 속도를, ISFP는 ENFJ의 열정을 이해해주세요.',
  },

  // ═══════════════════════════════════════════
  // ISTJ 궁합
  // ═══════════════════════════════════════════
  'ISTJ-ISTJ': {
    level: 'good',
    title: '안정의 요새',
    description: '둘 다 책임감 있고 체계적이에요. 안정적이고 신뢰 가는 관계를 만들지만, 변화에 저항할 수 있어요.',
    tip: '안정 속에서도 가끔은 새로운 것에 도전해보세요.',
  },
  'ESFP-ISTJ': {
    level: 'best',
    title: '정반대의 매력',
    description: 'ESFP의 자유로운 에너지가 ISTJ의 세계를 밝혀주고, ISTJ의 안정감이 ESFP에게 든든한 기반이 돼요. 서로에게 없는 것을 채워주는 관계!',
    tip: 'ISTJ는 즉흥적인 것도 즐겨보고, ESFP는 계획의 가치를 인정해주세요.',
  },
  'ESTP-ISTJ': {
    level: 'neutral',
    title: 'S(감각)의 실용적 동맹',
    description: '둘 다 현실적이고 실용적이에요. 하지만 ESTP의 즉흥성과 ISTJ의 계획성이 충돌할 수 있어요.',
    tip: '상황에 따라 계획과 즉흥 중 무엇이 더 적합한지 함께 판단하세요.',
  },
  'ESTJ-ISTJ': {
    level: 'good',
    title: '체계적 파트너십',
    description: '둘 다 규칙과 체계를 중시해요. 안정적이고 효율적인 관계를 만들 수 있어요.',
    tip: '유연성을 함께 기르세요. 규칙에만 얽매이면 성장이 멈출 수 있어요.',
  },
  'ESFJ-ISTJ': {
    level: 'good',
    title: 'SJ의 안정적 동맹',
    description: '전통과 안정을 공유하는 SJ 유형! 서로의 가치관이 비슷해서 편안한 관계를 만들 수 있어요.',
    tip: 'ESFJ의 감정적 니즈와 ISTJ의 논리적 접근을 균형 잡으세요.',
  },
  'ISFJ-ISTJ': {
    level: 'good',
    title: '조용한 안정의 조합',
    description: '둘 다 책임감 있고 전통을 존중해요. 조용하고 안정적인 관계를 만들 수 있어요.',
    tip: '둘 다 감정 표현에 서투를 수 있어요. 마음을 말로 표현하는 연습을 해보세요.',
  },
  'ISTJ-ISFP': {
    level: 'neutral',
    title: '안정과 자유 사이',
    description: 'ISTJ의 체계적 성향과 ISFP의 자유로운 영혼이 만나면 서로에게 배울 점이 있지만 갈등도 있어요.',
    tip: '구조와 유연성의 균형을 함께 찾아보세요.',
  },
  'ISTP-ISTJ': {
    level: 'neutral',
    title: '실용주의자 동맹',
    description: '둘 다 실용적이고 말이 적어요. 서로의 공간을 잘 존중하지만, 감정적 교류가 부족해질 수 있어요.',
    tip: '의도적으로 마음을 나누는 시간을 만드세요.',
  },

  // ═══════════════════════════════════════════
  // ISTP 궁합
  // ═══════════════════════════════════════════
  'ISTP-ISTP': {
    level: 'good',
    title: '독립적 장인 듀오',
    description: '서로의 독립성과 실용적 태도를 완벽히 이해해요. 간섭 없이 편안한 관계!',
    tip: '편안함에 안주하지 말고, 감정적 깊이를 함께 키워보세요.',
  },
  'ESTJ-ISTP': {
    level: 'neutral',
    title: '효율의 다른 접근',
    description: 'ESTJ의 체계적 접근과 ISTP의 실험적 접근이 다르지만, 둘 다 결과를 중시해요.',
    tip: '서로의 문제 해결 방식을 존중하세요.',
  },
  'ESTP-ISTP': {
    level: 'good',
    title: 'SP 형제의 만남',
    description: '둘 다 행동 지향적이고 현실적이에요. 함께 활동하면 즐거운 시간이 보장돼요!',
    tip: '감정적 대화도 가끔은 필요해요. 마음을 나누는 시간을 만드세요.',
  },
  'ESFJ-ISTP': {
    level: 'bad',
    title: '관계 vs 자유의 긴장',
    description: 'ESFJ의 관계 중시와 ISTP의 독립 추구가 충돌해요. 소통 방식도 매우 달라요.',
    tip: '서로의 필요(관계/자유)를 존중하는 균형을 찾아보세요.',
  },
  'ESFP-ISTP': {
    level: 'good',
    title: '현재를 즐기는 동반자',
    description: '둘 다 현재를 즐기고 실용적이에요. ESFP의 사교성과 ISTP의 침착함이 균형을 이뤄요.',
    tip: 'ESFP는 ISTP의 혼자 시간을, ISTP는 ESFP의 사교 욕구를 이해해주세요.',
  },
  'ISFJ-ISTP': {
    level: 'neutral',
    title: '배려와 독립 사이',
    description: 'ISFJ의 세심한 배려가 ISTP에겐 부담이 될 수 있고, ISTP의 독립성이 ISFJ에겐 무관심으로 느껴질 수 있어요.',
    tip: '사랑의 표현 방식이 다를 뿐이라는 걸 기억하세요.',
  },
  'ISFP-ISTP': {
    level: 'good',
    title: '조용한 동반자',
    description: '둘 다 말보다 행동으로 보여주는 타입이에요. 서로의 공간을 존중하면서 편안한 시간을 보낼 수 있어요.',
    tip: '가끔은 말로도 마음을 표현해보세요.',
  },

  // ═══════════════════════════════════════════
  // ISFJ 궁합
  // ═══════════════════════════════════════════
  'ESFP-ISFJ': {
    level: 'good',
    title: '활기와 안정의 밸런스',
    description: 'ESFP의 밝은 에너지가 ISFJ의 세계를 넓혀주고, ISFJ의 세심한 배려가 ESFP에게 안식처가 돼요.',
    tip: '서로의 에너지 레벨 차이를 이해하고 맞춰주세요.',
  },
  'ESTP-ISFJ': {
    level: 'best',
    title: '모험가의 안식처',
    description: 'ESTP의 대담한 행동력과 ISFJ의 따뜻한 돌봄이 만나면, 서로에게 가장 편안한 존재가 돼요.',
    tip: 'ESTP는 ISFJ의 감정을 더 세심하게 챙기고, ISFJ는 ESTP의 모험을 응원해주세요.',
  },
  'ISFJ-ISFJ': {
    level: 'good',
    title: '따뜻한 보호의 울타리',
    description: '서로를 세심하게 돌보는 이상적인 관계! 하지만 둘 다 자기 필요를 말하기 어려워해요.',
    tip: '서로에게 솔직히 필요한 것을 말하는 연습을 해보세요.',
  },
  'ESTJ-ISFJ': {
    level: 'good',
    title: 'SJ의 안정적 파트너십',
    description: '전통과 체계를 중시하는 SJ 유형끼리! 안정적이고 책임감 있는 관계를 만들어요.',
    tip: 'ESTJ는 ISFJ의 감정을, ISFJ는 ESTJ의 효율성을 존중하세요.',
  },
  'ESFJ-ISFJ': {
    level: 'good',
    title: 'FJ 형제의 따뜻한 동맹',
    description: '둘 다 사람을 돌보고 조화를 중시해요. 서로의 감정을 잘 이해하고 편안한 관계를 만들어요.',
    tip: '외부의 기대에 맞추느라 자신을 잃지 않도록 서로 챙겨주세요.',
  },
  'ISFJ-ISFP': {
    level: 'neutral',
    title: '내향적 감성의 교차',
    description: '둘 다 조용하고 따뜻해요. 하지만 ISFJ의 전통 중시와 ISFP의 자유 추구가 다를 수 있어요.',
    tip: '서로의 가치관을 존중하고, 공통된 따뜻함에 집중하세요.',
  },

  // ═══════════════════════════════════════════
  // ISFP 궁합
  // ═══════════════════════════════════════════
  'ESFJ-ISFP': {
    level: 'neutral',
    title: '배려의 다른 언어',
    description: 'ESFJ의 적극적 배려와 ISFP의 조용한 배려가 다르게 표현되지만, 둘 다 따뜻한 마음을 가지고 있어요.',
    tip: '사랑의 표현 방식이 다를 뿐, 마음은 같다는 걸 기억하세요.',
  },
  'ESFP-ISFP': {
    level: 'good',
    title: '감각적 영혼의 만남',
    description: 'SF를 공유하는 감각적이고 따뜻한 조합! ESFP의 에너지와 ISFP의 차분함이 균형을 이뤄요.',
    tip: '서로의 에너지 레벨을 존중하고, 함께 예술적 활동을 즐겨보세요.',
  },
  'ESTJ-ISFP': {
    level: 'bad',
    title: '규칙과 자유의 충돌',
    description: 'ESTJ의 체계적 접근과 ISFP의 자유로운 영혼이 크게 부딪힐 수 있어요.',
    tip: '서로의 가치관을 바꾸려 하지 말고, 차이를 통해 배우세요.',
  },
  'ESTP-ISFP': {
    level: 'neutral',
    title: 'SP의 현재 지향',
    description: '둘 다 현재를 살고 실용적이에요. ESTP의 활발함과 ISFP의 차분함이 서로를 보완해줘요.',
    tip: '서로의 에너지 레벨과 사교 니즈 차이를 이해하세요.',
  },
  'ISFP-ISFP': {
    level: 'good',
    title: '예술적 영혼의 교감',
    description: '서로의 감성과 예술적 세계를 깊이 이해해요. 말 없이도 편안한 사이!',
    tip: '둘 다 갈등을 피하는 경향이 있어요. 불편한 것도 나누는 용기를 가지세요.',
  },

  // ═══════════════════════════════════════════
  // ESTJ 궁합
  // ═══════════════════════════════════════════
  'ESTJ-ESTJ': {
    level: 'good',
    title: '체계의 제왕들',
    description: '둘 다 효율적이고 체계적이에요. 잘 조직된 안정적인 관계를 만들지만, 유연성이 부족할 수 있어요.',
    tip: '서로의 방식이 "유일한 정답"이 아니라는 걸 기억하세요.',
  },
  'ESFJ-ESTJ': {
    level: 'good',
    title: 'SJ의 견고한 동맹',
    description: '전통과 체계를 공유하는 안정적인 조합! 서로의 책임감을 신뢰할 수 있어요.',
    tip: '논리(T)와 감정(F)의 차이를 이해하고 조화를 이루세요.',
  },
  'ESFP-ESTJ': {
    level: 'neutral',
    title: '즐거움과 체계의 교차',
    description: 'ESFP의 즐거움 추구와 ESTJ의 체계적 접근이 만나면 균형 잡힌 삶이 되지만, 갈등도 있어요.',
    tip: '일할 때와 놀 때를 구분하고, 서로의 영역을 존중하세요.',
  },
  'ESTP-ESTJ': {
    level: 'neutral',
    title: '행동파 vs 계획파',
    description: '둘 다 결과를 중시하지만, ESTP는 즉흥적으로 ESTJ는 계획적으로 접근해요.',
    tip: '계획과 유연성의 균형을 함께 찾아보세요.',
  },

  // ═══════════════════════════════════════════
  // ESTP 궁합
  // ═══════════════════════════════════════════
  'ESTP-ESTP': {
    level: 'good',
    title: '모험가 듀오',
    description: '둘 다 행동적이고 모험을 좋아해요! 함께라면 짜릿한 경험이 끊이지 않아요.',
    tip: '즐거움 외에 깊은 감정적 연결도 함께 키워보세요.',
  },
  'ESFJ-ESTP': {
    level: 'neutral',
    title: '사교적 에너지의 교차',
    description: '둘 다 사교적이지만, ESFJ는 관계 유지에 ESTP는 새로운 경험에 에너지를 쏟아요.',
    tip: '에너지의 방향이 다를 뿐, 함께 즐거운 시간을 보낼 수 있어요.',
  },
  'ESFP-ESTP': {
    level: 'good',
    title: '파티 속 에너지 폭발',
    description: '둘 다 현재를 즐기고 에너지가 넘쳐요! 함께라면 지루한 순간이 없어요.',
    tip: '미래에 대한 대화도 가끔은 해보세요. 현재만 보면 놓치는 것이 있어요.',
  },
  // ═══════════════════════════════════════════
  // ESFJ 궁합
  // ═══════════════════════════════════════════
  'ESFJ-ESFJ': {
    level: 'good',
    title: '따뜻한 돌봄의 교환',
    description: '서로를 세심하게 돌보는 따뜻한 관계! 하지만 둘 다 남의 시선을 의식하는 경향이 있어요.',
    tip: '외부의 기대보다 서로의 진짜 마음에 집중하세요.',
  },
  'ESFJ-ESFP': {
    level: 'good',
    title: '밝고 따뜻한 에너지',
    description: '둘 다 사교적이고 따뜻해요! 함께라면 주변을 밝히는 분위기 메이커!',
    tip: '즐거움 속에서도 진지한 대화의 시간을 잊지 마세요.',
  },

  // ═══════════════════════════════════════════
  // ESFP 궁합
  // ═══════════════════════════════════════════
  'ESFP-ESFP': {
    level: 'good',
    title: '파티의 영원한 주인공',
    description: '둘 다 즐거움을 사랑하고 에너지가 넘쳐요! 하지만 현실적인 문제를 함께 해결하는 것이 과제예요.',
    tip: '즐거운 시간도 좋지만, 책임감도 함께 키워보세요.',
  },
};

// ─── 중복 엔트리 제거 및 정규화 ─────────────────────

// ESTP-ISFP는 이미 위에서 정의됨, 중복 제거
// 일부 역방향 키도 정규화됨

// ─── 조회 함수 ─────────────────────────────────────

/**
 * 두 MBTI 유형 간의 상세 궁합 정보를 조회
 */
export function getCompatibilityDetail(
  typeA: MBTIType,
  typeB: MBTIType
): CompatibilityDetail {
  const key = makeKey(typeA, typeB);
  const detail = compatibilityRawData[key];

  if (detail) return detail;

  // 데이터에 없는 조합은 neutral 기본값 반환
  return {
    level: 'neutral',
    title: '서로를 알아가는 중',
    description: `${typeA}와 ${typeB}의 관계는 서로를 이해하려는 노력이 중요해요. 다름을 인정하고 존중하면 좋은 관계가 될 수 있어요.`,
    tip: '서로의 차이를 배움의 기회로 삼아보세요.',
  };
}

/**
 * 두 MBTI 유형 간의 궁합 등급만 조회
 */
export function getCompatibilityLevel(
  typeA: MBTIType,
  typeB: MBTIType
): CompatibilityLevel {
  return getCompatibilityDetail(typeA, typeB).level;
}

/**
 * 특정 유형과 모든 유형 간의 궁합 정보를 조회
 */
export function getAllCompatibilities(
  type: MBTIType
): Record<MBTIType, CompatibilityDetail> {
  const allTypes: MBTIType[] = [
    'ISTJ', 'ISTP', 'ISFJ', 'ISFP',
    'INTJ', 'INTP', 'INFJ', 'INFP',
    'ESTJ', 'ESTP', 'ESFJ', 'ESFP',
    'ENTJ', 'ENTP', 'ENFJ', 'ENFP',
  ];

  const result = {} as Record<MBTIType, CompatibilityDetail>;
  for (const other of allTypes) {
    result[other] = getCompatibilityDetail(type, other);
  }
  return result;
}

/**
 * 특정 유형의 궁합을 등급별로 그룹화하여 조회
 */
export function getCompatibilitiesByLevel(
  type: MBTIType
): Record<CompatibilityLevel, { type: MBTIType; detail: CompatibilityDetail }[]> {
  const all = getAllCompatibilities(type);
  const grouped: Record<CompatibilityLevel, { type: MBTIType; detail: CompatibilityDetail }[]> = {
    best: [],
    good: [],
    neutral: [],
    bad: [],
  };

  for (const [otherType, detail] of Object.entries(all)) {
    if (otherType === type) continue; // 자기 자신 제외 옵션
    grouped[detail.level].push({ type: otherType as MBTIType, detail });
  }

  return grouped;
}

/**
 * 전체 궁합 데이터 맵 (읽기 전용)
 */
export const compatibilityData = compatibilityRawData;

/**
 * 모든 16유형 목록 (참조용)
 */
export const ALL_MBTI_TYPES: MBTIType[] = [
  'ISTJ', 'ISTP', 'ISFJ', 'ISFP',
  'INTJ', 'INTP', 'INFJ', 'INFP',
  'ESTJ', 'ESTP', 'ESFJ', 'ESFP',
  'ENTJ', 'ENTP', 'ENFJ', 'ENFP',
];
