// ------------------------------------------------------------------------------------------
// MODULE IMPORTS
// ------------------------------------------------------------------------------------------
import alertify from 'alertifyjs'

export function checkExpenseData(expense, expenses) {
  let Ok = true

  if (expense.document == '') {
    alertify.alert('Error', 'Debe especificar el numero de Documento de la Factura del Gasto')
    return false
  }

  if (expense.amount == '') {
    alertify.alert('Error', 'Debe especificar el Monto del Gasto')
    return false
  }

  // if (expense.category == '') {
  //   alertify.alert('Error', 'Debe especificar la categoría del Gasto')
  //   return false
  // }

  // UNIQUE FIELDS
  if (expenses.length) {
    expenses.forEach((expenseData) => {
      if (expense.code == expenseData.code) {
        if (expense._id != expenseData._id) {
          alertify.alert('Error', `El expensee ${expenseData.name} ${expenseData.last_name} ya posee el código ${expenseData.code}`)
          Ok = false
          return false
        }
      }
    })

  }

  return Ok
}
