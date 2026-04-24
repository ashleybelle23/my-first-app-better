import { useState } from 'react'
import { getJournalEntries, formatDate } from '../utils/storage'
import Card from '../components/Card'

export default function Journal() {
  const [search, setSearch] = useState('')
  const entries = getJournalEntries()

  const filtered = entries.filter(e =>
    !search || e.response.toLowerCase().includes(search.toLowerCase()) ||
    e.theme.toLowerCase().includes(search.toLowerCase()) ||
    e.pathTitle.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex-1 flex flex-col px-5 pt-12 pb-28 max-w-lg mx-auto w-full">
      <div className="mb-5 animate-fade-in">
        <h1 className="text-2xl font-semibold" style={{ color: '#1B2B4B' }}>Journal</h1>
        <p className="text-stone-400 text-sm mt-1">Your reflections along the way.</p>
      </div>

      {entries.length > 0 && (
        <div className="mb-5 animate-fade-in">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search reflections..."
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-300 placeholder:text-stone-300"
          />
        </div>
      )}

      {filtered.length === 0 && search && (
        <div className="text-center py-12">
          <p className="text-stone-400 text-sm">No entries match "{search}"</p>
        </div>
      )}

      {entries.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-5 py-16 animate-fade-in">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
            style={{ backgroundColor: '#F0EDE8' }}>
            📓
          </div>
          <div className="space-y-2 max-w-xs">
            <h3 className="text-base font-semibold" style={{ color: '#1B2B4B' }}>
              Your journal is waiting
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              When you complete a daily reflection, your thoughts will be saved here. Start your first day to begin.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {filtered.map((entry, i) => (
          <Card key={entry.id} className="p-5 animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` } as React.CSSProperties}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="text-xs font-medium" style={{ color: '#C9A84C' }}>{entry.theme}</p>
                <p className="text-xs text-stone-400 mt-0.5">{entry.pathTitle} · Day {entry.day}</p>
              </div>
              <p className="text-xs text-stone-300 flex-shrink-0">{formatDate(entry.date)}</p>
            </div>
            <p className="text-xs text-stone-400 italic mb-2">"{entry.prompt}"</p>
            <p className="text-stone-600 text-sm leading-relaxed line-clamp-4">{entry.response}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
