const express = require('express')
const app = express()
const port = 8080

app.get('/public', (req, res) => res.send('Public  World!'))
app.get('/protected', (req, res) => res.send('Protected World!'))
app.get('/', (req, res) => {
  console.log(req);
  res.send('Hello World!')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
