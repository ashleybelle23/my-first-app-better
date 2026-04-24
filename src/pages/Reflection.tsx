import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser, saveUser, saveJournalEntry, generateId } from '../utils/storage'
import { getPathById } from '../data/paths'
import Button from '../components/Button'

type Step = 'scripture' | 'teaching' | 'reflection' | 'prayer' | 'complete'

const steps: Step[] = ['scripture', 'teaching', 'reflection', 'prayer', 'complete']

export default function Reflection() {
  const navigate = useNavigate()
  const user = getUser()
  const path = user ? getPathById(user.currentPathId) : null
  const day = path?.days.find(d => d.day === (user?.currentDay ?? 1))

  const [step, setStep] = useState<Step>('scripture')
  const [journalText, setJournalText] = useState('')
  const [prayerText, setPrayerText] = useState('')

  if (!user || !path || !day) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
        <p className="text-stone-500">No active path found.</p>
        <Button onClick={() => navigate('/home')}>Go home</Button>
      </div>
    )
  }

  const stepIndex = steps.indexOf(step)
  const progress = ((stepIndex) / (steps.length - 1)) * 100

  const handleComplete = () => {
    if (journalText.trim()) {
      saveJournalEntry({
        id: generateId(),
        date: new Date().toISOString(),
        pathId: path.id,
        pathTitle: path.title,
        day: user.currentDay,
        prompt: day.reflectionQuestion,
        response: journalText,
        theme: day.title,
      })
    }

    const completedKey = `${user.currentPathId}-${user.currentDay}`
    const newCompleted = user.completedDays.includes(completedKey)
      ? user.completedDays
      : [...user.completedDays, completedKey]

    const nextDay = user.currentDay < path.days.length ? user.currentDay + 1 : user.currentDay

    saveUser({
      ...user,
      currentDay: nextDay,
      completedDays: newCompleted,
    })

    setStep('complete')
  }

  const next = () => {
    const idx = steps.indexOf(step)
    if (idx < steps.length - 1) setStep(steps[idx + 1])
  }

  const back = () => {
    const idx = steps.indexOf(step)
    if (idx > 0) setStep(steps[idx - 1])
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAF7F2' }}>
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center gap-4">
        <button onClick={() => navigate('/home')} className="p-2 -ml-2 text-stone-400 hover:text-stone-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <div className="flex-1">
          <p className="text-xs text-stone-400">Day {user.currentDay} · {path.title}</p>
          <h1 className="text-base font-semibold" style={{ color: '#1B2B4B' }}>{day.title}</h1>
        </div>
      </div>

      {/* Progress bar */}
      {step !== 'complete' && (
        <div className="px-5 mb-2">
          <div className="w-full bg-stone-200 rounded-full h-1">
            <div className="h-1 rounded-full transition-all duration-500" style={{ width: `${progress}%`, backgroundColor: '#C9A84C' }} />
          </div>
          <div className="flex justify-between mt-1">
            {['Scripture', 'Teaching', 'Reflect', 'Prayer'].map((label, i) => (
              <span key={label} className="text-[10px]" style={{ color: i <= stepIndex ? '#C9A84C' : '#D6CEC5' }}>
                {label}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 px-5 pb-28 max-w-lg mx-auto w-full">

        {/* Scripture */}
        {step === 'scripture' && (
          <div className="flex flex-col gap-5 pt-4 animate-fade-in-up">
            <div className="rounded-3xl p-8 text-center"
              style={{ background: 'linear-gradient(160deg, #1B2B4B 0%, #2D4A6E 100%)' }}>
              <p className="text-xs tracking-widest uppercase mb-4" style={{ color: '#C9A84C' }}>
                {day.scriptureRef}
              </p>
              <p className="text-white/90 text-xl font-light italic leading-relaxed">
                "{day.scripture}"
              </p>
            </div>

            <div className="rounded-2xl p-5 bg-white border border-stone-100">
              <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: '#C9A84C' }}>
                Context
              </p>
              <p className="text-stone-600 text-sm leading-relaxed">{day.scriptureContext}</p>
            </div>

            <div className="rounded-2xl p-4 border border-stone-100" style={{ backgroundColor: '#FAF7F2' }}>
              <p className="text-xs text-stone-400 italic">
                Read the verse again with this context in mind. Notice if it lands differently.
              </p>
            </div>

            <Button onClick={next} fullWidth className="py-4">
              Continue to teaching →
            </Button>
          </div>
        )}

        {/* Teaching */}
        {step === 'teaching' && (
          <div className="flex flex-col gap-6 pt-4 animate-fade-in-up">
            <div>
              <p className="text-xs uppercase tracking-widest font-medium mb-3" style={{ color: '#C9A84C' }}>
                Teaching
              </p>
              <h2 className="text-xl font-semibold mb-4" style={{ color: '#1B2B4B' }}>{day.title}</h2>
              <p className="text-stone-600 leading-relaxed text-base">{day.teaching}</p>
            </div>
            <div className="rounded-2xl p-4 border-l-4" style={{ backgroundColor: '#F0F4FF', borderColor: '#1B2B4B' }}>
              <p className="text-xs uppercase tracking-widest font-medium mb-1.5" style={{ color: '#1B2B4B' }}>
                Practice for today
              </p>
              <p className="text-stone-600 text-sm leading-relaxed">{day.practice}</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={back} variant="secondary" className="flex-1 py-4">← Back</Button>
              <Button onClick={next} className="flex-2 py-4 flex-1">Reflect →</Button>
            </div>
          </div>
        )}

        {/* Reflection */}
        {step === 'reflection' && (
          <div className="flex flex-col gap-5 pt-4 animate-fade-in-up">
            <div>
              <p className="text-xs uppercase tracking-widest font-medium mb-3" style={{ color: '#C9A84C' }}>
                Reflection
              </p>
              <p className="text-lg font-medium leading-snug" style={{ color: '#1B2B4B' }}>
                {day.reflectionQuestion}
              </p>
            </div>
            <div>
              <p className="text-xs text-stone-400 mb-2">Your thoughts (optional)</p>
              <textarea
                value={journalText}
                onChange={e => setJournalText(e.target.value)}
                placeholder="Write freely. This is just for you."
                rows={7}
                className="w-full rounded-2xl border border-stone-200 bg-white p-4 text-stone-700 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-stone-300 placeholder:text-stone-300"
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={back} variant="secondary" className="flex-1 py-4">← Back</Button>
              <Button onClick={next} className="flex-1 py-4">Prayer →</Button>
            </div>
          </div>
        )}

        {/* Prayer */}
        {step === 'prayer' && (
          <div className="flex flex-col gap-5 pt-4 animate-fade-in-up">
            <div>
              <p className="text-xs uppercase tracking-widest font-medium mb-3" style={{ color: '#C9A84C' }}>
                Prayer
              </p>
              <div className="rounded-2xl p-5 bg-white border border-stone-100">
                <p className="text-xs text-stone-400 mb-2">A prompt to pray</p>
                <p className="text-stone-600 italic leading-relaxed">{day.prayerPrompt}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-stone-400 mb-2">Write your own prayer (optional)</p>
              <textarea
                value={prayerText}
                onChange={e => setPrayerText(e.target.value)}
                placeholder="Pray in your own words..."
                rows={5}
                className="w-full rounded-2xl border border-stone-200 bg-white p-4 text-stone-700 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-stone-300 placeholder:text-stone-300"
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={back} variant="secondary" className="flex-1 py-4">← Back</Button>
              <Button onClick={handleComplete} className="flex-1 py-4">Mark complete ✓</Button>
            </div>
          </div>
        )}

        {/* Complete */}
        {step === 'complete' && (
          <div className="flex flex-col items-center justify-center text-center gap-8 pt-16 animate-fade-in-up">
            <div className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#C9A84C' }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path d="M5 12l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold" style={{ color: '#1B2B4B' }}>Day {user.currentDay - 1 || user.currentDay} complete.</h2>
              <p className="text-stone-500 leading-relaxed text-base max-w-xs">
                You showed up today. That's what this is about — not perfection, just presence.
              </p>
            </div>
            <div className="w-full max-w-xs space-y-3">
              <Button onClick={() => navigate('/home')} fullWidth className="py-4">
                Back to home
              </Button>
              <Button onClick={() => navigate('/paths')} variant="secondary" fullWidth className="py-4">
                Explore other paths
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
