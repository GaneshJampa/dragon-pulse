import Link from 'next/link'
import Logo from '@/components/Logo'

export default function LandingPage() {
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
        <Logo size={110} />

        {/* Title block */}
        <div className="flex flex-col gap-3">
          <h1 className="font-serif text-5xl tracking-tight text-near-black">
            Dragon Pulse
          </h1>
          <p className="text-gold-dark text-xs uppercase tracking-[0.35em]">
            Strength through daily practice
          </p>
        </div>

        {/* Mid divider */}
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 h-px bg-gold/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
          <div className="flex-1 h-px bg-gold/30" />
        </div>

        {/* Intro paragraph */}
        <p className="text-near-black/65 text-sm leading-7 max-w-[260px]">
          A historical workout routine inspired by the discipline and daily
          practice of Bruce Lee.
        </p>

        {/* Primary CTA */}
        <Link
          href="/onboarding"
          className="w-full bg-gold text-near-black font-semibold py-4 px-8 text-center uppercase tracking-[0.2em] text-sm hover:bg-gold-dark hover:text-parchment transition-colors duration-300 rounded-sm shadow-sm"
        >
          Start Training
        </Link>

        {/* Bottom ornament */}
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 h-px bg-gold/40" />
          <span className="text-gold text-base">✦</span>
          <div className="flex-1 h-px bg-gold/40" />
        </div>

        {/* Subtle footer note */}
        <p className="text-near-black/30 text-xs">
          Fourteen exercises · Daily practice
        </p>

      </div>
    </main>
  )
}
