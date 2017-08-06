/*
 * Module dependencies
 */
import alertify from 'alertifyjs'
import React from 'react'

export default class TopBar extends React.Component {

  menuClick(ev) {

    const mainContainer = document.getElementById('mainContainer')
    const sideMenu = document.getElementById('sideMenu')

    if (mainContainer.classList.contains('pulled')) {

      mainContainer.classList.remove('pulled')
      sideMenu.classList.remove('visible')
      return true
    }

    mainContainer.classList.add('pulled')
    sideMenu.classList.add('visible')

  }

  logOut() {

    // ALERTIFY CONFIRM
    alertify.confirm('Cerrar Sesión', `¿Desea Cerrar su sesión en el sistema?`, function() {
      window.location.replace('/login/logout')
    }, function() {
      return true
    }).set('labels', {
      ok: 'Cerrar',
      cancel: 'Permanecer'
    })
  }

  // Main Layout
  render() {

    return <div className='topBar'>
      <div onClick={this.menuClick.bind(this)} className='topBar-button topBar-button-collapse not-visible' >
        <span className='fa fa-bars' />
      </div>
      <div onClick={this.logOut.bind(this)} className='topBar-button topBar-button-logout'>
        <span className='fa fa-power-off' />
      </div>
    </div>

  }

}
