const express = require('express')
const app = express()
const PouchDB = require('pouchdb')

// Couch DB and Pouch Db init
const db = new PouchDB('users')
const remoteDb = new PouchDB(`http://192.168.9.108:5984/users`)
db.sync(remoteDb, {
  live: true,
  retry: true
})

// ROUTING IMPORT
const landing = require('./backend/routes/landing')
const admin = require('./backend/routes/admin')
const pos = require('./backend/routes/pos')
const login = require('./backend/routes/login')

// PUBLIC FOLDER
app.use(express.static('public'))
// TEMPLATE ENGINE
app.set('view engine', 'jade')

// USING ROUTES
app.use('/', landing)
app.use('/admin', admin)
app.use('/pos', pos)
app.use('/login', login)

// Set Port
app.set('port', (process.env.PORT || 3000))

app.listen(app.get('port'), function() {
  console.log('Server started on port ' + app.get('port'))
})
