// ------------------------------------------------------------------------------------------
// MODULE IMPORTS
// ------------------------------------------------------------------------------------------
import alertify from 'alertifyjs'

// ------------------------------------------------------------------------------------------
// EXPORT FUNCTIONS USED IN COMPONENTS
// ------------------------------------------------------------------------------------------
// TODO Better Check FIELDS, based on sale data
// TODO Better PRODUCT ACTIONS EXAMPLE set auto utility, taxes etc
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
