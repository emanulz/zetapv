const stateConst = {
  dbUrl: ''
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    case 'FETCH_DB_URL_FULFILLED':
    {
      return {
        ...state,
        dbUrl: action.payload
      }

    } // case

    case 'FETCH_DB_URL_REJECTED':
    {
      return {
        ...state,
        dbUrl: ''
      }

    } // case

  }

  return state // default return
}
