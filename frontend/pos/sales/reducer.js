const saleActiveModel = {
  id: 0,
  docType: 'SALE',
  cart: [],
  client: [],
  pay: [],
  created: new Date()
}

const stateConst = {
  sales: [],
  saleActive: saleActiveModel

}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    case 'FETCH_SALES_REJECTED':
    {
      return {
        ...state,
        sales: []
      }
    } // case

    case 'FETCH_SALES_FULFILLED':
    {
      return {
        ...state,
        sales: action.payload
      }
    } // case

    case 'SET_SALE':
    {
      return {
        ...state,
        saleActive: action.payload
      }
    } // case

  } // switch

  return state // default return

} // reducer
