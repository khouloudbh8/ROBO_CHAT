import '../styles/Sidebar.css'

const NAV_LINKS = [
  { icon: '◉', label: 'Chat',  key: 'chat' },
  { icon: '◈', label: 'Quiz',  key: 'quiz' },
]

function Sidebar({ isOpen, onClose, onNavigate, currentPage, user, onLogout }) {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <div className="sidebar-grain" />

      <button className="sidebar-close" onClick={onClose} aria-label="Fermer">
        ✕
      </button>

      {/* ── Logo & Titre ── */}
      <div className="sidebar-brand">
        <div className="sidebar-logo-wrap">
          <div className="sidebar-logo-icon">
            <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="30,4 56,52 4,52" fill="none" stroke="url(#goldGrad1)" strokeWidth="2.5"/>
              <polygon points="30,14 48,48 12,48" fill="none" stroke="url(#goldGrad2)" strokeWidth="1.5" opacity="0.6"/>
              <line x1="32" y1="38" x2="52" y2="38" stroke="#F0C040" strokeWidth="3" strokeLinecap="round"/>
              <line x1="35" y1="44" x2="52" y2="44" stroke="#D4A017" strokeWidth="3" strokeLinecap="round"/>
              <defs>
                <linearGradient id="goldGrad1" x1="0" y1="0" x2="60" y2="60">
                  <stop offset="0%" stopColor="#A0A0A0"/>
                  <stop offset="100%" stopColor="#F0C040"/>
                </linearGradient>
                <linearGradient id="goldGrad2" x1="60" y1="0" x2="0" y2="60">
                  <stop offset="0%" stopColor="#F0C040"/>
                  <stop offset="100%" stopColor="#555"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <h1 className="sidebar-app-name">RoboChat</h1>
        <p className="sidebar-assoc-name">Association Robotique ENSI</p>
        <div className="sidebar-divider" />
      </div>

      {/* ── Navigation ── */}
      <nav className="sidebar-nav">
        <p className="sidebar-nav-label">Navigation</p>
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.key}>
              <button
                className={`sidebar-nav-link ${currentPage === link.key ? 'sidebar-nav-link--active' : ''}`}
                onClick={() => onNavigate(link.key)}
              >
                <span className="nav-icon">{link.icon}</span>
                <span>{link.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── User / Login ── */}
      <div className="sidebar-divider" style={{ margin: '12px 0' }} />
      {user ? (
        <div className="sidebar-user">
          <div className="sidebar-user-info">
            <div className="sidebar-user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="sidebar-user-name">{user.name}</p>
              <p className="sidebar-user-email">{user.email}</p>
            </div>
          </div>
          <button className="sidebar-logout-btn" onClick={onLogout}>
            Déconnexion
          </button>
        </div>
      ) : (
        <button className="sidebar-login-btn" onClick={() => onNavigate('login')}>
          <span>◉</span>
          <span>Se connecter</span>
        </button>
      )}

      {/* ── Statut ── */}
      <div className="sidebar-status">
        <div className="status-dot" />
        <span>RoboChat en ligne</span>
      </div>

      {/* ── Footer ── */}
      <div className="sidebar-footer">
        <p>© 2025 Association Robotique ENSI</p>
        <p>Tous droits réservés</p>
      </div>
    </aside>
  )
}

export default Sidebar