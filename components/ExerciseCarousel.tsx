'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface ExerciseCarouselProps {
  exerciseId: string
  exerciseName: string
  steps: string[]
}

export default function ExerciseCarousel({
  exerciseId,
  exerciseName,
  steps,
}: ExerciseCarouselProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [imgErrors, setImgErrors] = useState<boolean[]>([false, false, false])

  useEffect(() => {
    setCurrentStep(0)
    setImgErrors([false, false, false])
  }, [exerciseId])

  const stepImages = [
    `/images/exercises/${exerciseId}_step1.png`,
    `/images/exercises/${exerciseId}_step2.png`,
    `/images/exercises/${exerciseId}_step3.png`,
  ]

  const handlePrev = () => setCurrentStep((p) => Math.max(0, p - 1))
  const handleNext = () => setCurrentStep((p) => Math.min(2, p + 1))

  const handleImgError = (index: number) => {
    setImgErrors((prev) => {
      const next = [...prev]
      next[index] = true
      return next
    })
  }

  return (
    <div className="w-full select-none">
      {/* Image stage */}
      <div className="relative w-full overflow-hidden rounded-sm border border-gold/25 bg-parchment-light">
        {/* Slide track */}
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${(currentStep * 100) / 3}%)`,
            width: '300%',
          }}
        >
          {stepImages.map((src, i) => (
            <div
              key={i}
              className="relative flex-shrink-0"
              style={{ width: '33.333%' }}
            >
              <div className="aspect-[3/4] relative">
                {imgErrors[i] ? (
                  /* Fallback placeholder when image is missing */
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
                    <div className="w-16 h-16 rounded-full border-2 border-gold/40 flex items-center justify-center">
                      <span className="text-gold text-xl font-serif">
                        {i + 1}
                      </span>
                    </div>
                    <p className="text-center text-xs text-near-black/50 leading-relaxed">
                      {exerciseName}
                    </p>
                  </div>
                ) : (
                  <Image
                    src={src}
                    alt={`${exerciseName} — step ${i + 1}`}
                    fill
                    className="object-contain p-3"
                    onError={() => handleImgError(i)}
                    unoptimized
                  />
                )}
              </div>
              {/* Step badge */}
              <span className="absolute top-2.5 right-2.5 bg-gold/90 text-near-black text-xs font-semibold px-2 py-0.5 rounded-sm">
                {i + 1} / 3
              </span>
            </div>
          ))}
        </div>

        {/* Prev arrow */}
        {currentStep > 0 && (
          <button
            onClick={handlePrev}
            aria-label="Previous step"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-parchment/80 border border-gold/30 flex items-center justify-center text-gold-dark text-lg leading-none hover:bg-parchment transition-colors shadow-sm"
          >
            ‹
          </button>
        )}

        {/* Next arrow */}
        {currentStep < 2 && (
          <button
            onClick={handleNext}
            aria-label="Next step"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-parchment/80 border border-gold/30 flex items-center justify-center text-gold-dark text-lg leading-none hover:bg-parchment transition-colors shadow-sm"
          >
            ›
          </button>
        )}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-3" role="tablist">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === currentStep}
            aria-label={`Step ${i + 1}`}
            onClick={() => setCurrentStep(i)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              i === currentStep
                ? 'bg-gold scale-125'
                : 'bg-gold/30 hover:bg-gold/50'
            }`}
          />
        ))}
      </div>

      {/* Step description */}
      <div className="mt-4 px-1 min-h-[3.5rem]">
        <p className="text-sm text-near-black/75 leading-relaxed">
          <span className="font-semibold text-gold-dark">
            Step {currentStep + 1}:{' '}
          </span>
          {steps[currentStep]}
        </p>
      </div>
    </div>
  )
}
