'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Role = 'frontend' | 'backend' | 'fullstack'
type Tech = 'flutter' | 'reactnative' | 'python' | 'javascript' | 'other'

interface Job {
  title: string
  type: string
  description: string
  requirements: string[]
  perks: string[]
}

const jobData: Record<Role, Record<Tech, Job>> = {
  frontend: {
    flutter: {
      title: "Flutter Developer",
      type: "Full-time",
      description: "Build beautiful cross-platform mobile applications with Flutter and Dart.",
      requirements: [
        "2+ years Flutter development experience",
        "Strong Dart programming skills",
        "UI/UX implementation expertise",
        "State management (Provider, Bloc, etc.)"
      ],
      perks: [
        "Competitive salary",
        "Remote work options",
        "Latest MacBook Pro",
        "Conference budget"
      ]
    },
    reactnative: {
      title: "React Native Developer",
      type: "Full-time",
      description: "Create native mobile experiences using React Native and JavaScript.",
      requirements: [
        "3+ years React Native experience",
        "Strong JavaScript/TypeScript skills",
        "Native module development",
        "App store deployment experience"
      ],
      perks: [
        "Competitive salary",
        "Flexible hours",
        "Health benefits",
        "Professional development"
      ]
    },
    other: {
      title: "Frontend Developer",
      type: "Full-time",
      description: "Join our frontend team working with modern web technologies.",
      requirements: [
        "3+ years frontend experience",
        "JavaScript/CSS/HTML expertise",
        "Modern framework experience",
        "Responsive design skills"
      ],
      perks: [
        "Competitive salary",
        "Remote options",
        "Flexible schedule",
        "Learning budget"
      ]
    },
    python: {
      title: "Frontend Developer",
      type: "Full-time",
      description: "Join our frontend team working with modern web technologies.",
      requirements: [
        "3+ years frontend experience",
        "JavaScript/CSS/HTML expertise",
        "Modern framework experience",
        "Responsive design skills"
      ],
      perks: [
        "Competitive salary",
        "Remote options",
        "Flexible schedule",
        "Learning budget"
      ]
    },
    javascript: {
      title: "Frontend Developer",
      type: "Full-time",
      description: "Join our frontend team working with modern web technologies.",
      requirements: [
        "3+ years frontend experience",
        "JavaScript/CSS/HTML expertise",
        "Modern framework experience",
        "Responsive design skills"
      ],
      perks: [
        "Competitive salary",
        "Remote options",
        "Flexible schedule",
        "Learning budget"
      ]
    }
  },
  backend: {
    flutter: {
      title: "Flutter Developer",
      type: "Full-time",
      description: "Build beautiful cross-platform mobile applications with Flutter and Dart.",
      requirements: [
        "2+ years Flutter development experience",
        "Strong Dart programming skills",
        "UI/UX implementation expertise",
        "State management (Provider, Bloc, etc.)"
      ],
      perks: [
        "Competitive salary",
        "Remote work options",
        "Latest MacBook Pro",
        "Conference budget"
      ]
    },
    python: {
      title: "Python Backend Developer",
      type: "Full-time",
      description: "Build scalable APIs and services with Python and Django/FastAPI.",
      requirements: [
        "3+ years Python development",
        "Django or FastAPI experience",
        "Database design (PostgreSQL, MongoDB)",
        "Cloud services (AWS/GCP)"
      ],
      perks: [
        "Competitive salary",
        "Remote work",
        "Conference budget",
        "Latest hardware"
      ]
    },
    javascript: {
      title: "Node.js Developer",
      type: "Full-time",
      description: "Develop server-side applications with Node.js and Express/NestJS.",
      requirements: [
        "3+ years Node.js experience",
        "Express/NestJS framework",
        "Database integration",
        "Microservices architecture"
      ],
      perks: [
        "Competitive salary",
        "Health benefits",
        "Flexible hours",
        "Team retreats"
      ]
    },
    other: {
      title: "Backend Developer",
      type: "Full-time",
      description: "Work on our server infrastructure and API development.",
      requirements: [
        "3+ years backend experience",
        "API development skills",
        "Database knowledge",
        "System design experience"
      ],
      perks: [
        "Competitive salary",
        "Remote options",
        "Professional growth",
        "Modern tools"
      ]
    },
    reactnative: {
      title: "Backend Developer",
      type: "Full-time",
      description: "Work on our server infrastructure and API development.",
      requirements: [
        "3+ years backend experience",
        "API development skills",
        "Database knowledge",
        "System design experience"
      ],
      perks: [
        "Competitive salary",
        "Remote options",
        "Professional growth",
        "Modern tools"
      ]
    }
  },
  fullstack: {
    flutter: {
      title: "Full Stack Flutter Developer",
      type: "Full-time",
      description: "Build complete applications with Flutter frontend and backend integration.",
      requirements: [
        "Full stack development experience",
        "Flutter/Dart expertise",
        "Backend API development",
        "Database design"
      ],
      perks: [
        "Competitive salary",
        "Remote work",
        "End-to-end ownership",
        "Latest hardware"
      ]
    },
    reactnative: {
      title: "Full Stack React Native Developer",
      type: "Full-time",
      description: "Develop complete mobile solutions with React Native and backend.",
      requirements: [
        "Full stack mobile development",
        "React Native expertise",
        "Node.js/Python backend",
        "Cloud deployment"
      ],
      perks: [
        "Competitive salary",
        "Flexible schedule",
        "Conference budget",
        "Health benefits"
      ]
    },
    other: {
      title: "Full Stack Developer",
      type: "Full-time",
      description: "Work across the entire stack building complete solutions.",
      requirements: [
        "Full stack experience",
        "Frontend framework knowledge",
        "Backend API development",
        "Database design"
      ],
      perks: [
        "Competitive salary",
        "Remote options",
        "Professional development",
        "Modern stack"
      ]
    },
    python: {
      title: "Full Stack Developer",
      type: "Full-time",
      description: "Work across the entire stack building complete solutions.",
      requirements: [
        "Full stack experience",
        "Frontend framework knowledge",
        "Backend API development",
        "Database design"
      ],
      perks: [
        "Competitive salary",
        "Remote options",
        "Professional development",
        "Modern stack"
      ]
    },
    javascript: {
      title: "Full Stack Developer",
      type: "Full-time",
      description: "Work across the entire stack building complete solutions.",
      requirements: [
        "Full stack experience",
        "Frontend framework knowledge",
        "Backend API development",
        "Database design"
      ],
      perks: [
        "Competitive salary",
        "Remote options",
        "Professional development",
        "Modern stack"
      ]
    }
  }
}

const techOptions: Record<Role, { value: Tech; label: string; icon: string }[]> = {
  frontend: [
    { value: 'flutter', label: 'Flutter', icon: '📱' },
    { value: 'reactnative', label: 'React Native', icon: '⚛️' },
    { value: 'other', label: 'Other', icon: '🔧' }
  ],
  backend: [
    { value: 'python', label: 'Python', icon: '🐍' },
    { value: 'javascript', label: 'JavaScript/Node.js', icon: '🟨' },
    { value: 'other', label: 'Other', icon: '🔧' }
  ],
  fullstack: [
    { value: 'flutter', label: 'Flutter Stack', icon: '📱' },
    { value: 'reactnative', label: 'React Native Stack', icon: '⚛️' },
    { value: 'other', label: 'Other Stack', icon: '🔧' }
  ]
}

export default function Hiring() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [currentRole, setCurrentRole] = useState<Role | ''>('')
  const [currentTech, setCurrentTech] = useState<Tech | ''>('')
  const supabase = createClient()
  const [applying, setApplying] = useState(false)
  const [applied, setApplied] = useState(false)
  const [appName, setAppName] = useState('')
  const [appEmail, setAppEmail] = useState('')
  const [appMessage, setAppMessage] = useState('')
  const [appError, setAppError] = useState('')
  const [appSubmitting, setAppSubmitting] = useState(false)

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    setAppError('')
    if (!appName.trim() || !appEmail.trim() || !appMessage.trim()) {
      setAppError('All fields are required'); return
    }
    setAppSubmitting(true)
    const { error } = await supabase.from('applications').insert({
      name: appName.trim(),
      email: appEmail.trim(),
      message: appMessage.trim(),
      job_title: currentJob?.title || '',
      job_type: currentJob?.type || '',
    })
    setAppSubmitting(false)
    if (error) { setAppError(error.message); return }
    setApplied(true)
  }

  const handleRoleSelect = (role: Role) => {
    setCurrentRole(role)
    setStep(2)
  }

  const handleTechSelect = (tech: Tech) => {
    setCurrentTech(tech)
    setStep(3)
  }

  const goBack = () => {
    setStep(1)
    setCurrentRole('')
  }

  const goBackToTech = () => {
    setStep(2)
    setCurrentTech('')
  }

  const currentJob = currentRole && currentTech ? jobData[currentRole][currentTech] : null

  return (
    <section id="hiring" className="section">
      <div className="section-header animate-on-scroll">
        <span className="section-number">03</span>
        <h2 className="section-title">We're Hiring</h2>
        <div className="section-line"></div>
      </div>

      <div className="hiring-content">
        <div className="hiring-intro animate-on-scroll">
          <h3>Join Our Team</h3>
          <p>
            We're looking for talented individuals who are passionate about creating 
            exceptional digital experiences. If you're ready to push boundaries and 
            redefine possibilities, we want to hear from you.
          </p>
        </div>

        <div className="job-selector animate-on-scroll">
          <div className={`selection-step ${step !== 1 ? 'hidden' : ''}`} id="step1">
            <h3 className="step-title">What role are you interested in?</h3>
            <div className="role-options">
              <button className="role-btn" onClick={() => handleRoleSelect('frontend')}>
                <span className="role-icon">🎨</span>
                <span className="role-label">Frontend Developer</span>
              </button>
              <button className="role-btn" onClick={() => handleRoleSelect('backend')}>
                <span className="role-icon">⚙️</span>
                <span className="role-label">Backend Developer</span>
              </button>
              <button className="role-btn" onClick={() => handleRoleSelect('fullstack')}>
                <span className="role-icon">🚀</span>
                <span className="role-label">Full Stack Developer</span>
              </button>
            </div>
          </div>

          <div className={`selection-step ${step !== 2 ? 'hidden' : ''}`} id="step2">
            <h3 className="step-title">What's your primary technology?</h3>
            <div className="tech-options">
              {currentRole && techOptions[currentRole].map((tech) => (
                <button key={tech.value} className="tech-btn" onClick={() => handleTechSelect(tech.value)}>
                  <span className="tech-icon">{tech.icon}</span>
                  <span className="tech-label">{tech.label}</span>
                </button>
              ))}
            </div>
            <button className="back-btn" onClick={goBack}>← Back</button>
          </div>

          <div className={`selection-step ${step !== 3 ? 'hidden' : ''}`} id="step3">
            {currentJob && (
              <div className="job-card">
                <div className="job-header">
                  <h4 className="job-title">{currentJob.title}</h4>
                  <span className="job-type">{currentJob.type}</span>
                </div>
                <div className="job-details">
                  <p className="job-description">{currentJob.description}</p>
                  <div className="job-requirements">
                    <h5>Requirements:</h5>
                    <ul>
                      {currentJob.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="job-perks">
                    <h5>Perks:</h5>
                    <ul>
                      {currentJob.perks.map((perk, i) => (
                        <li key={i}>{perk}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {applied ? (
                  <div className="apply-success">
                    <h5>Application Sent!</h5>
                    <p>We'll review your application and get back to you.</p>
                  </div>
                ) : applying ? (
                  <form className="apply-form" onSubmit={handleApply}>
                    <input type="text" placeholder="Your name" value={appName} onChange={(e) => setAppName(e.target.value)} required />
                    <input type="email" placeholder="your@email.com" value={appEmail} onChange={(e) => setAppEmail(e.target.value)} required />
                    <textarea placeholder="Why are you a good fit?" value={appMessage} onChange={(e) => setAppMessage(e.target.value)} required />
                    {appError && <p className="settings-error">{appError}</p>}
                    <div className="apply-form-actions">
                      <button type="submit" className="apply-button" disabled={appSubmitting}>
                        {appSubmitting ? 'Sending...' : 'Send Application'}
                      </button>
                      <button type="button" className="back-btn" onClick={() => { setApplying(false); setAppError('') }}>Cancel</button>
                    </div>
                  </form>
                ) : (
                  <button className="apply-button" onClick={() => setApplying(true)}>
                    Apply Now →
                  </button>
                )}
              </div>
            )}
            <button className="back-btn" onClick={goBackToTech}>← Back</button>
          </div>
        </div>

        <div className="hiring-contact animate-on-scroll">
          <h3>Don't see your role?</h3>
          <p>
            We're always interested in meeting talented people. Send us your portfolio 
            and tell us how you can contribute to our mission.
          </p>
          <a href="mailto:mixtecorporation@gmail.com" className="contact-email">mixtecorporation@gmail.com</a>
        </div>
      </div>
    </section>
  )
}