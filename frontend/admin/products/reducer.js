const productModel = {
  'docType': 'PRODUCT',
  'created': '',
  'updated': '',
  'code': '',
  'barcode': '',
  'description': '',
  'unit': '',
  'department': '',
  'subdepartment': '',
  'costBased': false,
  'cost': '',
  'utility': '',
  'price': '',
  'sellPrice': '',
  'utility2': '',
  'usePrice2': false,
  'price2': '',
  'sellPrice2': '',
  'utility3': '',
  'usePrice3': false,
  'price3': '',
  'sellPrice3': '',
  'utility4': '',
  'usePrice4': false,
  'price4': '',
  'sellPrice4': '',
  'useTaxes': false,
  'taxes': 0,
  'useTaxes2': false,
  'taxes2': 0,
  'useFairTrade': false,
  'fairTrade': 0,
  'hasDiscount': false,
  'discount': '',
  'isactive': true,
  'isComposed': false,
  'isForSale': false,
  'inventory': '',
  'minimum': '',
  'useInventory': ''
}

const departmentModel = {
  'docType': 'PRODUCT_DEPARTMENT',
  'created': '',
  'updated': '',
  'code': '',
  'description': '',
  'name': ''

}

const subDepartmentModel = {
  'docType': 'PRODUCT_SUBDEPARTMENT',
  'created': '',
  'updated': '',
  'code': '',
  'description': '',
  'name': '',
  'department': 0

}

const stateConst = {
  productsFetching: false,
  productsFected: false,
  productsFetchError: '',
  products: [],
  productActive: productModel,
  departments: [],
  departmentActive: departmentModel,
  subdepartments: [],
  subdepartmentActive: subDepartmentModel,
  inputVal: '',
  nextProduct: 0,
  previousProduct: 0
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    // ***********************************
    // PRODUCTS
    // ***********************************

    case 'SET_NEXT_PREV_PRODUCT':
    {
      return {
        ...state,
        nextProduct: action.payload.next,
        previousProduct: action.payload.previous
      }
    } // case

    case 'CLEAR_NEXT_PREV_PRODUCT':
    {
      return {
        ...state,
        nextProduct: 0,
        previousProduct: 0
      }
    } // case

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
        productActive: productModel
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
        departmentActive: departmentModel
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
        subdepartmentActive: subDepartmentModel
      }
    }

  } // switch

  return state // default return

} // reducer
