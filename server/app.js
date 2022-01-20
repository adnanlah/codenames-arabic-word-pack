const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const port = process.env.PORT || 3000

app.use(cors({
  origin: ['http://localhost:433', 'https://codenames-client-2.herokuapp.com'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

app.get('/data', (req, res) => {
  try {
    const allFileContents = fs.readFileSync(path.join(__dirname, '../data/pack.txt'), 'utf-8')
    return res.json({
      words: allFileContents.split(/\r?\n/).filter(e => e.length > 0)
    })
  } catch (err) {
    console.error(err)
  }
})

app.post('/download', (req, res) => {
    
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})