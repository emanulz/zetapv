
const clientSelectedModel = {
  code: '0000',
  clientType: 'GENERAL',
  created: '',
  credit_days: 0,
  credit_limit: 0,
  docType: 'CLIENT',
  has_credit: false,
  id: '000000000',
  last_name: 'Contado',
  name: 'Cliente',
  updated: '',
  saleLoaded: false
}

const stateConst = {
  clientsFetching: false,
  clientsFected: false,
  clientsFetchError: '',
  clients: [],
  clientSelected: clientSelectedModel,
  clientSelectedDebt: 0
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    case 'FETCH_CLIENTS':
    {
      return {
        ...state,
        clientsFetching: true
      }
    } // case

    case 'FETCH_CLIENTS_REJECTED':
    {
      return {
        ...state,
        clientsFetching: false,
        clientsFetchError: action.payload
      }
    } // case

    case 'FETCH_CLIENTS_FULFILLED':
    {
      return {
        ...state,
        clientsFetching: false,
        clientsFected: true,
        clients: action.payload
      }
    } // case

    case 'CLIENT_SELECTED':
    {
      return {
        ...state,
        clientSelected: action.payload.client
      }
    } // case

    case 'SET_CLIENT_DEBT':
    {
      return {
        ...state,
        clientSelectedDebt: action.payload
      }
    }

    case 'NEW_SALE':
    {
      const clients = state.clients
      state = stateConst
      return {
        ...state, clients: clients
      }
    } // case

    case 'LOADED_SALE':
    {
      return {
        ...state,
        clientSelected: action.payload.client
      }
    }

  } // switch

  return state // default return

} // reducer
