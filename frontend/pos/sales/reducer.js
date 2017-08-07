const saleActiveModel = {
  id: 0,
  docType: 'SALE',
  cart: {},
  client: '',
  pay: {},
  created: new Date()
}

const stateConst = {
  sales: [],
  saleActive: saleActiveModel,
  completed: false

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
        saleActive: action.payload,
        completed: true
      }
    } // case

    case 'NEW_SALE':
    {
      const sales = state.sales
      state = stateConst
      return {
        ...state, sales: sales
      }
    } // case

  } // switch

  return state // default return

} // reducer
