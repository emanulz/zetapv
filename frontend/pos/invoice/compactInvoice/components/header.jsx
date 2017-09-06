import React from 'react'
import {connect} from 'react-redux'

@connect((store) => {
  return {sale: store.sales.saleActive,
    defaultDesing: store.invoice.defaultDesing,
    userCompanyConfig: store.config.userCompany,
    defaultCompanyConfig: store.config.defaultCompany}
})
export default class Header extends React.Component {

  render() {

    const headertext = this.props.sale.pay.payMethod == 'CREDIT' ? 'Factura de crédito' : 'Factura de contado'

    // BILL DATA
    const headerName = this.props.defaultDesing
      ? this.props.userCompanyConfig.comercialName || this.props.defaultCompanyConfig.comercialName || ''
      : 'CHOCOPRISMA'
    const headerName2 = this.props.userCompanyConfig.legalName || this.props.defaultCompanyConfig.legalName || ''

    const tels = this.props.userCompanyConfig.telephones || this.props.defaultCompanyConfig.telephones || ''
    const telsText = tels.split('/').length > 1 ? `Tels: ${tels}` : `Tel: ${tels}`

    const idType = this.props.userCompanyConfig.idType || this.props.defaultCompanyConfig.idType || ''
    const id = this.props.userCompanyConfig.id || this.props.defaultCompanyConfig.id || ''
    const idText = idType == 'JURIDI' ? `Céd Jurid No ${id}` : `Céd No ${id}`

    return <div>

      <div className='compact-invoice-header'>

        <div className='compact-invoice-header-info'>
          <h2>{headerName}</h2>
          <h3>{headerName2}</h3>
          <h3>{idText}</h3>
          <h3>{this.props.userCompanyConfig.address1 || this.props.defaultCompanyConfig.address1 || ''}</h3>
          <h3>{this.props.userCompanyConfig.address2 || this.props.defaultCompanyConfig.address2 || ''}</h3>
          <h3>{this.props.userCompanyConfig.country || this.props.defaultCompanyConfig.country || ''}</h3>
          <h3>{telsText}</h3>
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
