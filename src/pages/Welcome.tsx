import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-12"
      style={{ background: 'linear-gradient(160deg, #1B2B4B 0%, #2D4A6E 50%, #3D6B5E 100%)' }}>

      {/* Top ornament */}
      <div className="flex flex-col items-center gap-2 animate-fade-in">
        <div className="w-12 h-12 rounded-full flex items-center justify-center border border-white/20"
          style={{ backgroundColor: 'rgba(201,168,76,0.15)' }}>
          <span className="text-2xl" style={{ color: '#C9A84C' }}>✦</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center text-center gap-6 animate-fade-in-up">
        <div className="space-y-1">
          <p className="text-sm tracking-[0.2em] uppercase font-medium" style={{ color: '#C9A84C' }}>
            Daily Discipleship
          </p>
          <h1 className="text-4xl font-light text-white leading-tight">
            Walk with<br />
            <span className="font-semibold">Jesus</span>
          </h1>
        </div>

        <p className="text-white/60 text-base leading-relaxed max-w-xs">
          A simple daily practice for following Jesus — through scripture, reflection, prayer, and real life.
        </p>

        <div className="flex flex-col gap-3 w-full max-w-xs mt-2">
          <Button
            onClick={() => navigate('/onboarding')}
            className="py-4 text-base"
            style={{ backgroundColor: '#C9A84C', color: '#1B2B4B', fontWeight: 600 }}
          >
            Begin your journey
          </Button>
          <button
            onClick={() => navigate('/home')}
            className="text-white/50 text-sm py-2 hover:text-white/70 transition-colors"
          >
            I already have an account
          </button>
        </div>
      </div>

      {/* Bottom verse */}
      <div className="text-center animate-fade-in delay-300">
        <p className="text-white/40 text-xs italic leading-relaxed">
          "Come, follow me."
        </p>
        <p className="text-white/25 text-xs mt-1">Matthew 4:19</p>
      </div>
    </div>
  )
}
