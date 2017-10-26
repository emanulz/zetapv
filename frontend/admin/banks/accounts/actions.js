// ------------------------------------------------------------------------------------------
// MODULE IMPORTS
// ------------------------------------------------------------------------------------------
import alertify from 'alertifyjs'

export function checkAccountData(account, accounts) {
  let Ok = true

  if (account.code == '') {
    alertify.alert('Error', 'Debe especificar el código de la cuenta')
    return false
  }

  if (account.name == '') {
    alertify.alert('Error', 'Debe especificar el nombre de la cuenta')
    return false
  }

  // UNIQUE FIELDS
  accounts.forEach((accountData) => {
    if (account.code == accountData.code) {
      if (account._id != accountData._id) {
        alertify.alert('Error', `La cuenta ${accountData.name} ya posee el código ${accountData.code}`)
        Ok = false
        return false
      }
    }
  })

  return Ok
}
