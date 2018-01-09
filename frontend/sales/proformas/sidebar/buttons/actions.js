// ------------------------------------------------------------------------------------------
import alertify from 'alertifyjs'

const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

export function saveItem(kwargs) {

  const item = kwargs.item
  return function(dispatch) {
    const db = new PouchDB(kwargs.db)

    db.post(item).then((response) => {

      dispatch({type: 'SET_PROFORMA', payload: item})
      dispatch({type: 'SET_PROFORMA_ID', payload: response.id})

      dispatch({type: 'SHOW_PROFORMA_INVOICE_PANEL', payload: ''})

    }).catch((err) => {
      alertify.alert('Error', `${kwargs.errorMessage} ERROR: ${err}.`)
    })
  }
}
