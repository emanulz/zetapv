
export function hideItemsBar() {
  const itemsBar = document.getElementById('itemsBar')
  itemsBar.classList.add('not-visible')
}

export function toggleItemsBar() {

  const itemsBar = document.getElementById('itemsBar')

  if (itemsBar.classList.contains('not-visible')) {

    itemsBar.classList.remove('not-visible')
    return true
  }

  itemsBar.classList.add('not-visible')

}
