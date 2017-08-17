
export function toggleLayout() {

  const mainContainer = document.getElementById('mainContainer')
  const sideMenu = document.getElementById('sideMenu')

  if (mainContainer.classList.contains('pulled')) {

    mainContainer.classList.remove('pulled')
    sideMenu.classList.remove('pulled')
    return true
  }

  mainContainer.classList.add('pulled')
  sideMenu.classList.add('pulled')

}

export function toggleConfigBar() {

  const configBar = document.getElementById('configBar')

  if (configBar.classList.contains('not-visible')) {

    configBar.classList.remove('not-visible')
    return true
  }

  configBar.classList.add('not-visible')

}
