
export function hidePanel(){

    return {type: "PRODUCT_HIDE_PANEL", payload: -1}
}

export function searchProduct(val, products){

    let text = val.split('%')
    let description
    let matchs = []

    $.each(products, function(i) {

        description = products[i].description.toString();
        var control = true;

        $.each(text, function(i) {

        var index = description.toLowerCase().indexOf(text[i].toLowerCase());

        if (index == -1){
            control = false;
            return false;
        }

        });

        if (control == true){
            matchs.push(products[i])
        }

    });

    let res = (matchs.length)
            ? {type: "PRODUCT_SEARCH_SUCCESS", payload: matchs}
            : {type: "PRODUCT_SEARCH_FAIL", payload: -1}

    return res
}


export function productSelectedTable(code) {

    return {type: "SET_PRODUCT_FIELD_VALUE", payload: code}

}
