import React from 'react'
import {connect} from 'react-redux'
import {formatDateTimeAmPm} from '../../../utils/formatDate.js'
import {loadPresale} from './actions.js'

@connect((store) => {
  return {presales: store.presale.presales, isPresalesPanelVisible: store.presale.isPresalesPanelVisible}
})
export default class PresalesPanel extends React.Component {

  hidePanel() {

    this.props.dispatch({type: 'HIDE_PRESALES_PANEL', payload: -1})
  }

  loadPresaleItem(id, ev) {
    this.props.dispatch(loadPresale(id, this.props.presales))
    this.props.dispatch({type: 'HIDE_PRESALES_PANEL', payload: -1})
    const _this = this
    setTimeout(function() { _this.props.dispatch({type: 'LOADED_FALSE', payload: ''}) }, 500)
    // dispatch({type: 'LOADED_FALSE', payload: ''})
  }

  render() {

    const isVisible = (this.props.isPresalesPanelVisible)
      ? 'presales-panel is-visible'
      : 'presales-panel'

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const presales = this.props.presales

    // const filteredPresales = this.props.presales.filter(sale => {
    //   const date = new Date(sale.created)
    //   date.setHours(0, 0, 0, 0)
    //   return +date === +today
    // })

    presales.sort((a, b) => {
      if (a.id < b.id) {
        return 1
      }
      if (a.id > b.id) {
        return -1
      }
      return 0
    })

    const itemsToRender = presales.map(presale => {
      return <tr key={presale._id}>
        <td className='loadRow'><i onClick={this.loadPresaleItem.bind(this, presale._id)} className='fa fa-download' /></td>
        <td><a href={`/sales/presale/${presale.id}`} target='_blank'>{presale.id}</a></td>
        <td>{`${formatDateTimeAmPm(presale.created)}`}</td>
        <td>{`${presale.client.name} ${presale.client.last_name}`}</td>
        <td>₡ {parseFloat(presale.cart.cartTotal).formatMoney(2, ',', '.')}</td>
      </tr>
    })

    return <div className={isVisible}>
      <div className='presales-panel-header'>
        PREVENTAS SIN FACTURAR
        <i onClick={this.hidePanel.bind(this)} className='fa fa-times' aria-hidden='true' />
      </div>
      <div className='presales-panel-container'>
        <div className='col-xs-12'>
          <table className='table'>
            <thead>
              <tr>
                <td>Cargar</td>
                <td>#</td>
                <td>Fecha</td>
                <td>Cliente</td>
                <td>Monto</td>
              </tr>
            </thead>
            <tbody>
              {itemsToRender}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  }

}
