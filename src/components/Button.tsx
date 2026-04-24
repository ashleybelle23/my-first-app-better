import type { ReactNode, CSSProperties } from 'react'

interface Props {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit'
  fullWidth?: boolean
  style?: CSSProperties
}

export default function Button({
  children, onClick, variant = 'primary', className = '',
  disabled, type = 'button', fullWidth, style
}: Props) {
  const base = 'inline-flex items-center justify-center rounded-2xl font-medium transition-all text-sm py-3.5 px-6 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'text-white shadow-sm active:scale-95',
    secondary: 'bg-stone-100 text-stone-700 hover:bg-stone-200 active:scale-95',
    ghost: 'text-stone-500 hover:text-stone-700 hover:bg-stone-50 active:scale-95',
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      style={style ?? (variant === 'primary' ? { backgroundColor: '#1B2B4B' } : undefined)}
    >
      {children}
    </button>
  )
}
