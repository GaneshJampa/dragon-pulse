import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/Logo'
import exercisesData from '@/data/exercises.json'

const formatReps = (reps: string) =>
  reps === 'to_failure' ? 'Max' : reps

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-parchment flex flex-col items-center px-5 py-10">
      <div className="w-full max-w-sm flex flex-col items-center gap-7">

        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center w-full">
          <Logo size={52} />
          <h2 className="font-serif text-3xl text-near-black">Training Protocol</h2>
          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-px bg-gold/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
            <div className="flex-1 h-px bg-gold/40" />
          </div>
        </div>

        {/* Historical workout sheet */}
        <div className="w-full rounded-sm overflow-hidden border border-gold/30 bg-parchment-light shadow-sm">
          <div className="w-full aspect-[3/4] relative">
            <Image
              src="/assets/brucelee_workout_sheet.png"
              alt="Historical workout training sheet"
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Context text */}
        <div className="text-center flex flex-col gap-3 px-1">
          <p className="text-near-black/80 text-sm leading-7">
            You are about to follow a historical workout routine practiced by
            Bruce Lee.
          </p>
          <p className="text-near-black/50 text-xs leading-relaxed">
            {exercisesData.length} exercises across arms, legs, chest and core.
            Focus on form over weight. Rest between sets as instructed.
          </p>
        </div>

        {/* Exercise list */}
        <div className="w-full bg-parchment-light border border-gold/20 rounded-sm p-5">
          <p className="text-gold-dark text-xs uppercase tracking-[0.25em] mb-4">
            Today&apos;s Protocol
          </p>
          <ol className="space-y-2.5">
            {exercisesData.map((ex, i) => (
              <li
                key={ex.exercise_id}
                className="flex items-center gap-3 text-sm text-near-black/80"
              >
                <span className="w-5 h-5 rounded-full border border-gold/50 flex items-center justify-center text-xs text-gold-dark flex-shrink-0 font-serif">
                  {i + 1}
                </span>
                <span>{ex.name}</span>
                <span className="ml-auto text-xs text-near-black/30 tabular-nums">
                  {ex.sets} × {formatReps(ex.reps)}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Begin button */}
        <Link
          href="/workout"
          className="w-full bg-gold text-near-black font-semibold py-4 px-8 text-center uppercase tracking-[0.2em] text-sm hover:bg-gold-dark hover:text-parchment transition-colors duration-300 rounded-sm shadow-sm"
        >
          Begin Workout
        </Link>

        <Link
          href="/"
          className="text-gold-dark text-xs underline underline-offset-4 hover:text-near-black transition-colors"
        >
          ← Return Home
        </Link>

      </div>
    </main>
  )
}
