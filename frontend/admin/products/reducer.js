const productModel = {
  'docType': 'PRODUCT',
  'created': '',
  'updated': '',
  'code': '',
  'barcode': '',
  'description': '',
  'unit': '',
  'cost': '',
  'utility': '',
  'useTaxes': false,
  'taxes': '',
  'price': '',
  'discount': '',
  'sellPrice': '',
  'isactive': true,
  'isComposed': false,
  'department': '',
  'subdepartment': '',
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
  products: {},
  productActive: productModel,
  departments: {},
  departmentActive: departmentModel,
  subdepartments: {},
  subdepartmentActive: subDepartmentModel,
  inputVal: ''
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    // ***********************************
    // PRODUCTS
    // ***********************************

    case 'FETCH_PRODUCTS_REJECTED':
    {
      return {
        ...state,
        products: {},
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

    case 'FETCH_DEPARTMENTS_FULFILLED':
    {
      return {
        ...state,
        departments: action.payload
      }

    } // case

    case 'FETCH_DEPARTMENTS_REJECTED':
    {
      return {
        ...state,
        departments: {}
      }
    } // case

    case 'SET_DEPARTMENT':
    {
      return {
        ...state,
        departmentActive: action.payload
      }
    }

    case 'CLEAR_DEPARTMENT':
    {
      return {
        ...state,
        departmentActive: departmentModel
      }
    }

    // ***********************************
    // SUB DEPARTMENTS
    // ***********************************

    case 'FETCH_SUBDEPARTMENTS_FULFILLED':
    {
      return {
        ...state,
        subdepartments: action.payload
      }

    } // case

    case 'FETCH_SUBDEPARTMENTS_REJECTED':
    {
      return {
        ...state,
        subdepartments: {}
      }
    } // case

    case 'SET_SUBDEPARTMENT':
    {
      return {
        ...state,
        subdepartmentActive: action.payload
      }
    }

    case 'CLEAR_SUBDEPARTMENT':
    {
      return {
        ...state,
        subdepartmentActive: subDepartmentModel
      }
    }

  } // switch

  return state // default return

} // reducer
