const express = require('express')
const router = express.Router()
const path = require('path')

// Get Homepage
// router.get('/', ensureAuthenticated, function(req, res) {
//   res.render('index')
// })

router.get('/', ensureAuthenticated, function(req, res) {
  res.render(path.join(__dirname, '../../frontend/pos/index'))
})

// app.get('/admin', function (req, res) {
//   res.render(__dirname + '/frontend/admin/index');
// })
// app.get('/admin/*', function (req, res) {
//   res.render(__dirname + '/frontend/admin/index');
// })

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    // req.flash('error_msg','You are not logged in');
    req.session.returnTo = '/pos'
    res.redirect('/login')
  }
}

module.exports = router
