interface Props {
  current: number
  total: number
  className?: string
}

export default function ProgressBar({ current, total, className = '' }: Props) {
  const pct = Math.min(100, Math.round((current / total) * 100))
  return (
    <div className={`w-full bg-stone-200 rounded-full h-1.5 ${className}`}>
      <div
        className="h-1.5 rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, backgroundColor: '#C9A84C' }}
      />
    </div>
  )
}
