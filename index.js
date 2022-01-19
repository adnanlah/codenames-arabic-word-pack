const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path');
const port = process.env.PORT || 3000

app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html');



app.get('/', function(req, res){
  try {
    const allFileContents = fs.readFileSync('pack.txt', 'utf-8');
    const words = allFileContents.split(/\r?\n/).filter(e => e.length > 0)
    console.log(words, words[words.length-1])
    res.render('words-grid', {
      words,
      title: "Codenames"
    });
  } catch (err) {
    console.error(err)
  }
});

app.get('/download', (req, res) => {
    
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})