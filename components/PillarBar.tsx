'use client'

import React from 'react'
import type { PillarScore } from '@/lib/types'

interface PillarBarProps {
  pillar: PillarScore
  delay?: number
}

const pillarIcons: Record<string, string> = {
  'Product Thinking': '◈',
  'UX Craft': '◎',
  'Communication': '◉',
  'Stakeholder Influence': '◆',
  'Ownership & Autonomy': '◇',
}

const scoreColors = [
  '', // 0 unused
  'from-rose to-rose/70',       // 1
  'from-amber-dim to-amber-glow/70',  // 2
  'from-amber-glow to-amber-bright/80', // 3
  'from-sapphire to-sapphire/80',   // 4
  'from-emerald to-emerald/80',     // 5
]

export default function PillarBar({ pillar, delay = 0 }: PillarBarProps) {
  const pct = (pillar.score / 5) * 100
  const icon = pillarIcons[pillar.name] || '◌'

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-text-muted text-sm">{icon}</span>
          <span className="font-display font-medium text-sm text-text-primary">
            {pillar.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-text-secondary">
            {pillar.score}/5
          </span>
        </div>
      </div>

      {/* Bar track */}
      <div className="h-1.5 bg-border rounded-full overflow-hidden mb-2">
        <div
          className={`h-full bg-gradient-to-r ${scoreColors[pillar.score]} rounded-full fill-bar`}
          style={{
            '--target-width': `${pct}%`,
            animationDelay: `${delay}ms`,
          } as React.CSSProperties}
        />
      </div>

      {/* Reasoning - shown on hover via toggle */}
      <p className="text-xs text-text-muted leading-relaxed max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-300">
        {pillar.reasoning}
      </p>
    </div>
  )
}
