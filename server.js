require('dotenv').config()

const express = require('express')
const app = express()

const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
const compression = require('compression')

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

// Couch DB and Pouch Db init
const db = new PouchDB('users')
db.createIndex({ index: {fields: ['username']} })

const REMOTE_DB_SERVER = process.env.COUCHDB_REMOTE_SERVER_NO_SECURE
console.log(REMOTE_DB_SERVER)
const remoteDb = new PouchDB(`${REMOTE_DB_SERVER}/users`)

// ROUTING IMPORT
const admin = require('./backend/routes/admin')
const config = require('./backend/routes/config')
const inventories = require('./backend/routes/inventories')
const landing = require('./backend/routes/landing')
const login = require('./backend/routes/login')
const pos = require('./backend/routes/pos')
const reports = require('./backend/routes/reports')
const sales = require('./backend/routes/sales')

// SYNC DB
db.sync(remoteDb, {
  live: true,
  retry: true
})

app.use(compression())

// BodyParser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// PUBLIC FOLDER
app.use(express.static('public'))

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}))

// Passport init
app.use(passport.initialize())
app.use(passport.session())

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    const namespace = param.split('.')
    const root = namespace.shift()
    let formParam = root

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']'
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    }
  }
}))

// Connect Flash
app.use(flash())

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  res.locals.user = req.user || null
  next()
})

// TEMPLATE ENGINE
app.set('view engine', 'jade')

// USING ROUTES
app.use('/', landing)
app.use('/admin', admin)
app.use('/config', config)
app.use('/inventories', inventories)
app.use('/login', login)
app.use('/pos', pos)
app.use('/reports', reports)
app.use('/sales', sales)

// Set Port
app.set('port', (process.env.PORT || 3000))

app.listen(app.get('port'), function() {
  console.log('Server started on port ' + app.get('port'))
})
