// ------------------------------------------------------------------------------------------
// MODULE IMPORTS
// ------------------------------------------------------------------------------------------
import alertify from 'alertifyjs'

export function checkDonationData(donation, donations) {
  let Ok = true

  if (donation.date == '') {
    alertify.alert('Error', 'Debe especificar la fecha de la donación')
    return false
  }

  if (donation.amount == '') {
    alertify.alert('Error', 'Debe especificar el monto de la donación')
    return false
  }

  if (donation.document == '') {
    alertify.alert('Error', 'Debe especificar un número de documento de referencia de la donación')
    return false
  }

  // UNIQUE FIELDS
  donations.forEach((donationData) => {
    if (donation.id == donationData.id) {
      if (donation._id != donationData._id) {
        alertify.alert('Error', `La Donación ${donationData.id} ya posee el código establecido.`)
        Ok = false
        return false
      }
    }
  })

  return Ok
}
