
const productmovementModel = {
  'document': 0,
  'docType': 'PRODUCT_MOVEMENT',
  'created': '',
  'updated': '',
  'warehouse': '',
  'productId': '',
  'type': 'INPUT',
  'amount': 0,
  'date': new Date(),
  'description': ''
}

const warehouseModel = {
  'docType': 'WAREHOUSE',
  'code': '',
  'created': '',
  'updated': '',
  'name': '',
  'location': ''
}

const stateConst = {
  productmovementsFetchError: '',
  productmovements: [],
  productmovementActive: productmovementModel,
  warehouses: [],
  warehouseActive: warehouseModel,
  nextWarehouse: 0,
  previousWarehouse: 0,
  productDetailActive: false
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    // ***********************************
    // PRODUCT MOVEMENTS
    // ***********************************

    case 'FETCH_PRODUCT_MOVEMENTS_REJECTED':
    {
      return {
        ...state,
        productmovements: [],
        productmovementsFetchError: action.payload,
        productmovementActive: productmovementModel
      }
    }

    case 'FETCH_PRODUCT_MOVEMENTS_FULFILLED':
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

    // ***********************************
    // PRODUCT DETAIL ACTIVE
    // ***********************************

    case 'SET_PRODUCT_DETAIL':
    {
      return {
        ...state,
        productDetailActive: action.payload
      }
    }

    case 'CLEAR_PRODUCT_DETAIL':
    {
      return {
        ...state,
        productDetailActive: false
      }
    } // case

    // ***********************************
    // WAREHOUSES
    // ***********************************

    case 'FETCH_WAREHOUSES_REJECTED':
    {
      return {
        ...state,
        warehouses: [],
        warehouseActive: warehouseModel
      }
    }

    case 'FETCH_WAREHOUSES_FULFILLED':
    {
      return {
        ...state,
        warehouses: action.payload
      }
    }

    case 'SET_WAREHOUSE':
    {
      return {
        ...state,
        warehouseActive: action.payload
      }
    }

    case 'CLEAR_WAREHOUSE':
    {
      return {
        ...state,
        warehouseActive: warehouseModel
      }
    } // case

    case 'SET_NEXT_PREV_CLIENT':
    {
      return {
        ...state,
        nextWarehouse: action.payload.next,
        previousWarehouse: action.payload.previous
      }
    } // case

    case 'CLEAR_NEXT_PREV_CLIENT':
    {
      return {
        ...state,
        nextWarehouse: 0,
        previousWarehouse: 0
      }
    } // case

  } // switch

  return state // default return

} // reducer
