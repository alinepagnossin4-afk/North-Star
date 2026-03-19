'use client'

import React, { useState } from 'react'
import type { Mission } from '@/lib/types'
import Card from './Card'

interface MissionCardProps {
  mission: Mission
  index: number
  onToggle: (id: string) => void
}

const difficultyConfig = {
  Low: { color: 'text-emerald', bg: 'bg-emerald/10', border: 'border-emerald/20' },
  Medium: { color: 'text-amber-glow', bg: 'bg-amber-glow/10', border: 'border-amber-glow/20' },
  High: { color: 'text-rose', bg: 'bg-rose/10', border: 'border-rose/20' },
}

export default function MissionCard({ mission, index, onToggle }: MissionCardProps) {
  const [expanded, setExpanded] = useState(false)
  const diff = difficultyConfig[mission.difficulty]

  return (
    <Card
      variant={mission.completed ? 'default' : 'elevated'}
      padding="none"
      className={`transition-all duration-300 ${
        mission.completed ? 'opacity-60' : 'hover:border-border/80'
      }`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <button
            onClick={() => onToggle(mission.id)}
            className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center
              ${mission.completed
                ? 'bg-amber-glow border-amber-glow'
                : 'border-muted hover:border-amber-glow/50'
              }`}
            aria-label={mission.completed ? 'Mark incomplete' : 'Mark complete'}
          >
            {mission.completed && (
              <svg className="w-3 h-3 text-void" fill="none" viewBox="0 0 12 12">
                <path
                  d="M2 6l3 3 5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                {/* Mission number */}
                <span className="font-mono text-xs text-text-muted tracking-widest uppercase">
                  Mission {String(index + 1).padStart(2, '0')}
                </span>
                {/* Title */}
                <h3
                  className={`font-display font-semibold text-base mt-1 leading-snug ${
                    mission.completed ? 'line-through text-text-secondary' : 'text-text-primary'
                  }`}
                >
                  {mission.title}
                </h3>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className={`font-mono text-xs px-2 py-1 rounded-lg border ${diff.color} ${diff.bg} ${diff.border}`}
                >
                  {mission.difficulty}
                </span>
              </div>
            </div>

            {/* Skill target */}
            <p className="text-xs text-text-secondary mt-2 font-mono">
              → {mission.skill_target}
            </p>

            {/* Why it matters */}
            <p className="text-sm text-text-secondary mt-3 leading-relaxed">
              {mission.why_it_matters}
            </p>

            {/* Expand button */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 text-xs text-amber-glow hover:text-amber-bright mt-4 font-display font-medium transition-colors"
            >
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 16 16"
              >
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              {expanded ? 'Hide steps' : 'View action steps'}
            </button>
          </div>
        </div>

        {/* Expanded content */}
        {expanded && (
          <div className="mt-5 ml-9 space-y-4 animate-fade-in">
            {/* Action steps */}
            <div className="space-y-3">
              {mission.action_steps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-border flex items-center justify-center mt-0.5">
                    <span className="font-mono text-xs text-text-secondary">{i + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{step.step}</p>
                    <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Expected outcome */}
            <div className="border-t border-border pt-4">
              <p className="text-xs text-text-muted font-mono uppercase tracking-widest mb-1">
                Expected outcome
              </p>
              <p className="text-sm text-text-secondary">{mission.expected_outcome}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
