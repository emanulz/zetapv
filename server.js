const express = require('express')
const app = express()

app.use(express.static('public'))

app.set('view engine', 'jade')

app.get('/', function (req, res) {
  res.render(__dirname + '/frontend/landing/index');
})

app.get('/pos', function (req, res) {
  res.render(__dirname + '/frontend/pos/index');
})

app.get('/admin', function (req, res) {
  res.render(__dirname + '/frontend/admin/index');
})
app.get('/admin/*', function (req, res) {
  res.render(__dirname + '/frontend/admin/index');
})

app.listen(3000, function (err) {

    if (err) return console.log('Error in server, please check, and restart'), process.exit(1);

    console.log('Example app listening on port 3000!')

})
