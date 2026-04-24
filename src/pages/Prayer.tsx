import { useState } from 'react'
import { getPrayers, savePrayer, deletePrayer, generateId, formatDate } from '../utils/storage'
import type { Prayer } from '../types'
import Card from '../components/Card'
import Button from '../components/Button'

const prompts = [
  'God, today I\'m grateful for...',
  'Lord, I need your help with...',
  'Jesus, I\'m struggling to trust you with...',
  'God, the people I want to pray for today are...',
  'Lord, show me where I\'m holding back from you.',
  'God, I\'m afraid of... help me trust you.',
  'Thank you for...',
]

export default function PrayerPage() {
  const [prayers, setPrayers] = useState<Prayer[]>(getPrayers)
  const [showForm, setShowForm] = useState(false)
  const [prayerText, setPrayerText] = useState('')
  const [, setUsedPrompt] = useState('')

  const refresh = () => setPrayers(getPrayers())

  const handleSave = () => {
    if (!prayerText.trim()) return
    const prayer: Prayer = {
      id: generateId(),
      date: new Date().toISOString(),
      text: prayerText,
      answered: false,
    }
    savePrayer(prayer)
    setPrayerText('')
    setUsedPrompt('')
    setShowForm(false)
    refresh()
  }

  const toggleAnswered = (prayer: Prayer) => {
    savePrayer({
      ...prayer,
      answered: !prayer.answered,
      answeredDate: !prayer.answered ? new Date().toISOString() : undefined,
    })
    refresh()
  }

  const handleDelete = (id: string) => {
    deletePrayer(id)
    refresh()
  }

  const usePrompt = (p: string) => {
    setUsedPrompt(p)
    setPrayerText(p + ' ')
    setShowForm(true)
  }

  const unanswered = prayers.filter(p => !p.answered)
  const answered = prayers.filter(p => p.answered)

  return (
    <div className="flex-1 flex flex-col px-5 pt-12 pb-28 max-w-lg mx-auto w-full">
      <div className="mb-5 animate-fade-in">
        <h1 className="text-2xl font-semibold" style={{ color: '#1B2B4B' }}>Prayer</h1>
        <p className="text-stone-400 text-sm mt-1">A quiet space to talk to God.</p>
      </div>

      {/* Write a prayer */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full rounded-2xl border-2 border-dashed border-stone-200 p-4 text-left text-stone-400 text-sm hover:border-stone-300 hover:text-stone-500 transition-all mb-5 animate-fade-in"
        >
          + Write a prayer...
        </button>
      ) : (
        <Card className="p-5 mb-5 animate-fade-in-up">
          <p className="text-xs uppercase tracking-widest font-medium mb-3" style={{ color: '#C9A84C' }}>
            New Prayer
          </p>
          <textarea
            value={prayerText}
            onChange={e => setPrayerText(e.target.value)}
            placeholder="Write your prayer..."
            rows={5}
            autoFocus
            className="w-full rounded-xl border border-stone-200 p-3 text-stone-700 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-stone-300 placeholder:text-stone-300 mb-3"
          />
          <div className="flex gap-3">
            <Button onClick={() => { setShowForm(false); setPrayerText('') }} variant="secondary" className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!prayerText.trim()} className="flex-1">
              Save prayer
            </Button>
          </div>
        </Card>
      )}

      {/* Guided prompts */}
      {!showForm && (
        <div className="mb-6 animate-fade-in delay-100">
          <p className="text-xs uppercase tracking-widest font-medium mb-3" style={{ color: '#8B7E74' }}>
            Guided prompts
          </p>
          <div className="flex flex-col gap-2">
            {prompts.slice(0, 4).map(p => (
              <button
                key={p}
                onClick={() => usePrompt(p)}
                className="text-left text-sm text-stone-500 bg-white rounded-xl px-4 py-3 border border-stone-100 hover:border-stone-200 hover:text-stone-700 transition-all"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active prayers */}
      {unanswered.length > 0 && (
        <div className="mb-6 animate-fade-in delay-200">
          <p className="text-xs uppercase tracking-widest font-medium mb-3" style={{ color: '#8B7E74' }}>
            Prayers ({unanswered.length})
          </p>
          <div className="flex flex-col gap-3">
            {unanswered.map(prayer => (
              <Card key={prayer.id} className="p-4">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleAnswered(prayer)}
                    className="w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 hover:border-green-400 transition-colors"
                    style={{ borderColor: '#D6CEC5' }}
                    title="Mark as answered"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-stone-600 text-sm leading-relaxed">{prayer.text}</p>
                    <p className="text-stone-300 text-xs mt-2">{formatDate(prayer.date)}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(prayer.id)}
                    className="text-stone-200 hover:text-stone-400 transition-colors flex-shrink-0 mt-0.5"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {prayers.length === 0 && !showForm && (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-5 py-8 animate-fade-in">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
            style={{ backgroundColor: '#F0EDE8' }}>
            🙏
          </div>
          <div className="space-y-2 max-w-xs">
            <h3 className="text-base font-semibold" style={{ color: '#1B2B4B' }}>
              Start a conversation
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              Prayer is just talking to God. No special words required. Use a prompt above or write freely.
            </p>
          </div>
        </div>
      )}

      {/* Answered prayers */}
      {answered.length > 0 && (
        <div className="animate-fade-in">
          <p className="text-xs uppercase tracking-widest font-medium mb-3" style={{ color: '#7A9E87' }}>
            Answered ✓ ({answered.length})
          </p>
          <div className="flex flex-col gap-3">
            {answered.map(prayer => (
              <Card key={prayer.id} className="p-4 opacity-60">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: '#7A9E87' }}>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-stone-500 text-sm leading-relaxed line-through">{prayer.text}</p>
                    <p className="text-stone-300 text-xs mt-1">Answered · {formatDate(prayer.answeredDate || prayer.date)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
