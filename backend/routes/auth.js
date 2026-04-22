const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()

// Base d'utilisateurs en mémoire (temporaire, sans MySQL)
// Tu pourras ajouter MySQL plus tard facilement
const users = []

// Register
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Champs manquants' })

  const exists = users.find(u => u.email === email)
  if (exists) return res.status(409).json({ error: 'Email déjà utilisé' })

  const hash = await bcrypt.hash(password, 10)
  const user = { id: Date.now(), email, name: name || email.split('@')[0], password: hash }
  users.push(user)

  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, 
    process.env.JWT_SECRET, { expiresIn: '7d' })

  res.json({ token, user: { id: user.id, email: user.email, name: user.name } })
})

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email)

  if (!user) return res.status(401).json({ error: 'Email introuvable' })
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return res.status(401).json({ error: 'Mot de passe incorrect' })

  const token = jwt.sign({ id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET, { expiresIn: '7d' })

  res.json({ token, user: { id: user.id, email: user.email, name: user.name } })
})

module.exports = router