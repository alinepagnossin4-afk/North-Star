'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useApp } from '@/lib/context'
import Nav from '@/components/Nav'
import Card from '@/components/Card'
import MissionCard from '@/components/MissionCard'
import PillarBar from '@/components/PillarBar'
import Button from '@/components/Button'

const levelConfig: Record<string, { color: string; bg: string; border: string; glow: string }> = {
  'Junior': { color: 'text-rose', bg: 'bg-rose/10', border: 'border-rose/20', glow: '' },
  'Mid': { color: 'text-amber-glow', bg: 'bg-amber-glow/10', border: 'border-amber-glow/20', glow: 'glow-amber' },
  'Strong Mid': { color: 'text-sapphire', bg: 'bg-sapphire/10', border: 'border-sapphire/20', glow: 'glow-sapphire' },
  'Senior-ready': { color: 'text-emerald', bg: 'bg-emerald/10', border: 'border-emerald/20', glow: '' },
}

export default function DashboardPage() {
  const router = useRouter()
  const { analysis, missions, toggleMission, onboardingInsights } = useApp()

  useEffect(() => {
    if (!analysis) router.push('/analysis')
  }, [analysis, router])

  if (!analysis) return null

  const completedCount = missions.filter((m) => m.completed).length
  const totalMissions = missions.length
  const progressPct = totalMissions > 0 ? (completedCount / totalMissions) * 100 : 0
  const avgScore = analysis.pillar_scores.reduce((a, b) => a + b.score, 0) / analysis.pillar_scores.length
  const lvl = levelConfig[analysis.level] || levelConfig['Mid']

  return (
    <div className="min-h-screen bg-void">
      <Nav />

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-amber-glow/3 blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-sapphire/4 blur-[100px]" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20">

        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">

          {/* Level card */}
          <Card variant="amber" padding="lg" className={`lg:col-span-1 ${lvl.glow}`}>
            <div className="flex flex-col h-full">
              <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-4">
                Current Level
              </p>
              <div className={`inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-lg border ${lvl.bg} ${lvl.border} mb-4`}>
                <div className={`w-1.5 h-1.5 rounded-full ${lvl.color.replace('text-', 'bg-')}`} />
                <span className={`font-display font-bold text-sm ${lvl.color}`}>
                  {analysis.level}
                </span>
              </div>

              {/* Avg score */}
              <div className="flex items-end gap-1 mb-4">
                <span className="font-display font-extrabold text-5xl text-text-primary leading-none">
                  {avgScore.toFixed(1)}
                </span>
                <span className="font-display text-xl text-text-muted mb-1">/5</span>
              </div>
              <p className="text-xs text-text-muted">Average pillar score</p>
            </div>
          </Card>

          {/* Summary card */}
          <Card variant="elevated" padding="lg" className="lg:col-span-2">
            <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-4">
              Assessment Summary
            </p>
            <p className="text-sm text-text-secondary leading-relaxed mb-5">
              {analysis.summary}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-2">Strengths</p>
                <ul className="space-y-1.5">
                  {analysis.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                      <span className="text-emerald mt-0.5 flex-shrink-0">◌</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-2">Key Gaps</p>
                <ul className="space-y-1.5">
                  {analysis.key_gaps.map((g, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                      <span className="text-rose mt-0.5 flex-shrink-0">◌</span>
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Second row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">

          {/* Pillars */}
          <Card variant="elevated" padding="lg" className="lg:col-span-2">
            <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-6">
              Pillar Scores
            </p>
            <div className="space-y-5">
              {analysis.pillar_scores.map((pillar, i) => (
                <PillarBar key={pillar.name} pillar={pillar} delay={i * 100} />
              ))}
            </div>
            <p className="text-xs text-text-muted mt-5 italic">↑ Hover each pillar to see reasoning</p>
          </Card>

          {/* Insights + Progress */}
          <div className="space-y-5">
            {/* Progress */}
            {totalMissions > 0 && (
              <Card variant="elevated" padding="md">
                <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-4">
                  Weekly Progress
                </p>
                <div className="flex items-end gap-2 mb-3">
                  <span className="font-display font-bold text-3xl text-text-primary">
                    {completedCount}
                  </span>
                  <span className="text-text-muted font-display mb-0.5">/ {totalMissions} missions</span>
                </div>
                <div className="h-1.5 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-glow to-amber-bright rounded-full transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                {completedCount === totalMissions && totalMissions > 0 && (
                  <p className="text-xs text-emerald mt-3">✓ All missions complete this week!</p>
                )}
              </Card>
            )}

            {/* Mentor CTA */}
            <Card variant="sapphire" padding="md">
              <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-3">
                AI Mentor
              </p>
              <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                {onboardingInsights?.primary_focus
                  ? `Your focus: ${onboardingInsights.primary_focus}`
                  : 'Your mentor knows your profile and is ready to help.'}
              </p>
              <Link href="/chat">
                <Button variant="secondary" size="sm" className="w-full justify-center">
                  Open mentor chat →
                </Button>
              </Link>
            </Card>

            {/* Re-analyse */}
            <Link href="/analysis">
              <Card variant="default" padding="sm" className="cursor-pointer hover:border-muted/60 transition-colors group">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-text-secondary group-hover:text-text-primary transition-colors">Update portfolio</p>
                  <span className="text-text-muted group-hover:text-text-primary transition-colors">→</span>
                </div>
              </Card>
            </Link>
          </div>
        </div>

        {/* Missions */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-1">
                This Week's Missions
              </p>
              <h2 className="font-display font-bold text-xl text-text-primary">
                Your personalized roadmap
              </h2>
            </div>
          </div>

          {missions.length === 0 ? (
            <Card variant="elevated" padding="lg">
              <div className="text-center py-8">
                <p className="text-text-secondary mb-4">No missions generated yet.</p>
                <Link href="/onboarding">
                  <Button variant="secondary" size="sm">Complete onboarding to get missions →</Button>
                </Link>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {missions.map((mission, i) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  index={i}
                  onToggle={toggleMission}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
