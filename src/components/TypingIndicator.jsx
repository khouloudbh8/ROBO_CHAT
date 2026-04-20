import '../styles/TypingIndicator.css'

function TypingIndicator() {
  return (
    <div className="typing-row">
      <div className="typing-avatar">
        <svg viewBox="0 0 24 24" fill="none">
          <rect x="3" y="7" width="18" height="13" rx="3" fill="url(#tg)"/>
          <circle cx="9"  cy="13" r="1.8" fill="#000"/>
          <circle cx="15" cy="13" r="1.8" fill="#000"/>
          <line x1="12" y1="4" x2="12" y2="7" stroke="#F0C040" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="3.5" r="1" fill="#D4A017"/>
          <defs>
            <linearGradient id="tg" x1="0" y1="0" x2="18" y2="13">
              <stop offset="0%" stopColor="#D4A017"/>
              <stop offset="100%" stopColor="#6b4f0a"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="typing-bubble">
        <span className="typing-label">RoboChat rédige</span>
        <div className="typing-dots">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator
