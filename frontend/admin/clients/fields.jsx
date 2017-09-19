import React from 'react'
import alertify from 'alertifyjs'
import {connect} from 'react-redux'
import {saveItem, setItem, updateItem, deleteItem} from '../utils/api'
import {checkClientData} from './actions'

@connect((store) => {
  return {
    client: store.clients.clientActive,
    clients: store.clients.clients
  }
})

export default class Fields extends React.Component {
  // REACT METHODS
  componentWillMount() {

    this.props.dispatch({type: 'CLEAR_CLIENT', payload: ''})
    this.props.dispatch({type: 'CLEAR_NEXT_PREV_CLIENT', payload: ''})

    if (this.props.update) {
      const code = this.props.location.pathname.split('/').pop()

      const kwargs = {
        db: 'general',
        docType: 'CLIENT',
        lookUpField: 'code',
        lookUpValue: code,
        lookUpName: 'código',
        modelName: 'Clientes',
        dispatchType: 'SET_CLIENT'
      }

      this.props.dispatch(setItem(kwargs))
    }
  }

  // HANDLE INPUT CHANGE
  handleInputChange(event) {

    const target = event.target
    let value
    console.log(target.value)
    // const value = target.type === 'checkbox' ? target.checked : target.value
    switch (target.type) {
      case 'checkbox':
      {
        value = target.checked
        break
      }
      case 'number':
      {
        value = parseFloat(target.value)
          ? parseFloat(target.value)
          : ''
        break
      }
      default:
      {
        value = target.value
      }
    }

    const name = target.name
    console.log(target.name)

    const client = {
      ...this.props.client
    }

    client[name] = value

    this.props.dispatch({type: 'SET_CLIENT', payload: client})
  }

  // BUTTONS
  saveBtn() {
    const client = this.props.client
    const clients = this.props.clients
    const fieldsOk = checkClientData(client, clients)

    if (fieldsOk) {
      client.created = new Date()
      const kwargs = {
        db: 'general',
        item: client,
        sucessMessage: 'Cliente creado Correctamente.',
        errorMessage: 'Hubo un error al crear el Cliente, intente de nuevo.',
        dispatchType: 'CLEAR_CLIENT'
      }

      this.props.dispatch(saveItem(kwargs))
    }
  }

  updateBtn() {

    const client = this.props.client
    const clients = this.props.clients
    const fieldsOk = checkClientData(client, clients)
    client.updated = new Date()

    if (fieldsOk) {
      const kwargs = {
        db: 'general',
        item: client,
        modelName: 'Cliente',
        dispatchType: 'SET_CLIENT'
      }
      this.props.dispatch(updateItem(kwargs))
    }
  }

  deleteBtn() {

    const client = this.props.client
    const _this = this
    const kwargs = {
      db: 'general',
      item: client,
      modelName: 'Cliente',
      dispatchType: 'CLEAR_CLIENT'
    }
    // ALERTIFY CONFIRM
    alertify.confirm('Eliminar', `Desea Eliminar el Cliente ${client.code} - ${client.name}? Esta acción no se puede deshacer.`, function() {
      _this.props.dispatch(deleteItem(kwargs))
    }, function() {
      return true
    }).set('labels', {
      ok: 'Si',
      cancel: 'No'
    })
  }

  render() {
    // ********************************************************************
    // BUTTONS
    // ********************************************************************
    const buttons = this.props.update
      ? <div className='col-xs-10 col-sm-offset-1'>
        <div className='col-xs-12'>
          <button onClick={this.updateBtn.bind(this)} className=' form-control btn-success'>
            Actualizar
          </button>
        </div>

        <div className='col-xs-12'>
          <button className='form-control btn-primary'>
            Guardar y agregar otro
          </button>
        </div>

        <div className='col-xs-12'>
          <button onClick={this.deleteBtn.bind(this)} className='form-control btn-danger'>
            Eliminar
          </button>
        </div>
      </div>
      : <div className='col-xs-10 col-sm-offset-1'>
        <div className='col-xs-12'>
          <button onClick={this.saveBtn.bind(this)} className=' form-control btn-success'>
            Guardar
          </button>
        </div>

        <div className='col-xs-12'>
          <button className='form-control btn-primary'>
            Guardar y agregar otro
          </button>
        </div>

        <div className='col-xs-12'>
          <button className='form-control btn-danger'>
            Cancelar
          </button>
        </div>
      </div>

    // ********************************************************************
    // RETURN BLOCK
    // ********************************************************************
    return <div className='col-xs-12 row'>

      <div className='col-xs-12 col-sm-6 create-fields-container first'>

        <span>Datos generales</span>
        <hr />

        <div className='form-group'>
          <label>Nombre</label>
          <input value={this.props.client.name} name='name' onChange={this.handleInputChange.bind(this)} type='text'
            className='form-control' />
        </div>

        <div className='form-group'>
          <label>Apellidos</label>
          <input value={this.props.client.last_name} name='last_name' onChange={this.handleInputChange.bind(this)}
            type='text' className='form-control' />
        </div>

        <div className='form-group'>
          <label>Identificación</label>
          <input value={this.props.client.id} onChange={this.handleInputChange.bind(this)} name='id' type='text'
            className='form-control' />
        </div>

        <div className='form-group'>
          <label>Código</label>
          <input value={this.props.client.code} name='code' onChange={this.handleInputChange.bind(this)} type='text'
            className='form-control' />
        </div>

        <div className='form-group'>
          <label>Tiene Crédito</label>
          <input checked={this.props.client.has_credit} name='has_credit' onChange={this.handleInputChange.bind(this)}
            type='checkbox' className='form-control' />
        </div>

        <div className='form-group'>
          <label>Límite de crédito</label>
          <input value={this.props.client.credit_limit} name='credit_limit' onChange={this.handleInputChange.bind(this)}
            type='number' className='form-control' />
        </div>

        <div className='form-group'>
          <label>Días de crédito</label>
          <input value={this.props.client.credit_days} name='credit_days' onChange={this.handleInputChange.bind(this)}
            type='number' className='form-control' />
        </div>

      </div>

      <div className='col-xs-12 col-sm-6 create-fields-container buttons second'>

        <span>Contacto y Tipo</span>
        <hr />

        <div className='form-group'>
          <label>Dirección</label>
          <input value={this.props.client.adress} name='adress' onChange={this.handleInputChange.bind(this)} type='text'
            className='form-control' />
        </div>

        <div className='form-group'>
          <label>Teléfono</label>
          <input value={this.props.client.telephone} name='telephone' onChange={this.handleInputChange.bind(this)} type='text'
            className='form-control' />
        </div>

        <div className='form-group'>
          <label>Email</label>
          <input value={this.props.client.email} name='email' onChange={this.handleInputChange.bind(this)} type='email'
            className='form-control' />
        </div>

        <div className='form-group'>
          <label>Tipo</label>
          <select onChange={this.handleInputChange.bind(this)} className='form-control' name='clientType'
            value={this.props.client.clientType} >
            <option value='GENERAL'>Cliente General</option>
            <option value='DISTRIB'>Distribuidor</option>
            <option value='WHOLESA'>Mayorista</option>
          </select>
        </div>

        <span>Crear</span>
        <hr />
        {buttons}
      </div>

    </div>
  }
}
