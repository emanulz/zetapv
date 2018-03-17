/*
 * Module dependencies
 */
import React from 'react'
// import ComposedItem from './components/items/composed.jsx'
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

    // const childInventories = [
    //   {
    //     text: 'Productos',
    //     class: 'fa-truck',
    //     href: '/admin/inventories/products'
    //   }, {
    //     text: 'Bodegas',
    //     class: 'fa-building',
    //     href: '/admin/inventories/warehouses'
    //   }, {
    //     text: 'Traslados entre bodegas',
    //     class: 'fa-exchange',
    //     href: '/admin/inventories/products'
    //   }, {
    //     text: 'Toma de inventarios',
    //     class: 'fa-list',
    //     href: '/inventories',
    //     noLink: true
    //   }
    // ]
    // const childProducts = [
    //   {
    //     text: 'Productos',
    //     class: 'fa-gift',
    //     href: '/admin/products'
    //   }, {
    //     text: 'Departamenentos',
    //     class: 'fa-list',
    //     href: '/admin/products/departments'
    //   }, {
    //     text: 'Sub-Departamentos',
    //     class: 'fa-outdent',
    //     href: '/admin/products/subdepartments'
    //   }
    // ]
    //
    // const childClients = [
    //   {
    //     text: 'Clientes',
    //     class: 'fa-user',
    //     href: '/admin/clients'
    //   }, {
    //     text: 'Cuentas por Cobrar',
    //     class: 'fa-reorder',
    //     href: '/admin/receivable'
    //   }, {
    //     text: 'Notas de Crédito',
    //     class: 'fa-ticket',
    //     href: '/admin/receivable/payments'
    //   }, {
    //     text: 'Pagos',
    //     class: 'fa-money',
    //     href: '/admin/receivable/payments'
    //   }
    // ]
    //
    // const childSales = [
    //   {
    //     text: 'App Ventas',
    //     class: 'fa-shopping-cart',
    //     href: '/pos',
    //     noLink: true
    //   }, {
    //     text: 'Listado de Ventas',
    //     class: 'fa-file-text',
    //     href: '/admin/sales'
    //   }, {
    //     text: 'Turnos',
    //     class: 'fa-shield',
    //     href: '/admin/sales'
    //   }, {
    //     text: 'Devoluciones',
    //     class: 'fa-money',
    //     href: '/admin/donations'
    //   }, {
    //     text: 'Donaciones',
    //     class: 'fa-money',
    //     href: '/admin/donations'
    //   }
    // ]
    //
    // const childExpenses = [
    //   {
    //     text: 'Gastos',
    //     class: 'fa-sticky-note',
    //     href: '/admin/expenses'
    //   }, {
    //     text: 'Categorías',
    //     class: 'fa-file-text',
    //     href: '/admin/expenses/categories'
    //   }
    // ]
    //
    // const childSuppliers = [
    //   {
    //     text: 'Proveedores',
    //     class: 'fa-sticky-note',
    //     href: '/admin'
    //   }, {
    //     text: 'Cuentas por pagar',
    //     class: 'fa-file-text',
    //     href: '/admin'
    //   }, {
    //     text: 'Pagos',
    //     class: 'fa-money',
    //     href: '/admin'
    //   }
    // ]
    //
    // const childBanks = [
    //   {
    //     text: 'Cuentas',
    //     class: 'fa-cc',
    //     href: '/admin/banks/accounts'
    //   }, {
    //     text: 'Depósitos',
    //     class: 'fa-money',
    //     href: '/admin'
    //   }
    // ]

    // const title = this.props.userCompanyConfig.comercialName || this.props.defaultCompanyConfig.comercialName || 'APP'

    return <div id='sideMenu' className='sales-home-sideBar-sideMenu'>

      {/* <h3 className='sideMenu-header'>{title.toUpperCase()}</h3> */}

      <div className='sales-home-sideBar-sideMenu-wrapper'>
        <ul className='sales-home-sideBar-sideMenu-items'>
          <li>
            <Link to='/sales/pos'>
              <span className='fa fa-shopping-cart' />
              Venta</Link>
          </li>
          <li>
            <Link to='/sales/proforma'>
              <span className='fa fa-user' />
              Cotización / Proforma</Link>
          </li>

          <li>
            <Link to='/sales/presale'>
              <span className='fa fa-user' />
              Preventa</Link>
          </li>

          <li>
            <Link to='/sales/proforma'>
              <span className='fa fa-user' />
              Anular Factura</Link>
          </li>

          <li>
            <Link to='/sales/creditnote'>
              <span className='fa fa-user' />
              Devolución / Nota de Crédito</Link>
          </li>

        </ul>
      </div>

    </div>

  }

}
