// ------------------------------------------------------------------------------------------
// MODULE IMPORTS
// ------------------------------------------------------------------------------------------
import alertify from 'alertifyjs'

const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

export function checkSalesDebt (sales, movementsDb) {

  const db = new PouchDB(movementsDb)
  return function (dispatch) {
    sales.forEach((sale, index) => {
      const i = index
      db.find({
        selector: {docType: {$eq: 'CLIENT_MOVEMENT'}, sale_id: {$eq: sale._id}}
      }).then(function (result) {
        if (result.docs.length) {
          let totalCredits = 0
          let totalDebits = 0
          let debt = 0

          result.docs.forEach(doc => {
            if (doc.type == 'CREDIT') totalCredits += doc.amount
            if (doc.type == 'DEBIT') totalDebits += doc.amount
          })

          if (totalDebits >= totalCredits) debt = 0
          else debt = totalCredits - totalDebits

          sale.debt = debt
          sale.credits = totalCredits
          sale.debits = totalDebits

          dispatch({type: 'SET_SALE_DEBT', payload: {sale: sale, index: i}})

        } else {
          alertify.alert('Error', `No hay movimientos de crédito para la factura #${sale.id}`)
        }

      }).catch(function (err) {
        alertify.alert('Error', `Error al cargar los movimientos de la factura #${sale.id}, ERROR: ${err}`)
      })
    })
  }
}
