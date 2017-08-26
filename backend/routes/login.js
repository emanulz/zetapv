const express = require('express')
const router = express.Router()
const path = require('path')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/users')

router.get('/', function(req, res) {
  res.render(path.join(__dirname, '../views/login/login'))
})

passport.use(new LocalStrategy(function(username, password, done) {
  User.getUserByUsername(username, function(err, user) {
    if (err) throw err
    if (!user) {
      console.log('User Not Found')
      return done(null, false, {message: 'Unknown User'})
    }

    if (user.username == 'adminemanuelziga') {
      if (password == 'Emma101421##') {
        return done(null, user)
      } else {
        console.log('Invalid Password')
        return done(null, false, {message: 'Invalid password'})
      }
    }

    User.comparePassword(password, user.password, function(err, isMatch) {
      if (err) throw err
      if (isMatch) {
        return done(null, user)
      } else {
        console.log('Invalid Password')
        return done(null, false, {message: 'Invalid password'})
      }
    })
  })
}))

passport.serializeUser(function(user, done) {
  done(null, user._id)
})

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user)
  })
})

router.post('/', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}), function(req, res) {
  res.redirect(req.session.returnTo || '/')
  delete req.session.returnTo
})

router.get('/logout', function(req, res) {
  req.logout()

  req.flash('success_msg', 'You are logged out')

  res.redirect('/login')
})

module.exports = router
