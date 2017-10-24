
export function filterProducts(products, text, department, subdepartment) {

  let filtered = products

  if (filtered.length) {
    if (text) {
      filtered = filtered.filter(el => {
        return el.code.indexOf(text) != -1 ||
        el.barcode.toString().indexOf(text) != -1 ||
        el.description.toUpperCase().indexOf(text.toUpperCase()) != -1
      })
    }
    if (department) {
      filtered = filtered.filter(el => el.department == department)
    }
    if (subdepartment) {
      filtered = filtered.filter(el => el.subdepartment == subdepartment)
    }

    return filtered

  } else {
    return []
  }

}
