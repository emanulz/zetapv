/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {saveItem} from './actions'
import alertify from 'alertifyjs'

@connect((store) => {
  return {
    disabled: store.presale.completed,
    presales: store.presale.presales,
    cart: store.cart,
    client: store.clients.clientSelected

  }
})
export default class Buttons extends React.Component {

  showPresaleInoicePanel() {
    // this.props.dispatch({type: 'SHOW_PROFORMA_INVOICE_PANEL', payload: -1})
  }

  newPresale() {
    // window.location.reload()
    // window.location.href = '/sales/presale'
    this.props.dispatch({type: 'CLEAR_ALL', payload: -1})
  }

  savePresale() {
    const _this = this
    // ALERTIFY CONFIRM
    alertify.confirm('Guardar Preventa', `¿Desea guardar la preventa actual?`, function() {
      _this.saveBtn()
    }, function() {
      return true
    }).set('labels', {
      ok: 'Guardar',
      cancel: 'Seguir'
    })
  }

  saveBtn() {
    const presales = this.props.presales

    const sortedPresales = presales.length > 1 ? presales.sort((a, b) => {
      if (a.id < b.id) {
        return 1
      }
      if (a.id > b.id) {
        return -1
      }
      return 0
    }) : presales

    const nextId = sortedPresales.length > 0 ? sortedPresales[0].id + 1 : 1

    const presale = {
      id: nextId,
      docType: 'PRESALE',
      cart: this.props.cart,
      client: this.props.client,
      created: new Date()
    }

    const kwargs = {
      db: 'sales',
      item: presale,
      sucessMessage: 'Preventa creada Correctamente.',
      errorMessage: 'Hubo un error al crear la Preventa, intente de nuevo.'
    }

    this.props.dispatch(saveItem(kwargs))

  }

  // Main Layout
  render() {

    const buttons = this.props.disabled
      ? <div>
        <button
          onClick={this.newPresale.bind(this)}
          style={{
            'height': '48px',
            'width': '49%',
            'marginTop': '10px'
          }}
          className='btn btn-default buttons-payButton'>
          Nueva Preventa
          <span>
            <i className='fa fa-refresh' />
          </span>
        </button>
      </div>
      : ''

    return <div className='col-xs-12 buttons'>

      <span>
        <b>Guardar Cotización:<br /></b>
      </span>

      <button
        disabled={this.props.disabled}
        onClick={this.savePresale.bind(this)}
        style={{
          'height': '48px',
          'width': '49%',
          'marginTop': '10px'
        }}
        className='btn btn-default buttons-payButton'>
        Guardar
        <span>
          <i className='fa fa-save' />
        </span>
      </button>

      {buttons}

    </div>

  }

}
