//------------------------------------------------------------------------------------------
//MODULE IMPORTS
//------------------------------------------------------------------------------------------

var PouchDB = require('pouchdb');


export function fetchClients() {

  var localDbClients = new PouchDB('clients')

  return function(dispatch) {
      localDbClients.allDocs({
          include_docs: true,
          attachments: true
          })
      .then((response) => {
        const rows = response.rows
        let data = []
        rows.forEach(row=>data.push(row.doc))
        dispatch({type: "FETCH_CLIENTS_FULFILLED", payload: data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_CLIENTS_REJECTED", payload: err})
      })
  }
}
