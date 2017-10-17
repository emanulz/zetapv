// ------------------------------------------------------------------------------------------
// MODULE IMPORTS
// ------------------------------------------------------------------------------------------
import alertify from 'alertifyjs'

export function checkWarehouseData(warehouse, warehouses) {
  let Ok = true

  if (warehouse.code == '') {
    alertify.alert('Error', 'Debe especificar el código de la Bodega')
    return false
  }

  if (warehouse.name == '') {
    alertify.alert('Error', 'Debe especificar el nombre de la Bodega')
    return false
  }
  // UNIQUE FIELDS
  warehouses.forEach((warehouseData) => {
    if (warehouse.code == warehouseData.code) {
      if (warehouse._id != warehouseData._id) {
        alertify.alert('Error', `La bodega "${warehouseData.name}" ya posee el código: ${warehouseData.code}`)
        Ok = false
        return false
      }
    }
  })

  return Ok
}
