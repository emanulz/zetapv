const stateConst = {
  defaultCompany: {},
  defaultSales: {},
  defaultClients: {},
  defaultProducts: {},

  userCompany: {},
  userSales: {},
  userClients: {},
  userProducts: {}
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    case 'FETCH_CONFIG_FULFILLED':
    {
      return {
        ...state,
        [action.payload.property]: action.payload.data
      }

    } // case

    case 'FETCH_CONFIG_REJECTED':
    {
      return {
        ...state,
        [action.payload.property]: {}
      }

    } // case

    case 'SET_CONFIG':
    {
      return {
        ...state,
        [action.payload.property]: action.payload.data
      }

    } // case

  }

  return state // default return
}
