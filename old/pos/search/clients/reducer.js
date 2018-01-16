const stateConst = {
  visible: false,
  clientsMatched: []
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    case 'CLIENT_SHOW_PANEL':
    {
      return {
        ...state,
        visible: true
      }
    } // case
    case 'CLIENT_HIDE_PANEL':
    {
      return {
        ...state,
        visible: false
      }
    } // case
    case 'CLIENT_SEARCH_SUCCESS':
    {
      return {
        ...state,
        clientsMatched: action.payload
      }
    } // case
    case 'CLIENT_SEARCH_FAIL':
    {
      return {
        ...state,
        clientsMatched: []
      }
    } // case
    case 'NEW_SALE':
    {
      state = stateConst
      return {
        ...state,
        stateConst
      }
    } // case

  } // switch

  return state // default return

} // reducer
