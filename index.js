const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 8080

app.use(bodyParser.json());
app.use(cors());

app.set('view engine', 'pug');

var memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

var keycloak = new Keycloak({ store: memoryStore });

app.use(keycloak.middleware({
  logout: '/logout',
  admin: '/'
}));

app.get('/public', (req, res) => res.send('Public  World!'))
app.get('/protected', keycloak.protect(), (req, res) => res.send('Protected World!'))
app.get('/', (req, res) => {
  console.log(req);
 
  var json = {
    "headers": req.headers,
    "url": req.url,
    "method": req.method,
    "params": req.params,
    "query": req.query,
    "kauth": req.kauth,
    "session": req.session
  };

  res.render('index', { title: "Index", msg: JSON.stringify(json) });

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
