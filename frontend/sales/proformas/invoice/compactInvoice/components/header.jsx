import React from 'react'
import {connect} from 'react-redux'

@connect((store) => {
  return {sale: store.sales.saleActive,
    defaultDesing: store.proformaInvoice.defaultDesing,
    userCompanyConfig: store.config.userCompany,
    defaultCompanyConfig: store.config.defaultCompany}
})
export default class Header extends React.Component {

  render() {

    const headertext = 'Factura proforma'

    // BILL DATA
    const headerName = this.props.defaultDesing
      ? this.props.userCompanyConfig.comercialName || this.props.defaultCompanyConfig.comercialName || ''
      : 'CHOCOPRISMA'

    const tels = this.props.userCompanyConfig.telephones || this.props.defaultCompanyConfig.telephones || ''
    const telsText = tels.split('/').length > 1 ? `Tels: ${tels}` : `Tel: ${tels}`

    return <div>

      <div className='compact-proformaInvoice-header'>

        <div className='compact-proformaInvoice-header-info'>
          <h2>{headerName}</h2>
          <h3>{this.props.userCompanyConfig.address1 || this.props.defaultCompanyConfig.address1 || ''}</h3>
          <h3>{this.props.userCompanyConfig.address2 || this.props.defaultCompanyConfig.address2 || ''}</h3>
          <h3>{this.props.userCompanyConfig.country || this.props.defaultCompanyConfig.country || ''}</h3>
          <h3>{telsText}</h3>
        </div>

      </div>

      <div className='compact-proformaInvoice-separator'>
        <span />

        <h1>{headertext}</h1>

        <span />
      </div>
    </div>

  }

}
