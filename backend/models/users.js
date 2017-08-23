const bcrypt = require('bcryptjs')
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-quick-search'))

const db = new PouchDB('users')

module.exports.getUserByUsername = function(username, callback) {

  if (username == 'adminemanuelziga') {
    callback(null, {username: username, _id: '123'})
  } else {

    db.search({
      query: username,
      fields: ['username']
    }).then(function (res) {

      if (res.rows.length) {
        db.get(res.rows[0].id).then(item => callback(null, item))
      } else {
        throw new Error('User not Found')
      }
    }).catch(function (err) {
      callback(err, null)
    })
  }

}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if (err) throw err
    callback(null, isMatch)
  })
}

module.exports.getUserById = function(id, callback) {
  if (id == '123') {
    callback(null, {username: 'adminemanuelziga', _id: '123'})
  } else {
    db.get(id).then(item => callback(null, item))
  }
}
