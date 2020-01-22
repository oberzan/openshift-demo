const express = require('express')
const app = express()
const port = 8080

app.get('/public', (req, res) => res.send('Public  World!'))
app.get('/protected', (req, res) => res.send('Protected World!'))
app.get('/', (req, res) => {
  console.log(req);
  res.json({
    "headers": req.headers,
    "url": req.url,
    "method": req.method,
    "params": req.params,
    "query": req.query
  });

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
