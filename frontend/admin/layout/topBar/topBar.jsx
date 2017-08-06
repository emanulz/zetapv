/*
 * Module dependencies
 */
import React from 'react'
import alertify from 'alertifyjs'
import {toggleLayout} from './actions'

export default class TopBar extends React.Component {

  menuClick(ev) {

    toggleLayout()

  }

  logOutClick() {

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
      <div onClick={this.logOutClick.bind(this)} className='topBar-button topBar-button-logout'>
        <span className='fa fa-power-off' />
      </div>
    </div>

  }

}
