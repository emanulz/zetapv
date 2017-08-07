const stateConst = {
  isVisible: false,
  isFull: true
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    case 'SHOW_INVOICE_PANEL':
    {
      return {
        ...state,
        isVisible: true
      }
    } // case

    case 'HIDE_INVOICE_PANEL':
    {
      return {
        ...state,
        isVisible: false
      }
    } // case

    case 'TOGGLE_INVOICE_PANEL':
    {
      const fullOrNot = state.isFull
      return {
        ...state,
        isFull: !fullOrNot
      }
    } // case

    case 'NEW_SALE':
    {
      state = stateConst
      return {
        ...state, stateConst
      }
    } // case

  } // switch

  return state // default return

} // reducer
