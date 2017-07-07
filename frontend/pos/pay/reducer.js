const stateConst = {
    isVisible:false,
    payMethod:'CASH',
    cashAmount:0,
}

export default function reducer(state=stateConst, action) {

    switch (action.type) {

        case "SHOW_PAY_PANEL": {
            return {...state, isVisible: true}
        }//case

        case "HIDE_PAY_PANEL": {
            return {...state, isVisible: false}
        }//case

        case "CHANGE_PAY_METHOD": {
            return {...state, payMethod: action.payload}
        }//case

        case "UPDATE_CASH_AMOUNT":{
            return{...state, cashAmount: action.payload}
        }

    }// switch

    return state //default return

}// reducer
