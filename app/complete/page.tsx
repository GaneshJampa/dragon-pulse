import Link from 'next/link'
import Logo from '@/components/Logo'

export default function CompletePage() {
  return (
    <main className="min-h-screen bg-parchment flex flex-col items-center justify-center px-6 py-16 paper-texture">
      <div className="w-full max-w-sm flex flex-col items-center gap-8 text-center">

        {/* Top ornament */}
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 h-px bg-gold/40" />
          <span className="text-gold text-base">✦</span>
          <div className="flex-1 h-px bg-gold/40" />
        </div>

        {/* Logo */}
        <Logo size={90} />

        {/* Title */}
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-4xl text-near-black">
            Workout Complete
          </h1>
          <p className="text-gold-dark text-xs uppercase tracking-[0.3em]">
            Discipline completed for today
          </p>
        </div>

        {/* Mid divider */}
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 h-px bg-gold/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
          <div className="flex-1 h-px bg-gold/30" />
        </div>

        {/* Quote card */}
        <div className="w-full bg-parchment-light border border-gold/20 rounded-sm p-6">
          <p className="font-serif text-base text-near-black/80 leading-8 italic">
            &ldquo;Absorb what is useful. Discard what is useless. And add what
            is specifically your own.&rdquo;
          </p>
          <p className="mt-3 text-gold-dark text-xs uppercase tracking-widest">
            — Bruce Lee
          </p>
        </div>

        {/* Session summary */}
        <div className="grid grid-cols-3 gap-3 w-full">
          {[
            { label: 'Exercises', value: '14' },
            { label: 'Sets', value: '52' },
            { label: 'Reps', value: 'Varies' },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-parchment-light border border-gold/20 rounded-sm p-4 text-center"
            >
              <p className="text-gold-dark text-xs uppercase tracking-wider mb-1">
                {label}
              </p>
              <p className="font-serif text-2xl text-near-black">{value}</p>
            </div>
          ))}
        </div>

        {/* Return home */}
        <Link
          href="/"
          className="w-full bg-gold text-near-black font-semibold py-4 px-8 text-center uppercase tracking-[0.2em] text-sm hover:bg-gold-dark hover:text-parchment transition-colors duration-300 rounded-sm shadow-sm"
        >
          Return Home
        </Link>

        {/* Train again shortcut */}
        <Link
          href="/workout"
          className="text-gold-dark text-xs underline underline-offset-4 hover:text-near-black transition-colors"
        >
          Train again today →
        </Link>

        {/* Bottom ornament */}
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 h-px bg-gold/40" />
          <span className="text-gold text-base">✦</span>
          <div className="flex-1 h-px bg-gold/40" />
        </div>

      </div>
    </main>
  )
}
