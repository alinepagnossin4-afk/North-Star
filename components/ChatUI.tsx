'use client'

import React, { useRef, useEffect } from 'react'
import type { ChatMessage } from '@/lib/types'

interface ChatUIProps {
  messages: ChatMessage[]
  loading: boolean
}

export default function ChatUI({ messages, loading }: ChatUIProps) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  if (messages.length === 0 && !loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <div className="w-12 h-12 rounded-2xl bg-elevated border border-border flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">◉</span>
          </div>
          <h3 className="font-display font-semibold text-text-primary mb-2">
            Your mentor is ready
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            Ask anything about your career, portfolio, or growth. Your mentor has full context about your profile and goals.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-up`}
        >
          {msg.role === 'assistant' && (
            <div className="w-7 h-7 rounded-xl bg-amber-glow/10 border border-amber-glow/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="text-amber-glow text-xs">◉</span>
            </div>
          )}

          <div
            className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              msg.role === 'user'
                ? 'bg-sapphire/20 border border-sapphire/20 text-text-primary'
                : 'bg-elevated border border-border text-text-primary'
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            <p className="text-xs text-text-muted mt-1.5">
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      ))}

      {loading && (
        <div className="flex justify-start animate-fade-in">
          <div className="w-7 h-7 rounded-xl bg-amber-glow/10 border border-amber-glow/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
            <span className="text-amber-glow text-xs">◉</span>
          </div>
          <div className="bg-elevated border border-border rounded-2xl px-4 py-3">
            <div className="dot-pulse flex gap-1.5">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  )
}
