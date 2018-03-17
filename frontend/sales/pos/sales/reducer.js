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
  isSalesPanelVisible: false,
  isPresalesPanelVisible: false

}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    case 'CLEAR_ALL':
    {
      return {
        ...state,
        saleActive: saleActiveModel,
        completed: false,
        saleActiveId: 0,
        isSalesPanelVisible: false,
        isPresalesPanelVisible: false
      }
    } // case

    case 'SHOW_SALES_PANEL':
    {
      return {
        ...state,
        isSalesPanelVisible: true
      }
    } // case

    case 'SHOW_PRESALES_PANEL':
    {
      return {
        ...state,
        isPresalesPanelVisible: true
      }
    } // case

    case 'HIDE_SALES_PANEL':
    {
      return {
        ...state,
        isSalesPanelVisible: false
      }
    } // case

    case 'HIDE_PRESALES_PANEL':
    {
      return {
        ...state,
        isPresalesPanelVisible: false
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
        completed: true
      }
    } // case

    case 'SET_PRESALE_ID':
    {
      return {
        ...state,
        completed: true
      }
    } // case

    case 'SET_PROFORMA_ID':
    {
      return {
        ...state,
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

    case 'LOADED_PRESALE':
    {
      const sale = saleActiveModel
      sale.cart = action.payload.cart
      sale.client = action.payload.client
      return {
        ...state,
        saleActive: sale
      }
    }

    case 'LOADED_PROFORMA':
    {
      const sale = saleActiveModel
      sale.cart = action.payload.cart
      sale.client = action.payload.client
      return {
        ...state,
        saleActive: sale
      }
    }

  } // switch

  return state // default return

} // reducer
