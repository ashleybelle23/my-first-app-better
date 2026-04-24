import { useNavigate } from 'react-router-dom'
import { getUser } from '../utils/storage'
import { getPathById } from '../data/paths'
import Card from '../components/Card'
import Button from '../components/Button'
import ProgressBar from '../components/ProgressBar'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Home() {
  const navigate = useNavigate()
  const user = getUser()
  const path = user ? getPathById(user.currentPathId) : null
  const day = path?.days.find(d => d.day === (user?.currentDay ?? 1))
  const completed = user?.completedDays ?? []

  if (!user || !path || !day) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
        <p className="text-stone-500">No active path found.</p>
        <Button onClick={() => navigate('/onboarding')}>Start your journey</Button>
      </div>
    )
  }

  const dayLabel = `Day ${user.currentDay}: ${day.title}`
  const progress = completed.length
  const isCompleted = completed.includes(`${user.currentPathId}-${user.currentDay}`)

  return (
    <div className="flex-1 flex flex-col gap-5 px-5 pt-12 pb-28 max-w-lg mx-auto w-full">

      {/* Greeting */}
      <div className="animate-fade-in-up">
        <p className="text-sm text-stone-400 font-medium">{getGreeting()}</p>
        <h1 className="text-2xl font-semibold mt-0.5" style={{ color: '#1B2B4B' }}>
          {path.title}
        </h1>
      </div>

      {/* Today's card */}
      <Card className="overflow-hidden animate-fade-in-up delay-100">
        {/* Header gradient */}
        <div className="px-5 pt-5 pb-4" style={{
          background: 'linear-gradient(135deg, #1B2B4B 0%, #2D4A6E 100%)'
        }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#C9A84C' }}>
              Today
            </span>
            {isCompleted && (
              <span className="text-xs bg-white/20 text-white rounded-full px-2.5 py-0.5">
                ✓ Complete
              </span>
            )}
          </div>
          <h2 className="text-xl font-semibold text-white">{dayLabel}</h2>
          <p className="text-white/60 text-xs mt-1">{path.title}</p>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Scripture */}
          <div className="rounded-xl p-4" style={{ backgroundColor: '#FAF7F2' }}>
            <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: '#C9A84C' }}>
              Scripture
            </p>
            <p className="text-stone-700 text-sm italic leading-relaxed">"{day.scripture}"</p>
            <p className="text-stone-400 text-xs mt-1">— {day.scriptureRef}</p>
          </div>

          {/* Teaching */}
          <div>
            <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: '#8B7E74' }}>
              Teaching
            </p>
            <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">{day.teaching}</p>
          </div>

          {/* Practice */}
          <div className="rounded-xl p-4 border-l-4" style={{ backgroundColor: '#F0F4FF', borderColor: '#1B2B4B' }}>
            <p className="text-xs uppercase tracking-widest font-medium mb-1.5" style={{ color: '#1B2B4B' }}>
              Practice for today
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">{day.practice}</p>
          </div>

          <Button
            onClick={() => navigate('/reflection')}
            fullWidth
            className="py-3.5"
          >
            {isCompleted ? 'Review today\'s reflection' : 'Start today\'s reflection →'}
          </Button>
        </div>
      </Card>

      {/* Progress */}
      <Card className="p-5 animate-fade-in-up delay-200">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium" style={{ color: '#1B2B4B' }}>Your progress</p>
          <p className="text-xs text-stone-400">{progress} / {path.duration} days</p>
        </div>
        <ProgressBar current={progress} total={path.duration} />
        <p className="text-xs text-stone-400 mt-3">
          {path.duration - progress > 0
            ? `${path.duration - progress} days remaining in ${path.title}`
            : 'Path complete! 🎉'}
        </p>
      </Card>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3 animate-fade-in-up delay-300">
        <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/prayer')}>
          <p className="text-xl mb-2">🙏</p>
          <p className="text-sm font-medium" style={{ color: '#1B2B4B' }}>Prayer</p>
          <p className="text-xs text-stone-400 mt-0.5">Write or review prayers</p>
        </Card>
        <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/journal')}>
          <p className="text-xl mb-2">📓</p>
          <p className="text-sm font-medium" style={{ color: '#1B2B4B' }}>Journal</p>
          <p className="text-xs text-stone-400 mt-0.5">Past reflections</p>
        </Card>
      </div>
    </div>
  )
}
