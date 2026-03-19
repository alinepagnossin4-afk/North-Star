# 🧭 North Star

**AI-powered career companion for product designers.**

North Star helps designers understand their current level, identify skill gaps, receive personalized weekly missions, and interact with an AI mentor — all in one premium, minimal interface.

---

## ✨ Features

- **Portfolio Analysis** — Paste your experience, get scored across 5 career pillars
- **Onboarding** — Share your goals and blockers, get a personalized coaching approach
- **Weekly Missions** — 3 AI-generated missions targeting your exact gaps
- **AI Mentor Chat** — Context-aware mentor that knows your profile
- **Progress Tracking** — Mark missions complete, track your weekly progress

---

## 🚀 Quick Start

### 1. Clone / download the project

```bash
cd northstar
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your API key

```bash
cp .env.example .env.local
```

Open `.env.local` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Get your key at: https://console.anthropic.com

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
northstar/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout (fonts, providers)
│   ├── globals.css           # Global styles + animations
│   ├── api/
│   │   └── claude/route.ts   # API route — calls Anthropic
│   ├── onboarding/page.tsx   # 4-step onboarding form
│   ├── analysis/page.tsx     # Portfolio input
│   ├── dashboard/page.tsx    # Main dashboard
│   └── chat/page.tsx         # AI mentor chat
│
├── components/
│   ├── Button.tsx            # Reusable button with variants
│   ├── Card.tsx              # Surface card component
│   ├── MissionCard.tsx       # Expandable mission item
│   ├── PillarBar.tsx         # Score bar with hover details
│   ├── ChatUI.tsx            # Chat message renderer
│   └── Nav.tsx               # Top navigation bar
│
├── lib/
│   ├── types.ts              # All TypeScript interfaces
│   ├── context.tsx           # React Context for global state
│   ├── ai.ts                 # All AI function calls
│   └── prompts.ts            # All prompt templates
│
├── .env.example
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 🧠 AI Architecture

All AI calls go through `/app/api/claude/route.ts` (server-side, keeps API key secret).

### Functions in `lib/ai.ts`

| Function | Input | Output |
|---|---|---|
| `analyzePortfolio(text)` | Portfolio text string | `PortfolioAnalysis` |
| `interpretOnboarding(data)` | 4 onboarding answers | `OnboardingInsights` |
| `generateMissions(analysis, insights)` | Both analysis objects | `Mission[]` |
| `chatWithMentor(msg, history, ...)` | Message + context | `string` |

All prompts live in `lib/prompts.ts` — easy to tune without touching logic.

---

## 🎨 Design Decisions

- **Dark mode by default** — void/surface/elevated layer system
- **Amber/gold accent** — premium, deliberate, not a generic purple
- **Syne** display font — geometric, distinctive, not Inter
- **DM Sans** body font — clean, readable at small sizes
- **Hover-to-reveal** reasoning on pillar bars — progressive disclosure
- **Expandable mission cards** — keep dashboard clean, details on demand

---

## 🔧 Extending the MVP

### Add persistence
Replace React Context with `localStorage` for basic persistence:
```ts
// In lib/context.tsx
const [state, setState] = useState(() => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('northstar-state')
    return saved ? JSON.parse(saved) : initialState
  }
  return initialState
})

useEffect(() => {
  localStorage.setItem('northstar-state', JSON.stringify(state))
}, [state])
```

### Change the AI model
In `app/api/claude/route.ts`, update:
```ts
model: 'claude-opus-4-5'  // change to any supported model
```

### Add more missions
In `lib/prompts.ts`, update `MISSION_GENERATION_PROMPT` to request more missions and adjust the array length.

---

## 🛠 Tech Stack

- **Next.js 14** (App Router)
- **React 18** + TypeScript
- **Tailwind CSS** with custom design tokens
- **Anthropic SDK** (`@anthropic-ai/sdk`)
- **Next/font** — Syne, DM Sans, DM Mono (Google Fonts, zero layout shift)

---

## 📝 Notes

- State is in-memory only — refreshing the page resets progress (intentional for MVP)
- No authentication required
- All API calls are server-side (API key never exposed to client)
- The `/api/claude` route handles all model calls with a clean abstraction
