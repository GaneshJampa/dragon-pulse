'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import exercisesData from '@/data/exercises.json'
import Logo from '@/components/Logo'
import RestTimer from '@/components/RestTimer'
import ExerciseCarousel from '@/components/ExerciseCarousel'
import WorkoutProgress from '@/components/WorkoutProgress'

type Phase = 'exercise' | 'resting'

interface WorkoutState {
  exerciseIndex: number
  currentSet: number
  phase: Phase
}

export default function WorkoutPage() {
  const router = useRouter()
  const [state, setState] = useState<WorkoutState>({
    exerciseIndex: 0,
    currentSet: 1,
    phase: 'exercise',
  })

  const exercises = exercisesData
  const exercise = exercises[state.exerciseIndex]
  const isLastExercise = state.exerciseIndex === exercises.length - 1
  const isLastSet = state.currentSet === exercise.sets

  const handleCompleteSet = useCallback(() => {
    // Last set of the last exercise — mark done and go to completion
    if (isLastSet && isLastExercise) {
      localStorage.setItem('dragon_pulse_last_workout', new Date().toISOString())
      router.push('/complete')
      return
    }
    // Otherwise start the rest timer
    setState((prev) => ({ ...prev, phase: 'resting' }))
  }, [isLastSet, isLastExercise, router])

  const handleRestComplete = useCallback(() => {
    setState((prev) => {
      if (isLastSet) {
        // Move to next exercise
        return {
          exerciseIndex: prev.exerciseIndex + 1,
          currentSet: 1,
          phase: 'exercise',
        }
      }
      // Next set of the same exercise
      return {
        ...prev,
        currentSet: prev.currentSet + 1,
        phase: 'exercise',
      }
    })
  }, [isLastSet])

  const handleSkipExercise = useCallback(() => {
    if (isLastExercise) {
      localStorage.setItem('dragon_pulse_last_workout', new Date().toISOString())
      router.push('/complete')
    } else {
      setState({
        exerciseIndex: state.exerciseIndex + 1,
        currentSet: 1,
        phase: 'exercise',
      })
    }
  }, [isLastExercise, state.exerciseIndex, router])

  /* ── Rest screen ── */
  if (state.phase === 'resting') {
    const nextLabel = isLastSet
      ? exercises[state.exerciseIndex + 1]?.name ?? 'Completion'
      : `Set ${state.currentSet + 1} of ${exercise.sets}`

    return (
      <main className="min-h-screen bg-parchment flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm flex flex-col items-center gap-6 text-center">

          <Logo size={48} />

          {/* Completed set info */}
          <div>
            <p className="text-gold-dark text-xs uppercase tracking-[0.25em] mb-1">
              Set Complete
            </p>
            <h2 className="font-serif text-2xl text-near-black">{exercise.name}</h2>
            <p className="text-sm text-near-black/50 mt-1">
              Set {state.currentSet} of {exercise.sets}
            </p>
          </div>

          {/* Circular rest timer */}
          <RestTimer
            totalSeconds={exercise.rest_seconds}
            onComplete={handleRestComplete}
            onSkip={handleRestComplete}
          />

          {/* Next up label */}
          <div className="flex items-center gap-2 text-near-black/40 text-xs">
            <span>Next:</span>
            <span className="text-near-black/60">{nextLabel}</span>
          </div>

        </div>
      </main>
    )
  }

  /* ── Exercise screen ── */
  return (
    <main className="min-h-screen bg-parchment flex flex-col pb-8">
      <div className="w-full max-w-sm mx-auto flex flex-col gap-5 px-5 pt-7">

        {/* Top bar */}
        <div className="flex items-center">
          <Logo size={34} />
          <WorkoutProgress
            current={state.exerciseIndex + 1}
            total={exercises.length}
          />
        </div>

        {/* Exercise card */}
        <div className="bg-parchment-light border border-gold/20 rounded-sm shadow-sm overflow-hidden">

          {/* Card header */}
          <div className="px-5 pt-5 pb-4 border-b border-gold/15">
            <p className="text-gold-dark text-xs uppercase tracking-[0.2em] mb-1.5">
              Exercise {state.exerciseIndex + 1} of {exercises.length}
            </p>
            <h1 className="font-serif text-3xl text-near-black leading-tight">
              {exercise.name}
            </h1>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-3 divide-x divide-gold/15 border-b border-gold/15">
            {[
              { label: 'Sets', value: exercise.sets },
              { label: 'Reps', value: exercise.reps === 'to_failure' ? 'Max' : exercise.reps },
              { label: 'Weight', value: exercise.recommended_weight.charAt(0).toUpperCase() + exercise.recommended_weight.slice(1) },
            ].map(({ label, value }) => (
              <div key={label} className="py-3 text-center">
                <p className="text-xs text-gold-dark uppercase tracking-wider mb-0.5">
                  {label}
                </p>
                <p className="font-serif text-lg text-near-black">{value}</p>
              </div>
            ))}
          </div>

          {/* Illustration carousel */}
          <div className="px-5 pt-5">
            <ExerciseCarousel
              exerciseId={exercise.exercise_id}
              exerciseName={exercise.name}
              steps={exercise.steps}
            />
          </div>

          {/* Description */}
          <div className="px-5 py-4 mt-1 border-t border-gold/15">
            <p className="text-xs text-near-black/60 leading-relaxed">
              {exercise.description}
            </p>
          </div>

        </div>

        {/* Set progress dots */}
        <div className="flex items-center justify-center gap-2.5">
          {Array.from({ length: exercise.sets }, (_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i < state.currentSet - 1
                  ? 'w-3 h-3 bg-gold'
                  : i === state.currentSet - 1
                  ? 'w-3.5 h-3.5 bg-gold ring-2 ring-gold/30'
                  : 'w-3 h-3 bg-gold/20'
              }`}
            />
          ))}
          <span className="text-xs text-gold-dark ml-1">
            Set {state.currentSet} of {exercise.sets}
          </span>
        </div>

        {/* Primary action */}
        <button
          onClick={handleCompleteSet}
          className="w-full bg-gold text-near-black font-semibold py-4 px-8 uppercase tracking-[0.2em] text-sm hover:bg-gold-dark hover:text-parchment transition-colors duration-300 rounded-sm shadow-sm active:scale-[0.99]"
        >
          Complete Set {state.currentSet}
        </button>

        {/* Skip link */}
        <button
          onClick={handleSkipExercise}
          className="text-gold-dark text-xs text-center underline underline-offset-4 hover:text-near-black transition-colors"
        >
          Skip to next exercise →
        </button>

      </div>
    </main>
  )
}
