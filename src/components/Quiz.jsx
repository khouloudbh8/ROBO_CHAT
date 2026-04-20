import { useState } from 'react'
import '../styles/Quiz.css'

const QUESTIONS = [
  {
    id: 1,
    question: "Quel langage de programmation est le plus utilisé en robotique embarquée ?",
    options: ["Python", "C/C++", "Java", "JavaScript"],
    answer: 1,
  },
  {
    id: 2,
    question: "Qu'est-ce que ROS dans le domaine de la robotique ?",
    options: [
      "Read Only System",
      "Robot Operating System",
      "Remote Object Sensor",
      "Rapid Output Script",
    ],
    answer: 1,
  },
  {
    id: 3,
    question: "Quel composant est responsable de la détection d'obstacles dans un robot autonome ?",
    options: ["Servo-moteur", "Gyroscope", "LIDAR / Capteur ultrason", "Condensateur"],
    answer: 2,
  },
  {
    id: 4,
    question: "L'IA utilisée dans les robots pour reconnaître des objets s'appelle :",
    options: ["Algorithme génétique", "Vision par ordinateur", "Logique floue", "Réseau neuronal récurrent"],
    answer: 1,
  },
  {
    id: 5,
    question: "Quelle carte microcontrôleur est la plus populaire pour les projets robotiques éducatifs ?",
    options: ["Raspberry Pi Zero", "Arduino Uno", "ESP32", "STM32"],
    answer: 1,
  },
]

function Quiz() {
  const [current, setCurrent]   = useState(0)
  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [score, setScore]       = useState(0)
  const [finished, setFinished] = useState(false)
  const [answers, setAnswers]   = useState([])

  const q = QUESTIONS[current]

  const handleSelect = (idx) => {
    if (confirmed) return
    setSelected(idx)
  }

  const handleConfirm = () => {
    if (selected === null) return
    const correct = selected === q.answer
    setConfirmed(true)
    setAnswers(prev => [...prev, { selected, correct }])
    if (correct) setScore(s => s + 1)
  }

  const handleNext = () => {
    if (current + 1 >= QUESTIONS.length) {
      setFinished(true)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
      setConfirmed(false)
    }
  }

  const handleRestart = () => {
    setCurrent(0)
    setSelected(null)
    setConfirmed(false)
    setScore(0)
    setFinished(false)
    setAnswers([])
  }

  if (finished) {
    const pct = Math.round((score / QUESTIONS.length) * 100)
    const grade = pct >= 80 ? 'excellent' : pct >= 60 ? 'bien' : pct >= 40 ? 'moyen' : 'faible'
    const gradeLabels = { excellent: '🏆 Excellent !', bien: '✅ Bien joué !', moyen: '📘 Pas mal !', faible: '💡 À revoir !' }

    return (
      <div className="quiz-page">
        <div className="quiz-bg-decor" />
        <div className="quiz-result-card">
          <div className="quiz-result-badge">
            <svg viewBox="0 0 60 60" fill="none" width="56" height="56">
              <polygon points="30,4 56,52 4,52" fill="none" stroke="url(#qg1)" strokeWidth="2.5"/>
              <polygon points="30,14 48,48 12,48" fill="none" stroke="url(#qg2)" strokeWidth="1.5" opacity="0.6"/>
              <text x="30" y="40" textAnchor="middle" fontSize="16" fill="#F0C040" fontWeight="bold">{score}/{QUESTIONS.length}</text>
              <defs>
                <linearGradient id="qg1" x1="0" y1="0" x2="60" y2="60"><stop offset="0%" stopColor="#A0A0A0"/><stop offset="100%" stopColor="#F0C040"/></linearGradient>
                <linearGradient id="qg2" x1="60" y1="0" x2="0" y2="60"><stop offset="0%" stopColor="#F0C040"/><stop offset="100%" stopColor="#555"/></linearGradient>
              </defs>
            </svg>
          </div>
          <h2 className="quiz-result-title">{gradeLabels[grade]}</h2>
          <p className="quiz-result-score">{score} / {QUESTIONS.length} bonnes réponses</p>

          <div className="quiz-progress-bar-wrap">
            <div className="quiz-progress-bar" style={{ width: `${pct}%` }} />
          </div>
          <p className="quiz-result-pct">{pct}%</p>

          <div className="quiz-result-recap">
            {QUESTIONS.map((q, i) => (
              <div key={q.id} className={`recap-item ${answers[i]?.correct ? 'recap-correct' : 'recap-wrong'}`}>
                <span className="recap-icon">{answers[i]?.correct ? '✓' : '✗'}</span>
                <span className="recap-q">{q.question}</span>
              </div>
            ))}
          </div>

          <button className="quiz-restart-btn" onClick={handleRestart}>
            ↺ Recommencer le quiz
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-page">
      <div className="quiz-bg-decor" />

      <div className="quiz-card">
        {/* Header */}
        <div className="quiz-header">
          <div className="quiz-header-left">
            <span className="quiz-label">Quiz Robotique</span>
            <span className="quiz-counter">Question {current + 1} / {QUESTIONS.length}</span>
          </div>
          <div className="quiz-score-badge">
            <span className="quiz-score-label">Score</span>
            <span className="quiz-score-value">{score}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="quiz-progress-track">
          <div
            className="quiz-progress-fill"
            style={{ width: `${((current) / QUESTIONS.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="quiz-question-wrap">
          <div className="quiz-question-num">#{current + 1}</div>
          <h2 className="quiz-question-text">{q.question}</h2>
        </div>

        {/* Options */}
        <div className="quiz-options">
          {q.options.map((opt, idx) => {
            let cls = 'quiz-option'
            if (confirmed) {
              if (idx === q.answer) cls += ' quiz-option--correct'
              else if (idx === selected) cls += ' quiz-option--wrong'
              else cls += ' quiz-option--dim'
            } else if (idx === selected) {
              cls += ' quiz-option--selected'
            }
            return (
              <button key={idx} className={cls} onClick={() => handleSelect(idx)}>
                <span className="quiz-option-letter">{String.fromCharCode(65 + idx)}</span>
                <span className="quiz-option-text">{opt}</span>
                {confirmed && idx === q.answer && <span className="quiz-option-check">✓</span>}
                {confirmed && idx === selected && idx !== q.answer && <span className="quiz-option-check">✗</span>}
              </button>
            )
          })}
        </div>

        {/* Feedback */}
        {confirmed && (
          <div className={`quiz-feedback ${selected === q.answer ? 'quiz-feedback--correct' : 'quiz-feedback--wrong'}`}>
            {selected === q.answer
              ? '🎯 Bonne réponse ! Excellente connaissance en robotique.'
              : `❌ Mauvaise réponse. La bonne réponse était : "${q.options[q.answer]}"`}
          </div>
        )}

        {/* Actions */}
        <div className="quiz-actions">
          {!confirmed ? (
            <button
              className={`quiz-confirm-btn ${selected !== null ? 'quiz-confirm-btn--active' : ''}`}
              onClick={handleConfirm}
              disabled={selected === null}
            >
              Valider la réponse
            </button>
          ) : (
            <button className="quiz-next-btn" onClick={handleNext}>
              {current + 1 >= QUESTIONS.length ? 'Voir les résultats →' : 'Question suivante →'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Quiz