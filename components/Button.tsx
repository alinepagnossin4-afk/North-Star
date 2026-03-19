'use client'

import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-display font-semibold tracking-wide transition-all duration-200 rounded-xl focus:outline-none disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-amber-glow text-void hover:bg-amber-bright disabled:opacity-40 shadow-lg shadow-amber-glow/20 hover:shadow-amber-glow/30 hover:-translate-y-0.5 active:translate-y-0',
    secondary:
      'bg-elevated text-text-primary border border-border hover:border-muted hover:bg-muted/30 disabled:opacity-40',
    ghost:
      'text-text-secondary hover:text-text-primary hover:bg-elevated disabled:opacity-40',
    danger:
      'bg-rose/10 text-rose border border-rose/20 hover:bg-rose/20 disabled:opacity-40',
  }

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-8 py-3.5 gap-2.5',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
