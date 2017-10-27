const stateConst = {
  isVisible: false,
  payMethod: 'CASH',
  cashAmount: 0,
  cardDigits: '',
  cardAuth: ''
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    case 'SHOW_PAY_PANEL':
    {
      return {
        ...state,
        isVisible: true
      }
    } // case

    case 'HIDE_PAY_PANEL':
    {
      return {
        ...state,
        isVisible: false
      }
    } // case

    case 'CHANGE_PAY_METHOD':
    {
      return {
        ...state,
        payMethod: action.payload
      }
    } // case

    case 'UPDATE_CASH_AMOUNT':
    {
      return {
        ...state,
        cashAmount: action.payload
      }
    }

    case 'UPDATE_CARD_AUTH':
    {
      return {
        ...state,
        cardAuth: action.payload
      }
    }

    case 'UPDATE_CARD_DIGITS':
    {
      return {
        ...state,
        cardDigits: action.payload
      }
    }

    case 'NEW_SALE':
    {
      state = stateConst
      return {
        ...state, stateConst
      }
    } // case

    case 'LOADED_SALE':
    {
      return {
        ...state,
        payMethod: action.payload.pay.payMethod,
        cashAmount: action.payload.pay.cashAmount,
        cardDigits: action.payload.pay.cardDigits,
        cardAuth: action.payload.pay.cardAuth
      }
    }

  } // switch

  return state // default return

} // reducer
