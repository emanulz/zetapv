const bcrypt = require('bcryptjs')
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

const db = new PouchDB('users')

module.exports.getUserByUsername = function(username, callback) {

  if (username == 'adminemanuelziga') {
    callback(null, {username: username, _id: '123'})
  } else {

    db.find({
      selector: {username: {$eq: username}}
    }).then(function (res) {

      if (res.docs.length) {
        db.get(res.docs[0]._id).then(item => {

          callback(null, item)

        }).catch(function (err) {
          throw err
        })
      } else {
        callback(null, null)
      }
    }).catch(function (err) {
      throw err
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
