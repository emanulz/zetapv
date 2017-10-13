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
  completed: false,
  saleActiveId: 0,
  isSalesPanelVisible: false

}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    case 'SHOW_SALES_PANEL':
    {
      return {
        ...state,
        isSalesPanelVisible: true
      }
    } // case

    case 'HIDE_SALES_PANEL':
    {
      return {
        ...state,
        isSalesPanelVisible: false
      }
    } // case

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

    case 'SET_SALE_ID':
    {
      return {
        ...state,
        saleActiveId: action.payload,
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

    case 'LOADED_SALE':
    {
      return {
        ...state,
        saleActive: action.payload,
        saleActiveId: action.payload.id
      }
    }

  } // switch

  return state // default return

} // reducer
