// ------------------------------------------------------------------------------------------
// EXPORT FUNCTIONS USED IN COMPONENTS
// ------------------------------------------------------------------------------------------

// This function updates totals the cart store item, generates new values according cart item objects, then push the to store
export function updateTotals(inCart) {

  let subtotal = 0
  let subTotalNoDiscount = 0
  let taxes = 0
  let total = 0
  let discountTotal = 0

  // for Each element adds the values to get totals
  inCart.forEach((item) => {

    subTotalNoDiscount = subTotalNoDiscount + item.subTotalNoDiscount

    subtotal = subtotal + item.subtotal

    const taxesCalc = (item.product.useTaxes)
      ? item.subtotal * (item.product.taxes / 100)
      : 0

    const taxesCalc2 = (item.product.useTaxes2)
      ? item.subtotal * (item.product.taxes2 / 100)
      : 0

    taxes = taxes + taxesCalc + taxesCalc2

    discountTotal = discountTotal + item.discountCurrency // this is the value in currency

  })
  // TODO Config for round or not
  total = Math.round(subtotal + taxes)

  // returs a dispatch with a payload of the obtained values
  return {
    type: 'UPDATE_CART_TOTALS',
    payload: {
      subtotal: subtotal,
      taxes: taxes,
      total: total,
      discountTotal: discountTotal,
      subTotalNoDiscount: subTotalNoDiscount
    }
  }
}

// Finds a code in the cart and sends a dispatch to remove it from cart based on index
export function removeFromCart(itemsInCart, code) {

  const indexInCart = itemsInCart.findIndex(item => item.uuid == code) // checks if product exists

  const res = (indexInCart == -1) // if not exists dispatch Not Found, if exists check if already in cart
    ? {
      type: 'PRODUCT_IN_CART_NOT_FOUND',
      payload: -1
    }
    : {
      type: 'REMOVE_FROM_CART',
      payload: indexInCart
    }

  return res
}
