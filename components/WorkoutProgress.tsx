interface WorkoutProgressProps {
  current: number
  total: number
}

export default function WorkoutProgress({
  current,
  total,
}: WorkoutProgressProps) {
  const percentage = (current / total) * 100

  return (
    <div className="flex-1 flex flex-col gap-1.5 ml-3">
      <div className="flex justify-end">
        <span className="text-xs text-gold-dark tabular-nums">
          {current} <span className="opacity-50">/</span> {total}
        </span>
      </div>
      <div className="w-full h-1 bg-gold/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-gold rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={`Exercise ${current} of ${total}`}
        />
      </div>
    </div>
  )
}
