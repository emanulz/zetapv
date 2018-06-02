const proformaActiveModel = {
  id: 0,
  docType: 'PROFORMA',
  cart: {},
  client: '',
  created: new Date()
}

const stateConst = {
  proformas: [],
  proformaActive: proformaActiveModel,
  completed: false,
  proformaActiveId: 0,
  isProformasPanelVisible: false,
  loaded: true

}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    case 'SHOW_PROFORMAS_PANEL':
    {
      return {
        ...state,
        isProformasPanelVisible: true
      }
    } // case

    case 'HIDE_PROFORMAS_PANEL':
    {
      return {
        ...state,
        isProformasPanelVisible: false
      }
    } // case

    case 'FETCH_PROFORMAS_REJECTED':
    {
      return {
        ...state,
        proformas: []
      }
    } // case

    case 'FETCH_PROFORMAS_FULFILLED':
    {
      return {
        ...state,
        proformas: action.payload
      }
    } // case

    case 'SET_PROFORMA':
    {
      return {
        ...state,
        proformaActive: action.payload
      }
    } // case

    case 'SET_PROFORMA_ID':
    {
      return {
        ...state,
        proformaActiveId: action.payload,
        completed: true
      }
    } // case

    case 'NEW_PROFORMA':
    {
      const proformas = state.proformas
      state = stateConst
      return {
        ...state, proformas: proformas
      }
    } // case

    case 'LOADED_PROFORMA':
    {
      return {
        ...state,
        proformaActive: action.payload,
        proformaActiveId: action.payload.id,
        completed: false,
        loaded: true
      }
    }

  } // switch

  return state // default return

} // reducer
