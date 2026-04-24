import type { UserProfile, JournalEntry, Prayer } from '../types'

const KEYS = {
  USER: 'disciple_user',
  JOURNAL: 'disciple_journal',
  PRAYERS: 'disciple_prayers',
}

// User Profile
export const getUser = (): UserProfile | null => {
  const raw = localStorage.getItem(KEYS.USER)
  return raw ? JSON.parse(raw) : null
}

export const saveUser = (user: UserProfile): void => {
  localStorage.setItem(KEYS.USER, JSON.stringify(user))
}

export const clearUser = (): void => {
  localStorage.removeItem(KEYS.USER)
}

// Journal
export const getJournalEntries = (): JournalEntry[] => {
  const raw = localStorage.getItem(KEYS.JOURNAL)
  return raw ? JSON.parse(raw) : []
}

export const saveJournalEntry = (entry: JournalEntry): void => {
  const entries = getJournalEntries()
  const existing = entries.findIndex(e => e.id === entry.id)
  if (existing >= 0) {
    entries[existing] = entry
  } else {
    entries.unshift(entry)
  }
  localStorage.setItem(KEYS.JOURNAL, JSON.stringify(entries))
}

// Prayers
export const getPrayers = (): Prayer[] => {
  const raw = localStorage.getItem(KEYS.PRAYERS)
  return raw ? JSON.parse(raw) : []
}

export const savePrayer = (prayer: Prayer): void => {
  const prayers = getPrayers()
  const existing = prayers.findIndex(p => p.id === prayer.id)
  if (existing >= 0) {
    prayers[existing] = prayer
  } else {
    prayers.unshift(prayer)
  }
  localStorage.setItem(KEYS.PRAYERS, JSON.stringify(prayers))
}

export const deletePrayer = (id: string): void => {
  const prayers = getPrayers().filter(p => p.id !== id)
  localStorage.setItem(KEYS.PRAYERS, JSON.stringify(prayers))
}

export const generateId = (): string =>
  Math.random().toString(36).slice(2) + Date.now().toString(36)

export const formatDate = (iso: string): string => {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}
