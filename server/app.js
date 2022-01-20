const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const port = process.env.PORT || 3000

app.use(cors({
  origin: 'https://codenames-client-2.herokuapp.com/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

app.get('/data', (req, res) => {
  try {
    const allFileContents = fs.readFileSync('./data/pack.txt', 'utf-8')
    return res.send(allFileContents)
  } catch (err) {
    console.error(err)
  }
})

app.post('/download', (req, res) => {
    
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})