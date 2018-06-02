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

export function updateItem(kwargs) {

  const db = new PouchDB(kwargs.db)

  return function(dispatch) {

    const item = kwargs.item
    const model = kwargs.modelName

    db.get(item._id).then((dbItem) => {
      item._rev = dbItem._rev

      db.put(item).then((response) => {

        dispatch({type: 'SHOW_PROFORMA_INVOICE_PANEL', payload: ''})
        dispatch({type: 'UPDATE_COMPLETED', payload: ''})

      }).catch((err) => {
        alertify.alert('Error', `hubo un error al actualizar la ${model} ${err}.`)
      })
    }).catch((err) => {
      alertify.alert('Error', `hubo un error al obtener la ${model} para actualizar ${err}.`)
    })
  }
}
