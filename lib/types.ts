export interface PillarScore {
  name: string
  score: number
  reasoning: string
}

export interface PortfolioAnalysis {
  level: 'Junior' | 'Mid' | 'Strong Mid' | 'Senior-ready'
  pillar_scores: PillarScore[]
  key_gaps: string[]
  summary: string
  strengths: string[]
}

export interface OnboardingData {
  main_challenge: string
  goal: string
  blockers: string
  support_type: string
}

export interface OnboardingInsights {
  primary_focus: string
  urgency_level: string
  growth_blockers: string[]
  recommended_approach: string
  motivation_profile: string
}

export interface ActionStep {
  step: string
  detail: string
}

export interface Mission {
  id: string
  title: string
  why_it_matters: string
  action_steps: ActionStep[]
  expected_outcome: string
  difficulty: 'Low' | 'Medium' | 'High'
  skill_target: string
  completed: boolean
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface AppState {
  onboarding: OnboardingData | null
  onboardingInsights: OnboardingInsights | null
  portfolioText: string
  analysis: PortfolioAnalysis | null
  missions: Mission[]
  chatHistory: ChatMessage[]
}
