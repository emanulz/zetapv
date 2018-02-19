
const stateConst = {
  isActive: false,
  filtersActive: true,
  isCollapsed: false,
  reportActive: 0,
  iniDateActive: '',
  endDateActive: '',
  products: [],
  productActive: '',
  clients: [],
  clientActive: '',
  clientActiveName: '',
  clientActiveId: '',
  departments: [],
  departmentActive: '',
  subdepartments: [],
  subdepartmentActive: '',
  sales: [],
  costFilter: false,
  price1Filter: false,
  price2Filter: false,
  price3Filter: false
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

    case 'SET_FILTERS_ACTIVE':
    {
      return {
        ...state,
        filtersActive: true
      }
    } // case

    case 'SET_FILTERS_INACTIVE':
    {
      return {
        ...state,
        filtersActive: false
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
        reportActive: 0
      }
    } // case

    // ***********************************
    // GENERATE REPORT
    // ***********************************

    case 'SET_REPORT_GENERATED':
    {
      return {
        ...state,
        isActive: true
      }
    } // case

    case 'CLEAR_REPORT_GENERATED':
    {
      return {
        ...state,
        isActive: false
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
        clientActive: action.payload.value,
        clientActiveId: action.payload.id,
        clientActiveName: action.payload.name
      }
    } // case

    case 'CLEAR_CLIENT':
    {
      return {
        ...state,
        clientActive: '',
        clientActiveId: '',
        clientActiveName: ''
      }
    } // case

    // ***********************************
    // SALES
    // ***********************************

    case 'FETCH_SALES_REJECTED':
    {
      return {
        ...state,
        sales: [],
        salesFetchError: action.payload
      }
    } // case

    case 'FETCH_SALES_FULFILLED':
    {
      return {
        ...state,
        sales: action.payload
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
    // PRICES
    // ***********************************

    case 'SET_PRICES_FILTER':
    {
      return {
        ...state,
        costFilter: action.payload.cost,
        price1Filter: action.payload.price1,
        price2Filter: action.payload.price2,
        price3Filter: action.payload.price3
      }
    }

    case 'CLEAR_PRICES_FILTER':
    {
      return {
        ...state,
        costFilter: false,
        price1Filter: false,
        price2Filter: false,
        price3Filter: false
      }
    }

  } // switch

  return state // default return

} // reducer
