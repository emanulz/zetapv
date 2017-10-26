const accountModel = {
  'docType': 'BANK_ACCOUNT',
  'created': '',
  'updated': '',
  'code': '',
  'name': '',
  'bank': '',
  'number': ''

}

const stateConst = {
  accounts: [],
  accountActive: accountModel,
  nextAccount: 0,
  previousAccount: 0
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    case 'SET_NEXT_PREV_BANK_ACCOUNT':
    {
      return {
        ...state,
        nextAccount: action.payload.next,
        previousAccount: action.payload.previous
      }
    } // case

    case 'CLEAR_NEXT_PREV_BANK_ACCOUNT':
    {
      return {
        ...state,
        nextAccount: 0,
        previousAccount: 0
      }
    } // case

    case 'FETCH_BANK_ACCOUNTS_FULFILLED':
    {
      return {
        ...state,
        accounts: action.payload
      }

    } // case

    case 'FETCH_BANK_ACCOUNTS_REJECTED':
    {
      return {
        ...state,
        accounts: [],
        accountActive: accountModel
      }
    } // case

    case 'SET_BANK_ACCOUNT':
    {
      return {
        ...state,
        accountActive: action.payload
      }
    }

    case 'CLEAR_BANK_ACCOUNT':
    {
      return {
        ...state,
        accountActive: accountModel
      }
    }

  } // switch

  return state // default return

} // reducer
