/*
 * Module dependencies
 */
import React from 'react'
import Search from './components/search/search.jsx'
import ComposedItem from './components/items/composed.jsx'
import {Link} from 'react-router-dom'

export default class SideMenu extends React.Component {

  // Main Layout
  render() {

    const childInventories = [
      {
        text: 'Productos',
        class: 'fa-truck',
        href: '/admin/inventories/products'
      }
    ]
    const childProducts = [
      {
        text: 'Productos',
        class: 'fa-gift',
        href: '/admin/products'
      }, {
        text: 'Departamenentos',
        class: 'fa-list',
        href: '/admin/products/departments'
      }, {
        text: 'Sub-Departamentos',
        class: 'fa-outdent',
        href: '/admin/products/subdepartments'
      }
    ]

    const childClients = [
      {
        text: 'Clientes',
        class: 'fa-user',
        href: '/admin/clients'
      }, {
        text: 'Cuentas por Cobrar',
        class: 'fa-money',
        href: '/admin/receivable'
      }
    ]

    const childSales = [
      {
        text: 'Punto de venta',
        class: 'fa-shopping-cart',
        href: '/pos',
        noLink: true
      }, {
        text: 'Ventas',
        class: 'fa-file-text',
        href: '/admin/sales'
      }, {
        text: 'Donaciones',
        class: 'fa-money',
        href: '/admin/donations'
      }
    ]

    return <div id='sideMenu' className='sideMenu'>

      <h3 className='sideMenu-header'>FUDESEMILLAS</h3>

      <Search />

      <div className='sideMenu-wrapper'>
        <ul className='sideMenu-items'>
          <li>
            <Link to='/admin'>
              <span className='fa fa-area-chart' />
              Inicio</Link>
          </li>
          <li>
            <Link to='/admin/users'>
              <span className='fa fa-user' />
              Usuarios</Link>
          </li>
          <ComposedItem mainTittle='Ventas' mainIcon='fa-shopping-cart' childItems={childSales} />
          <ComposedItem mainTittle='Clientes' mainIcon='fa-users' childItems={childClients} />
          <ComposedItem mainTittle='Productos' mainIcon='fa-gift' childItems={childProducts} />
          <ComposedItem mainTittle='Inventarios' mainIcon='fa-sticky-note' childItems={childInventories} />

        </ul>
      </div>

    </div>

  }

}
