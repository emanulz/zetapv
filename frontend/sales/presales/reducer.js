const presaleActiveModel = {
  id: 0,
  docType: 'PRESALE',
  cart: {},
  client: '',
  created: new Date()
}

const stateConst = {
  presales: [],
  presaleActive: presaleActiveModel,
  completed: false,
  presaleActiveId: 0,
  isPresalesPanelVisible: false

}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    case 'CLEAR_ALL':
    {
      return {
        ...state,
        presaleActive: presaleActiveModel,
        completed: false,
        presaleActiveId: 0,
        isPresalesPanelVisible: false
      }
    } // case

    case 'SHOW_PRESALES_PANEL':
    {
      return {
        ...state,
        isPresalesPanelVisible: true
      }
    } // case

    case 'HIDE_PRESALES_PANEL':
    {
      return {
        ...state,
        isPresalesPanelVisible: false
      }
    } // case

    case 'FETCH_PRESALES_REJECTED':
    {
      return {
        ...state,
        presales: []
      }
    } // case

    case 'FETCH_PRESALES_FULFILLED':
    {
      return {
        ...state,
        presales: action.payload
      }
    } // case

    case 'SET_PRESALE':
    {
      return {
        ...state,
        presaleActive: action.payload
      }
    } // case

    case 'SET_PRESALE_ID':
    {
      return {
        ...state,
        presaleActiveId: action.payload,
        completed: true
      }
    } // case

    case 'NEW_PRESALE':
    {
      const presales = state.presales
      state = stateConst
      return {
        ...state, presales: presales
      }
    } // case

    case 'LOADED_PRESALE':
    {
      return {
        ...state,
        presaleActive: action.payload,
        presaleActiveId: action.payload.id,
        completed: true
      }
    }

  } // switch

  return state // default return

} // reducer
