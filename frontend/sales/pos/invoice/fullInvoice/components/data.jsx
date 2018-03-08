import React from 'react'
import {connect} from 'react-redux'

@connect((store) => {
  return {sale: store.sales.saleActive}
})
export default class Data extends React.Component {

  render() {

    const sale = this.props.sale
    const date = sale.created
      ? `${('0' + sale.created.getDate()).slice(-2)}/
      ${('0' + (sale.created.getMonth() + 1)).slice(-2)}/
      ${sale.created.getFullYear()}`
      : '01/01/1970'
    const client = sale.client ? `${sale.client.code} - ${sale.client.name} ${sale.client.last_name}` : '00 - Cliente de Contado'
    const clientAdress = sale.client.adress
      ? <tr>
        <td className='clientAdress'>DIRECCIÓN: {sale.client.adress}</td>
      </tr>
      : ''
    const id = sale.id ? sale.id : '00001'

    return <div className='full-invoice-data'>

      <table className='client-table'>
        <thead>
          <tr>
            <th>CLIENTE:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{client}</td>
          </tr>
          {clientAdress}
        </tbody>

      </table>
      <table className='datenum-table'>

        <tbody>
          <tr>
            <th>N. de factura:</th>
            <td>{('00000' + id).slice(-5)}</td>

          </tr>
          <tr>
            <th>Fecha:</th>
            <td>{date}</td>
          </tr>
        </tbody>

      </table>

    </div>

  }

}
