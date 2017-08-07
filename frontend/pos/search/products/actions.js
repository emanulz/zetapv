export function hidePanel() {

  return {type: 'PRODUCT_HIDE_PANEL', payload: -1}
}

export function searchProduct(val, products) {

  const text = val.split('%')
  const matchs = []

  products.forEach(product => {
    let control = true
    const description = product.description.toString()

    text.forEach(word => {
      const index = description.toLowerCase().indexOf(word.toLowerCase())

      if (index == -1) {
        control = false
        return false
      }
    })

    if (control) {
      matchs.push(product)
    }

  })

  const res = (matchs.length)
    ? {
      type: 'PRODUCT_SEARCH_SUCCESS',
      payload: matchs
    }
    : {
      type: 'PRODUCT_SEARCH_FAIL',
      payload: -1
    }

  return res
}

export function productSelectedTable(code) {

  return {type: 'SET_PRODUCT_FIELD_VALUE', payload: code}

}
