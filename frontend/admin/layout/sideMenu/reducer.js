const stateConst = {
  hasLoaded: false
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    case 'FETCH_PRODUCTS':
    {
      return { ...state,
        hasLoaded: true
      }
    } // case

  } // switch

  return state // default return

} // reducer
