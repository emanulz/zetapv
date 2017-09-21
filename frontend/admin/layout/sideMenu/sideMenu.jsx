/*
 * Module dependencies
 */
import React from 'react'
import Search from './components/search/search.jsx'
import User from './components/user/user.jsx'
import ComposedItem from './components/items/composed.jsx'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

@connect((store) => {
  return {
    userCompanyConfig: store.config.userCompany,
    defaultCompanyConfig: store.config.defaultCompany
  }
})
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
      }, {
        text: 'Notas de Crédito',
        class: 'fa-money',
        href: '/admin/receivable/payments'
      }, {
        text: 'Pagos',
        class: 'fa-money',
        href: '/admin/receivable/payments'
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
        text: 'Devoluciones',
        class: 'fa-money',
        href: '/admin/donations'
      }, {
        text: 'Donaciones',
        class: 'fa-money',
        href: '/admin/donations'
      }
    ]

    const childExpenses = [
      {
        text: 'Gastos',
        class: 'fa-sticky-note',
        href: '/admin/expenses'
      }, {
        text: 'Categorías',
        class: 'fa-file-text',
        href: '/admin/expenses/categories'
      }
    ]

    const childSuppliers = [
      {
        text: 'Proveedores',
        class: 'fa-sticky-note',
        href: '/admin'
      }, {
        text: 'Cuentas por pagar',
        class: 'fa-file-text',
        href: '/admin'
      }, {
        text: 'Pagos',
        class: 'fa-money',
        href: '/admin'
      }
    ]

    // const title = this.props.userCompanyConfig.comercialName || this.props.defaultCompanyConfig.comercialName || 'APP'

    return <div id='sideMenu' className='sideMenu'>

      {/* <h3 className='sideMenu-header'>{title.toUpperCase()}</h3> */}
      <User />

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
          <ComposedItem mainTittle='Gastos' mainIcon='fa-money' childItems={childExpenses} />
          <ComposedItem mainTittle='Inventarios' mainIcon='fa-sticky-note' childItems={childInventories} />
          <ComposedItem mainTittle='Proveedores' mainIcon='fa-users' childItems={childSuppliers} />

        </ul>
      </div>

    </div>

  }

}
