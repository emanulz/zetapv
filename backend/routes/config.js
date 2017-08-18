const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')

// Get Homepage
// router.get('/', ensureAuthenticated, function(req, res) {
//   res.render('index')
// })

router.get('/default/*', ensureAuthenticated, function(req, res) {
  const fileName = req.originalUrl.split('/').pop()
  res.sendFile(path.join(__dirname, `../../config/default/${fileName}.json`))
})

router.get('/user/*', ensureAuthenticated, function(req, res) {
  const fileName = req.originalUrl.split('/').pop()
  res.sendFile(path.join(__dirname, `../../config/user/${fileName}.json`))
})

router.post('/user/*', ensureAuthenticated, function(req, res) {
  const fileName = req.originalUrl.split('/').pop()
  const data = JSON.stringify(req.body, null, 2)
  const file = path.join(__dirname, `../../config/user/${fileName}.json`)
  fs.writeFile(file, data, (err) => {
    if (err) {
      res.status(500).send({ error: err })
    }
    res.end('SUCCESS')
  })

})

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    // req.flash('error_msg','You are not logged in');
    req.session.returnTo = '/admin/config'
    res.redirect('/login')
  }
}

module.exports = router
