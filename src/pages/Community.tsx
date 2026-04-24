import Card from '../components/Card'

const features = [
  {
    icon: '👥',
    title: 'Private Small Groups',
    description: 'Join or create a group with friends, a church community, or people on the same path.',
  },
  {
    icon: '📆',
    title: 'Weekly Group Reflections',
    description: 'Share a reflection from your week. Read what others are experiencing.',
  },
  {
    icon: '🤝',
    title: 'Accountability Partners',
    description: 'Be paired with someone walking the same path. Encourage each other daily.',
  },
  {
    icon: '💬',
    title: 'Shared Prayer',
    description: 'Pray for each other. Know when someone is praying for you.',
  },
]

export default function Community() {
  return (
    <div className="flex-1 flex flex-col px-5 pt-12 pb-28 max-w-lg mx-auto w-full">
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-semibold" style={{ color: '#1B2B4B' }}>Together</h1>
        <p className="text-stone-400 text-sm mt-1">Following Jesus is better with others.</p>
      </div>

      {/* Coming soon banner */}
      <Card className="overflow-hidden mb-6 animate-fade-in-up">
        <div className="px-6 py-8 text-center"
          style={{ background: 'linear-gradient(135deg, #1B2B4B 0%, #2D4A6E 100%)' }}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mx-auto mb-4"
            style={{ backgroundColor: 'rgba(201,168,76,0.2)' }}>
            ✦
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Small Groups Coming Soon</h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">
            We're building a way for people to walk this journey together — not alone.
          </p>
        </div>
      </Card>

      {/* Feature previews */}
      <div className="mb-6">
        <p className="text-xs uppercase tracking-widest font-medium mb-4" style={{ color: '#8B7E74' }}>
          What's coming
        </p>
        <div className="flex flex-col gap-3">
          {features.map((f, i) => (
            <Card key={f.title} className="p-4 animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` } as React.CSSProperties}>
              <div className="flex items-start gap-4">
                <span className="text-2xl flex-shrink-0">{f.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold mb-1" style={{ color: '#1B2B4B' }}>{f.title}</h3>
                  <p className="text-stone-500 text-xs leading-relaxed">{f.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Notify me */}
      <Card className="p-5 animate-fade-in-up delay-300">
        <p className="text-sm font-medium mb-1" style={{ color: '#1B2B4B' }}>Get notified when it launches</p>
        <p className="text-stone-400 text-xs mb-4">Be the first to know when small groups are available.</p>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 rounded-xl border border-stone-200 px-3 py-2.5 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-300 placeholder:text-stone-300"
          />
          <button
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-white flex-shrink-0"
            style={{ backgroundColor: '#1B2B4B' }}
          >
            Notify me
          </button>
        </div>
      </Card>
    </div>
  )
}
