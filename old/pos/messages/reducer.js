import alertify from 'alertifyjs'

const stateConst = {
  messages: false
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    case 'PRODUCT_NOT_FOUND':
    {
      alertify.alert('ERROR: NO EXISTE PRODUCTO!', 'El código ingresado no existe en el sistema, ingrese un código válido')
      return {
        ...state,
        messages: true
      }
    } // case

    case 'NOT_FOUND_SALE':
    {
      alertify.alert('ERROR: NO EXISTE LA VENTA!', `La venta #${action.payload} no existe, o hay un problema para cargarla, por favor intente de nuevo.`)
      return {
        ...state,
        messages: true
      }
    } // case

    case 'PRODUCT_IN_CART_NOT_FOUND':
    {
      alertify.alert('ERROR!', 'Hubo un error al encontrar el producto en la lista de productos agregados,por favor intente de nuevo, si el error persiste comuníquese con soporte técnico.')
      return {
        ...state,
        messages: true
      }
    } // case

    case 'FETCH_PRODUCTS_REJECTED':
    {
      alertify.alert('ERROR AL CARGAR LOS PRODUCTOS!', `Hubo un error al cargar los productos, por favor intente
                          de nuevo, si el error persiste comuníquese con soporte técnico.
                          ERROR: ${action.payload}`)

      return {
        ...state,
        messages: true
      }
    } // case

    case 'CLIENT_NOT_FOUND':
    {
      alertify.alert('ERROR: NO EXISTE CLIENTE!', 'El cliente con el código ingresado no existe en el sistema, ingrese un código válido')
      return {
        ...state,
        messages: true
      }
    } // case

    case 'FETCH_CLIENTS_REJECTED':
    {
      alertify.alert('ERROR AL CARGAR LOS CLIENTES!', `Hubo un error al cargar los clientes, por favor intente
                          de nuevo, si el error persiste comuníquese con soporte técnico.
                          ERROR: ${action.payload}`)

      return {
        ...state,
        messages: true
      }
    } // case

    case 'NEW_SALE':
    {
      state = stateConst
      return {
        ...state,
        stateConst
      }
    } // case

  } // switch

  return state // default return

} // reducer
