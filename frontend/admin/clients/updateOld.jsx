import React from 'react'
import {connect} from 'react-redux'

import {checkFieldsUpdate, updateClient, getClient, deleteClient} from './actions.js'

@connect((store) => {
  return {clients: store.clients.clients, client: store.clients.clientSelected}
})
export default class Add extends React.Component {

  componentWillMount() {

    const code = this.props.location.pathname.split('/').pop()
    this.props.dispatch(getClient(code))
  }

  handleInputChange(event) {

    const target = event.target
    const value = target.type === 'checkbox'
      ? target.checked
      : target.value
    const name = target.name

    const client = {
      ...this.props.client
    }

    client[name] = value

    this.props.dispatch({type: 'SELECT_CLIENT', payload: client})

  }

  saveBtn() {

    let fieldsOk = checkFieldsUpdate(this.props.client, this.props.clients)

    if (fieldsOk) {

      this.props.dispatch(updateClient(this.props.client))

    }

  }

  deleteBtn() {

    let client = this.props.client
    let _this = this
    //alertify.promp

    alertify.confirm('Eliminar', `Desea Eliminar el cliente ${client.code} - ${client.name} ${client.last_name}? Esta acción no se puede deshacer.`, function() {
      _this.props.dispatch(deleteClient(client))
    }, function() {
      return true
    }).set('labels', {
      ok: 'Si',
      cancel: 'No'
    })

  }

  render() {

    return <div className='client'>

      <div className='client-header'>

        {`Cliente:`}

      </div>

      <div className='row'>
        <div className='client-fields col-xs-12 col-sm-6'>
          <form>

            <div className="form-group">
              <label>Nombre</label>
              <input value={this.props.client.name} name="name" onChange={this.handleInputChange.bind(this)} type="text" className="form-control"/>
            </div>

            <div className="form-group">
              <label>Apellidos</label>
              <input value={this.props.client.last_name} name="last_name" onChange={this.handleInputChange.bind(this)} type="text" className="form-control"/>
            </div>

            <div className="form-group">
              <label>Identificación</label>
              <input value={this.props.client.id} onChange={this.handleInputChange.bind(this)} name="id" type="text" className="form-control"/>
            </div>

            <div className="form-group">
              <label>Código</label>
              <input value={this.props.client.code} name="code" onChange={this.handleInputChange.bind(this)} type="text" className="form-control"/>
            </div>

            <div className="form-group">
              <label>Tiene Crédito</label>
              <input checked={this.props.client.has_credit} name="has_credit" onChange={this.handleInputChange.bind(this)} type='checkbox' className="form-control"/>
            </div>

            <div className="form-group">
              <label>Límite de crédito</label>
              <input value={this.props.client.credit_limit} name="credit_limit" onChange={this.handleInputChange.bind(this)} type="number" className="form-control"/>
            </div>

            <div className="form-group">
              <label>Días de crédito</label>
              <input value={this.props.client.credit_days} name="credit_days" onChange={this.handleInputChange.bind(this)} type="number" className="form-control"/>
            </div>

          </form>

        </div>

        <div className='client-buttons col-xs-12 col-sm-6'>

          <div className='client-buttons col-xs-12 col-sm-8 col-md-6 col-sm-offset-1 col-md-offset-3'>

            <button onClick={this.saveBtn.bind(this)} className='form-control btn-success'>
              Guardar
            </button>
            <button className='form-control btn-primary'>
              Guardar y continuar
            </button>
            <button onClick={this.deleteBtn.bind(this)} className='form-control btn-danger'>
              Eliminar
            </button>

          </div>

        </div>

      </div>

    </div>
  }

}
