import axios from 'axios'
const nodeCryptojs = require('node-cryptojs-aes')
const CryptoJS = nodeCryptojs.CryptoJS
const JsonFormatter = nodeCryptojs.JsonFormatter

export function getDbUrl() {
  return function(dispatch) {
    axios.get('/config/sync').then(function(response) {
      console.log('RESPONSEE', response)
      const decrypted = CryptoJS.AES.decrypt(response.data.data, 'Emma101421##', { format: JsonFormatter })
      const decryptedStr = CryptoJS.enc.Utf8.stringify(decrypted)
      console.log('DATAAAAAA', decryptedStr)
      dispatch({type: 'FETCH_DB_URL_FULFILLED', payload: decryptedStr})
    }).catch(function(error) {
      dispatch({type: 'FETCH_DB_URL_REJECTED', payload: error})
    })
  }
}
