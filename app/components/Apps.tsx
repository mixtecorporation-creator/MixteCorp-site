'use client'

const apps = [
  {
    name: 'RoleChat',
    description: 'RoleChat — A mobile app for chatting with AI characters. Users can create customizable characters with avatars, personalities, and greetings, chat with them in real-time, follow favorite creators, rate characters, send images and voice messages, and discover new characters. IT is really fun and deserves a try.',
    icon: '/logo.png',
    link: 'https://github.com/mixtecorporation-creator/MixteCorp-site/releases/download/0.1.0/app-release.apk',
    isPlaceholder: false,
  },
  {
    name: 'Coming Soon',
    description: "We're constantly innovating and building new experiences. Stay tuned for our next groundbreaking application.",
    icon: '?',
    link: '#contact',
    isPlaceholder: true,
  },
]

export default function Apps() {
  return (
    <section id="apps" className="section">
      <div className="section-header animate-on-scroll">
        <span className="section-number">01</span>
        <h2 className="section-title">Our Apps</h2>
        <div className="section-line"></div>
      </div>

      <div className="apps-grid">
        {apps.map((app, index) => (
          <div 
            key={index} 
            className="app-card animate-on-scroll" 
            style={app.isPlaceholder ? { opacity: 0.5 } : undefined}
          >
            <div className="app-icon">
              {app.icon === '/logo.png' ? (
                <img src="logo.png" alt="App Manager Logo" loading="lazy" />
              ) : (
                app.icon
              )}
            </div>
            <h3 className="app-name">{app.name}</h3>
            <p className="app-description">{app.description}</p>
            <a href={app.link} className="app-link" target="_blank" rel="noopener noreferrer">
              {app.name === 'RoleChat' ? 'Download APK →' : 'Get Notified →'}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}