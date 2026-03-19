'use client'

import React from 'react'
import Link from 'next/link'

const pillars = [
  { icon: '◈', label: 'Product Thinking' },
  { icon: '◎', label: 'UX Craft' },
  { icon: '◉', label: 'Communication' },
  { icon: '◆', label: 'Stakeholder Influence' },
  { icon: '◇', label: 'Ownership & Autonomy' },
]

const steps = [
  { number: '01', title: 'Share your work', desc: 'Paste your portfolio text for a deep analysis across 5 career pillars.' },
  { number: '02', title: 'Get your level', desc: 'Understand exactly where you stand — Junior to Senior-ready — with honest scoring.' },
  { number: '03', title: 'Receive missions', desc: 'Three personalized weekly missions targeting your exact gaps.' },
  { number: '04', title: 'Talk to your mentor', desc: 'An AI mentor with full context about your goals, ready to guide you.' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-void overflow-hidden">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full bg-amber-glow/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] rounded-full bg-sapphire/5 blur-[100px]" />
      </div>

      {/* Nav */}
      <header className="relative z-10 max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-glow flex items-center justify-center">
            <svg className="w-4 h-4 text-void" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 1l1.5 4.5H14l-3.75 2.75L11.5 13 8 10.25 4.5 13l1.25-4.75L2 5.5h4.5z" />
            </svg>
          </div>
          <span className="font-display font-bold text-base tracking-wide text-text-primary">North Star</span>
        </div>
        <Link
          href="/onboarding"
          className="text-xs font-display font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          Sign in →
        </Link>
      </header>

      {/* Hero */}
      <main className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="pt-24 pb-20 max-w-3xl">
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-glow/20 bg-amber-glow/5 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-glow animate-pulse" />
            <span className="font-mono text-xs text-amber-glow tracking-widest uppercase">
              AI Career Companion for Designers
            </span>
          </div>

          <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-8">
            <span className="text-text-primary">Find your path to </span>
            <br />
            <span className="text-gradient">becoming a senior</span>
            <br />
            <span className="text-text-primary">product designer</span>
          </h1>

          <p className="text-lg text-text-secondary leading-relaxed max-w-xl mb-10">
            North Star analyzes your portfolio, identifies skill gaps, and gives you a structured roadmap — with weekly missions and a mentor that knows your context.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 bg-amber-glow text-void font-display font-bold px-8 py-4 rounded-xl hover:bg-amber-bright transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-amber-glow/20 hover:shadow-amber-glow/30 text-base"
            >
              Start your assessment
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <span className="text-xs text-text-muted">Free · No account needed</span>
          </div>
        </div>

        {/* Pillars */}
        <div className="py-16 border-t border-border/50">
          <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-8">
            Evaluated across 5 pillars
          </p>
          <div className="flex flex-wrap gap-3">
            {pillars.map((p) => (
              <div
                key={p.label}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-elevated border border-border"
              >
                <span className="text-amber-glow text-sm">{p.icon}</span>
                <span className="font-display font-medium text-sm text-text-primary">{p.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="pb-24 border-t border-border/50 pt-16">
          <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-12">
            How it works
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.number} className="group">
                <div className="font-mono text-3xl font-bold text-border group-hover:text-amber-glow/30 transition-colors mb-4">
                  {step.number}
                </div>
                <h3 className="font-display font-semibold text-base text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
