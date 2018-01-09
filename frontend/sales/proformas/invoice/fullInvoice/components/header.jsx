import React from 'react'
import {connect} from 'react-redux'

@connect((store) => {
  return {
    sale: store.sales.saleActive,
    defaultDesing: store.proformaInvoice.defaultDesing,
    userCompanyConfig: store.config.userCompany,
    defaultCompanyConfig: store.config.defaultCompany
  }
})
export default class Header extends React.Component {

  render() {
    // Credit or cash
    const headertext = 'Factura proforma'
    // LOGO
    const logo = this.props.userCompanyConfig.logo || this.props.defaultCompanyConfig.logo || ''
    const logoUrl = this.props.defaultDesing ? `/img/logos/${logo}` : '/img/logos/chocoprisma.jpg'

    // BILL DATA
    const headerName = this.props.defaultDesing
      ? this.props.userCompanyConfig.comercialName || this.props.defaultCompanyConfig.comercialName || ''
      : 'CHOCOPRISMA'

    const tels = this.props.userCompanyConfig.telephones || this.props.defaultCompanyConfig.telephones || ''
    const telsText = tels.split('/').length > 1 ? `Tels: ${tels}` : `Tel: ${tels}`

    return <div>

      <div className='full-proformaInvoice-header'>

        <div className='full-proformaInvoice-header-logo'>
          <img src={logoUrl} />
        </div>
        <div className='full-proformaInvoice-header-info'>
          <h2>{headerName.toUpperCase()}</h2>
          <h3>{this.props.userCompanyConfig.address1 || this.props.defaultCompanyConfig.address1 || ''}</h3>
          <h3>{this.props.userCompanyConfig.address2 || this.props.defaultCompanyConfig.address2 || ''}</h3>
          <h3>{this.props.userCompanyConfig.country || this.props.defaultCompanyConfig.country || ''}</h3>
          <h3>{telsText}</h3>
          <h3>{this.props.userCompanyConfig.email || this.props.defaultCompanyConfig.email || ''}</h3>
        </div>

      </div>

      <div className='full-proformaInvoice-separator'>
        <span />

        <h1>{headertext}</h1>
        <span />
      </div>
    </div>

  }

}
