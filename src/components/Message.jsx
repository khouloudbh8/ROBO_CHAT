import '../styles/Message.css'

/* Formate le texte : **gras** → <strong> */
function formatText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

function formatTime(date) {
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

function Message({ message }) {
  const isBot  = message.role === 'bot'
  const isUser = message.role === 'user'

  return (
    <div className={`message-row ${isBot ? 'message-row--bot' : 'message-row--user'}`}>
      {/* Avatar bot */}
      {isBot && (
        <div className="message-avatar message-avatar--bot" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="3" y="7" width="18" height="13" rx="3" fill="url(#mg)"/>
            <circle cx="9"  cy="13" r="1.8" fill="#000"/>
            <circle cx="15" cy="13" r="1.8" fill="#000"/>
            <rect x="9" y="16" width="6" height="1.5" rx="0.75" fill="#000" opacity="0.4"/>
            <line x1="12" y1="4" x2="12" y2="7" stroke="#F0C040" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="12" cy="3.5" r="1" fill="#D4A017"/>
            <defs>
              <linearGradient id="mg" x1="0" y1="0" x2="18" y2="13">
                <stop offset="0%" stopColor="#D4A017"/>
                <stop offset="100%" stopColor="#6b4f0a"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}

      {/* Bulle */}
      <div className={`message-bubble ${isBot ? 'message-bubble--bot' : 'message-bubble--user'}`}>
        {isBot && <span className="message-sender">RoboChat</span>}
        <p className="message-text">{formatText(message.text)}</p>
        <span className="message-time">{formatTime(message.timestamp)}</span>
      </div>

      {/* Avatar user */}
      {isUser && (
        <div className="message-avatar message-avatar--user" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8"  r="4" fill="url(#ug)"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="url(#ug2)"/>
            <defs>
              <linearGradient id="ug" x1="0" y1="0" x2="24" y2="24">
                <stop offset="0%" stopColor="#A0A0A0"/>
                <stop offset="100%" stopColor="#555"/>
              </linearGradient>
              <linearGradient id="ug2" x1="0" y1="0" x2="24" y2="24">
                <stop offset="0%" stopColor="#888"/>
                <stop offset="100%" stopColor="#444"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
    </div>
  )
}

export default Message
