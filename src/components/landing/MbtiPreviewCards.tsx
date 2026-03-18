"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const mbtiTypes = [
  { type: "INTJ", emoji: "🏛️" },
  { type: "INTP", emoji: "🧪" },
  { type: "ENTJ", emoji: "👑" },
  { type: "ENTP", emoji: "💡" },
  { type: "INFJ", emoji: "🌌" },
  { type: "INFP", emoji: "🦄" },
  { type: "ENFJ", emoji: "🌟" },
  { type: "ENFP", emoji: "🎪" },
  { type: "ISTJ", emoji: "📋" },
  { type: "ISFJ", emoji: "🛡️" },
  { type: "ESTJ", emoji: "⚖️" },
  { type: "ESFJ", emoji: "🤝" },
  { type: "ISTP", emoji: "🔧" },
  { type: "ISFP", emoji: "🎨" },
  { type: "ESTP", emoji: "🏄" },
  { type: "ESFP", emoji: "🎭" },
];

// Color each letter by its MBTI dimension
const letterColor: Record<string, string> = {
  E: "text-[#E8734A]",
  I: "text-[#4A7E8E]",
  S: "text-[#D4A84B]",
  N: "text-[#7B6CA5]",
  T: "text-[#4A8E6E]",
  F: "text-[#C76B7E]",
  J: "text-[#5B7BAE]",
  P: "text-[#C4884A]",
};

function ColoredType({ type }: { type: string }) {
  return (
    <span className="text-xs font-bold sm:text-sm">
      {type.split("").map((letter, i) => (
        <span key={i} className={letterColor[letter]}>
          {letter}
        </span>
      ))}
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

export default function MbtiPreviewCards() {
  return (
    <motion.div
      className="grid grid-cols-4 gap-2.5 sm:gap-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
    >
      {mbtiTypes.map((item) => (
        <motion.div key={item.type} variants={cardVariants}>
          <Link href={`/types/${item.type.toLowerCase()}`}>
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group relative flex flex-col items-center justify-center rounded-lg bg-surface p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.03)] transition-shadow duration-300 ease-out hover:shadow-[0_4px_16px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)] cursor-pointer"
            >
              <ColoredType type={item.type} />
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
