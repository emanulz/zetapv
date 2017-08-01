// ------------------------------------------------------------------------------------------
// MODULE IMPORTS
// ------------------------------------------------------------------------------------------
import alertify from 'alertifyjs'

const PouchDB = require('pouchdb')

// ------------------------------------------------------------------------------------------
// EXPORT FUNCTIONS USED IN COMPONENTS
// ------------------------------------------------------------------------------------------

// Fetch products from backend
export function fetchProducts() {
  return function(dispatch) {
    const localDbProducts = new PouchDB('products')

    localDbProducts.allDocs({include_docs: true, attachments: true}).then((response) => {
      console.log(response)
      const rows = response.rows
      const data = []
      rows.forEach(row => data.push(row.doc))

      dispatch({type: 'FETCH_PRODUCTS_FULFILLED', payload: data})
    }).catch((err) => {
      dispatch({type: 'FETCH_PRODUCTS_REJECTED', payload: err})
    })
  }
}

// export function fetchDepartments() {
//   return function(dispatch) {
//     const localDbProducts = new PouchDB('departments')
//
//     localDbProducts.allDocs({include_docs: true, attachments: true}).then((response) => {
//       console.log(response)
//       const rows = response.rows
//       const data = []
//       rows.forEach(row => data.push(row.doc))
//
//       dispatch({type: 'FETCH_DEPARTMENTS_FULFILLED', payload: data})
//     }).catch((err) => {
//       dispatch({type: 'FETCH_DEPARTMENTS_REJECTED', payload: err})
//     })
//   }
// }

export function checkProductData(product, products) {
  let Ok = true

  if (product.code == '') {
    alertify.alert('Error', 'Debe especificar el código del producto')
    return false
  }

  if (product.description == '') {
    alertify.alert('Error', 'Debe especificar la descripción del producto')
    return false
  }

  products.forEach((productData) => {
    if (product.code == productData.code) {
      if (product._id != productData._id) {
        alertify.alert('Error', `El producto "${productData.description}" ya posee el código ${product.code}`)
        Ok = false
        return false
      }
    }
  })

  return Ok
}

export function saveProduct(product) {
  return function(dispatch) {
    const db = new PouchDB('products')

    db.post(product).then((response) => {
      alertify.alert('Completado', `Producto creado con éxito.`)
      dispatch({type: 'CLEAR_PRODUCT', payload: ''})
    }).catch((err) => {
      alertify.alert('Error', `hubo un error al crear el producto ${err}.`)
    })
  }
}

export function setProduct(code) {
  return function(dispatch) {
    const db = new PouchDB('products')

    db.allDocs({include_docs: true, attachments: true}).then((response) => {
      const rows = response.rows

      const data = []

      rows.forEach((row) => {
        if (row.doc.code == code) {
          data.push(row.doc)
        }
      })
      if (data.length) {
        dispatch({type: 'SET_PRODUCT', payload: data[0]})
      } else {
        alertify.alert('Error', `No hay registros con el código ${code}`)
      }
    }).catch((err) => {
      alertify.alert('Error', `Error al cargar el producto: ${err}`)
    })
  }
}

export function updateProduct(product) {
  const db = new PouchDB('products')
  return function(dispatch) {
    db.get(product._id).then((dbProduct) => {
      product._rev = dbProduct._rev

      db.put(product).then((response) => {
        alertify.alert('Completado', `Producto actualizado con éxito.`)

        console.log(response)

        db.get(response.id).then((dbProduct) => {
          dispatch({type: 'SET_PRODUCT', payload: dbProduct})
        }).catch((err) => {
          alertify.alert('Error', `hubo un error al obtener el producto actualizado ${err}.`)
        })
      }).catch((err) => {
        alertify.alert('Error', `hubo un error al actualizar el producto ${err}.`)
      })
    }).catch((err) => {
      alertify.alert('Error', `hubo un error al obtener el producto para actualizar ${err}.`)
    })
  }
}

export function deleteProduct(product) {
  const db = new PouchDB('products')

  return function(dispatch) {
    db.get(product._id).then((dbProduct) => {
      product._rev = dbProduct._rev
      product._deleted = true

      db.put(product).then((response) => {
        alertify.alert('Completado', 'Elemento eliminado satifactoriamente')
        dispatch({type: 'CLEAR_PRODUCT', payload: ''})
      }).catch((err) => {
        alertify.alert('Error', `Hubo un error al eliminar el producto ${err}.`)
      })
    }).catch((err) => {
      alertify.alert('Error', `Hubo un error al seleccionar el producto ${err}.`)
    })
  }
}

export function checkDepartmentData(department, departments) {
  let Ok = true

  if (department.code == '') {
    alertify.alert('Error', 'Debe especificar el código del departamento')
    return false
  }

  if (department.name == '') {
    alertify.alert('Error', 'Debe especificar el nombre del departamento')
    return false
  }

  departments.forEach((departmentData) => {
    if (department.code == departmentData.code || department.name.toLowerCase() == departmentData.name.toLowerCase()) {
      if (department._id != departmentData._id) {
        alertify.alert('Error', `El departamento "${departmentData.name}" ya existe con el código ${departmentData.code}`)
        Ok = false
        return false
      }
    }
  })

  return Ok
}

export function checkSubDepartmentData(subdepartment, subdepartments) {
  let Ok = true

  if (subdepartment.code == '') {
    alertify.alert('Error', 'Debe especificar el código del departamento')
    return false
  }

  if (subdepartment.name == '') {
    alertify.alert('Error', 'Debe especificar el nombre del departamento')
    return false
  }

  subdepartments.forEach((subdepartmentData) => {
    if (subdepartment.code == subdepartmentData.code || subdepartment.name.toLowerCase() == subdepartmentData.name.toLowerCase()) {
      if (subdepartment._id != subdepartmentData._id) {
        alertify.alert('Error', `El departamento "${subdepartmentData.name}" ya existe con el código ${subdepartmentData.code}`)
        Ok = false
        return false
      }
    }
  })

  return Ok
}

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

        console.log(response)

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
      console.log(response)
      const rows = response.rows
      const data = []
      rows.forEach(row => data.push(row.doc))

      dispatch({type: kwargs.dispatchType, payload: data})
    }).catch((err) => {
      dispatch({type: kwargs.dispatchErrorType, payload: err})
    })
  }
}
