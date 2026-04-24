import { useNavigate } from 'react-router-dom'
import { paths } from '../data/paths'
import { getUser, saveUser } from '../utils/storage'
import Card from '../components/Card'
import ProgressBar from '../components/ProgressBar'

const difficultyColor: Record<string, string> = {
  'Beginner': '#7A9E87',
  'Intermediate': '#C9A84C',
  'All levels': '#8B7E74',
}

const gradients: Record<string, string> = {
  'follow-jesus-30': 'linear-gradient(135deg, #1B2B4B 0%, #2D4A6E 100%)',
  'peace-in-anxiety': 'linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)',
  'healing-forgiveness': 'linear-gradient(135deg, #9D4E6B 0%, #C47FA0 100%)',
  'learning-to-pray': 'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)',
  'more-loving': 'linear-gradient(135deg, #5B2D8A 0%, #8B5CF6 100%)',
  'purpose-calling': 'linear-gradient(135deg, #1B2B4B 0%, #3730A3 100%)',
}

export default function Paths() {
  const navigate = useNavigate()
  const user = getUser()

  const handleSelectPath = (pathId: string) => {
    if (!user) { navigate('/onboarding'); return }
    saveUser({ ...user, currentPathId: pathId, currentDay: 1 })
    navigate('/home')
  }

  return (
    <div className="flex-1 flex flex-col px-5 pt-12 pb-28 max-w-lg mx-auto w-full">
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-semibold" style={{ color: '#1B2B4B' }}>Discipleship Paths</h1>
        <p className="text-stone-400 text-sm mt-1">Choose a journey that resonates with where you are.</p>
      </div>

      <div className="flex flex-col gap-4">
        {paths.map((path, i) => {
          const isActive = user?.currentPathId === path.id
          const progress = isActive ? user.completedDays.length : 0

          return (
            <Card
              key={path.id}
              className={`overflow-hidden animate-fade-in-up ${isActive ? 'ring-2' : ''}`}
              style={{ animationDelay: `${i * 60}ms`, ...(isActive ? { '--tw-ring-color': '#C9A84C' } as React.CSSProperties : {}) }}
              onClick={() => handleSelectPath(path.id)}
            >
              {/* Header */}
              <div className="px-5 py-4 flex items-center gap-4"
                style={{ background: gradients[path.id] || gradients['follow-jesus-30'] }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}>
                  {path.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-white font-semibold text-base leading-tight">{path.title}</h2>
                    {isActive && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/20 text-white flex-shrink-0">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-white/60 text-xs mt-0.5">{path.duration} days</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <p className="text-stone-500 text-sm leading-relaxed">{path.description}</p>

                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: `${difficultyColor[path.difficulty]}20`, color: difficultyColor[path.difficulty] }}>
                    {path.difficulty}
                  </span>
                  {path.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs text-stone-400 capitalize">
                      #{tag}
                    </span>
                  ))}
                </div>

                {isActive && (
                  <div className="pt-1">
                    <div className="flex justify-between text-xs text-stone-400 mb-1.5">
                      <span>Progress</span>
                      <span>{progress}/{path.duration} days</span>
                    </div>
                    <ProgressBar current={progress} total={path.duration} />
                  </div>
                )}

                <div className="pt-1">
                  <button
                    className="text-sm font-medium"
                    style={{ color: '#1B2B4B' }}
                  >
                    {isActive ? 'Continue path →' : 'Start this path →'}
                  </button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
