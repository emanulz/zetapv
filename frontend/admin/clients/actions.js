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

  if (client.maxDiscount > 100 || client.maxDiscount < 0) {
    alertify.alert('Error', 'El descuento Máximo debe estar entre 0% y 100%')
    return false
  }

  if (client.defaultDiscount > 100 || client.defaultDiscount < 0) {
    alertify.alert('Error', 'El descuento Predeterminado debe estar entre 0% y 100%')
    return false
  }

  if (client.defaultDiscount > client.maxDiscount) {
    alertify.alert('Error', 'El descuento Predeterminado no puede ser mayor al descuento Máximo')
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
