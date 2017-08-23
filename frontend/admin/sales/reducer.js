const donationModel = {
  'docType': 'DONATION',
  'id': 0,
  'created': '',
  'date': new Date(),
  'updated': '',
  'amount': '',
  'document': ''
}

const stateConst = {
  sales: [],
  saleActive: '',
  saleMovements: [],
  donations: [],
  donationActive: donationModel
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    case 'FETCH_SALES_FULFILLED':
    {
      return {
        ...state,
        sales: action.payload
      }

    } // case

    case 'FETCH_SALES_REJECTED':
    {
      return {
        ...state,
        sales: []
      }
    } // case

    case 'SET_SALE':
    {
      return {
        ...state,
        saleActive: action.payload
      }
    } // case

    case 'CLEAR_SALE':
    {
      return {
        ...state,
        saleActive: ''
      }
    } // case

    case 'CLEAR_SALE_MOVEMENTS':
    {
      return {
        ...state,
        saleMovements: []
      }
    } // case

    case 'SET_SALE_MOVEMENTS':
    {
      return {
        ...state,
        saleMovements: action.payload
      }
    } // case

    case 'FETCH_DONATIONS_FULFILLED':
    {
      return {
        ...state,
        donations: action.payload
      }

    } // case

    case 'FETCH_DONATIONS_REJECTED':
    {
      return {
        ...state,
        donations: []
      }
    } // case

    case 'SET_DONATION':
    {
      return {
        ...state,
        donationActive: action.payload
      }
    } // case

    case 'CLEAR_DONATION':
    {
      return {
        ...state,
        donationActive: donationModel
      }
    } // case

  } // switch

  return state // default return

} // reducer
