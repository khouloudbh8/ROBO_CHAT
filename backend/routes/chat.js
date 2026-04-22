const express = require('express')
const Groq = require('groq-sdk')
const { authenticateToken } = require('../middleware/authMiddleware')
const { buildPrompt } = require('../utils/buildPrompt')
const router = express.Router()

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

router.post('/message', authenticateToken, async (req, res) => {
  const { message, history = [] } = req.body

  if (!message) return res.status(400).json({ error: 'Message vide' })

  try {
    const systemPrompt = buildPrompt() // chargé depuis le JSON

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      temperature: 0.65,
      max_tokens: 2048,
      messages: [
        { role: 'system', content: systemPrompt },
        ...history,                              // historique de la conversation
        { role: 'user', content: message }
      ]
    })

    const reply = completion.choices[0].message.content
    res.json({ reply })

  } catch (err) {
    console.error('Groq error:', err.message)
    res.status(500).json({ error: 'Erreur Groq API' })
  }
})

module.exports = router