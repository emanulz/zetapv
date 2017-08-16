import React from 'react'
import {connect} from 'react-redux'

@connect((store) => {
  return {sale: store.sales.saleActive, defaultDesing: store.invoice.defaultDesing}
})
export default class Header extends React.Component {

  render() {

    const headertext = this.props.sale.pay.payMethod == 'CREDIT' ? 'Factura de crédito' : 'Factura de contado'

    const logoUrl = this.props.defaultDesing ? '/img/fudesemillas.jpg' : '/img/chocoprisma.jpg'
    const headerName = this.props.defaultDesing ? 'FUDESEMILLAS' : 'CHOCOPRISMA'
    const headerName2 = !this.props.defaultDesing ? 'FUDESEMILLAS' : ''

    return <div>

      <div className='full-invoice-header'>

        <div className='full-invoice-header-logo'>
          <img src={logoUrl} />
        </div>
        <div className='full-invoice-header-info'>
          <h2>{headerName}</h2>
          <h3>{headerName2}</h3>
          <h3>Céd Jurid No 3-006-228432</h3>
          <h3>Contiguo al matadero municipal</h3>
          <h3>Las Juntas de Pacuar, Daniel Floeres Pérez Zeledón</h3>
          <h3>Costa Rica</h3>
          <h3>Tels: 2770-2002/2770-2003</h3>
          <h3>administracion@fudesemillas.net</h3>
        </div>

      </div>

      <div className='full-invoice-separator'>
        <span />

        <h1>{headertext}</h1>
        <span />
      </div>
    </div>

  }

}
