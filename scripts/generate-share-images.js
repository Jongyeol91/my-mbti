const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'share');

const mbtiTypes = [
  { type: 'ISTJ', emoji: '📋', nickname: '청렴결백한 관리자', gradient: ['#475569', '#1e293b'] },
  { type: 'ISTP', emoji: '🔧', nickname: '만능 재주꾼', gradient: ['#71717a', '#3f3f46'] },
  { type: 'ISFJ', emoji: '🛡️', nickname: '따뜻한 수호자', gradient: ['#5eead4', '#0d9488'] },
  { type: 'ISFP', emoji: '🎨', nickname: '감성 예술가', gradient: ['#fda4af', '#e11d48'] },
  { type: 'INTJ', emoji: '🧠', nickname: '전략적 마스터마인드', gradient: ['#6366f1', '#4338ca'] },
  { type: 'INTP', emoji: '💡', nickname: '논리적인 사색가', gradient: ['#8b5cf6', '#6d28d9'] },
  { type: 'INFJ', emoji: '🔮', nickname: '통찰력 있는 예언자', gradient: ['#2dd4bf', '#0d9488'] },
  { type: 'INFP', emoji: '🦋', nickname: '열정적인 중재자', gradient: ['#f472b6', '#db2777'] },
  { type: 'ESTJ', emoji: '👔', nickname: '엄격한 관리자', gradient: ['#1e40af', '#3b82f6'] },
  { type: 'ESTP', emoji: '🏄', nickname: '모험을 즐기는 사업가', gradient: ['#c2410c', '#f97316'] },
  { type: 'ESFJ', emoji: '🤗', nickname: '사교적인 외교관', gradient: ['#be185d', '#ec4899'] },
  { type: 'ESFP', emoji: '🎤', nickname: '자유로운 연예인', gradient: ['#ca8a04', '#facc15'] },
  { type: 'ENTJ', emoji: '👑', nickname: '대담한 통솔자', gradient: ['#dc2626', '#f87171'] },
  { type: 'ENTP', emoji: '💡', nickname: '뜨거운 논쟁가', gradient: ['#f59e0b', '#fbbf24'] },
  { type: 'ENFJ', emoji: '🌟', nickname: '정의로운 사회운동가', gradient: ['#059669', '#34d399'] },
  { type: 'ENFP', emoji: '🌈', nickname: '재기발랄한 활동가', gradient: ['#8b5cf6', '#c084fc'] },
];

function generateSvg({ type, emoji, nickname, gradient }) {
  const [color1, color2] = gradient;
  const gradientId = `grad-${type}`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#${gradientId})" />

  <!-- Subtle pattern overlay -->
  <rect width="1200" height="630" fill="rgba(255,255,255,0.03)" />
  <circle cx="1050" cy="120" r="200" fill="rgba(255,255,255,0.05)" />
  <circle cx="150" cy="500" r="150" fill="rgba(255,255,255,0.05)" />

  <!-- Emoji -->
  <text x="600" y="200" font-size="100" text-anchor="middle" dominant-baseline="central">${emoji}</text>

  <!-- MBTI Type Code -->
  <text x="600" y="320" font-family="'Arial Black', 'Helvetica Neue', Arial, sans-serif" font-size="120" font-weight="900" fill="white" text-anchor="middle" dominant-baseline="central" letter-spacing="12">${type}</text>

  <!-- Nickname -->
  <text x="600" y="410" font-family="'Helvetica Neue', Arial, sans-serif" font-size="36" fill="rgba(255,255,255,0.9)" text-anchor="middle" dominant-baseline="central">${nickname}</text>

  <!-- Divider line -->
  <line x1="450" y1="470" x2="750" y2="470" stroke="rgba(255,255,255,0.3)" stroke-width="1" />

  <!-- Branding -->
  <text x="600" y="530" font-family="'Helvetica Neue', Arial, sans-serif" font-size="28" fill="rgba(255,255,255,0.6)" text-anchor="middle" dominant-baseline="central">나의 MBTI 테스트</text>
</svg>`;
}

// Ensure output directory exists
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

let count = 0;
for (const data of mbtiTypes) {
  const svg = generateSvg(data);
  const filename = `${data.type.toLowerCase()}.svg`;
  const filepath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filepath, svg, 'utf-8');
  count++;
  console.log(`Generated: ${filename}`);
}

console.log(`\nDone! Generated ${count} SVG share images in ${OUTPUT_DIR}`);
