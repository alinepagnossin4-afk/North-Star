'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import type { AppState, Mission, ChatMessage } from './types'

interface AppContextType extends AppState {
  setOnboarding: (data: AppState['onboarding']) => void
  setOnboardingInsights: (insights: AppState['onboardingInsights']) => void
  setPortfolioText: (text: string) => void
  setAnalysis: (analysis: AppState['analysis']) => void
  setMissions: (missions: Mission[]) => void
  toggleMission: (id: string) => void
  addChatMessage: (message: ChatMessage) => void
  clearChat: () => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    onboarding: null,
    onboardingInsights: null,
    portfolioText: '',
    analysis: null,
    missions: [],
    chatHistory: [],
  })

  const setOnboarding = (data: AppState['onboarding']) =>
    setState((s) => ({ ...s, onboarding: data }))

  const setOnboardingInsights = (insights: AppState['onboardingInsights']) =>
    setState((s) => ({ ...s, onboardingInsights: insights }))

  const setPortfolioText = (text: string) =>
    setState((s) => ({ ...s, portfolioText: text }))

  const setAnalysis = (analysis: AppState['analysis']) =>
    setState((s) => ({ ...s, analysis }))

  const setMissions = (missions: Mission[]) =>
    setState((s) => ({ ...s, missions }))

  const toggleMission = (id: string) =>
    setState((s) => ({
      ...s,
      missions: s.missions.map((m) =>
        m.id === id ? { ...m, completed: !m.completed } : m
      ),
    }))

  const addChatMessage = (message: ChatMessage) =>
    setState((s) => ({
      ...s,
      chatHistory: [...s.chatHistory, message],
    }))

  const clearChat = () => setState((s) => ({ ...s, chatHistory: [] }))

  return (
    <AppContext.Provider
      value={{
        ...state,
        setOnboarding,
        setOnboardingInsights,
        setPortfolioText,
        setAnalysis,
        setMissions,
        toggleMission,
        addChatMessage,
        clearChat,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
