import type { ReactNode, CSSProperties } from 'react'

interface Props {
  children: ReactNode
  className?: string
  onClick?: () => void
  style?: CSSProperties
}

export default function Card({ children, className = '', onClick, style }: Props) {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`bg-white rounded-2xl shadow-sm border border-stone-100 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
