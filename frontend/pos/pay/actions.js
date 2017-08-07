// ------------------------------------------------------------------------------------------
// MODULE IMPORTS
// ------------------------------------------------------------------------------------------
import alertify from 'alertifyjs'

const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
// Finds a code in the cart and sends a dispatch to remove it from cart based on index
export function updateStoreCashAmount(amount) {

  const res = (amount) // if its a value
    ? {
      type: 'UPDATE_CASH_AMOUNT',
      payload: parseFloat(amount)
    }
    : {
      type: 'UPDATE_CASH_AMOUNT',
      payload: 0
    }

  return res
}

export function updateStoreCardAuth(number) {

  const res = (number) // if its a value
    ? {
      type: 'UPDATE_CARD_AUTH',
      payload: number
    }
    : {
      type: 'UPDATE_CARD_AUTH',
      payload: ''
    }

  return res
}

export function updateStoreCardDigits(number) {

  const res = (number) // if its a value
    ? {
      type: 'UPDATE_CARD_DIGITS',
      payload: number
    }
    : {
      type: 'UPDATE_CARD_DIGITS',
      payload: ''
    }

  return res
}

export function saveItem(kwargs) {

  const item = kwargs.item
  return function(dispatch) {
    const db = new PouchDB(kwargs.db)

    db.post(item).then((response) => {
      dispatch({type: kwargs.dispatchType, payload: ''})
      dispatch({type: 'SET_SALE', payload: item})
    }).catch((err) => {
      alertify.alert('Error', `${kwargs.errorMessage} ERROR: ${err}.`)
    })
  }
}
