// ------------------------------------------------------------------------------------------
// MODULE IMPORTS
// ------------------------------------------------------------------------------------------

const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

// ------------------------------------------------------------------------------------------
// EXPORT FUNCTIONS USED IN COMPONENTS
// ------------------------------------------------------------------------------------------

// Fetch products from backend
export function fetchProducts() {

  return function(dispatch) {

    const localDbProducts = new PouchDB('general')
    localDbProducts.createIndex({ index: {fields: ['docType']} })
    localDbProducts.createIndex({ index: {fields: ['docType', 'code']} })

    localDbProducts.allDocs({include_docs: true, attachments: true}).then((response) => {
      console.log(response)
      const rows = response.rows
      const data = []
      rows.forEach(row => data.push(row.doc))

      dispatch({type: 'FETCH_PRODUCTS_FULFILLED', payload: data})
    }).catch((err) => {
      dispatch({type: 'FETCH_PRODUCTS_REJECTED', payload: err})
    })
  }
}

// opens the product search panel
export function searchProduct() {

  return {type: 'PRODUCT_SHOW_PANEL', payload: -1}
}

// Function to update the globa; discount of complete storage of items, and reflect it on store, then updating DOME
export function recalcCart(itemsInCart, globalDiscount, client) {

  const newCart = itemsInCart.map(item => {

    const newItem = item

    const data = caclSubtotal(item.product, item.qty, item.discount, globalDiscount, client)

    newItem.subtotal = data.subtotal
    newItem.totalWithIv = data.totalWithIv
    newItem.discountCurrency = data.discountCurrency
    newItem.subTotalNoDiscount = data.subTotalNoDiscount

    return newItem

  })

  return {type: 'REPLACE_CART', payload: newCart}

}

// Function to update the inline discount of an item, and reflect it on store
export function updateItemDiscount(itemsInCart, code, discount, globalDiscount, client) {

  const indexInCart = itemsInCart.findIndex(item => item.product.code == code) // checks if product exists

  const res = (indexInCart == -1) // if not exists dispatch Not Found, if exists check if already in cart
    ? {
      type: 'PRODUCT_IN_CART_NOT_FOUND',
      payload: -1
    }
    : {
      type: 'UPDATE_CART',
      payload: {
        item: updatedCartItem(itemsInCart, indexInCart, itemsInCart[indexInCart].qty, discount, globalDiscount, client),
        index: indexInCart
      }
    }

  return res

}

// When item is selected in code field
export function productSelected(code, qty, products, itemsInCart, globalDiscount, client) {

  const productSelected = products.findIndex(product => product.code == code) // checks if product exists

  const res = (productSelected == -1) // if not exists dispatch Not Found, if exists check if already in cart
    ? {
      type: 'PRODUCT_NOT_FOUND',
      payload: -1
    }
    : checkIfInCart(code, qty, products, itemsInCart, globalDiscount, productSelected, client)

  return res

}

// ------------------------------------------------------------------------------------------
// LOCAL AUX FUNCTIONS
// ------------------------------------------------------------------------------------------

// checks in cart if item already exists
function checkIfInCart(code, qty, products, itemsInCart, globalDiscount, productSelected, client) {

  const indexInCart = itemsInCart.findIndex(cart => cart.product.code == code) // check if product in cart

  const dataNewProd = caclSubtotal(products[productSelected], qty, 0, globalDiscount, client)

  const res = (indexInCart == -1) // if not exists in cart Dispats ADD_TO_TABLE, if exists dispatch cart updated
    ? {
      type: 'ADD_TO_CART',
      payload: {
        product: products[productSelected],
        qty: qty,
        discount: 0,
        discountCurrency: dataNewProd.discountCurrency,
        subTotalNoDiscount: dataNewProd.subTotalNoDiscount,
        subtotal: dataNewProd.subtotal,
        totalWithIv: dataNewProd.totalWithIv
      }
    }

    : {
      type: 'UPDATE_CART',
      payload: {
        item: updatedCartItem(itemsInCart, indexInCart, itemsInCart[indexInCart].qty + qty,
          itemsInCart[indexInCart].discount, globalDiscount, client),
        index: indexInCart
      }
    }

  return res

}

// calculates the subtotal by line, also the total with iv included, the discount in currency format
function caclSubtotal(product, qty, productDiscount, globalDiscount, client) {

  const price = priceToUse(product, client)

  const subTotalNoDiscount = price * qty

  const subTotal = price * qty * (1 - (productDiscount / 100)) * (1 - (globalDiscount / 100))

  const totalWithIv = (product.useTaxes)
    ? subTotal * (1 + (product.taxes / 100))
    : subTotal

  const discountCurrencyInLine = price * qty * (productDiscount / 100)
  const discountCurrencyGlobal = ((price * qty) - discountCurrencyInLine) * (globalDiscount / 100)

  const discountCurrency = discountCurrencyInLine + discountCurrencyGlobal

  return {subtotal: subTotal, totalWithIv: Math.ceil(totalWithIv), discountCurrency: discountCurrency, subTotalNoDiscount: subTotalNoDiscount}

}

// updates an item in the cart with new information, this aux funtion returns new updated object ready for replace the stored one
function updatedCartItem(itemsInCart, index, newQty, productDiscount, globalDiscount, client) {

  const data = caclSubtotal(itemsInCart[index].product, newQty, productDiscount, globalDiscount, client)

  return {
    product: itemsInCart[index].product,
    discountCurrency: data.discountCurrency,
    qty: newQty,
    discount: productDiscount,
    subTotalNoDiscount: data.subTotalNoDiscount,
    subtotal: data.subtotal,
    totalWithIv: data.totalWithIv
  }
}

// function to determin price to use in calculation
function priceToUse(product, client) {

  if (client.clientType == 'GENERAL') return product.price

  if (client.clientType == 'DISTRIB' && product.usePrice2) return product.price2
  if (client.clientType == 'DISTRIB') return product.price

  if (client.clientType == 'WHOLESA' && product.usePrice3) return product.price3
  if (client.clientType == 'WHOLESA' && product.usePrice2) return product.price2
  if (client.clientType == 'WHOLESA') return product.price

  return product.price

}
