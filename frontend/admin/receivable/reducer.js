
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
  clientActiveDebt: 0,
  clientActiveCreditSales: [],
  clientActiveCreditSalesD: [],
  paymentClientSelected: '',
  paymentArray: []
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    // ***********************************
    // CLIENT MOVEMENTS
    // ***********************************

    case 'ADD_TO_PAYMENT_ARRAY':
    {
      const array = [...state.paymentArray]
      array.push(action.payload)
      return {
        ...state,
        paymentArray: array
      }
    }

    case 'REMOVE_FROM_PAYMENT_ARRAY':
    {
      const array = [...state.paymentArray]
      const indexInArray = array.findIndex(item => item.sale._id == action.payload)
      if (indexInArray != -1) {
        array.splice(indexInArray, 1)
      }
      return {
        ...state,
        paymentArray: array
      }
    }

    case 'SET_AMOUNT_PAYMENT_ARRAY':
    {
      const array = [...state.paymentArray]
      const indexInArray = array.findIndex(item => item.sale._id == action.payload.sale._id)
      if (indexInArray != -1) {
        array[indexInArray]['amount'] = action.payload.amount
      }
      return {
        ...state,
        paymentArray: array
      }
    }

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

    case 'SET_PAYMENT_CLIENT_SELECTED_DEBT':
    {
      return {
        ...state,
        clientActiveDebt: action.payload
      }
    } // case

  } // switch

  return state // default return

} // reducer
