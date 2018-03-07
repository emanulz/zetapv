// ------------------------------------------------------------------------------------------
// MODULE IMPORTS
// ------------------------------------------------------------------------------------------
const uuidv1 = require('uuid/v1')
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
    newItem.priceToUse = data.priceToUse

    return newItem

  })

  return {type: 'REPLACE_CART', payload: newCart}

}

// Function to update the inline discount of an item, and reflect it on store
export function updateItemDiscount(itemsInCart, code, discount, globalDiscount, client) {

  const indexInCart = itemsInCart.findIndex(item => item.uuid == code) // checks if product exists

  const res = (indexInCart == -1) // if not exists dispatch Not Found, if exists check if already in cart
    ? {
      type: 'PRODUCT_IN_CART_NOT_FOUND',
      payload: -1
    }
    : {
      type: 'UPDATE_CART',
      payload: {
        item: updatedCartItem(itemsInCart, indexInCart, itemsInCart[indexInCart].qty, discount, globalDiscount, client,
          itemsInCart[indexInCart].uuid),
        index: indexInCart
      }
    }

  return res

}

// Function to update the inline discount of an item, and reflect it on store
export function updateItemLote(itemsInCart, code, lote) {
  const loteNum = !lote ? '-' : lote
  const indexInCart = itemsInCart.findIndex(item => item.uuid == code) // checks if product exists

  const res = (indexInCart == -1) // if not exists dispatch Not Found, if exists check if already in cart
    ? {
      type: 'PRODUCT_IN_CART_NOT_FOUND',
      payload: -1
    }
    : {
      type: 'UPDATE_CART_ITEM_LOTE',
      payload: {
        lote: loteNum,
        index: indexInCart
      }
    }

  return res

}

// When item is selected in code field
export function productSelected(code, qty, products, itemsInCart, globalDiscount, client, defaultConfig, userConfig) {

  const perLine = userConfig.cartSingleLinePerItem || defaultConfig.cartSingleLinePerItem

  const productSelected = products.findIndex(product => {
    return product.code == code || product.barcode == code
  }) // checks if product exists

  const res = (productSelected == -1) // if not exists dispatch Not Found, if exists check if already in cart
    ? {
      type: 'PRODUCT_NOT_FOUND',
      payload: -1
    }
    : checkIfInCart(code, qty, products, itemsInCart, globalDiscount, productSelected, client, perLine)

  return res

}

// Updates Amount based on qty input field

export function updateQty (code, qty, itemsInCart, globalDiscount, client) {

  const indexInCart = itemsInCart.findIndex(item => item.uuid == code)
  const qtyNum = parseFloat(qty)
  const res = {
    type: 'UPDATE_CART',
    payload: {
      item: updatedCartItem(itemsInCart, indexInCart, qtyNum, itemsInCart[indexInCart].discount, globalDiscount, client,
        itemsInCart[indexInCart].uuid),
      index: indexInCart
    }
  }
  return res
}

export function updateQtyCode (code, qty, itemsInCart, globalDiscount, client) {

  const indexInCart = itemsInCart.findIndex(item => item.product.code == code || item.product.barcode == code)
  const qtyNum = parseFloat(qty)
  const res = {
    type: 'UPDATE_CART',
    payload: {
      item: updatedCartItem(itemsInCart, indexInCart, qtyNum, itemsInCart[indexInCart].discount, globalDiscount, client,
        itemsInCart[indexInCart].uuid),
      index: indexInCart
    }
  }
  return res
}

// Updates Amount based on qty input field

export function addSubOne (code, subOrAdd, itemsInCart, globalDiscount, client) {

  const indexInCart = itemsInCart.findIndex(item => item.product.code == code)
  const qtyNum = subOrAdd ? parseFloat(itemsInCart[indexInCart].qty + 1) : parseFloat(itemsInCart[indexInCart].qty - 1)
  const res = {
    type: 'UPDATE_CART',
    payload: {
      item: updatedCartItem(itemsInCart, indexInCart, qtyNum, itemsInCart[indexInCart].discount, globalDiscount, client,
        itemsInCart[indexInCart].uuid),
      index: indexInCart
    }
  }
  return res
}

// ------------------------------------------------------------------------------------------
// LOCAL AUX FUNCTIONS
// ------------------------------------------------------------------------------------------

// checks in cart if item already exists
function checkIfInCart(code, qty, products, itemsInCart, globalDiscount, productSelected, client, perLine) {

  // check if product in cart
  const indexInCart = itemsInCart.findIndex(cart => cart.product.code == code || cart.product.barcode == code)

  const dataNewProd = caclSubtotal(products[productSelected], qty, 0, globalDiscount, client)

  // CHECK IF CONFIG ALLOWS MULTIPLE LINES OR NOT
  if (perLine) {
    const uuid = uuidv1()
    const res = (indexInCart == -1) // if not exists in cart Dispats ADD_TO_TABLE, if exists dispatch cart updated
      ? {
        type: 'ADD_TO_CART',
        payload: {
          uuid: uuid,
          product: products[productSelected],
          qty: qty,
          discount: 0,
          discountCurrency: dataNewProd.discountCurrency,
          subTotalNoDiscount: dataNewProd.subTotalNoDiscount,
          subtotal: dataNewProd.subtotal,
          totalWithIv: dataNewProd.totalWithIv,
          lote: '-',
          priceToUse: dataNewProd.priceToUse
        }
      }

      : {
        type: 'UPDATE_CART',
        payload: {
          item: updatedCartItem(itemsInCart, indexInCart, itemsInCart[indexInCart].qty + qty,
            itemsInCart[indexInCart].discount, globalDiscount, client, itemsInCart[indexInCart].uuid),
          index: indexInCart
        }
      }
    return res

  // IGNORE IF ALREADY IN CART IF CONFIG SAYS THAT
  } else {
    const uuid = uuidv1()
    const res = {
      type: 'ADD_TO_CART',
      payload: {
        uuid: uuid,
        product: products[productSelected],
        qty: qty,
        discount: 0,
        discountCurrency: dataNewProd.discountCurrency,
        subTotalNoDiscount: dataNewProd.subTotalNoDiscount,
        subtotal: dataNewProd.subtotal,
        totalWithIv: dataNewProd.totalWithIv,
        lote: '-',
        priceToUse: dataNewProd.priceToUse
      }
    }
    return res
  }

}

// calculates the subtotal by line, also the total with iv included, the discount in currency format
function caclSubtotal(product, qty, productDiscount, globalDiscount, client) {

  const price = priceToUse(product, client)

  const subTotalNoDiscount = price * qty

  const subTotal = price * qty * (1 - (productDiscount / 100)) * (1 - (globalDiscount / 100))

  const iv1 = (product.useTaxes)
    ? subTotal * (product.taxes / 100)
    : 0

  const iv2 = (product.useTaxes2)
    ? subTotal * (product.taxes2 / 100)
    : 0

  const totalWithIv = subTotal + iv1 + iv2

  const discountCurrencyInLine = price * qty * (productDiscount / 100)
  const discountCurrencyGlobal = ((price * qty) - discountCurrencyInLine) * (globalDiscount / 100)

  const discountCurrency = discountCurrencyInLine + discountCurrencyGlobal

  return {subtotal: subTotal,
    totalWithIv: Math.round(totalWithIv),
    discountCurrency: discountCurrency,
    subTotalNoDiscount: subTotalNoDiscount,
    priceToUse: price}

}

// updates an item in the cart with new information, this aux funtion returns new updated object ready for replace the stored one
function updatedCartItem(itemsInCart, index, newQty, productDiscount, globalDiscount, client, uuid) {

  const data = caclSubtotal(itemsInCart[index].product, newQty, productDiscount, globalDiscount, client)

  return {
    uuid: uuid,
    product: itemsInCart[index].product,
    discountCurrency: data.discountCurrency,
    qty: newQty,
    discount: productDiscount,
    subTotalNoDiscount: data.subTotalNoDiscount,
    subtotal: data.subtotal,
    totalWithIv: data.totalWithIv,
    lote: itemsInCart[index].lote,
    priceToUse: data.priceToUse
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
