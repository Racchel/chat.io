import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server } from 'socket.io'
import chat from './controllers/chat.js'

dotenv.config()

// app
const app = express()
const http = createServer(app)
const PORT = process.env.PORT || 8000

// socket.io
const io = new Server(http, {
  path: '/socket.io',
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'], 
    allowedHeaders: ['content-type']
  }
})

// middleware
app.use(cors())
app.use(express.json({ limit: '5mb' }))
app.use( express.urlencoded({ extended: true }))

// rest api
app.get('/api', (req, res) => {
  res.send('Helloooo!')
})

// socket
chat(io)


http.listen(PORT, () => console.log(`Server running on port ${PORT}`))

