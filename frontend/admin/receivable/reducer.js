
const clientmovementModel = {
  'document': 0,
  'docType': 'CLIENT_MOVEMENT',
  'clientId': '',
  'type': 'CREDIT',
  'amount': 0,
  'date': new Date(),
  'saleId': 0,
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

    case 'FETCH_CLIENT_MOVEMENTS_REJECTED':
    {
      return {
        ...state,
        clientmovements: {},
        clientmovementsFetchError: action.payload,
        clientmovementActive: clientmovementModel
      }
    }

    case 'FETCH_CLIENT_MOVEMENTS_FULFILLED':
    {
      return {
        ...state,
        clientmovements: action.payload
      }
    }

    case 'SET_CLIENT_MOVEMENT':
    {
      return {
        ...state,
        clientmovementActive: action.payload
      }
    }

    case 'CLEAR_CLIENT_MOVEMENT':
    {
      return {
        ...state,
        clientmovementActive: clientmovementModel
      }
    } // case

  } // switch

  return state // default return

} // reducer
