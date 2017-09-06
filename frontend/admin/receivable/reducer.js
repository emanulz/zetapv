
const clientmovementModel = {
  'document': 0,
  'docType': 'CLIENT_MOVEMENT',
  'created': '',
  'updated': '',
  'clientId': '',
  'type': 'CREDIT',
  'amount': 0,
  'date': new Date(),
  'saleId': 0,
  'description': ''
}

const stateConst = {
  clientmovementsFetchError: '',
  clientmovements: {},
  clientmovementActive: clientmovementModel,
  clientActiveMovements: [],
  clientActiveCreditSales: [],
  clientActiveCreditSalesD: [],
  paymentClientSelected: ''
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    // ***********************************
    // CLIENT MOVEMENTS
    // ***********************************

    case 'FETCH_CLIENT_MOVEMENTS_REJECTED':
    {
      return {
        ...state,
        clientmovements: {},
        clientmovementsFetchError: action.payload,
        clientmovementActive: clientmovementModel
      }
    }

    case 'FETCH_CLIENT_MOVEMENTS_FULFILLED':
    {
      return {
        ...state,
        clientmovements: action.payload
      }
    }

    case 'SET_CLIENT_MOVEMENT':
    {
      return {
        ...state,
        clientmovementActive: action.payload
      }
    }

    case 'CLEAR_CLIENT_MOVEMENT':
    {
      return {
        ...state,
        clientmovementActive: clientmovementModel
      }
    } // case

    case 'SET_CLIENT_ACTIVE_MOVEMENTS':
    {
      return {
        ...state,
        clientActiveMovements: action.payload
      }
    }

    case 'CLEAR_CLIENT_ACTIVE_MOVEMENTS':
    {
      return {
        ...state,
        clientActiveMovements: []
      }
    } // case

    case 'SET_CLIENT_ACTIVE_CREDIT_SALES':
    {
      return {
        ...state,
        clientActiveCreditSales: action.payload
      }
    }

    case 'CLEAR_CLIENT_ACTIVE_CREDIT_SALES':
    {
      return {
        ...state,
        clientActiveCreditSales: [],
        clientActiveCreditSalesD: []
      }
    } // case

    case 'SET_SALE_DEBT':
    {

      const sales = [...state.clientActiveCreditSalesD]
      // sales[action.payload.index] = action.payload.sale
      sales.push(action.payload.sale)
      return {
        ...state,
        clientActiveCreditSalesD: sales
      }
    } // case

    case 'SET_PAYMENT_CLIENT_SELECTED':
    {
      return {
        ...state,
        paymentClientSelected: action.payload
      }
    } // case

  } // switch

  return state // default return

} // reducer
