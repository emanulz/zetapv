const stateConst = {
  visible: false,
  productsMatched: [],
  searchValue: ''
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    case 'SET_PRODUCT_SEARCH_FIELD_VALUE':
    {
      return {
        ...state,
        searchValue: action.payload
      }
    } // case

    case 'CLEAR_PRODUCT_SEARCH_FIELD_VALUE':
    {
      return {
        ...state,
        searchValue: ''
      }
    } // case

    case 'SEARCH_PRODUCT_TOGGLE_PANEL':
    {
      const visible = !state.visible
      return {
        ...state,
        visible: visible,
        searchValue: ''
      }
    } // case

    case 'PRODUCT_SHOW_PANEL':
    {
      return {
        ...state,
        visible: true
      }
    } // case
    case 'PRODUCT_HIDE_PANEL':
    {
      return {
        ...state,
        visible: false
      }
    } // case
    case 'PRODUCT_SEARCH_SUCCESS':
    {
      return {
        ...state,
        productsMatched: action.payload
      }
    } // case
    case 'PRODUCT_SEARCH_FAIL':
    {
      return {
        ...state,
        productsMatched: []
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
