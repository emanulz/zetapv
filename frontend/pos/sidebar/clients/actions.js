
export function clientSelected(code, clients) {

  const clientSelected = clients.findIndex(client => client.code == code) // checks if product exists

  const res = (clientSelected == -1) // if not exists dispatch Not Found, if exists check if already in cart
    ? {
      type: 'CLIENT_NOT_FOUND',
      payload: -1
    }
    : {
      type: 'CLIENT_SELECTED',
      payload: {
        client: clients[clientSelected]
      }
    }

  return res

}

export function searchClient() {

  return {type: 'CLIENT_SHOW_PANEL', payload: -1}
}
