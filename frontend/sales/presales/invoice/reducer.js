const stateConst = {
  isVisible: false,
  isFull: true,
  defaultDesing: true
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    case 'SHOW_PROFORMA_INVOICE_PANEL':
    {
      return {
        ...state,
        isVisible: true
      }
    } // case

    case 'HIDE_PROFORMA_INVOICE_PANEL':
    {
      return {
        ...state,
        isVisible: false
      }
    } // case

    case 'TOGGLE_PROFORMA_INVOICE_PANEL':
    {
      const fullOrNot = state.isFull
      return {
        ...state,
        isFull: !fullOrNot
      }
    } // case

    case 'TOGGLE_PROFORMA_INVOICE_DESING':
    {
      const desingOrNot = state.defaultDesing
      return {
        ...state,
        defaultDesing: !desingOrNot
      }
    } // case

    case 'NEW_PROFORMA':
    {
      state = stateConst
      return {
        ...state, stateConst
      }
    } // case

  } // switch

  return state // default return

} // reducer
