
const productmovementModel = {
  'document': 0,
  'docType': 'PRODUCT_MOVEMENT',
  'created': '',
  'updated': '',
  'productId': '',
  'type': 'INPUT',
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

    case 'FETCH_PRODUCT_MOVEMENTS_REJECTED':
    {
      return {
        ...state,
        productmovements: {},
        productmovementsFetchError: action.payload,
        productmovementActive: productmovementModel
      }
    }

    case 'FETCH_PRODUCT_MOVEMENTS_FULFILLED':
    {
      return {
        ...state,
        productmovements: action.payload
      }
    }

    case 'SET_PRODUCT_MOVEMENT':
    {
      return {
        ...state,
        productmovementActive: action.payload
      }
    }

    case 'CLEAR_PRODUCT_MOVEMENT':
    {
      return {
        ...state,
        productmovementActive: productmovementModel
      }
    } // case

  } // switch

  return state // default return

} // reducer
