import { useState } from 'react'
import '../styles/Login.css'

function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Veuillez remplir tous les champs.')
      return
    }
    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin({ email: form.email, name: form.email.split('@')[0] })
    }, 1200)
  }

  return (
    <div className="login-page">
      <div className="login-bg-decor" />

      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">
          <div className="login-logo-icon">
            <svg viewBox="0 0 60 60" fill="none">
              <polygon points="30,4 56,52 4,52" fill="none" stroke="url(#lg1)" strokeWidth="2.5"/>
              <polygon points="30,14 48,48 12,48" fill="none" stroke="url(#lg2)" strokeWidth="1.5" opacity="0.6"/>
              <line x1="32" y1="38" x2="52" y2="38" stroke="#F0C040" strokeWidth="3" strokeLinecap="round"/>
              <line x1="35" y1="44" x2="52" y2="44" stroke="#D4A017" strokeWidth="3" strokeLinecap="round"/>
              <defs>
                <linearGradient id="lg1" x1="0" y1="0" x2="60" y2="60">
                  <stop offset="0%" stopColor="#A0A0A0"/>
                  <stop offset="100%" stopColor="#F0C040"/>
                </linearGradient>
                <linearGradient id="lg2" x1="60" y1="0" x2="0" y2="60">
                  <stop offset="0%" stopColor="#F0C040"/>
                  <stop offset="100%" stopColor="#555"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="login-app-name">RoboChat</h1>
          <p className="login-assoc-name">Association Robotique ENSI</p>
        </div>

        <div className="login-divider" />

        <h2 className="login-title">Connexion</h2>
        <p className="login-subtitle">Accédez à votre espace personnel</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label">Email ENSI</label>
            <div className="login-input-wrap">
              <span className="login-input-icon">✉</span>
              <input
                className="login-input"
                type="email"
                placeholder="prenom.nom@ensi.tn"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="login-field">
            <label className="login-label">Mot de passe</label>
            <div className="login-input-wrap">
              <span className="login-input-icon">⬡</span>
              <input
                className="login-input"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && <p className="login-error">{error}</p>}

          <button className={`login-btn ${loading ? 'login-btn--loading' : ''}`} type="submit" disabled={loading}>
            {loading ? (
              <span className="login-spinner" />
            ) : (
              <>
                <span>Se connecter</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </button>
        </form>

        <p className="login-footer">
          © 2025 Association Robotique ENSI · Tous droits réservés
        </p>
      </div>
    </div>
  )
}

export default Login