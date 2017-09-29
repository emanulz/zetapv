// ------------------------------------------------------------------------------------------
// MODULE IMPORTS
// ------------------------------------------------------------------------------------------
import alertify from 'alertifyjs'

export function checkProductMovementData(movement, movements) {
  let Ok = true

  if (movement.date == '') {
    alertify.alert('Error', 'Debe especificar una fecha válida')
    return false
  }

  if (movement.productId == '') {
    alertify.alert('Error', 'Debe seleccionar un Producto')
    return false
  }

  if (movement.type == '') {
    alertify.alert('Error', 'Debe seleccionar un Tipo de Movimiento')
    return false
  }

  if (movement.amount == '' || movement.amount <= 0) {
    alertify.alert('Error', 'Debe introducir una cantidad válida')
    return false
  }

  if (movements.length) {
    movements.forEach((movementData) => {
      if (movement.document == movementData.document) {
        if (movement._id != movementData._id) {
          alertify.alert('Error', `Ya existe un movimiento con el documento #"${movementData.document}"`)
          Ok = false
          return false
        }
      }
    })
  }

  return Ok
}
