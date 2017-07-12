//------------------------------------------------------------------------------------------
//MODULE IMPORTS
//------------------------------------------------------------------------------------------
import axios from "axios";
var PouchDB = require('pouchdb');

//------------------------------------------------------------------------------------------
//EXPORT FUNCTIONS USED IN COMPONENTS
//------------------------------------------------------------------------------------------

// //Fetch products from backend
// export function fetchProducts() {
//
//   return function(dispatch) {
//     axios.get("/sales/api/products/")
//       .then((response) => {
//         dispatch({type: "FETCH_PRODUCTS_FULFILLED", payload: response.data})
//       })
//       .catch((err) => {
//         dispatch({type: "FETCH_PRODUCTS_REJECTED", payload: err})
//       })
//   }
// }

//Fetch products from backend
export function fetchProducts() {

  return function(dispatch) {

    var localDbProducts = new PouchDB('products')

    localDbProducts.allDocs({
        include_docs: true,
        attachments: true
        })
      .then((response) => {
        console.log(response)
        const rows = response.rows
        let data = []
        rows.forEach(row=>data.push(row.doc))

        dispatch({type: "FETCH_PRODUCTS_FULFILLED", payload: data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_PRODUCTS_REJECTED", payload: err})
      })
  }
}

//opens the product search panel
export function searchProduct(){

    return {type: "PRODUCT_SHOW_PANEL", payload: -1}
}

// Function to update the globa; discount of complete storage of items, and reflect it on store, then updating DOME
export function applyDiscounts(itemsInCart, globalDiscount){

    let newCart = itemsInCart.map(item =>{

        let newItem = item

        let data =  caclSubtotal(item.product, item.qty, item.discount, globalDiscount)

        newItem.subtotal = data.subtotal
        newItem.totalWithIv = data.totalWithIv
        newItem.discountCurrency = data.discountCurrency
        newItem.subTotalNoDiscount = data.subTotalNoDiscount

        console.log(newItem)

        return newItem

    })

    return {type:"REPLACE_CART", payload: newCart}

}

// Function to update the inline discount of an item, and reflect it on store
export function updateItemDiscount(itemsInCart, code, discount, globalDiscount){

    const indexInCart = itemsInCart.findIndex(item => item.product.code == code)//checks if product exists

    let res = (indexInCart == -1 )//if not exists dispatch Not Found, if exists check if already in cart
            ? {type: "PRODUCT_IN_CART_NOT_FOUND", payload: -1}
            : {type: "UPDATE_CART", payload: {item:updatedCartItem(itemsInCart,
                                                                   indexInCart,
                                                                   itemsInCart[indexInCart].qty,
                                                                   discount,
                                                                   globalDiscount),
                                              index:indexInCart
                                             }}

    return res

}

//When item is selected in code field
export function productSelected(code, qty, products, itemsInCart, globalDiscount) {

    const productSelected = products.findIndex(product => product.code == code)//checks if product exists

    let res = (productSelected == -1 )//if not exists dispatch Not Found, if exists check if already in cart
            ? {type: "PRODUCT_NOT_FOUND", payload: -1}
            : checkIfInCart(code, qty, products, itemsInCart, globalDiscount, productSelected)

    return res

}


//------------------------------------------------------------------------------------------
//LOCAL AUX FUNCTIONS
//------------------------------------------------------------------------------------------

//checks in cart if item already exists
function checkIfInCart(code, qty, products, itemsInCart, globalDiscount, productSelected){

    const indexInCart = itemsInCart.findIndex(cart => cart.product.code == code) //check if product in cart

    let dataNewProd = caclSubtotal(products[productSelected], qty, 0, globalDiscount)

    let res = (indexInCart == -1 )//if not exists in cart Dispats ADD_TO_TABLE, if exists dispatch cart updated
            ? {type: "ADD_TO_CART", payload: {product:products[productSelected],
                                    qty:qty,
                                    discount:0,
                                    discountCurrency: dataNewProd.discountCurrency,
                                    subTotalNoDiscount: dataNewProd.subTotalNoDiscount,
                                    subtotal: dataNewProd.subtotal,
                                    totalWithIv : dataNewProd.totalWithIv}}

            : {type: "UPDATE_CART", payload: {item:updatedCartItem(itemsInCart,
                                                                   indexInCart,
                                                                   itemsInCart[indexInCart].qty+qty,
                                                                   itemsInCart[indexInCart].discount,
                                                                   globalDiscount),
                                              index:indexInCart
                                             }}

    return res

}

//calculates the subtotal by line, also the total with iv included, the discount in currency format
function caclSubtotal(product, qty, productDiscount, globalDiscount){

    let subTotalNoDiscount =  product.price * qty

    let subTotal = product.price * qty * (1-(productDiscount/100)) * (1-(globalDiscount/100))

    let totalWithIv = (product.usetaxes) ? subTotal*(1+(product.taxes/100)) : subTotal

    let discountCurrencyInLine = product.price * qty * (productDiscount/100)
    let discountCurrencyGlobal = ((product.price * qty) - discountCurrencyInLine) * (globalDiscount/100)

    let discountCurrency = discountCurrencyInLine + discountCurrencyGlobal

    return {subtotal:subTotal, totalWithIv: totalWithIv,  discountCurrency: discountCurrency, subTotalNoDiscount: subTotalNoDiscount};

}

//updates an item in the cart with new information, this aux funtion returns new updated object ready for replace the stored one
function updatedCartItem(itemsInCart, index, newQty, productDiscount, globalDiscount){

     let data = caclSubtotal(itemsInCart[index].product, newQty, productDiscount, globalDiscount)

     return {product:itemsInCart[index].product,
             discountCurrency:data.discountCurrency,
             qty:newQty,
             discount:productDiscount,
             subTotalNoDiscount: data.subTotalNoDiscount,
             subtotal:data.subtotal,
             totalWithIv: data.totalWithIv}
}
