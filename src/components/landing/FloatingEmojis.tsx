"use client";

import { motion } from "framer-motion";

const emojis = [
  { emoji: "🌟", x: "10%", y: "15%", delay: 0, duration: 6 },
  { emoji: "💜", x: "85%", y: "10%", delay: 1.2, duration: 7 },
  { emoji: "🦋", x: "75%", y: "35%", delay: 0.5, duration: 5.5 },
  { emoji: "🌸", x: "15%", y: "45%", delay: 2, duration: 6.5 },
  { emoji: "✨", x: "90%", y: "55%", delay: 0.8, duration: 5 },
  { emoji: "💫", x: "5%", y: "70%", delay: 1.5, duration: 7 },
  { emoji: "🎀", x: "80%", y: "75%", delay: 0.3, duration: 6 },
  { emoji: "🌈", x: "50%", y: "85%", delay: 1.8, duration: 5.5 },
];

export default function FloatingEmojis() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {emojis.map((item, i) => (
        <motion.span
          key={i}
          className="absolute text-xl opacity-20 select-none md:text-2xl"
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -15, 0, 15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.emoji}
        </motion.span>
      ))}
    </div>
  );
}
