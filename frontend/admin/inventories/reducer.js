
const productmovementModel = {
  'document': 0,
  'productId': '',
  'type': 'Input',
  'amount': 0,
  'date': new Date(),
  'description': ''
}

const stateConst = {
  productmovementsFetchError: '',
  productmovements: {},
  productmovementActive: productmovementModel
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    // ***********************************
    // PRODUCT MOVEMENTS
    // ***********************************

    case 'FETCH_PRODUCTMOVEMENTS_REJECTED':
    {
      return {
        ...state,
        productmovements: {},
        productmovementsFetchError: action.payload,
        productmovementActive: productmovementModel
      }
    }

    case 'FETCH_PRODUCTMOVEMENTS_FULFILLED':
    {
      return {
        ...state,
        productmovements: action.payload
      }
    }

    case 'SET_PRODUCTMOVEMENT':
    {
      return {
        ...state,
        productmovementActive: action.payload
      }
    }

    case 'CLEAR_PRODUCTMOVEMENT':
    {
      return {
        ...state,
        productmovementActive: productmovementModel
      }
    } // case

  } // switch

  return state // default return

} // reducer
