const stateConst = {
  editable: true,
  created: '',
  updated: '',
  isNull: false,
  cartHasItems: false, // var to check if cart has items
  cartItems: [], // the list of items in cart
  cartSubtotalNoDiscount: 0, // subtotal without discount and taxes
  cartSubtotal: 0, // the subtotal including discounts without taxes
  cartTaxes: 0, // total amount of taxes in cart in currency
  cartTotal: 0, // cart total after discount and taxes
  globalDiscount: 0, // discount %
  discountTotal: 0, // discount in currency
  cartItemActive: false
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    case 'CLEAR_ALL':
    {
      return {
        ...state,
        editable: true,
        created: '',
        updated: '',
        isNull: false,
        cartHasItems: false, // var to check if cart has items
        cartItems: [], // the list of items in cart
        cartSubtotalNoDiscount: 0, // subtotal without discount and taxes
        cartSubtotal: 0, // the subtotal including discounts without taxes
        cartTaxes: 0, // total amount of taxes in cart in currency
        cartTotal: 0, // cart total after discount and taxes
        globalDiscount: 0, // discount %
        discountTotal: 0, // discount in currency
        cartItemActive: false
      }
    }

    case 'ADD_TO_CART':
    {

      return {
        ...state,
        cartHasItems: true,
        cartItems: [
          action.payload,
          ...state.cartItems
        ]
      }
    } // case

    case 'REMOVE_FROM_CART':
    {

      const newCart = [...state.cartItems]

      newCart.splice(action.payload, 1)

      const itemsLeftInCart = (newCart.length > 0)
      // ? true
      // : false

      return {
        ...state,
        cartHasItems: itemsLeftInCart,
        cartItems: newCart
      }
    } // case

    case 'UPDATE_CART':
    {

      const newCart = [...state.cartItems]
      newCart[action.payload.index] = action.payload.item

      return {
        ...state,
        cartItems: newCart
      }
    } // case

    case 'UPDATE_CART_ITEM_LOTE':
    {

      const newCart = [...state.cartItems]
      newCart[action.payload.index]['lote'] = action.payload.lote

      return {
        ...state,
        cartItems: newCart
      }
    } // case

    case 'UPDATE_CART_TOTALS':
    {

      return {
        ...state,
        cartSubtotal: action.payload.subtotal,
        cartTaxes: action.payload.taxes,
        cartTotal: action.payload.total,
        discountTotal: action.payload.discountTotal,
        cartSubtotalNoDiscount: action.payload.subTotalNoDiscount
      }
    } // case

    case 'SET_GLOBAL_DISCOUNT':
    {

      return {
        ...state,
        globalDiscount: action.payload
      }
    } // case

    case 'REPLACE_CART':
    {
      return {
        ...state,
        cartItems: action.payload
      }
    }

    case 'UPDATE_LINE_DISCOUNT':
    {
      const newCart = [...state.cartItems]
      newCart[action.payload.index].discount = action.payload.value

      return {
        ...state,
        cartItems: newCart
      }
    }

    case 'NEW_SALE':
    {
      state = stateConst
      return {
        ...state, stateConst
      }
    } // case

    case 'LOADED_SALE':
    {
      return {
        ...state,
        created: action.payload.cart.created,
        isNull: action.payload.cart.isNull,
        cartHasItems: action.payload.cart.cartHasItems, // var to check if cart has items
        cartItems: action.payload.cart.cartItems, // the list of items in cart
        cartSubtotalNoDiscount: action.payload.cart.cartSubtotalNoDiscount, // subtotal without discount and taxes
        cartSubtotal: action.payload.cart.cartSubtotal, // the subtotal including discounts without taxes
        cartTaxes: action.payload.cart.cartTaxes, // total amount of taxes in cart in currency
        cartTotal: action.payload.cart.cartTotal, // cart total after discount and taxes
        globalDiscount: action.payload.cart.globalDiscount, // discount %
        discountTotal: action.payload.cart.discountTotal // discount in currency
      }
    }

    case 'LOADED_PROFORMA':
    {
      return {
        ...state,
        created: action.payload.cart.created,
        isNull: action.payload.cart.isNull,
        cartHasItems: action.payload.cart.cartHasItems, // var to check if cart has items
        cartItems: action.payload.cart.cartItems, // the list of items in cart
        cartSubtotalNoDiscount: action.payload.cart.cartSubtotalNoDiscount, // subtotal without discount and taxes
        cartSubtotal: action.payload.cart.cartSubtotal, // the subtotal including discounts without taxes
        cartTaxes: action.payload.cart.cartTaxes, // total amount of taxes in cart in currency
        cartTotal: action.payload.cart.cartTotal, // cart total after discount and taxes
        globalDiscount: action.payload.cart.globalDiscount, // discount %
        discountTotal: action.payload.cart.discountTotal // discount in currency
      }
    }

    case 'LOADED_PRESALE':
    {
      return {
        ...state,
        created: action.payload.cart.created,
        isNull: action.payload.cart.isNull,
        cartHasItems: action.payload.cart.cartHasItems, // var to check if cart has items
        cartItems: action.payload.cart.cartItems, // the list of items in cart
        cartSubtotalNoDiscount: action.payload.cart.cartSubtotalNoDiscount, // subtotal without discount and taxes
        cartSubtotal: action.payload.cart.cartSubtotal, // the subtotal including discounts without taxes
        cartTaxes: action.payload.cart.cartTaxes, // total amount of taxes in cart in currency
        cartTotal: action.payload.cart.cartTotal, // cart total after discount and taxes
        globalDiscount: action.payload.cart.globalDiscount, // discount %
        discountTotal: action.payload.cart.discountTotal // discount in currency
      }
    }

    case 'SET_PRODUCT_ACTIVE_IN_CART':
    {
      return {
        ...state,
        cartItemActive: action.payload
      }
    } // case

  } // switch

  return state // default return

} // reducer
