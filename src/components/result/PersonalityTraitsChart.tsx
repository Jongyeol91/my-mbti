'use client';

import { motion } from 'framer-motion';
import type { MBTIType } from '@/types/mbti';
import { Icon } from '@/components/ui/Icon';

interface TraitBar {
  label: string;
  icon: string;
  value: number; // 0~100
  color: string;
}

function getPersonalityTraits(type: MBTIType): TraitBar[] {
  const traits: TraitBar[] = [];

  // E/I axis → 사교성
  traits.push({
    label: '사교성',
    icon: 'users',
    value: type[0] === 'E' ? 82 : 35,
    color: '#f472b6', // pink
  });

  // E/I axis → 에너지
  traits.push({
    label: '에너지',
    icon: 'zap',
    value: type[0] === 'E' ? 78 : 55,
    color: '#fbbf24', // yellow
  });

  // S/N axis → 상상력
  traits.push({
    label: '상상력',
    icon: 'palette',
    value: type[1] === 'N' ? 88 : 40,
    color: '#a78bfa', // purple
  });

  // S/N axis → 현실감각
  traits.push({
    label: '현실감각',
    icon: 'target',
    value: type[1] === 'S' ? 85 : 38,
    color: '#34d399', // green
  });

  // T/F axis → 공감능력
  traits.push({
    label: '공감능력',
    icon: 'heart',
    value: type[2] === 'F' ? 90 : 42,
    color: '#fb7185', // rose
  });

  // T/F axis → 분석력
  traits.push({
    label: '분석력',
    icon: 'brain',
    value: type[2] === 'T' ? 87 : 45,
    color: '#60a5fa', // blue
  });

  // J/P axis → 계획성
  traits.push({
    label: '계획성',
    icon: 'calendar',
    value: type[3] === 'J' ? 85 : 30,
    color: '#2dd4bf', // teal
  });

  // J/P axis → 유연성
  traits.push({
    label: '유연성',
    icon: 'compass',
    value: type[3] === 'P' ? 88 : 35,
    color: '#818cf8', // indigo
  });

  return traits;
}

interface Props {
  type: MBTIType;
}

export default function PersonalityTraitsChart({ type }: Props) {
  const traits = getPersonalityTraits(type);

  return (
    <div className="space-y-3 sm:space-y-4">
      {traits.map((trait, i) => (
        <motion.div
          key={trait.label}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, duration: 0.4 }}
          className="group"
        >
          <div className="mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground/70 sm:text-sm">
              <Icon name={trait.icon} size={14} />
              {trait.label}
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 + 0.5 }}
              className="text-xs font-bold tabular-nums text-foreground/50"
            >
              {trait.value}%
            </motion.span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-foreground/5 sm:h-3.5">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${trait.value}%` }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.07 + 0.2,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${trait.color}88, ${trait.color})`,
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
