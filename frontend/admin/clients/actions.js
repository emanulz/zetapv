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


export function checkFields(client, clients){

    let clientOk = true

    if(client.name == ''){
        clientOk = false
        alertify.alert('Error', 'Debe especificar el nombre del cliente')
        return clientOk
    }

    if(client.code == ''){
        clientOk = false
        alertify.alert('Error', 'Debe especificar el codigo del cliente')
        return clientOk
        //TODO check if code already exists
    }

    clients.forEach((clientData)=>{
        if(client.code === clientData.code){
            alertify.alert('Error', `El cliente ${clientData.name} ${clientData.last_name} ya posee el código ${client.code}`)
            clientOk = false
            return clientOk
        }
    })

    if(clientOk){
        let clientSaved = saveClient(client)
    }

    return clientOk
}

function saveClient(client){

    let db = new PouchDB('clients')

    db.post(client)
    .then((response)=>{
        alertify.alert('Completado', `Cliente creado con éxito.`)
    })
    .catch((err)=>{
        alertify.alert('Error', `hubo un error al crear el cliente ${err}.`)
    })


}
