'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context'
import { interpretOnboarding } from '@/lib/ai'
import Button from '@/components/Button'

const questions = [
  {
    id: 'main_challenge',
    step: 1,
    label: 'What is your main challenge right now?',
    placeholder: 'e.g. I struggle to communicate the value of my design decisions to stakeholders...',
    hint: 'Be specific — the more context you give, the better your missions will be.',
  },
  {
    id: 'goal',
    step: 2,
    label: 'What does success look like for you in 3 months?',
    placeholder: 'e.g. I want to lead a full product redesign independently and be considered for senior...',
    hint: 'Think about a concrete role, outcome, or skill level.',
  },
  {
    id: 'blockers',
    step: 3,
    label: 'What is getting in your way?',
    placeholder: 'e.g. I don\'t get direct feedback, I\'m in a team with no senior designers, imposter syndrome...',
    hint: 'Honest answers help your mentor understand your real situation.',
  },
  {
    id: 'support_type',
    step: 4,
    label: 'What kind of support do you need most?',
    placeholder: 'e.g. I need someone to challenge my thinking, help me structure my portfolio, give me practical exercises...',
    hint: 'This shapes how your AI mentor will interact with you.',
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { setOnboarding, setOnboardingInsights } = useApp()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const current = questions[step]
  const progress = ((step + 1) / questions.length) * 100
  const currentAnswer = answers[current.id] || ''

  const handleNext = async () => {
    if (!currentAnswer.trim()) return
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      // Submit
      setLoading(true)
      setError('')
      try {
        const onboardingData = {
          main_challenge: answers['main_challenge'] || '',
          goal: answers['goal'] || '',
          blockers: answers['blockers'] || '',
          support_type: answers['support_type'] || currentAnswer,
        }
        setOnboarding(onboardingData)
        const insights = await interpretOnboarding(onboardingData)
        setOnboardingInsights(insights)
        router.push('/analysis')
      } catch (e) {
        setError('Something went wrong. Please check your API key and try again.')
        setLoading(false)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleNext()
    }
  }

  return (
    <div className="min-h-screen bg-void flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[10%] w-[500px] h-[500px] rounded-full bg-sapphire/4 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 max-w-2xl mx-auto w-full px-6 pt-8 pb-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-glow flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-void" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1l1.5 4.5H14l-3.75 2.75L11.5 13 8 10.25 4.5 13l1.25-4.75L2 5.5h4.5z" />
              </svg>
            </div>
            <span className="font-display font-bold text-sm text-text-primary">North Star</span>
          </div>
          <span className="font-mono text-xs text-text-muted">
            {step + 1} / {questions.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-glow rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Step indicator */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="font-mono text-xs text-text-muted uppercase tracking-widest">
              Step {step + 1}
            </span>
          </div>

          {/* Question */}
          <h2
            key={step}
            className="font-display font-bold text-3xl text-text-primary mb-3 leading-tight animate-fade-up"
          >
            {current.label}
          </h2>

          <p className="text-sm text-text-secondary mb-8">{current.hint}</p>

          {/* Textarea */}
          <textarea
            key={`textarea-${step}`}
            value={currentAnswer}
            onChange={(e) =>
              setAnswers({ ...answers, [current.id]: e.target.value })
            }
            onKeyDown={handleKeyDown}
            placeholder={current.placeholder}
            rows={5}
            autoFocus
            className="w-full bg-elevated border border-border rounded-2xl px-5 py-4 text-sm text-text-primary placeholder-text-muted font-body leading-relaxed transition-all duration-200 hover:border-muted focus:border-amber-glow/50"
          />

          {/* Hint */}
          <p className="text-xs text-text-muted mt-2">
            Press <kbd className="font-mono bg-elevated border border-border px-1.5 py-0.5 rounded text-xs">⌘ Enter</kbd> to continue
          </p>

          {error && (
            <div className="mt-4 px-4 py-3 bg-rose/10 border border-rose/20 rounded-xl">
              <p className="text-sm text-rose">{error}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => step > 0 && setStep(step - 1)}
              disabled={step === 0}
              className="text-sm text-text-secondary hover:text-text-primary disabled:opacity-0 disabled:pointer-events-none transition-all font-display"
            >
              ← Back
            </button>

            <Button
              onClick={handleNext}
              loading={loading}
              disabled={!currentAnswer.trim()}
              size="lg"
            >
              {step === questions.length - 1 ? 'Analyse my profile →' : 'Continue →'}
            </Button>
          </div>

          {/* Previously answered */}
          {step > 0 && (
            <div className="mt-12 space-y-3">
              <p className="font-mono text-xs text-text-muted uppercase tracking-widest">Your answers so far</p>
              {questions.slice(0, step).map((q) => (
                <div key={q.id} className="bg-elevated/50 border border-border/50 rounded-xl px-4 py-3">
                  <p className="text-xs text-text-muted mb-1">{q.label}</p>
                  <p className="text-sm text-text-secondary">{answers[q.id]}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
