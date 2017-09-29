
export function getAmount(key, movements) {

  const filteredMovements = movements.filter((movement) => movement.productId == key)
  const sortedMovements = filteredMovements.sort((a, b) => new Date(b.date) - new Date(a.date))

  let totalAmount = 0

  for (const i in sortedMovements) {

    if (sortedMovements[i].type == 'INPUT') {
      totalAmount += sortedMovements[i].amount

    } else if (sortedMovements[i].type == 'OUTPUT') {
      totalAmount -= sortedMovements[i].amount

    } else if (sortedMovements[i].type == 'ADJUST') {
      totalAmount += sortedMovements[i].amount
      break
    }
  }

  return totalAmount

}
