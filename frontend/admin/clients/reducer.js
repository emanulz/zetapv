const clientModel = {
  'docType': 'CLIENT',
  'clientType': 'GENERAL',
  'created': '',
  'updated': '',
  'name': '',
  'last_name': '',
  'id': '',
  'code': '',
  'has_credit': false,
  'credit_limit': '',
  'credit_days': 0
}

const stateConst = {
  clientsFetchError: '',
  clients: {},
  clientActive: clientModel
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    case 'FETCH_CLIENTS_FULFILLED':
    {
      return {
        ...state,
        clients: action.payload
      }

    } // case

    case 'FETCH_CLIENTS_REJECTED':
    {
      return {
        ...state,
        clients: {},
        clientActive: clientModel
      }
    } // case

    case 'SET_CLIENT':
    {
      return {
        ...state,
        clientActive: action.payload
      }
    }

    case 'CLEAR_CLIENT':
    {
      return {
        ...state,
        clientActive: clientModel
      }
    }

  } // switch

  return state // default return

} // reducer
