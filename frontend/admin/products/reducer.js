
const productModel = {"code": '',
                      "barcode": '',
                      "description": "",
                      "unit": "",
                      "cost":'',
                      "utility":'',
                      "useTaxes": false,
                      "taxes": '',
                      "price": '',
                      "discount": '',
                      "sellPrice": '',
                      "isactive": true,
                      "isComposed": false,
                      "department": '',
                      "subdepartment": '',
                      "isForSale": false,
                      "inventory":'',
                      "minimum":'',
                      "useInventory":'',
                    }



const stateConst = {
    productsFetching:false,
    productsFected:false,
    productsFetchError:'',
    products: {},
    departments: {},
    inputVal:'',
    productActive: productModel,

}

export default function reducer(state=stateConst, action) {

    switch (action.type) {

        case "FETCH_PRODUCTS": {
            return {...state, productsFetching: true}
        }//case

        case "FETCH_PRODUCTS_REJECTED": {
          return {
              ...state,
              productsFetching: false,
              productsFetchError: action.payload}
        }//case

        case "FETCH_PRODUCTS_FULFILLED": {
            return {
              ...state,
              productsFetching: false,
              productsFected: true,
              products: action.payload,
            }
            break;
        }//case

        case "FETCH_DEPARTMENTS_FULFILLED": {
            return {
              ...state,
              departments: action.payload,
            }
            break;
        }//case

        case "SET_PRODUCT": {
            return {
              ...state,
              productActive: action.payload,
            }
            break;
        }//case

        case "CLEAR_PRODUCT" :{
            return {
              ...state,
              productActive: productModel
            }
        }

    }// switch

    return state //default return

}// reducer
