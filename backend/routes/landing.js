const express = require('express')
const router = express.Router()
const path = require('path')

// Get Homepage
// router.get('/', ensureAuthenticated, function(req, res) {
//   res.render('index')
// })

router.get('/', function(req, res) {
  res.render(path.join(__dirname, '../../frontend/landing/index'))
})

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    // req.flash('error_msg','You are not logged in');
    res.redirect('/login')
  }
}

module.exports = router
