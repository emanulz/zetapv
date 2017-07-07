
// Finds a code in the cart and sends a dispatch to remove it from cart based on index
export function updateStoreCashAmount(amount){

    let res = (amount)//if its a value
            ? {type: "UPDATE_CASH_AMOUNT", payload: amount}
            : {type: "UPDATE_CASH_AMOUNT", payload: 0}

    return res
}
