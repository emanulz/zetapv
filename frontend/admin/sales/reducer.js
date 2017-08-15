const stateConst = {
  sales: [],
  saleActive: '',
  saleMovements: []
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    case 'FETCH_SALES_FULFILLED':
    {
      return {
        ...state,
        sales: action.payload
      }

    } // case

    case 'FETCH_SALES_REJECTED':
    {
      return {
        ...state,
        sales: []
      }
    } // case

    case 'SET_SALE':
    {
      return {
        ...state,
        saleActive: action.payload
      }
    } // case

    case 'CLEAR_SALE':
    {
      return {
        ...state,
        saleActive: ''
      }
    } // case

    case 'SET_SALE_MOVEMENTS':
    {
      return {
        ...state,
        saleMovements: action.payload
      }
    } // case

  } // switch

  return state // default return

} // reducer
