const stateConst = {
  defaultCompany: {},
  userCompany: {}
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    case 'FETCH_COMPANY_DEFAULT_CONFIG_FULFILLED':
    {
      return {
        ...state,
        defaultCompany: action.payload
      }

    } // case

    case 'FETCH_COMPANY_DEFAULT_CONFIG_REJECTED':
    {
      return {
        ...state,
        defaultCompany: {}
      }

    } // case

    case 'FETCH_COMPANY_USER_CONFIG_FULFILLED':
    {
      return {
        ...state,
        userCompany: action.payload
      }

    } // case

    case 'FETCH_COMPANY_USER_CONFIG_REJECTED':
    {
      return {
        ...state,
        userCompany: {}
      }

    } // case

    case 'SET_COMPANY_USER_CONFIG':
    {
      return {
        ...state,
        userCompany: action.payload
      }

    } // case

  }

  return state // default return
}
