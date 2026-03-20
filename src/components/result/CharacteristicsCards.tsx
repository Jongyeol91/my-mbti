'use client';

import { motion } from 'framer-motion';
import type { MBTIType } from '@/types/mbti';
import { Icon } from '@/components/ui/Icon';

interface CharacteristicCard {
  icon: string;
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
}

/**
 * MBTI 유형별 핵심 성격 특성 카드 데이터
 */
function getCharacteristics(type: MBTIType): CharacteristicCard[] {
  const eOrI = type[0];
  const sOrN = type[1];
  const tOrF = type[2];
  const jOrP = type[3];

  const cards: CharacteristicCard[] = [];

  // 에너지 방향 (E/I)
  if (eOrI === 'E') {
    cards.push({
      icon: 'users',
      title: '외향적 에너지',
      description: '사람들과 함께할 때 에너지가 충전돼요. 대화를 통해 생각을 정리하고, 새로운 사람을 만나는 게 즐거워요!',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-800',
    });
  } else {
    cards.push({
      icon: 'headphones',
      title: '내향적 에너지',
      description: '혼자만의 시간에 에너지가 충전돼요. 깊이 있는 생각과 소수의 친밀한 관계를 선호해요.',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-800',
    });
  }

  // 인식 기능 (S/N)
  if (sOrN === 'S') {
    cards.push({
      icon: 'compass',
      title: '현실 감각파',
      description: '오감으로 느끼는 구체적인 정보를 중시해요. 실제 경험과 검증된 사실을 기반으로 판단하는 실용주의자!',
      bgColor: 'bg-green-50',
      textColor: 'text-green-800',
    });
  } else {
    cards.push({
      icon: 'lightbulb',
      title: '직관 상상파',
      description: '가능성과 패턴을 읽는 능력이 뛰어나요. 미래를 상상하고 큰 그림을 그리는 것을 좋아해요!',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-800',
    });
  }

  // 판단 기능 (T/F)
  if (tOrF === 'T') {
    cards.push({
      icon: 'chart',
      title: '논리적 사고',
      description: '객관적인 기준과 논리로 결정을 내려요. 공정함을 중요시하고, 감정보다 사실에 근거해서 판단해요.',
      bgColor: 'bg-sky-50',
      textColor: 'text-sky-800',
    });
  } else {
    cards.push({
      icon: 'heart',
      title: '감정적 공감',
      description: '사람들의 감정에 깊이 공감하고, 조화로운 관계를 중시해요. 따뜻한 마음으로 결정을 내리는 타입!',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-800',
    });
  }

  // 생활 양식 (J/P)
  if (jOrP === 'J') {
    cards.push({
      icon: 'clipboard',
      title: '체계적 계획가',
      description: '미리 계획을 세우고 차근차근 실행하는 걸 좋아해요. 정돈된 환경과 예측 가능한 일상이 편안해요!',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-800',
    });
  } else {
    cards.push({
      icon: 'palette',
      title: '자유로운 탐험가',
      description: '상황에 따라 유연하게 대처하는 걸 선호해요. 새로운 가능성을 열어두고 즉흥적인 순간을 즐겨요!',
      bgColor: 'bg-violet-50',
      textColor: 'text-violet-800',
    });
  }

  return cards;
}

interface Props {
  type: MBTIType;
}

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function CharacteristicsCards({ type }: Props) {
  const cards = getCharacteristics(type);

  return (
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{
            delay: i * 0.1,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className={`relative overflow-hidden rounded-2xl ${card.bgColor} p-4 sm:p-5`}
        >
          {/* Decorative background circle */}
          <div className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/30 sm:h-24 sm:w-24" />

          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.1 + 0.2,
              type: 'spring',
              stiffness: 260,
              damping: 15,
            }}
            className={`mb-2 ${card.textColor}`}
          >
            <Icon name={card.icon} size={28} />
          </motion.div>
          <h3 className={`mb-1.5 text-sm font-bold ${card.textColor} sm:text-base`}>
            {card.title}
          </h3>
          <p className={`text-xs leading-relaxed ${card.textColor} opacity-80 sm:text-sm sm:leading-relaxed`}>
            {card.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
