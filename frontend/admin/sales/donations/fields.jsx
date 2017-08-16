import React from 'react'
import alertify from 'alertifyjs'
import {connect} from 'react-redux'
import {saveItem, setItem, updateItem, deleteItem, getNextNumericCode} from '../../utils/api'
import {checkDonationData} from './actions'

@connect((store) => {
  return {
    donation: store.sales.donationActive,
    donations: store.sales.donations
  }
})

export default class Fields extends React.Component {
  // REACT METHODS
  componentWillMount() {

    this.props.dispatch({type: 'CLEAR_DONATION', payload: ''})

    if (this.props.update) {
      const code = this.props.location.pathname.split('/').pop()

      const kwargs = {
        db: 'sales',
        docType: 'DONATION',
        lookUpField: 'id',
        lookUpValue: parseInt(code),
        lookUpName: 'código',
        modelName: 'Donaciones',
        dispatchType: 'SET_DONATION'
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

    const donation = {
      ...this.props.donation
    }

    donation[name] = value

    this.props.dispatch({type: 'SET_DONATION', payload: donation})
  }

  // BUTTONS
  saveBtn() {
    const donation = this.props.donation
    const donations = this.props.donations
    const fieldsOk = checkDonationData(donation, donations)

    donation.id = getNextNumericCode(donations, 'id')

    if (fieldsOk) {
      donation.created = new Date()
      const kwargs = {
        db: 'sales',
        item: donation,
        sucessMessage: 'Donación creada Correctamente.',
        errorMessage: 'Hubo un error al crear la donación, intente de nuevo.',
        dispatchType: 'CLEAR_DONATION'
      }

      this.props.dispatch(saveItem(kwargs))
    }
  }

  updateBtn() {

    const donation = this.props.donation
    const donations = this.props.donations
    const fieldsOk = checkDonationData(donation, donations)
    donation.updated = new Date()

    if (fieldsOk) {
      const kwargs = {
        db: 'sales',
        item: donation,
        modelName: 'Donación',
        dispatchType: 'SET_DONATION'
      }
      this.props.dispatch(updateItem(kwargs))
    }
  }

  deleteBtn() {

    const donation = this.props.donation
    const _this = this
    const kwargs = {
      db: 'sales',
      item: donation,
      modelName: 'Cliente',
      dispatchType: 'CLEAR_DONATION'
    }
    // ALERTIFY CONFIRM
    alertify.confirm('Eliminar', `Desea Eliminar el Cliente ${donation.code} - ${donation.name}? Esta acción no se puede deshacer.`, function() {
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
    // DATE TO SET
    // ********************************************************************
    let date = this.props.donation.date
    if (date && this.props.update) {
      const newDate = new Date(date)
      date = `${newDate.getFullYear()}-${('0' + (newDate.getMonth() + 1)).slice(-2)}-${('0' + newDate.getDate()).slice(-2)}`
    }
    if (this.props.create) {
      const newDate = date
      date = `${newDate.getFullYear()}-${('0' + (newDate.getMonth() + 1)).slice(-2)}-${('0' + newDate.getDate()).slice(-2)}`
    }

    // ********************************************************************
    // RETURN BLOCK
    // ********************************************************************
    return <div className='col-xs-12 row'>

      <div className='col-xs-6 create-fields-container first'>

        <span>Datos generales</span>
        <hr />

        <div className='form-group'>
          <label>Fecha</label>
          <input value={date} name='date' onChange={this.handleInputChange.bind(this)} type='date'
            className='form-control' />
        </div>

        <div className='form-group'>
          <label>Monto</label>
          <input value={this.props.donation.amount} name='amount' onChange={this.handleInputChange.bind(this)}
            type='number' className='form-control' />
        </div>

        <div className='form-group'>
          <label>Documento</label>
          <input value={this.props.donation.document} onChange={this.handleInputChange.bind(this)} name='document' type='text'
            className='form-control' />
        </div>

      </div>

      <div className='col-xs-12 col-sm-6 create-fields-container buttons second'>

        <span>Crear</span>
        <hr />
        {buttons}
      </div>

    </div>
  }
}
