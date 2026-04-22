import { useState } from 'react'
import '../styles/Login.css'

const API_URL = 'http://localhost:5000'

function Login({ onLogin }) {
  const [mode, setMode]       = useState('login')   // 'login' | 'register'
  const [form, setForm]       = useState({ name: '', email: '', password: '' })
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validation basique
    if (!form.email || !form.password) {
      setError('Veuillez remplir tous les champs.')
      return
    }
    if (mode === 'register' && !form.name) {
      setError('Veuillez entrer votre nom.')
      return
    }
    if (form.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.')
      return
    }

    setLoading(true)

    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
      const body = mode === 'login'
        ? { email: form.email, password: form.password }
        : { email: form.email, password: form.password, name: form.name }

      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue.')
        return
      }

      // Sauvegarder le token JWT dans localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      if (mode === 'register') {
        setSuccess('Compte créé avec succès ! Connexion en cours...')
        setTimeout(() => onLogin(data.user), 1000)
      } else {
        onLogin(data.user)
      }

    } catch (err) {
      setError('Impossible de joindre le serveur. Vérifiez que le backend est lancé.')
    } finally {
      setLoading(false)
    }
  }

  const switchMode = () => {
    setMode(m => m === 'login' ? 'register' : 'login')
    setError('')
    setSuccess('')
    setForm({ name: '', email: '', password: '' })
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

        {/* Toggle Login / Register */}
        <div className="login-mode-toggle">
          <button
            className={`login-mode-btn ${mode === 'login' ? 'login-mode-btn--active' : ''}`}
            onClick={() => { setMode('login'); setError(''); setSuccess(''); setForm({ name: '', email: '', password: '' }) }}
            type="button"
          >
            Connexion
          </button>
          <button
            className={`login-mode-btn ${mode === 'register' ? 'login-mode-btn--active' : ''}`}
            onClick={() => { setMode('register'); setError(''); setSuccess(''); setForm({ name: '', email: '', password: '' }) }}
            type="button"
          >
            Inscription
          </button>
        </div>

        <h2 className="login-title">
          {mode === 'login' ? 'Connexion' : 'Créer un compte'}
        </h2>
        <p className="login-subtitle">
          {mode === 'login'
            ? 'Accédez à votre espace personnel'
            : 'Rejoignez la communauté AR-ENSI'}
        </p>

        <form className="login-form" onSubmit={handleSubmit}>

          {/* Champ Nom (register seulement) */}
          {mode === 'register' && (
            <div className="login-field">
              <label className="login-label">Nom complet</label>
              <div className="login-input-wrap">
                <span className="login-input-icon">👤</span>
                <input
                  className="login-input"
                  type="text"
                  name="name"
                  placeholder="Prénom Nom"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>
            </div>
          )}

          {/* Champ Email */}
          <div className="login-field">
            <label className="login-label">Email ENSI</label>
            <div className="login-input-wrap">
              <span className="login-input-icon">✉</span>
              <input
                className="login-input"
                type="email"
                name="email"
                placeholder="prenom.nom@ensi.tn"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Champ Mot de passe */}
          <div className="login-field">
            <label className="login-label">Mot de passe</label>
            <div className="login-input-wrap">
              <span className="login-input-icon">⬡</span>
              <input
                className="login-input"
                type={showPass ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                className="login-show-pass"
                onClick={() => setShowPass(p => !p)}
                tabIndex={-1}
                aria-label={showPass ? 'Masquer' : 'Afficher'}
              >
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="login-error">
              <span>⚠</span> {error}
            </div>
          )}

          {/* Message de succès */}
          {success && (
            <div className="login-success">
              <span>✓</span> {success}
            </div>
          )}

          {/* Bouton Submit */}
          <button
            className={`login-btn ${loading ? 'login-btn--loading' : ''}`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="login-spinner" />
            ) : (
              <>
                <span>{mode === 'login' ? 'Se connecter' : "S'inscrire"}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Switch mode */}
        <p className="login-switch">
          {mode === 'login' ? "Pas encore de compte ?" : "Déjà un compte ?"}
          {' '}
          <button className="login-switch-btn" onClick={switchMode} type="button">
            {mode === 'login' ? "S'inscrire" : 'Se connecter'}
          </button>
        </p>

        <p className="login-footer">
          © 2025 Association Robotique ENSI · Tous droits réservés
        </p>
      </div>
    </div>
  )
}

export default Login