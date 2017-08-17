/*
 * Module dependencies
 */
import React from 'react'
import {toggleConfigBar} from '../topBar/actions'

export default class ConfigBar extends React.Component {
  closeConfigBar() {
    toggleConfigBar()
  }

  // Main Layout
  render() {

    return <div id='configBar' className='configBar not-visible'>
      <div className='configBar-header'>
        <div className='configBar-header-top' >
          <div>Configuración</div>
          <div className='configBar-header-top-close'>
            <span onClick={this.closeConfigBar.bind(this)} className='fa fa-close' />
          </div>
        </div>
        <div className='configBar-header-bottom' >
          <input type='text' className='form-control' />
        </div>
      </div>
    </div>

  }

}
