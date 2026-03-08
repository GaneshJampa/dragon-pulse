interface LogoProps {
  size?: number
  className?: string
}

export default function Logo({ size = 80, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Dragon Pulse logo"
      role="img"
    >
      {/* Enso-style circular brush stroke — the dragon ring */}
      <circle
        cx="60"
        cy="60"
        r="50"
        stroke="#C9B37E"
        strokeWidth="5.5"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="285 28"
        strokeDashoffset="15"
      />

      {/* Dragon tail curling at the gap */}
      <path
        d="M 22 52 Q 14 60 18 70 Q 22 76 28 72"
        stroke="#C9B37E"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Small dragon detail — a subtle scale mark */}
      <circle cx="27" cy="71" r="2.5" fill="#C9B37E" opacity="0.7" />

      {/* Heartbeat / pulse line running through the center */}
      <path
        d="M 22 60
           L 35 60
           L 40 48
           L 46 73
           L 51 54
           L 57 66
           L 62 60
           L 70 60
           L 75 50
           L 80 60
           L 98 60"
        stroke="#C9B37E"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
