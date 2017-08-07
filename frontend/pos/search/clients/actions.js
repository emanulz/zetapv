export function hidePanel() {

  return {type: 'CLIENT_HIDE_PANEL', payload: -1}
}

export function searchClient(val, clients) {

  const text = val.split('%')
  const matchs = []

  console.log(clients)

  clients.forEach(client => {
    let control = true
    const name = client.name.toString() + ' ' + client.last_name.toString()

    text.forEach(word => {
      const index = name.toLowerCase().indexOf(word.toLowerCase())

      if (index == -1) {
        control = false
        return false
      }
    })

    if (control) {
      matchs.push(client)
    }

  })

  const res = (matchs.length)
    ? {
      type: 'CLIENT_SEARCH_SUCCESS',
      payload: matchs
    }
    : {
      type: 'CLIENT_SEARCH_FAIL',
      payload: -1
    }

  return res
}
