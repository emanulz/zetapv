const express = require('express')
const router = express.Router()
const path = require('path')

// Get Homepage
// router.get('/', ensureAuthenticated, function(req, res) {
//   res.render('index')
// })

router.get('/', ensureAuthenticated, function(req, res) {
  res.render(path.join(__dirname, '../../frontend/landing/index'))
})

router.get('/test', function(req, res) {
  res.render(path.join(__dirname, '../../frontend/test/index'))
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
