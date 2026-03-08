'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface RestTimerProps {
  totalSeconds: number
  onComplete: () => void
  onSkip: () => void
}

const RADIUS = 52
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function playGong() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    if (!AudioCtx) return

    const ctx = new AudioCtx()

    // Primary resonant tone
    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const osc3 = ctx.createOscillator()
    const gainNode = ctx.createGain()

    osc1.type = 'sine'
    osc2.type = 'sine'
    osc3.type = 'sine'

    osc1.frequency.setValueAtTime(220, ctx.currentTime)
    osc2.frequency.setValueAtTime(330, ctx.currentTime)
    osc3.frequency.setValueAtTime(440, ctx.currentTime)

    osc1.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 3)
    osc2.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 3)
    osc3.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 3)

    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.02)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.5)

    osc1.connect(gainNode)
    osc2.connect(gainNode)
    osc3.connect(gainNode)
    gainNode.connect(ctx.destination)

    osc1.start(ctx.currentTime)
    osc2.start(ctx.currentTime)
    osc3.start(ctx.currentTime)
    osc1.stop(ctx.currentTime + 3.5)
    osc2.stop(ctx.currentTime + 3.5)
    osc3.stop(ctx.currentTime + 3.5)
  } catch {
    // Audio API not available — silent fallback
  }
}

export default function RestTimer({
  totalSeconds,
  onComplete,
  onSkip,
}: RestTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)
  const gongPlayedRef = useRef(false)
  const completedRef = useRef(false)

  const handleComplete = useCallback(() => {
    if (completedRef.current) return
    completedRef.current = true
    onComplete()
  }, [onComplete])

  useEffect(() => {
    setSecondsLeft(totalSeconds)
    gongPlayedRef.current = false
    completedRef.current = false
  }, [totalSeconds])

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (!gongPlayedRef.current) {
        gongPlayedRef.current = true
        playGong()
      }
      const timeout = setTimeout(handleComplete, 2800)
      return () => clearTimeout(timeout)
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [secondsLeft, handleComplete])

  const progress = secondsLeft <= 0 ? 0 : secondsLeft / totalSeconds
  const dashOffset = CIRCUMFERENCE * (1 - progress)
  const isDone = secondsLeft <= 0

  return (
    <div className="flex flex-col items-center gap-5 py-6 w-full">
      <p className="text-gold-dark text-xs uppercase tracking-[0.25em] font-light">
        Rest &amp; Recover
      </p>

      {/* Circular countdown */}
      <div className="relative">
        <svg width="130" height="130" viewBox="0 0 130 130">
          {/* Outer decorative ring */}
          <circle
            cx="65"
            cy="65"
            r="60"
            stroke="#C9B37E"
            strokeWidth="1"
            fill="none"
            opacity="0.25"
          />
          {/* Background track */}
          <circle
            cx="65"
            cy="65"
            r={RADIUS}
            strokeWidth="8"
            stroke="#E8D5B0"
            fill="none"
          />
          {/* Progress arc */}
          <circle
            cx="65"
            cy="65"
            r={RADIUS}
            strokeWidth="8"
            stroke={isDone ? '#8B7355' : '#C9B37E'}
            fill="none"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform="rotate(-90 65 65)"
            style={{ transition: 'stroke-dashoffset 0.95s linear' }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {isDone ? (
            <span className="text-3xl text-gold-dark" aria-label="Complete">
              ✦
            </span>
          ) : (
            <>
              <span className="font-serif text-4xl text-near-black leading-none">
                {secondsLeft}
              </span>
              <span className="text-gold-dark text-xs mt-1">sec</span>
            </>
          )}
        </div>
      </div>

      {isDone ? (
        <p className="text-sm text-near-black/60 italic">Resuming…</p>
      ) : (
        <button
          onClick={onSkip}
          className="text-gold-dark text-xs underline underline-offset-4 hover:text-near-black transition-colors"
        >
          Skip rest
        </button>
      )}
    </div>
  )
}
