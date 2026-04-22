import { useState, useRef, useEffect } from 'react'
import Message from './Message.jsx'
import TypingIndicator from './TypingIndicator.jsx'
import '../styles/ChatBox.css'

/* ── Réponses simulées du bot ── */
const BOT_RESPONSES = [
  "Merci pour votre question ! Notre association est dédiée à promouvoir l'innovation technologique au sein de l'ENSI. N'hésitez pas à me poser d'autres questions.",
  "Bonne question ! Nos projets couvrent des domaines variés : robotique, intelligence artificielle, développement web et bien plus. Souhaitez-vous en savoir plus sur un projet spécifique ?",
  "Notre équipe est composée d'étudiants passionnés de l'ENSI. Nous organisons régulièrement des ateliers, des hackathons et des conférences ouvertes à tous.",
  "Pour nous contacter, vous pouvez nous rejoindre via nos réseaux sociaux ou nous envoyer un email à contact@ensi-association.tn. Nous répondrons dans les plus brefs délais.",
  "Notre mission est de créer un pont entre le monde académique et le monde professionnel, en offrant aux étudiants des opportunités concrètes d'apprentissage et de networking.",
  "Nous accueillons tous les étudiants motivés, quelle que soit leur spécialité ! Rejoignez-nous pour faire partie d'une communauté dynamique et innovante.",
]

let botResponseIndex = 0

function getBotResponse() {
  const response = BOT_RESPONSES[botResponseIndex % BOT_RESPONSES.length]
  botResponseIndex++
  return response
}

/* ── Message d'accueil ── */
const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'bot',
  text: "Bienvenue ! Je suis **RoboChat**, l'assistant virtuel de l'Association Robotique ENSI. Je suis ici pour répondre à toutes vos questions sur notre association, nos projets, nos membres et bien plus encore. Comment puis-je vous aider aujourd'hui ?",
  timestamp: new Date(),
}

function ChatBox({ onMenuClick, user, onLoginRequest }) {
  const [messages, setMessages]   = useState([WELCOME_MESSAGE])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping]   = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef       = useRef(null)

  const isLoggedIn = !!user

  /* Auto-scroll vers le bas */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

// Ajoute en haut du fichier
const API_URL = 'http://localhost:5000'

// Remplace sendMessage par :
const sendMessage = async () => {
  const text = inputText.trim()
  if (!text || isTyping || !isLoggedIn) return

  const userMsg = { id: Date.now(), role: 'user', text, timestamp: new Date() }
  const newMessages = [...messages, userMsg]
  setMessages(newMessages)
  setInputText('')
  setIsTyping(true)

  try {
    // Préparer l'historique pour l'API (format Groq)
    const history = newMessages
      .filter(m => m.id !== 'welcome')
      .map(m => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.text }))

    const token = localStorage.getItem('token')
    const res = await fetch(`${API_URL}/api/chat/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ message: text, history })
    })

    const data = await res.json()
    const botMsg = { id: Date.now() + 1, role: 'bot', text: data.reply, timestamp: new Date() }
    setMessages(prev => [...prev, botMsg])

  } catch (err) {
    const errMsg = { id: Date.now() + 1, role: 'bot', text: '❌ Erreur de connexion au serveur.', timestamp: new Date() }
    setMessages(prev => [...prev, errMsg])
  } finally {
    setIsTyping(false)
  }
}

  /* Envoi avec Entrée (Shift+Entrée = saut de ligne) */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="chatbox">
      {/* ── Header ── */}
      <header className="chatbox-header">
        <button className="menu-btn" onClick={onMenuClick} aria-label="Menu">
          <span /><span /><span />
        </button>

        <div className="chatbox-header-info">
          <div className="chatbox-avatar">
            <svg viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="17" stroke="url(#hg)" strokeWidth="1.5"/>
              <rect x="10" y="12" width="16" height="12" rx="3" fill="url(#hg2)"/>
              <circle cx="14" cy="17" r="2" fill="#000"/>
              <circle cx="22" cy="17" r="2" fill="#000"/>
              <rect x="14" y="21" width="8" height="2" rx="1" fill="#000" opacity="0.5"/>
              <line x1="18" y1="6" x2="18" y2="10" stroke="#F0C040" strokeWidth="1.5" strokeLinecap="round"/>
              <defs>
                <linearGradient id="hg" x1="0" y1="0" x2="36" y2="36">
                  <stop offset="0%" stopColor="#A0A0A0"/>
                  <stop offset="100%" stopColor="#F0C040"/>
                </linearGradient>
                <linearGradient id="hg2" x1="0" y1="0" x2="16" y2="12">
                  <stop offset="0%" stopColor="#D4A017"/>
                  <stop offset="100%" stopColor="#8a6710"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <h2 className="chatbox-title">RoboChat</h2>
            <p className="chatbox-subtitle">
              <span className="header-dot" /> Assistant de l'Association Robotique ENSI
            </p>
          </div>
        </div>

        <div className="chatbox-header-actions">
          <button className="icon-btn" title="Nouvelle conversation"
            onClick={() => { setMessages([WELCOME_MESSAGE]); botResponseIndex = 0 }}>
            ⟳
          </button>
        </div>
      </header>

      {/* ── Bannière "non connecté" ── */}
      {!isLoggedIn && (
        <div className="chatbox-locked-banner">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="#D4A017" strokeWidth="1.3"/>
            <path d="M5 7V5a3 3 0 016 0v2" stroke="#D4A017" strokeWidth="1.3"/>
            <circle cx="8" cy="10.5" r="1" fill="#D4A017"/>
          </svg>
          <span>Connectez-vous pour envoyer des messages</span>
          <button className="banner-login-btn" onClick={onLoginRequest}>
            Se connecter
          </button>
        </div>
      )}

      {/* ── Zone des messages ── */}
      <section className="chatbox-messages" aria-label="Messages">
        <div className="messages-bg-decor" />

        {messages.map(msg => (
          <Message key={msg.id} message={msg} />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </section>

      {/* ── Zone de saisie ── */}
      <footer className="chatbox-input-area">
        <div className="input-wrapper">
          <textarea
            ref={inputRef}
            className="chatbox-input"
            placeholder={isLoggedIn ? "Posez votre question à RoboChat…" : "Connectez-vous pour écrire…"}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={isTyping || !isLoggedIn}
            aria-label="Saisir un message"
          />
          <button
            className={`send-btn ${inputText.trim() && isLoggedIn ? 'send-btn--active' : ''}`}
            onClick={sendMessage}
            disabled={!inputText.trim() || isTyping || !isLoggedIn}
            aria-label="Envoyer"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <p className="input-hint">Appuyez sur <kbd>Entrée</kbd> pour envoyer · <kbd>Maj+Entrée</kbd> pour une nouvelle ligne</p>
      </footer>
    </div>
  )
}

export default ChatBox