const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const chatRoutes = require('./routes/chat')

const app = express()

app.use(cors({ origin: 'http://localhost:5173' })) // port Vite
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)

app.listen(process.env.PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${process.env.PORT}`)
})