
const stateConst = {
  movements: []

}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    case 'FETCH_CLIENT_MOVEMENTS_REJECTED':
    {
      return {
        ...state,
        movements: []
      }
    } // case

    case 'FETCH_CLIENT_MOVEMENTS_FULFILLED':
    {
      return {
        ...state,
        movements: action.payload
      }
    } // case

  } // switch

  return state // default return

} // reducer
