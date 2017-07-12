
const stateConst = {
    clientsFetching:false,
    clientsFected:false,
    clientsFetchError:'',
    clients: {},
}

export default function reducer(state=stateConst, action) {

    switch (action.type) {

        case "FETCH_CLIENTS": {
            return {...state, clientsFetching: true}
        }//case

        case "FETCH_CLIENTS_REJECTED": {
          return {
              ...state,
              clientsFetching: false,
              clientsFetchError: action.payload}
        }//case

        case "FETCH_CLIENTS_FULFILLED": {
            return {
              ...state,
              clientsFetching: false,
              clientsFected: true,
              clients: action.payload,
            }
            break;
        }//case



    }// switch

    return state //default return

}// reducer
