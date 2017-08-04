export function getClientDebt(key, movements) {

  const filteredMovements = movements.filter((movement) => movement.clientId == key)
  const sortedMovements = filteredMovements.sort((a, b) => a.date < b.date)

  let totalAmount = 0

  for (const i in sortedMovements) {

    if (sortedMovements[i].type == 'CREDIT') {
      totalAmount += sortedMovements[i].amount

    } else if (sortedMovements[i].type == 'DEBIT') {
      totalAmount -= sortedMovements[i].amount
    }
  }

  console.log(totalAmount)

  return totalAmount

}
