const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const port = 3000

app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html');

app.use(cors({
  origin: 'http://localhost:8080',
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

app.get('/download', (req, res) => {
    
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})