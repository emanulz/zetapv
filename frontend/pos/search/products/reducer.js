const stateConst = {
    visible:false,
    productsMatched:[],
}

export default function reducer(state=stateConst, action) {

    switch (action.type) {

        case "PRODUCT_SHOW_PANEL": {
            return {...state, visible: true}
        }//case
        case "PRODUCT_HIDE_PANEL": {
            return {...state, visible: false}
        }//case
        case "PRODUCT_SEARCH_SUCCESS": {
            return {...state, productsMatched: action.payload}
        }//case
        case "PRODUCT_SEARCH_FAIL": {
            return {...state, productsMatched: []}
        }//case


    }// switch

    return state //default return

}// reducer
