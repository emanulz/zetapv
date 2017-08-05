// ------------------------------------------------------------------------------------------
// MODULE IMPORTS
// ------------------------------------------------------------------------------------------
import alertify from 'alertifyjs'

const PouchDB = require('pouchdb')

// ------------------------------------------------------------------------------------------
// EXPORT FUNCTIONS
// ------------------------------------------------------------------------------------------

export function saveItem(kwargs) {
  return function(dispatch) {
    const db = new PouchDB(kwargs.db)

    db.post(kwargs.item).then((response) => {
      alertify.alert('Completado', kwargs.sucessMessage)
      dispatch({type: kwargs.dispatchType, payload: ''})
    }).catch((err) => {
      alertify.alert('Error', `${kwargs.errorMessage} ERROR: ${err}.`)
    })
  }
}

export function setItem(kwargs) {

  return function(dispatch) {
    const db = new PouchDB(kwargs.db)

    db.allDocs({include_docs: true, attachments: true}).then((response) => {
      const rows = response.rows
      const data = []

      rows.forEach((row) => {
        if (row.doc[kwargs.lookUpField] == kwargs.lookUpValue) {
          data.push(row.doc)
        }

      })

      if (data.length) {
        dispatch({type: kwargs.dispatchType, payload: data[0]})
      } else {
        alertify.alert('Error', `No hay ${kwargs.modelName} con el valor de ${kwargs.lookUpName}: ${kwargs.lookUpValue}`)
      }

    }).catch((err) => {
      alertify.alert('Error', `Error al cargar el elemento: ${err}`)
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
        alertify.alert('Completado', `${model} actualizado con éxito.`)

        db.get(response.id).then((dbItem) => {
          dispatch({type: kwargs.dispatchType, payload: dbItem})
        }).catch((err) => {
          alertify.alert('Error', `hubo un error al obtener el ${model} actualizado ${err}.`)
        })
      }).catch((err) => {
        alertify.alert('Error', `hubo un error al actualizar el ${model} ${err}.`)
      })
    }).catch((err) => {
      alertify.alert('Error', `hubo un error al obtener el ${model} para actualizar ${err}.`)
    })
  }
}

export function deleteItem(kwargs) {

  const db = new PouchDB(kwargs.db)

  return function(dispatch) {
    const item = kwargs.item
    const model = kwargs.modelName

    db.get(item._id).then((dbItem) => {
      item._rev = dbItem._rev
      item._deleted = true

      db.put(item).then((response) => {
        alertify.alert('Completado', 'Elemento eliminado satifactoriamente')
        dispatch({type: kwargs.dispatchType, payload: ''})
      }).catch((err) => {
        alertify.alert('Error', `Hubo un error al eliminar el ${model} ${err}.`)
      })
    }).catch((err) => {
      alertify.alert('Error', `Hubo un error al seleccionar el ${model} ${err}.`)
    })
  }
}

export function fetchItems(kwargs) {

  const db = new PouchDB(kwargs.db)

  return function(dispatch) {

    db.allDocs({include_docs: true, attachments: true}).then((response) => {
      const rows = response.rows
      const data = []
      rows.forEach(row => data.push(row.doc))

      dispatch({type: kwargs.dispatchType, payload: data})
    }).catch((err) => {
      dispatch({type: kwargs.dispatchErrorType, payload: err})
    })
  }
}

export function getNextNumericCode(elements, field) {

  console.log(elements.length)

  if (elements.length) {

    let keys = elements.map(element => element[field])

    keys = keys.sort((a, b) => a > b)
    console.log(keys)
    const max = keys.pop()
    return parseInt(max) + 1

  }

  return 1

}
