const stateConst = {
    isVisible:true,
    isFull: false,
}

export default function reducer(state=stateConst, action) {

    switch (action.type) {

        case "SHOW_INVOICE_PANEL": {
            return {...state, isVisible: true}
        }//case

        case "HIDE_INVOICE_PANEL": {
            return {...state, isVisible: false}
        }//case

        case "TOGGLE_INVOICE_PANEL": {
            let fullOrNot = state.isFull
            return {...state, isFull: !fullOrNot}
        }//case


    }// switch

    return state //default return

}// reducer
