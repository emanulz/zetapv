/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import User from './user/user.jsx'

@connect((store) => {
  return {
    userCompanyConfig: store.config.userCompany,
    defaultCompanyConfig: store.config.defaultCompany
  }
})
export default class SideMenu extends React.Component {

  // Main Layout
  render() {
    // const title = this.props.userCompanyConfig.comercialName || this.props.defaultCompanyConfig.comercialName || 'APP'

    return <div id='sideMenu' className='sideMenu'>

      {/* <h3 className='sideMenu-header'>{title.toUpperCase()}</h3> */}
      <User />

      <ul className='sideMenu-items'>
        <li>
          <a href='/'>
            <span className='fa fa-home' />
            Inicio</a>
        </li>
        <li>
          <a href='/pos/'>
            <span className='fa fa-shopping-cart' />
            Punto de Venta</a>
        </li>
        <li>
          <a href='/admin/'>
            <span className='fa fa-area-chart' />
            Sitio Administrador</a>
        </li>
        <li>
          <a href='/inventories/'>
            <span className='fa fa-gift' />
            Inventarios</a>
        </li>
        <li>
          <a href='/login/logout/'>
            <span className='fa fa-power-off' />
            Cerrar sesión</a>
        </li>
      </ul>
    </div>

  }

}
