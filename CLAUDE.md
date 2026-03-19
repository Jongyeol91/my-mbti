<!-- ooo:START -->
<!-- ooo:VERSION:0.14.0 -->
# Ouroboros — Specification-First AI Development

> Before telling AI what to build, define what should be built.
> As Socrates asked 2,500 years ago — "What do you truly know?"
> Ouroboros turns that question into an evolutionary AI workflow engine.

Most AI coding fails at the input, not the output. Ouroboros fixes this by
**exposing hidden assumptions before any code is written**.

1. **Socratic Clarity** — Question until ambiguity ≤ 0.2
2. **Ontological Precision** — Solve the root problem, not symptoms
3. **Evolutionary Loops** — Each evaluation cycle feeds back into better specs

```
Interview → Seed → Execute → Evaluate
    ↑                           ↓
    └─── Evolutionary Loop ─────┘
```

## ooo Commands

Each command loads its agent/MCP on-demand. Details in each skill file.

| Command | Loads |
|---------|-------|
| `ooo` | — |
| `ooo interview` | `ouroboros:socratic-interviewer` |
| `ooo seed` | `ouroboros:seed-architect` |
| `ooo run` | MCP required |
| `ooo evolve` | MCP: `evolve_step` |
| `ooo evaluate` | `ouroboros:evaluator` |
| `ooo unstuck` | `ouroboros:{persona}` |
| `ooo status` | MCP: `session_status` |
| `ooo setup` | — |
| `ooo help` | — |

## Agents

Loaded on-demand — not preloaded.

**Core**: socratic-interviewer, ontologist, seed-architect, evaluator,
wonder, reflect, advocate, contrarian, judge
**Support**: hacker, simplifier, researcher, architect
<!-- ooo:END -->

# currentDate
Today's date is 2026-03-19.

# Design Principles

이 프로젝트는 AI 제네릭 디자인을 의도적으로 피합니다.

- 핑크-보라 그라데이션 금지, 단색 우선
- 배경: 쿨 그레이 `#F8F9FA`
- 카드: 보더 대신 레이어드 그림자, `rounded-lg`
- 이모지를 비주얼 아이덴티티로 쓰지 않음
- `transition-all` 금지 → 구체적 속성만
- `whileTap: 0.96`, `whileHover: y -2`
- `word-break: keep-all`, `text-wrap: balance/pretty`
- MBTI 축별 시맨틱 컬러 시스템 사용

적용된 스킬:
- `~/.claude/skills/omc-learned/anthropic-frontend-design/`
- `~/.claude/skills/omc-learned/make-interfaces-feel-better/`
