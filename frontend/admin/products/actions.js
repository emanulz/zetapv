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

export function determinAmounts(product, fieldName, value) {
  switch (fieldName) {

    case 'sellPrice':
    {
      product = fromSellPrice(product, value, 'price', 'utility')
      return product
    }
    case 'sellPrice2':
    {
      product = fromSellPrice(product, value, 'price2', 'utility2')
      return product
    }
    case 'sellPrice3':
    {
      product = fromSellPrice(product, value, 'price3', 'utility3')
      return product
    }

    case 'sellPrice4':
    {
      product = fromSellPrice(product, value, 'price4', 'utility4')
      return product
    }
    case 'price':
    {
      product = fromPrice(product, value, 'sellPrice', 'utility')
      return product
    }
    case 'price2':
    {
      product = fromPrice(product, value, 'sellPrice2', 'utility2')
      return product
    }
    case 'price3':
    {
      product = fromPrice(product, value, 'sellPrice3', 'utility3')
      return product
    }

    case 'price4':
    {
      product = fromPrice(product, value, 'sellPrice4', 'utility4')
      return product
    }

    case 'cost':
    {
      product = fromCost(product, value)
      return product
    }
    case 'costBased':
    {
      product = fromCost(product, product.cost)
      return product
    }
    case 'taxes':
    {
      product = taxesChanged(product)
      return product
    }
    case 'taxes2':
    {
      product = taxesChanged(product)
      return product
    }
    case 'fairTrade':
    {
      product = taxesChanged(product)
      return product
    }
    case 'useTaxes':
    {
      product = taxesChanged(product)
      return product
    }
    case 'useTaxes2':
    {
      product = taxesChanged(product)
      return product
    }
    case 'useFairTrade':
    {
      product = taxesChanged(product)
      return product
    }
    case 'utility':
    {
      product = fromUtility(product, value, 'price', 'sellPrice')
      return product
    }
    case 'utility2':
    {
      product = fromUtility(product, value, 'price2', 'sellPrice2')
      return product
    }
    case 'utility3':
    {
      product = fromUtility(product, value, 'price3', 'sellPrice3')
      return product
    }
    case 'utility4':
    {
      product = fromUtility(product, value, 'price4', 'sellPrice4')
      return product
    }

  }

  return product
}

function fromSellPrice(product, value, priceField, utilityField) {
  product.costBased = false
  if (value) {
    const iv1 = product.useTaxes ? parseFloat(product.taxes) / 100 : 0
    const iv2 = product.useTaxes2 ? parseFloat(product.taxes2) / 100 : 0

    const price = parseFloat(value / (1 + iv1 + iv2))

    product[priceField] = price.toFixed(2)

    const utility = product.cost ? ((price / parseFloat(product.cost)) - 1) * 100 : 0

    product[utilityField] = utility.toFixed(2)
    return product

  } else {
    product[priceField] = 0
    product[utilityField] = 0
    return product
  }
}

function fromPrice(product, value, sellField, utilityField) {

  value = parseFloat(value)
  product.costBased = false
  if (value) {
    const iv1 = product.useTaxes ? parseFloat(product.taxes) / 100 : 0
    const iv2 = product.useTaxes2 ? parseFloat(product.taxes2) / 100 : 0

    const sellPrice = (value * iv1) + (value * iv2) + value
    product[sellField] = sellPrice.toFixed(2)

    const utility = product.cost ? ((value / parseFloat(product.cost)) - 1) * 100 : 0
    product[utilityField] = utility.toFixed(2)
    return product

  } else {
    product[sellField] = 0
    product[utilityField] = 0
    return product
  }
}

function fromCost(product, cost) {

  if (product.costBased) { // IF PRICE DEPENDS ON COST
    const iv1 = product.useTaxes ? parseFloat(product.taxes) / 100 : 0
    const iv2 = product.useTaxes2 ? parseFloat(product.taxes2) / 100 : 0
    const fairTrade = product.useFairTrade ? parseFloat(product.fairTrade) / 100 : 0

    let price = cost && product.utility ? parseFloat(cost) * (1 + (parseFloat(product.utility) / 100)) : 0
    price = price * (1 + fairTrade)
    product['price'] = price.toFixed(2)

    let price2 = cost && product.utility2 ? parseFloat(cost) * (1 + (parseFloat(product.utility2) / 100)) : 0
    price2 = price2 * (1 + fairTrade)
    product['price2'] = price2.toFixed(2)

    let price3 = cost && product.utility3 ? parseFloat(cost) * (1 + (parseFloat(product.utility3) / 100)) : 0
    price3 = price3 * (1 + fairTrade)
    product['price3'] = price3.toFixed(2)

    let price4 = cost && product.utility4 ? parseFloat(cost) * (1 + (parseFloat(product.utility4) / 100)) : 0
    price4 = price4 * (1 + fairTrade)
    product['price4'] = price4.toFixed(2)

    const sellPrice = (price * iv1) + (price * iv2) + price
    product['sellPrice'] = sellPrice.toFixed(2)

    const sellPrice2 = (price2 * iv1) + (price2 * iv2) + price2
    product['sellPrice2'] = sellPrice2.toFixed(2)

    const sellPrice3 = (price3 * iv1) + (price3 * iv2) + price3
    product['sellPrice3'] = sellPrice3 ? sellPrice3.toFixed(2) : 0

    const sellPrice4 = (price4 * iv1) + (price4 * iv2) + price4
    product['sellPrice4'] = sellPrice4 ? sellPrice4.toFixed(2) : 0

    return product

  } else { // IF PRICE IS FIXED
    const utility = ((parseFloat(product.price) / parseFloat(cost)) - 1) * 100
    product['utility'] = utility.toFixed(2)

    const utility2 = ((parseFloat(product.price2) / parseFloat(cost)) - 1) * 100
    product['utility2'] = utility2.toFixed(2)

    const utility3 = ((parseFloat(product.price3) / parseFloat(cost)) - 1) * 100
    product['utility3'] = utility3.toFixed(2)

    const utility4 = ((parseFloat(product.price4) / parseFloat(cost)) - 1) * 100
    product['utility4'] = utility4.toFixed(2)

    return product
  }

}

function fromUtility(product, utility, priceField, sellPriceField) {
  if (product.costBased) {
    const iv1 = product.useTaxes ? parseFloat(product.taxes) / 100 : 0
    const iv2 = product.useTaxes2 ? parseFloat(product.taxes2) / 100 : 0
    const fairTrade = product.useFairTrade ? parseFloat(product.fairTrade) / 100 : 0

    let price = product.cost && utility ? parseFloat(product.cost) * (1 + (parseFloat(utility) / 100)) : 0
    price = price * (1 + fairTrade)
    product[priceField] = price.toFixed(2)

    const sellPrice = (price * iv1) + (price * iv2) + price
    product[sellPriceField] = sellPrice.toFixed(2)

    return product
  }

  return product
}

function taxesChanged(product) {

  if (product.costBased) {
    product = fromCost(product, product.cost)
    return product

  } else {
    product = fromPrice(product, product.price, 'sellPrice', 'utility')
    product = fromPrice(product, product.price2, 'sellPrice2', 'utility2')
    product = fromPrice(product, product.price3, 'sellPrice3', 'utility3')
    product = fromPrice(product, product.price3, 'sellPrice4', 'utility4')

    return product
  }

}
