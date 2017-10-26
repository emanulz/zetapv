import React from 'react'
import alertify from 'alertifyjs'
import {connect} from 'react-redux'
import {saveItem, setItem, updateItem, deleteItem} from '../../utils/api'
import {checkAccountData} from './actions'
import { withRouter } from 'react-router-dom'

@connect((store) => {
  return {
    account: store.banks.accountActive,
    accounts: store.banks.accounts
  }
})

class Fields extends React.Component {
  // REACT METHODS
  componentWillMount() {

    this.props.dispatch({type: 'CLEAR_BANK_ACCOUNT', payload: ''})
    this.props.dispatch({type: 'CLEAR_NEXT_PREV_BANK_ACCOUNT', payload: ''})

    if (this.props.update) {
      const code = this.props.location.pathname.split('/').pop()

      const kwargs = {
        db: 'general',
        docType: 'BANK_ACCOUNT',
        lookUpField: 'code',
        lookUpValue: code,
        lookUpName: 'código',
        modelName: 'Cuentas bancarias',
        dispatchType: 'SET_BANK_ACCOUNT'
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

    const account = {
      ...this.props.account
    }

    account[name] = value

    this.props.dispatch({type: 'SET_BANK_ACCOUNT', payload: account})
  }

  // BUTTONS
  saveBtn(redirect) {
    const account = this.props.account
    const accounts = this.props.accounts
    const fieldsOk = checkAccountData(account, accounts)

    if (fieldsOk) {
      account.created = new Date()
      const kwargs = {
        db: 'general',
        item: account,
        sucessMessage: 'Cuenta bancaria creada Correctamente.',
        errorMessage: 'Hubo un error al crear la cuenta bancaria, intente de nuevo.',
        dispatchType: 'CLEAR_BANK_ACCOUNT'
      }

      if (redirect) {
        kwargs.redirectUrl = '/admin/banks/accounts'
        kwargs.history = this.props.history
      }

      this.props.dispatch(saveItem(kwargs))
    }
  }

  updateBtn(redirect) {

    const account = this.props.account
    const accounts = this.props.accounts
    const fieldsOk = checkAccountData(account, accounts)
    account.updated = new Date()

    if (fieldsOk) {
      const kwargs = {
        db: 'general',
        item: account,
        modelName: 'Cuenta bancaria',
        dispatchType: 'SET_BANK_ACCOUNT'
      }

      if (redirect) {
        kwargs.redirectUrl = '/admin/banks/accounts'
        kwargs.history = this.props.history
      }

      this.props.dispatch(updateItem(kwargs))
    }
  }

  deleteBtn() {

    const account = this.props.account
    const _this = this
    const kwargs = {
      db: 'general',
      item: account,
      modelName: 'Cuenta bancaria',
      dispatchType: 'CLEAR_BANK_ACCOUNT',
      redirectUrl: '/admin/banks/accounts',
      history: this.props.history
    }
    // ALERTIFY CONFIRM
    alertify.confirm('Eliminar', `Desea Eliminar la cuenta ${account.code} - ${account.name}? Esta acción no se puede deshacer.`, function() {
      _this.props.dispatch(deleteItem(kwargs))
    }, function() {
      return true
    }).set('labels', {
      ok: 'Si',
      cancel: 'No'
    })
  }

  backToList (event) {
    // ALERTIFY CONFIRM
    const _this = this
    alertify.confirm('No guardar', `¿Desea salir al menú sin guardar los cambios?`, function() {
      return true
    }, function() {
      _this.props.history.push('/admin/banks/accounts')
    }).set('labels', {
      ok: 'Permanecer',
      cancel: 'No guardar'
    })

  }

  render() {
    // ********************************************************************
    // BUTTONS
    // ********************************************************************
    const buttons = this.props.update
      ? <div className='col-xs-10 col-sm-offset-1'>
        <div className='col-xs-12'>
          <button onClick={this.updateBtn.bind(this, true)} className=' form-control btn-success'>
            Actualizar
          </button>
        </div>

        <div className='col-xs-12'>
          <button onClick={this.updateBtn.bind(this, false)} className='form-control btn-primary'>
            Actualizar y Seguir
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
          <button onClick={this.saveBtn.bind(this, true)} className=' form-control btn-success'>
            Guardar
          </button>
        </div>

        <div className='col-xs-12'>
          <button onClick={this.saveBtn.bind(this, false)} className='form-control btn-primary'>
            Guardar y agregar otro
          </button>
        </div>

        <div className='col-xs-12'>
          <button onClick={this.backToList.bind(this)} className='form-control btn-danger'>
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
          <label>Código</label>
          <input value={this.props.account.code} name='code' onChange={this.handleInputChange.bind(this)} type='text'
            className='form-control' />
        </div>

        <div className='form-group'>
          <label>Nombre</label>
          <input value={this.props.account.name} name='name' onChange={this.handleInputChange.bind(this)} type='text'
            className='form-control' />
        </div>

        <div className='form-group'>
          <label>Banco</label>
          <input value={this.props.account.bank} name='bank' onChange={this.handleInputChange.bind(this)}
            type='text' className='form-control' />
        </div>

        <div className='form-group'>
          <label>Número De cuenta</label>
          <input value={this.props.account.number} name='number' onChange={this.handleInputChange.bind(this)}
            type='text' className='form-control' />
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

// EXPORT THE CLASS WITH ROUTER
export default withRouter(Fields)
