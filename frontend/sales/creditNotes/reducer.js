
const stateConst = {
  salesFiltered: [],
  clientFilter: '',
  saleFilter: '',
  saleActive: {}

}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    case 'SET_SALES_FILTERED':
    {
      return {
        ...state,
        salesFiltered: action.payload
      }
    } // case

    case 'CLEAR_SALES_FILTERED':
    {
      return {
        ...state,
        salesFiltered: []
      }
    } // case

    case 'SET_SALE_SELECTED':
    {
      return {
        ...state,
        saleActive: action.payload
      }
    } // case

    case 'CLEAR_SALE_SELECTED':
    {
      return {
        ...state,
        saleActive: []
      }
    } // case

    case 'SET_CREDIT_NOTE_CLIENT_FILTER':
    {
      return {
        ...state,
        clientFilter: action.payload
      }
    } // case

    case 'CLEAR_CREDIT_NOTE_CLIENT_FILTER':
    {
      return {
        ...state,
        clientFilter: ''
      }
    } // case

    case 'SET_CREDIT_NOTE_SALE_FILTER':
    {
      return {
        ...state,
        saleFilter: action.payload
      }
    } // case

    case 'CLEAR_CREDIT_NOTE_SALE_FILTER':
    {
      return {
        ...state,
        saleFilter: ''
      }
    } // case

  } // switch

  return state // default return

} // reducer
