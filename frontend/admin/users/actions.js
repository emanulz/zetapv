// ------------------------------------------------------------------------------------------
// MODULE IMPORTS
// ------------------------------------------------------------------------------------------
import alertify from 'alertifyjs'

export function checkUserData(user, users) {
  let Ok = true

  if (user.username == '') {
    alertify.alert('Error', 'Debe especificar el nombre del Usuario')
    return false
  }

  if (user.password == '') {
    alertify.alert('Error', 'Debe especificar la contraseña del Usuario')
    return false
  }

  if (user.password2 == '') {
    alertify.alert('Error', 'Debe repetir la contraseña del Usuario')
    return false
  }

  if (user.password2 != user.password) {
    alertify.alert('Error', 'Las contraseñas no coinciden')
    return false
  }

  // UNIQUE FIELDS
  users.forEach((userData) => {
    console.log('Data', userData._id)
    console.log('User', user._id)
    if (user.username == userData.username) {
      if (user._id != userData._id || user._id == undefined) {
        alertify.alert('Error', `El usuario ${userData.username} ya existe.`)
        Ok = false
        return false
      }
    }
  })

  return Ok
}
