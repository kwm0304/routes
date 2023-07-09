const express = require('express')
require('dotenv').config()

const path = require('path')
const db = require('./config/connection')

const PORT = process.env.PORT || 3001;
const app = express()
// app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  console.log('reqpath', req.path)
  console.log('reqmethod', req.method)
  next()
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
  })
})

