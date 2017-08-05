// ------------------------------------------------------------------------------------------
// MODULE IMPORTS
// ------------------------------------------------------------------------------------------
import alertify from 'alertifyjs'

export function checkClientData(client, clients) {
  let Ok = true

  if (client.name == '') {
    alertify.alert('Error', 'Debe especificar el nombre del Cliente')
    return false
  }

  if (client.code == '') {
    alertify.alert('Error', 'Debe especificar el código del Cliente')
    return false
  }

  if (client.id == '') {
    alertify.alert('Error', 'Debe especificar la identificación del cliente')
    return false
  }

  // UNIQUE FIELDS
  clients.forEach((clientData) => {
    if (client.code == clientData.code) {
      if (client._id != clientData._id) {
        alertify.alert('Error', `El cliente ${clientData.name} ${clientData.last_name} ya posee el código ${clientData.code}`)
        Ok = false
        return false
      }
    }
    if (client.id == clientData.id) {
      if (client._id != clientData._id) {
        alertify.alert('Error', `El cliente ${clientData.name} ${clientData.last_name} ya posee la identificación ${clientData.id}`)
        Ok = false
        return false
      }
    }
  })

  return Ok
}

//
// export function fetchClients() {
//
//   const localDbClients = new PouchDB('clients')
//
//   return function(dispatch) {
//     localDbClients.allDocs({include_docs: true, attachments: true}).then((response) => {
//       const rows = response.rows
//       let data = []
//       rows.forEach(row => data.push(row.doc))
//       dispatch({type: "FETCH_CLIENTS_FULFILLED", payload: data})
//     }).catch((err) => {
//       dispatch({type: "FETCH_CLIENTS_REJECTED", payload: err})
//     })
//   }
// }

// export function checkFieldsUpdate(client, clients) {
//
//   let clientOk = true
//
//   if (client.name == '') {
//     clientOk = false
//     alertify.alert('Error', 'Debe especificar el nombre del cliente')
//     return clientOk
//   }
//
//   if (client.code == '') {
//     clientOk = false
//     alertify.alert('Error', 'Debe especificar el codigo del cliente')
//     return clientOk
//   }
//
//   clients.forEach((clientData) => { //checks if code already exists
//
//     if (client.code == clientData.code) {
//
//       if (client._id != clientData._id) { // only if its from another client
//
//         alertify.alert('Error', `El cliente ${clientData.name} ${clientData.last_name} ya posee el código ${client.code}`)
//
//         clientOk = false
//       }
//     }
//   })
//
//   return clientOk
// }

// export function getClient(code) {
//
//   return function(dispatch) {
//
//     let db = new PouchDB('clients')
//
//     db.allDocs({include_docs: true, attachments: true}).then((response) => {
//
//       const rows = response.rows
//
//       let data = []
//
//       rows.forEach((row) => {
//
//         if (row.doc.code == code) {
//           data.push(row.doc)
//         }
//
//       })
//
//       if (data.length) {
//         dispatch({type: "SELECT_CLIENT", payload: data[0]})
//       } else {
//         alertify.alert('Error', `No hay registros con el código ${code}`)
//       }
//
//     }).catch((err) => {
//       alertify.alert('Error', `Error al cargar el cliente: ${err}`)
//     })
//
//   }
// }
//
// function saveClient(client) {
//
//   let db = new PouchDB('clients')
//
//   db.post(client).then((response) => {
//     alertify.alert('Completado', `Cliente creado con éxito.`)
//   }).catch((err) => {
//     alertify.alert('Error', `hubo un error al crear el cliente ${err}.`)
//   })
//
// }

// export function updateClient(client) {
//
//   const db = new PouchDB('clients')
//
//   return function(dispatch) {
//
//     db.get(client._id).then((dbClient) => {
//
//       client._rev = dbClient._rev
//
//       db.put(client).then((response) => {
//
//         alertify.alert('Completado', `Cliente actualizado con éxito.`)
//
//         console.log(response)
//
//         db.get(response.id).then((dbClient) => {
//
//           dispatch({type: "SELECT_CLIENT", payload: dbClient})
//
//         }).catch((err) => {
//
//           alertify.alert('Error', `hubo un error al obtener el cliente para actualizar ${err}.`)
//
//         })
//
//       }).catch((err) => {
//         alertify.alert('Error', `hubo un error al actualizar el cliente ${err}.`)
//         ret = false
//       })
//
//     }).catch((err) => {
//
//       alertify.alert('Error', `hubo un error al obtener el cliente para actualizar ${err}.`)
//
//     })
//
//   }
//
// }
//
// export function deleteClient(client) {
//
//   const db = new PouchDB('clients')
//
//   return function(dispatch) {
//
//     db.get(client._id).then((dbClient) => {
//       client._rev = dbClient._rev
//       client._deleted = true
//
//       db.put(client).then((response) => {
//         alertify.alert('Completado', 'Elemento eliminado satifactoriamente')
//         dispatch({type: 'DELETED_CLIENT', payload: ''})
//       }).catch((err) => {
//         alertify.alert('Error', `hubo un error al actualizar el cliente ${err}.`)
//       })
//
//     }).catch((err) => {
//       alertify.alert('Error', `hubo un error al seleccionar el cliente ${err}.`)
//     })
//
//   }
//
// }
