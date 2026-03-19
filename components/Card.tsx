import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'amber' | 'sapphire'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export default function Card({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
}: CardProps) {
  const variants = {
    default: 'bg-surface border border-border',
    elevated: 'bg-elevated border border-border',
    amber: 'bg-elevated border border-amber-glow/20 shadow-lg shadow-amber-glow/5',
    sapphire: 'bg-elevated border border-sapphire/20 shadow-lg shadow-sapphire/5',
  }

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div
      className={`rounded-2xl ${variants[variant]} ${paddings[padding]} ${className}`}
    >
      {children}
    </div>
  )
}
