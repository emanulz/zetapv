export function loadPresale(id, sales) {
  const filteredSales = sales.filter(sale => {
    return sale._id == id
  })
  return function(dispatch) {
    if (filteredSales.length) {
      filteredSales[0]['created'] = new Date(filteredSales[0]['created'])
      // filteredSales[0]['globalDiscount'] = parseFloat(filteredSales[0]['globalDiscount'])
      document.getElementById('discountField').value = parseFloat(filteredSales[0]['cart']['globalDiscount'])
      filteredSales[0]['client']['saleLoaded'] = true

      dispatch({type: 'LOADED_PRESALE', payload: filteredSales[0]})
      // dispatch({type: 'LOADED_FALSE', payload: ''})
    } else {
      dispatch({type: 'NOT_FOUND_SALE', payload: id})
    }
  }
}

export function loadSale(id, sales) {
  const filteredSales = sales.filter(sale => {
    return sale.id == id
  })
  return function(dispatch) {
    if (filteredSales.length) {
      filteredSales[0]['created'] = new Date(filteredSales[0]['created'])
      // filteredSales[0]['globalDiscount'] = parseFloat(filteredSales[0]['globalDiscount'])
      document.getElementById('discountField').value = parseFloat(filteredSales[0]['cart']['globalDiscount'])
      document.title = `Venta #${id}`
      filteredSales[0]['client']['saleLoaded'] = true

      dispatch({type: 'LOADED_SALE', payload: filteredSales[0]})
      dispatch({type: 'SET_SALE', payload: filteredSales[0]})
      dispatch({type: 'SET_SALE_ID', payload: filteredSales[0]._id})

    } else {
      dispatch({type: 'NOT_FOUND_SALE', payload: id})
    }
  }
}
