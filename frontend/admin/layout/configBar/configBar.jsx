/*
 * Module dependencies
 */
import React from 'react'
import {toggleConfigBar} from '../topBar/actions'
import {Link} from 'react-router-dom'

export default class ConfigBar extends React.Component {
  closeConfigBar() {
    toggleConfigBar()
  }

  // Main Layout
  render() {

    return <div id='configBar' className='configBar'>
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

      <div className='configBar-content'>
        <ul className='configBar-content-group'>
          <li>
            <Link to='/admin/config/company' className='configBar-content-group-item'>
              <span className='fa fa-building' />
              <span className='text'>Empresa</span>
            </Link>
          </li>
          <li>
            <Link to='/admin/config/clients' className='configBar-content-group-item'>
              <span className='fa fa-users' />
              <span className='text'>Clientes</span>
            </Link>
          </li>
          <li>
            <Link to='/admin/config/products' className='configBar-content-group-item'>
              <span className='fa fa-users' />
              <span className='text'>Clientes</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>

  }

}
