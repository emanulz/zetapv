/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {saveItem, updateItem} from './actions'
import alertify from 'alertifyjs'

@connect((store) => {
  return {
    disabled: store.proforma.completed,
    loaded: store.sales.loadedEdit,
    proformas: store.proforma.proformas,
    cart: store.cart,
    client: store.clients.clientSelected,
    proforma: store.proforma.proformaActive

  }
})
export default class Buttons extends React.Component {

  showProformaInoicePanel() {
    this.props.dispatch({type: 'SHOW_PROFORMA_INVOICE_PANEL', payload: -1})
  }

  newProforma() {
    // window.location.reload()
    window.location.href = '/sales/proforma'
    // this.props.dispatch({type: 'NEW_SALE', payload: -1})
  }

  saveProforma() {
    const _this = this
    // ALERTIFY CONFIRM
    alertify.confirm('Guardar Proforma', `¿Desea guardar la proforma actual?`, function() {
      _this.saveBtn()
    }, function() {
      return true
    }).set('labels', {
      ok: 'Guardar',
      cancel: 'Seguir'
    })
  }

  updateProforma() {
    const _this = this
    // ALERTIFY CONFIRM
    alertify.confirm('Actualizar Proforma', `¿Desea actualizar la proforma actual?`, function() {
      _this.updateBtn()
    }, function() {
      return true
    }).set('labels', {
      ok: 'Actualizar',
      cancel: 'Seguir'
    })
  }

  saveBtn() {
    const proformas = this.props.proformas

    const sortedProformas = proformas.length > 1 ? proformas.sort((a, b) => {
      if (a.id < b.id) {
        return 1
      }
      if (a.id > b.id) {
        return -1
      }
      return 0
    }) : proformas

    const nextId = sortedProformas.length > 0 ? sortedProformas[0].id + 1 : 1

    const proforma = {
      id: nextId,
      docType: 'PROFORMA',
      cart: this.props.cart,
      client: this.props.client,
      created: new Date()
    }

    const kwargs = {
      db: 'sales',
      item: proforma,
      sucessMessage: 'Proforma creada Correctamente.',
      errorMessage: 'Hubo un error al crear la Proforma, intente de nuevo.'
    }

    this.props.dispatch(saveItem(kwargs))

  }

  updateBtn() {
    const currentProforma = this.props.proforma
    const proforma = {
      _id: currentProforma._id,
      id: currentProforma.id,
      docType: 'PROFORMA',
      cart: this.props.cart,
      client: this.props.client,
      created: currentProforma.created
    }

    const kwargs = {
      db: 'sales',
      item: proforma,
      sucessMessage: 'Proforma actualizada Correctamente.',
      errorMessage: 'Hubo un error al actualizar la Proforma, intente de nuevo.'
    }

    this.props.dispatch(updateItem(kwargs))

  }

  // Main Layout
  render() {

    const buttons = !this.props.loaded
      ? <button
        disabled={this.props.disabled}
        onClick={this.saveProforma.bind(this)}
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
      : <div>
        <button
          disabled={this.props.disabled}
          onClick={this.saveProforma.bind(this)}
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
        <button
          disabled={!this.props.disabled}
          onClick={this.updateProforma.bind(this)}
          style={{
            'height': '48px',
            'width': '49%',
            'marginTop': '10px'
          }}
          className='btn btn-default buttons-payButton'>
          Actualizar
          <span>
            <i className='fa fa-save' />
          </span>
        </button>
      </div>

    const buttons2 = this.props.disabled
      ? <div>
        <button
          onClick={this.showProformaInoicePanel.bind(this)}
          style={{
            'height': '48px',
            'width': '49%',
            'marginTop': '10px'
          }}
          className='btn btn-default buttons-payButton'>
          Factura
          <span>
            <i className='fa fa-money' />
          </span>
        </button>
        <button
          onClick={this.newProforma.bind(this)}
          style={{
            'height': '48px',
            'width': '49%',
            'marginTop': '10px'
          }}
          className='btn btn-default buttons-payButton'>
          Nueva Proforma
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

      {buttons}
      {buttons2}

    </div>

  }

}
