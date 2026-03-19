'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useApp } from '@/lib/context'
import { chatWithMentor } from '@/lib/ai'
import Nav from '@/components/Nav'
import ChatUI from '@/components/ChatUI'
import type { ChatMessage } from '@/lib/types'

const QUICK_PROMPTS = [
  'What should I focus on most right now?',
  'How do I improve my stakeholder communication?',
  'Review my progress this week',
  'How do I show more strategic thinking in my work?',
]

export default function ChatPage() {
  const { chatHistory, addChatMessage, analysis, onboardingInsights, clearChat } = useApp()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 150)}px`
    }
  }, [input])

  const sendMessage = async (messageText?: string) => {
    const text = (messageText || input).trim()
    if (!text || loading) return

    const userMsg: ChatMessage = {
      role: 'user',
      content: text,
      timestamp: new Date(),
    }
    addChatMessage(userMsg)
    setInput('')
    setLoading(true)
    setError('')

    try {
      const updatedHistory = [...chatHistory, userMsg]
      const reply = await chatWithMentor(text, updatedHistory, analysis, onboardingInsights)

      addChatMessage({
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      })
    } catch (e) {
      setError('Could not reach the mentor. Check your API key and try again.')
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-void flex flex-col">
      <Nav />

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-sapphire/4 blur-[100px]" />
      </div>

      {/* Main chat area */}
      <div className="relative z-10 flex flex-col flex-1 max-w-3xl mx-auto w-full px-0 pt-14">
        {/* Chat header */}
        <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-glow/10 border border-amber-glow/20 flex items-center justify-center">
              <span className="text-amber-glow text-sm">◉</span>
            </div>
            <div>
              <p className="font-display font-semibold text-sm text-text-primary">Your Design Mentor</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald" />
                <p className="text-xs text-text-secondary">
                  {analysis ? `Knows your profile · ${analysis.level}` : 'Ready to help'}
                </p>
              </div>
            </div>
          </div>

          {chatHistory.length > 0 && (
            <button
              onClick={clearChat}
              className="text-xs text-text-muted hover:text-text-secondary transition-colors font-mono"
            >
              Clear chat
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 200px)' }}>
          <ChatUI messages={chatHistory} loading={loading} />
        </div>

        {/* Quick prompts - show when no messages */}
        {chatHistory.length === 0 && !loading && (
          <div className="px-6 pb-3">
            <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-3">Suggested questions</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-xs px-3 py-2 rounded-xl bg-elevated border border-border text-text-secondary hover:text-text-primary hover:border-muted transition-all font-body"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="px-6 pb-2">
            <p className="text-xs text-rose">{error}</p>
          </div>
        )}

        {/* Input */}
        <div className="px-6 py-4 border-t border-border/50">
          <div className="flex items-end gap-3 bg-elevated border border-border rounded-2xl px-4 py-3 focus-within:border-amber-glow/30 transition-colors">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask your mentor anything..."
              rows={1}
              className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-muted resize-none leading-relaxed font-body focus:outline-none"
              style={{ maxHeight: '150px' }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="flex-shrink-0 w-8 h-8 rounded-xl bg-amber-glow disabled:bg-border disabled:text-text-muted text-void flex items-center justify-center transition-all duration-200 hover:bg-amber-bright disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <p className="text-xs text-text-muted mt-2 text-center">
            Press Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  )
}
