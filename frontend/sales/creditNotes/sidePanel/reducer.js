
const stateConst = {
  visible: false
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    // ***********************************
    // LAYOUT
    // ***********************************

    case 'TOGGLE_PANEL':
    {
      const visible = state.visible
      return {
        ...state,
        visible: !visible
      }
    } // case

  } // switch

  return state // default return

} // reducer
