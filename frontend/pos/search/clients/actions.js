
export function hidePanel(){

    return {type: "CLIENT_HIDE_PANEL", payload: -1}
}

export function searchClient(val, clients){

    let text = val.split('%')
    let name
    let matchs = []

    console.log(clients)

    $.each(clients, function(i) {

        name = clients[i].name.toString() + ' ' +clients[i].last_name.toString();
        var control = true;

        $.each(text, function(i) {

        var index = name.toLowerCase().indexOf(text[i].toLowerCase());

        if (index == -1){
            control = false;
            return false;
        }

        });

        if (control == true){
            matchs.push(clients[i])
        }

    });

    let res = (matchs.length)
            ? {type: "CLIENT_SEARCH_SUCCESS", payload: matchs}
            : {type: "CLIENT_SEARCH_FAIL", payload: -1}

    return res
}
