const fs = require('fs')
const cbr = require('couchdb-backup-restore')
require('dotenv').config()

const REMOTE_DB_SERVER = process.env.COUCHDB_REMOTE_SERVER

const config = {
  credentials: `${REMOTE_DB_SERVER}`
}

function done(err) {
  if (err) {
    return console.error(err)
  }
  console.log('all done!')
}
const backupDate = new Date()
const dateFormated = `${backupDate.getDate()}-${backupDate.getMonth() + 1}-${backupDate.getFullYear()}`
// backup
cbr.backup(config, done).pipe(fs.createWriteStream(`./backups/db/backup-${dateFormated}.tar.gz`))

// restore
// fs.createReadStream('./db-backup.tar.gz').pipe(cbr.restore(config, done))

// cdbdump -u emanuelziga -p emma101421 -h 127.0.0.1 -P 6984 -r https -d general
// cdbdump -u emanuelziga -p emma101421 -d general
// cdbdump -u emanuelziga -p emma101421 -d general
// cdbload -u emanuelziga -p emma101421 -d general2 < general.json
