
const clientmovementModel = {
  'document': 0,
  'clientId': '',
  'type': 'CREDIT',
  'amount': 0,
  'date': new Date(),
  'description': ''
}

const stateConst = {
  clientmovementsFetchError: '',
  clientmovements: {},
  clientmovementActive: clientmovementModel
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    // ***********************************
    // CLIENT MOVEMENTS
    // ***********************************

    case 'FETCH_CLIENTMOVEMENTS_REJECTED':
    {
      return {
        ...state,
        clientmovements: {},
        clientmovementsFetchError: action.payload,
        clientmovementActive: clientmovementModel
      }
    }

    case 'FETCH_CLIENTMOVEMENTS_FULFILLED':
    {
      return {
        ...state,
        clientmovements: action.payload
      }
    }

    case 'SET_CLIENTMOVEMENT':
    {
      return {
        ...state,
        clientmovementActive: action.payload
      }
    }

    case 'CLEAR_CLIENTMOVEMENT':
    {
      return {
        ...state,
        clientmovementActive: clientmovementModel
      }
    } // case

  } // switch

  return state // default return

} // reducer
