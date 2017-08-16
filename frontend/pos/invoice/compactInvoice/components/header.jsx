import React from 'react'
import {connect} from 'react-redux'

@connect((store) => {
  return {sale: store.sales.saleActive, defaultDesing: store.invoice.defaultDesing}
})
export default class Header extends React.Component {

  render() {

    const headertext = this.props.sale.pay.payMethod == 'CREDIT' ? 'Factura de crédito' : 'Factura de contado'
    const headerName = this.props.defaultDesing ? 'FUDESEMILLAS' : 'CHOCOPRISMA'
    const headerName2 = !this.props.defaultDesing ? 'FUDESEMILLAS' : ''

    return <div>

      <div className='compact-invoice-header'>

        <div className='compact-invoice-header-info'>
          <h2>{headerName}</h2>
          <h3>{headerName2}</h3>
          <h3>Céd Jurid No 3-006-228432</h3>
          <h3>Contiguo al matadero municipal</h3>
          <h3>Las Juntas de Pacuar, Daniel Flores, Pérez Zeledón</h3>
          <h3>Tels: 2770-2002/2770-2003</h3>
        </div>

      </div>

      <div className='compact-invoice-separator'>
        <span />

        <h1>{headertext}</h1>

        <span />
      </div>
    </div>

  }

}
