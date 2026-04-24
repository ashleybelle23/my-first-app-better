import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/home', label: 'Home', icon: HomeIcon },
  { to: '/paths', label: 'Paths', icon: PathsIcon },
  { to: '/journal', label: 'Journal', icon: JournalIcon },
  { to: '/prayer', label: 'Prayer', icon: PrayerIcon },
  { to: '/community', label: 'Together', icon: CommunityIcon },
]

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#1B2B4B' : 'none'} stroke={active ? '#1B2B4B' : '#8B7E74'} strokeWidth="1.8">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
      <path d="M9 21V12h6v9"/>
    </svg>
  )
}

function PathsIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#1B2B4B' : '#8B7E74'} strokeWidth="1.8">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 7v5l3 3"/>
    </svg>
  )
}

function JournalIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#1B2B4B' : '#8B7E74'} strokeWidth="1.8">
      <rect x="4" y="3" width="14" height="18" rx="2"/>
      <path d="M8 7h6M8 11h6M8 15h4"/>
      <rect x="2" y="5" width="3" height="14" rx="1" fill={active ? '#1B2B4B' : '#8B7E74'}/>
    </svg>
  )
}

function PrayerIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#1B2B4B' : '#8B7E74'} strokeWidth="1.8">
      <path d="M12 21C12 21 4 15 4 9a8 8 0 0116 0c0 6-8 12-8 12z"/>
      <circle cx="12" cy="9" r="2" fill={active ? '#1B2B4B' : '#8B7E74'}/>
    </svg>
  )
}

function CommunityIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#1B2B4B' : '#8B7E74'} strokeWidth="1.8">
      <circle cx="9" cy="8" r="3"/>
      <circle cx="17" cy="10" r="2.5"/>
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/>
      <path d="M19 20c0-2.2-1.3-4-3-5"/>
    </svg>
  )
}

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-stone-200 safe-area-pb">
      <div className="max-w-lg mx-auto flex items-center justify-around px-2 py-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all"
          >
            {({ isActive }) => (
              <>
                <Icon active={isActive} />
                <span className={`text-[10px] font-medium tracking-wide ${isActive ? 'text-navy' : 'text-warm-gray'}`}
                  style={{ color: isActive ? '#1B2B4B' : '#8B7E74' }}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
