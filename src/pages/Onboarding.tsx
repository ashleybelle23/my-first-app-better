import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Seeking, DailyRhythm } from '../types'
import { saveUser } from '../utils/storage'
import { getRecommendedPaths } from '../data/paths'
import Button from '../components/Button'

const seekingOptions: { id: Seeking; label: string; description: string; emoji: string }[] = [
  { id: 'peace', label: 'Peace', description: 'Quiet the noise and find rest', emoji: '🕊' },
  { id: 'purpose', label: 'Purpose', description: 'Understand why I\'m here', emoji: '✦' },
  { id: 'healing', label: 'Healing', description: 'Move through pain or grief', emoji: '♡' },
  { id: 'prayer', label: 'Prayer', description: 'Learn to talk to God', emoji: '◈' },
  { id: 'teachings', label: 'His Teachings', description: 'Understand what Jesus said', emoji: '📖' },
  { id: 'loving', label: 'Becoming More Loving', description: 'Love others and myself better', emoji: '✿' },
]

const rhythmOptions: { value: DailyRhythm; label: string; description: string }[] = [
  { value: 5, label: '5 minutes', description: 'Quick daily check-in' },
  { value: 10, label: '10 minutes', description: 'Balanced daily practice' },
  { value: 15, label: '15 minutes', description: 'Deeper daily engagement' },
]

type Step = 'welcome' | 'seeking' | 'rhythm' | 'ready'

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('welcome')
  const [seeking, setSeeking] = useState<Seeking[]>([])
  const [rhythm, setRhythm] = useState<DailyRhythm>(10)

  const toggleSeeking = (id: Seeking) => {
    setSeeking(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const handleFinish = () => {
    const recommended = getRecommendedPaths(seeking)
    const firstPath = recommended[0] || { id: 'follow-jesus-30' }
    saveUser({
      seeking,
      rhythm,
      currentPathId: firstPath.id,
      currentDay: 1,
      completedDays: [],
      onboardingComplete: true,
    })
    navigate('/home')
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAF7F2' }}>
      {/* Progress dots */}
      {step !== 'welcome' && (
        <div className="flex justify-center gap-2 pt-12 pb-4">
          {(['seeking', 'rhythm', 'ready'] as Step[]).map(s => (
            <div key={s} className="w-2 h-2 rounded-full transition-all"
              style={{
                backgroundColor: ['seeking', 'rhythm', 'ready'].indexOf(s) <= ['seeking', 'rhythm', 'ready'].indexOf(step)
                  ? '#1B2B4B' : '#D6CEC5'
              }} />
          ))}
        </div>
      )}

      <div className="flex-1 flex flex-col px-6 pb-10 max-w-lg mx-auto w-full">

        {/* Step: Welcome */}
        {step === 'welcome' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-8 animate-fade-in-up">
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#1B2B4B' }}>
              <span className="text-2xl text-white">✦</span>
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold leading-snug" style={{ color: '#1B2B4B' }}>
                Welcome.<br />You're in the right place.
              </h1>
              <p className="text-stone-500 leading-relaxed text-base">
                This app will help you build a simple daily practice of following Jesus — wherever you are in your journey.
              </p>
            </div>
            <Button onClick={() => setStep('seeking')} fullWidth className="mt-4 py-4 text-base">
              Let's get started
            </Button>
          </div>
        )}

        {/* Step: What are you seeking */}
        {step === 'seeking' && (
          <div className="flex-1 flex flex-col gap-6 pt-8 animate-fade-in-up">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold leading-snug" style={{ color: '#1B2B4B' }}>
                What are you seeking?
              </h2>
              <p className="text-stone-500 text-sm">Choose everything that resonates. There's no wrong answer.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 flex-1">
              {seekingOptions.map(opt => {
                const selected = seeking.includes(opt.id)
                return (
                  <button
                    key={opt.id}
                    onClick={() => toggleSeeking(opt.id)}
                    className="flex flex-col items-start gap-2 p-4 rounded-2xl border-2 text-left transition-all"
                    style={{
                      borderColor: selected ? '#1B2B4B' : '#E5DDD5',
                      backgroundColor: selected ? '#1B2B4B' : 'white',
                    }}
                  >
                    <span className="text-xl">{opt.emoji}</span>
                    <div>
                      <div className="font-medium text-sm" style={{ color: selected ? 'white' : '#1B2B4B' }}>
                        {opt.label}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: selected ? 'rgba(255,255,255,0.6)' : '#8B7E74' }}>
                        {opt.description}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            <Button
              onClick={() => setStep('rhythm')}
              disabled={seeking.length === 0}
              fullWidth className="py-4 text-base"
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step: Daily rhythm */}
        {step === 'rhythm' && (
          <div className="flex-1 flex flex-col gap-6 pt-8 animate-fade-in-up">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold" style={{ color: '#1B2B4B' }}>
                How much time each day?
              </h2>
              <p className="text-stone-500 text-sm">You can change this anytime. Any amount is enough to start.</p>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              {rhythmOptions.map(opt => {
                const selected = rhythm === opt.value
                return (
                  <button
                    key={opt.value}
                    onClick={() => setRhythm(opt.value)}
                    className="flex items-center justify-between p-5 rounded-2xl border-2 transition-all text-left"
                    style={{
                      borderColor: selected ? '#1B2B4B' : '#E5DDD5',
                      backgroundColor: selected ? '#1B2B4B' : 'white',
                    }}
                  >
                    <div>
                      <div className="font-semibold text-base" style={{ color: selected ? 'white' : '#1B2B4B' }}>
                        {opt.label}
                      </div>
                      <div className="text-sm mt-0.5" style={{ color: selected ? 'rgba(255,255,255,0.6)' : '#8B7E74' }}>
                        {opt.description}
                      </div>
                    </div>
                    {selected && (
                      <div className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: '#C9A84C' }}>
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            <Button onClick={() => setStep('ready')} fullWidth className="py-4 text-base">
              Continue
            </Button>
          </div>
        )}

        {/* Step: Ready */}
        {step === 'ready' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-8 animate-fade-in-up">
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#C9A84C' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M5 12l4 4L19 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold" style={{ color: '#1B2B4B' }}>
                Your path is ready.
              </h2>
              <p className="text-stone-500 leading-relaxed text-base max-w-xs">
                We've put together a personalized journey based on what you're seeking. It starts simple. You just show up.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-5 w-full border border-stone-100 text-left space-y-3">
              <p className="text-xs uppercase tracking-widest font-medium" style={{ color: '#C9A84C' }}>
                Your daily practice
              </p>
              <div className="space-y-2">
                {[
                  'A scripture to sit with',
                  'A short teaching',
                  'A reflection question',
                  'A prayer to pray',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#C9A84C' }} />
                    <span className="text-sm text-stone-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <Button onClick={handleFinish} fullWidth className="py-4 text-base">
              Begin Day 1
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
