// ------------------------------------------------------------------------------------------
// MODULE IMPORTS
// ------------------------------------------------------------------------------------------
import alertify from 'alertifyjs'

// const PouchDB = require('pouchdb')
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

// ------------------------------------------------------------------------------------------
// EXPORT FUNCTIONS
// ------------------------------------------------------------------------------------------

export function saveItem(kwargs) {

  const item = kwargs.item
  return function(dispatch) {
    const db = new PouchDB(kwargs.db)

    db.post(item).then((response) => {
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

    db.find({
      selector: {docType: {$eq: kwargs.docType}, [kwargs.lookUpField]: {$eq: kwargs.lookUpValue}}
    }).then(function (result) {
      console.log('RESSSS', result)
      if (result.docs.length) {

        if (kwargs.blankFields) {
          kwargs.blankFields.map(field => {
            result.docs[0][field] = ''
            return field
          })
        }
        dispatch({type: kwargs.dispatchType, payload: result.docs[0]})

      } else {
        alertify.alert('Error', `No hay ${kwargs.modelName} con el valor de ${kwargs.lookUpName}: ${kwargs.lookUpValue}`)
      }

    }).catch(function (err) {
      alertify.alert('Error', `Error al cargar el elemento: ${err}`)
    })

  }
}

export function setNextPrevItem(kwargs) {

  const code = kwargs.code
  const items = kwargs.items
  const codeField = kwargs.codeField
  let previous = 0
  let next = 0

  items.sort((a, b) => {
    return a[codeField] - b[codeField]
  })

  items.forEach((item, index) => {
    if (item[codeField] == code) {
      next = index + 1
      previous = index - 1
      return true
    }
  })

  const nextCode = items[next] ? items[next][codeField] : items[0][codeField]
  const prevCode = items[previous] ? items[previous][codeField] : items.pop()[codeField]

  return function(dispatch) {
    dispatch({type: kwargs.dispatchType, payload: {next: nextCode, previous: prevCode}})
  }
}

export function setItems(kwargs) {

  return function(dispatch) {
    const db = new PouchDB(kwargs.db)

    db.find({
      selector: {docType: {$eq: kwargs.docType}, [kwargs.lookUpField]: {$eq: kwargs.lookUpValue}}
    }).then(function (result) {

      if (result.docs.length) {

        dispatch({type: kwargs.dispatchType, payload: result.docs})

      } else {
        alertify.alert('Error', `No hay ${kwargs.modelName} con el valor de ${kwargs.lookUpName}: ${kwargs.lookUpValue}`)
      }

    }).catch(function (err) {
      alertify.alert('Error', `Error al cargar el elemento: ${err}`)
    })

  }
}

export function setItemsQuery(kwargs) {

  return function(dispatch) {
    const db = new PouchDB(kwargs.db)

    db.find({
      selector: kwargs.query
    }).then(function (result) {

      if (result.docs.length) {

        dispatch({type: kwargs.successDispatchType, payload: result.docs})

      } else {
        alertify.alert('Error', `${kwargs.notFoundMsg}`)
      }

    }).catch(function (err) {
      alertify.alert('Error', `Error al cargar los elementos: ${err}`)
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
    db.find({
      selector: {docType: {$eq: kwargs.docType}}
      // sort: [type.sortField]
    }).then(function (result) {
      dispatch({type: kwargs.dispatchType, payload: result.docs})
    }).catch(function (err) {
      dispatch({type: kwargs.dispatchErrorType, payload: err})
    })
  }
}

export function fetchItemsBulk(kwargs) {

  const db = new PouchDB(kwargs.db)

  db.createIndex({ index: {fields: ['docType']} })
  db.createIndex({ index: {fields: ['docType', 'code']} })
  db.createIndex({ index: {fields: ['docType', 'document']} })
  db.createIndex({ index: {fields: ['docType', 'sale_id']} })
  db.createIndex({ index: {fields: ['docType', 'clientId']} })

  return function(dispatch) {
    kwargs.docTypes.map(docType => {
      db.find({
        selector: {docType: docType.docType}
      }).then(function (result) {
        dispatch({type: docType.dispatchType, payload: result.docs})
      }).catch(function (err) {
        dispatch({type: docType.dispatchErrorType, payload: err})
      })

    })
  }
}

export function getNextNumericCode(elements, field) {

  if (elements.length) {

    let keys = elements.map(element => element[field])

    keys = keys.sort((a, b) => a > b)
    const max = keys.pop()
    return parseInt(max) + 1

  }

  return 1

}
