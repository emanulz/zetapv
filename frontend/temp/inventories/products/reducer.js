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
  products: [],
  productActive: false,
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
    // PHYSICAL TAKE
    // ***********************************

    case 'TOGGLE_PHYSICAL_TAKE':
    {
      const physycalState = state.isPhysicalTake
      return {
        ...state,
        isPhysicalTake: !physycalState

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
        productsFetching: false,
        productsFetchError: action.payload
      }
    } // case

    case 'FETCH_PRODUCTS_FULFILLED':
    {
      return {
        ...state,
        productsFetching: false,
        productsFected: true,
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
