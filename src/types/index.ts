export type Seeking =
  | 'peace'
  | 'purpose'
  | 'healing'
  | 'prayer'
  | 'teachings'
  | 'loving'

export type DailyRhythm = 5 | 10 | 15

export interface DayContent {
  day: number
  title: string
  scripture: string
  scriptureRef: string
  scriptureContext: string
  teaching: string
  practice: string
  reflectionQuestion: string
  prayerPrompt: string
}

export interface Path {
  id: string
  title: string
  description: string
  duration: number
  difficulty: 'Beginner' | 'Intermediate' | 'All levels'
  tags: Seeking[]
  days: DayContent[]
  color: string
  icon: string
}

export interface JournalEntry {
  id: string
  date: string
  pathId: string
  pathTitle: string
  day: number
  prompt: string
  response: string
  theme: string
}

export interface Prayer {
  id: string
  date: string
  text: string
  answered: boolean
  answeredDate?: string
}

export interface UserProfile {
  seeking: Seeking[]
  rhythm: DailyRhythm
  currentPathId: string
  currentDay: number
  completedDays: string[]
  onboardingComplete: boolean
  name?: string
}
