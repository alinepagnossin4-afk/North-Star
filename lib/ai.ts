import type {
  PortfolioAnalysis,
  OnboardingData,
  OnboardingInsights,
  Mission,
  ChatMessage,
} from './types'
import {
  PORTFOLIO_ANALYSIS_PROMPT,
  ONBOARDING_INTERPRETATION_PROMPT,
  MISSION_GENERATION_PROMPT,
  MENTOR_SYSTEM_PROMPT,
} from './prompts'

// ─── Core API caller ────────────────────────────────────────────────────────

async function callClaudeAPI(
  systemPrompt: string,
  userMessage: string,
  conversationHistory?: ChatMessage[]
): Promise<string> {
  const messages = conversationHistory
    ? [
        ...conversationHistory.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        { role: 'user' as const, content: userMessage },
      ]
    : [{ role: 'user' as const, content: userMessage }]

  const response = await fetch('/api/claude', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ systemPrompt, messages }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'API call failed')
  }

  const data = await response.json()
  return data.content
}

// ─── Parse JSON helper ────────────────────────────────────────────────────

function parseJSON<T>(raw: string): T {
  // Strip markdown fences if present
  const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
  return JSON.parse(cleaned)
}

// ─── Portfolio Analysis ─────────────────────────────────────────────────────

export async function analyzePortfolio(
  portfolioText: string
): Promise<PortfolioAnalysis> {
  const prompt = PORTFOLIO_ANALYSIS_PROMPT(portfolioText)
  const raw = await callClaudeAPI('', prompt)
  return parseJSON<PortfolioAnalysis>(raw)
}

// ─── Onboarding Interpretation ──────────────────────────────────────────────

export async function interpretOnboarding(
  data: OnboardingData
): Promise<OnboardingInsights> {
  const prompt = ONBOARDING_INTERPRETATION_PROMPT(data)
  const raw = await callClaudeAPI('', prompt)
  return parseJSON<OnboardingInsights>(raw)
}

// ─── Mission Generation ──────────────────────────────────────────────────────

export async function generateMissions(
  analysis: PortfolioAnalysis,
  insights: OnboardingInsights
): Promise<Mission[]> {
  const prompt = MISSION_GENERATION_PROMPT(analysis, insights)
  const raw = await callClaudeAPI('', prompt)
  const missions = parseJSON<Omit<Mission, 'id' | 'completed'>[]>(raw)

  return missions.map((m, i) => ({
    ...m,
    id: `mission-${Date.now()}-${i}`,
    completed: false,
  }))
}

// ─── Mentor Chat ─────────────────────────────────────────────────────────────

export async function chatWithMentor(
  message: string,
  history: ChatMessage[],
  analysis: PortfolioAnalysis | null,
  insights: OnboardingInsights | null
): Promise<string> {
  const systemPrompt = MENTOR_SYSTEM_PROMPT(analysis, insights)
  // Pass history without the last user message (we pass it as userMessage)
  const historyWithoutLast = history.slice(0, -1)
  return await callClaudeAPI(systemPrompt, message, historyWithoutLast)
}
