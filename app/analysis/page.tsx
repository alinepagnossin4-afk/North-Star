'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context'
import { analyzePortfolio, generateMissions } from '@/lib/ai'
import Button from '@/components/Button'
import Nav from '@/components/Nav'

const PLACEHOLDER = `Product Designer with 3 years of experience at B2B SaaS companies.

Recent work: Led the redesign of our main onboarding flow, reducing drop-off by 22%. I worked closely with the PM to define success metrics and ran 6 user interviews. The final designs went through 3 rounds of iteration based on usability testing.

Previously at a startup where I owned the design system from scratch — built 40+ components in Figma, documented usage guidelines, and ran weekly syncs with engineers to ensure implementation quality.

I typically present work in weekly design crits and monthly stakeholder reviews. I'm comfortable with Figma, basic Framer prototyping, and have done some light data analysis in Amplitude.

Challenges: I find it hard to push back on stakeholder requests without clear data. I sometimes struggle to connect my design decisions to broader business strategy.`

export default function AnalysisPage() {
  const router = useRouter()
  const { setPortfolioText, setAnalysis, setMissions, onboardingInsights, portfolioText } = useApp()
  const [text, setText] = useState(portfolioText || '')
  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState('')
  const [error, setError] = useState('')
  const charCount = text.length

  const handleAnalyze = async () => {
    if (text.trim().length < 100) return
    setLoading(true)
    setError('')

    try {
      setLoadingStep('Analysing your portfolio...')
      const analysis = await analyzePortfolio(text)
      setPortfolioText(text)
      setAnalysis(analysis)

      if (onboardingInsights) {
        setLoadingStep('Generating your missions...')
        const missions = await generateMissions(analysis, onboardingInsights)
        setMissions(missions)
      }

      router.push('/dashboard')
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : 'Analysis failed. Please check your API key in .env.local and try again.'
      )
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-void">
      <Nav />

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-glow/4 blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-elevated mb-5">
            <span className="font-mono text-xs text-text-muted uppercase tracking-widest">Step 2 of 2</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl text-text-primary mb-3 leading-tight">
            Tell me about your work
          </h1>
          <p className="text-base text-text-secondary leading-relaxed">
            Paste a description of your portfolio, case studies, or overall design experience. Be honest — the more detail you give, the more accurate your assessment.
          </p>
        </div>

        {/* What to include */}
        <div className="bg-elevated border border-border/60 rounded-2xl p-5 mb-6">
          <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-3">What to include</p>
          <ul className="space-y-2">
            {[
              'Your role, years of experience, and types of companies',
              'Key projects: what you did, your impact, how you collaborated',
              'Your design process and tools',
              'What you struggle with or want to improve',
              'How you handle stakeholders and cross-functional work',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                <span className="text-amber-glow mt-0.5 flex-shrink-0">◌</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={PLACEHOLDER}
            rows={16}
            className="w-full bg-elevated border border-border rounded-2xl px-6 py-5 text-sm text-text-primary placeholder-text-muted font-body leading-relaxed transition-all duration-200 hover:border-muted focus:border-amber-glow/40"
          />
          <div className="absolute bottom-4 right-4 flex items-center gap-3">
            <span className={`font-mono text-xs ${charCount < 100 ? 'text-rose' : 'text-text-muted'}`}>
              {charCount} chars {charCount < 100 && `(min 100)`}
            </span>
          </div>
        </div>

        {/* Example button */}
        {text.length === 0 && (
          <button
            onClick={() => setText(PLACEHOLDER)}
            className="mt-3 text-xs text-sapphire hover:text-sapphire/80 font-display transition-colors"
          >
            Load example text →
          </button>
        )}

        {error && (
          <div className="mt-4 px-4 py-3 bg-rose/10 border border-rose/20 rounded-xl">
            <p className="text-sm text-rose">{error}</p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="mt-6 bg-elevated border border-amber-glow/20 rounded-2xl px-5 py-4 flex items-center gap-4">
            <div className="dot-pulse flex gap-1.5">
              <span /><span /><span />
            </div>
            <p className="text-sm text-text-secondary">{loadingStep}</p>
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center justify-between mt-8">
          <p className="text-xs text-text-muted max-w-xs leading-relaxed">
            Your text is analysed locally and only sent to the AI model. Nothing is stored.
          </p>
          <Button
            onClick={handleAnalyze}
            loading={loading}
            disabled={text.trim().length < 100}
            size="lg"
          >
            Analyse my portfolio →
          </Button>
        </div>
      </main>
    </div>
  )
}
