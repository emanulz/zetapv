
export function filterSales(sales, client, num) {

  let filtered = sales

  if (filtered.length) {
    if (num) {
      filtered = filtered.filter(el => el.id == num)
    }
    if (client) {
      filtered = filtered.filter(el => el.client._id == client)
    }

    return filtered

  } else {
    return []
  }

}
