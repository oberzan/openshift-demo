const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 8080

app.use(bodyParser.json());
app.use(cors());

var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });

app.use(keycloak.middleware({
  logout: '/logout',
  admin: '/'
}));

app.get('/public', (req, res) => res.send('Public  World!'))
app.get('/protected', keycloak.protect(), (req, res) => res.send('Protected World!'))
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
