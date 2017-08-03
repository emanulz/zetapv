
export function getAmount(key, movements) {

  const filteredMovements = movements.filter((movement) => movement.productId == key)
  const sortedMovements = filteredMovements.sort((a, b) => a.date < b.date)

  let totalAmount = 0

  for (const i in sortedMovements) {

    if (sortedMovements[i].type == 'Input') {
      totalAmount += sortedMovements[i].amount

    } else if (sortedMovements[i].type == 'Output') {
      totalAmount -= sortedMovements[i].amount

    } else if (sortedMovements[i].type == 'Adjust') {
      totalAmount += sortedMovements[i].amount
      break
    }
  }

  console.log(totalAmount)

  return totalAmount

}
