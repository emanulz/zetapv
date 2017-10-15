const productmovementModel = {
  'document': 0,
  'docType': 'PRODUCT_MOVEMENT',
  'created': '',
  'updated': '',
  'productId': '',
  'type': 'INPUT',
  'amount': '',
  'date': new Date(),
  'description': ''
}

const stateConst = {
  isCollapsed: false,
  reportActive: '',
  iniDateActive: '',
  endDateActive: '',
  products: [],
  productActive: '',
  clients: [],
  clientActive: '',
  departments: [],
  departmentActive: '',
  subdepartments: [],
  subdepartmentActive: '',
  productmovements: [],
  isPhysicalTake: false,
  productmovementActive: productmovementModel,
  filterText: ''
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {
    // ***********************************
    // TOGGLE FILTERS
    // ***********************************

    case 'TOGGLE_FILTERS':
    {
      const collapsed = !state.isCollapsed
      return {
        ...state,
        isCollapsed: collapsed
      }
    } // case

    // ***********************************
    // REPORTS
    // ***********************************

    case 'SET_REPORT':
    {
      return {
        ...state,
        reportActive: action.payload
      }
    } // case

    case 'CLEAR_REPORT':
    {
      return {
        ...state,
        reportActive: ''
      }
    } // case

    // ***********************************
    // INI DATE
    // ***********************************

    case 'SET_INI_DATE':
    {
      return {
        ...state,
        iniDateActive: action.payload
      }
    } // case

    case 'CLEAR_INI_DATE':
    {
      return {
        ...state,
        iniDateActive: ''
      }
    } // case

    // ***********************************
    // END DATE
    // ***********************************

    case 'SET_END_DATE':
    {
      return {
        ...state,
        endDateActive: action.payload
      }
    } // case

    case 'CLEAR_END_DATE':
    {
      return {
        ...state,
        endDateActive: ''
      }
    } // case

    // ***********************************
    // PRODUCTS
    // ***********************************

    case 'FETCH_PRODUCTS_REJECTED':
    {
      return {
        ...state,
        products: [],
        productsFetchError: action.payload
      }
    } // case

    case 'FETCH_PRODUCTS_FULFILLED':
    {
      return {
        ...state,
        products: action.payload
      }
    } // case

    case 'SET_PRODUCT':
    {
      return {
        ...state,
        productActive: action.payload
      }
    } // case

    case 'CLEAR_PRODUCT':
    {
      return {
        ...state,
        productActive: false
      }
    } // case

    // ***********************************
    // CLIENTS
    // ***********************************

    case 'FETCH_CLIENTS_REJECTED':
    {
      return {
        ...state,
        clients: [],
        clientsFetchError: action.payload
      }
    } // case

    case 'FETCH_CLIENTS_FULFILLED':
    {
      return {
        ...state,
        clients: action.payload
      }
    } // case

    case 'SET_CLIENT':
    {
      return {
        ...state,
        clientActive: action.payload
      }
    } // case

    case 'CLEAR_CLIENT':
    {
      return {
        ...state,
        clientActive: ''
      }
    } // case

    // ***********************************
    // FILTER
    // ***********************************

    case 'SET_FILTER_TEXT':
    {
      return {
        ...state,
        filterText: action.payload
      }
    } // case

    case 'CLEAR_FILTER_TEXT':
    {
      return {
        ...state,
        filterText: ''
      }
    } // case

    // ***********************************
    // DEPARTMENTS
    // ***********************************

    case 'FETCH_PRODUCT_DEPARTMENTS_FULFILLED':
    {
      return {
        ...state,
        departments: action.payload
      }

    } // case

    case 'FETCH_PRODUCT_DEPARTMENTS_REJECTED':
    {
      return {
        ...state,
        departments: []
      }
    } // case

    case 'SET_PRODUCT_DEPARTMENT':
    {
      return {
        ...state,
        departmentActive: action.payload
      }
    }

    case 'CLEAR_PRODUCT_DEPARTMENT':
    {
      return {
        ...state,
        departmentActive: ''
      }
    }

    // ***********************************
    // SUB DEPARTMENTS
    // ***********************************

    case 'FETCH_PRODUCT_SUBDEPARTMENTS_FULFILLED':
    {
      return {
        ...state,
        subdepartments: action.payload
      }

    } // case

    case 'FETCH_PRODUCT_SUBDEPARTMENTS_REJECTED':
    {
      return {
        ...state,
        subdepartments: []
      }
    } // case

    case 'SET_PRODUCT_SUBDEPARTMENT':
    {
      return {
        ...state,
        subdepartmentActive: action.payload
      }
    }

    case 'CLEAR_PRODUCT_SUBDEPARTMENT':
    {
      return {
        ...state,
        subdepartmentActive: ''
      }
    }

    // ***********************************
    // PRODUCT MOVEMENTS
    // ***********************************

    case 'FETCH_PRODUCTMOVEMENTS_REJECTED':
    {
      return {
        ...state,
        productmovements: []
      }
    }

    case 'FETCH_PRODUCTMOVEMENTS_FULFILLED':
    {
      return {
        ...state,
        productmovements: action.payload
      }
    }

    case 'SET_PRODUCT_MOVEMENT':
    {
      return {
        ...state,
        productmovementActive: action.payload
      }
    }

    case 'CLEAR_PRODUCT_MOVEMENT':
    {
      return {
        ...state,
        productmovementActive: productmovementModel
      }
    } // case

  } // switch

  return state // default return

} // reducer
