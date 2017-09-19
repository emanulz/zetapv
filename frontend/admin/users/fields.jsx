import React from 'react'
import alertify from 'alertifyjs'
import {connect} from 'react-redux'
import {saveItem, setItem, updateItem, deleteItem} from '../utils/api'
import {checkUserData} from './actions'
const bcrypt = require('bcryptjs')

@connect((store) => {
  return {
    user: store.users.userActive,
    users: store.users.users
  }
})

export default class Fields extends React.Component {
  // REACT METHODS
  componentWillMount() {

    this.props.dispatch({type: 'CLEAR_CLIENT', payload: ''})
    this.props.dispatch({type: 'CLEAR_NEXT_PREV_USER', payload: ''})

    if (this.props.update) {
      const username = this.props.location.pathname.split('/').pop()

      const kwargs = {
        db: 'users',
        docType: 'USER',
        lookUpField: 'username',
        lookUpValue: username,
        lookUpName: 'usuario',
        modelName: 'Usuarios',
        dispatchType: 'SET_USER',
        blankFields: ['password', 'password2']
      }

      this.props.dispatch(setItem(kwargs))
    }
  }

  // HANDLE INPUT CHANGE
  handleInputChange(event) {

    const target = event.target
    let value
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

    const user = {
      ...this.props.user
    }

    user[name] = value

    this.props.dispatch({type: 'SET_USER', payload: user})
  }

  // BUTTONS
  saveBtn() {
    const _this = this
    const user = this.props.user
    const users = this.props.users
    const fieldsOk = checkUserData(user, users)

    if (fieldsOk) {
      // ENCRYPT PASSWORDS
      user.created = new Date()
      bcrypt.genSalt(10, function(err, salt) {
        if (err) {
          alertify.alert('ERROR', `Error al encriptar la contraseña salt: ${err}`)
          return false
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
          if (err) {
            alertify.alert('ERROR', `Error al encriptar la contraseña hash: ${err}`)
            return false
          }
          user.password = hash
          user.password2 = hash
          // USER CREATE AFTER HASH FINISHED
          const kwargs = {
            db: 'users',
            item: user,
            sucessMessage: 'Usuario creado Correctamente.',
            errorMessage: 'Hubo un error al crear el usuario, intente de nuevo.',
            dispatchType: 'NEW_USER'
          }

          _this.props.dispatch(saveItem(kwargs))

        })
      })

    }
  }

  updateBtn() {

    const _this = this
    const user = this.props.user
    const users = this.props.users
    const fieldsOk = checkUserData(user, users)

    if (fieldsOk) {
      // ENCRYPT PASSWORDS
      user.updated = new Date()
      bcrypt.genSalt(10, function(err, salt) {
        if (err) {
          alertify.alert('ERROR', `Error al encriptar la contraseña salt: ${err}`)
          return false
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
          if (err) {
            alertify.alert('ERROR', `Error al encriptar la contraseña hash: ${err}`)
            return false
          }
          user.password = hash
          user.password2 = hash
          // USER CREATE AFTER HASH FINISHED
          const kwargs = {
            db: 'users',
            item: user,
            modelName: 'Usuario',
            dispatchType: 'UPDATED_USER'
          }
          _this.props.dispatch(updateItem(kwargs))

        })
      })

    }
  }

  deleteBtn() {

    const user = this.props.user
    const _this = this
    const kwargs = {
      db: 'users',
      item: user,
      modelName: 'Usuario',
      dispatchType: 'CLEAR_USER'
    }
    // ALERTIFY CONFIRM
    alertify.confirm('Eliminar', `Desea Eliminar el Usuario ${user.username} - ${user.name} ${user.last_name}? Esta acción no se puede deshacer.`, function() {
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

      <div className='col-xs-6 create-fields-container first'>

        <span>Datos generales</span>
        <hr />

        <div className='form-group'>
          <label>Usuario</label>
          <input value={this.props.user.username} name='username' onChange={this.handleInputChange.bind(this)} type='text' className='form-control' />
        </div>

        <div className='form-group'>
          <label>Nombre</label>
          <input value={this.props.user.name} name='name' onChange={this.handleInputChange.bind(this)} type='text' className='form-control' />
        </div>

        <div className='form-group'>
          <label>Apellidos</label>
          <input value={this.props.user.last_name} name='last_name' onChange={this.handleInputChange.bind(this)} type='text' className='form-control' />
        </div>

        <div className='form-group'>
          <label>Identificación</label>
          <input value={this.props.user.id} onChange={this.handleInputChange.bind(this)} name='id' type='text' className='form-control' />
        </div>

        <div className='form-group'>
          <label>Es Administrador</label>
          <input checked={this.props.user.is_admin} name='is_admin' onChange={this.handleInputChange.bind(this)} type='checkbox' className='form-control' />
        </div>

      </div>

      <div className='col-xs-12 col-sm-6 create-fields-container buttons second'>

        <span>Contraseña</span>
        <hr />

        <div className='form-group'>
          <label>Contraseña</label>
          <input value={this.props.user.password} name='password' onChange={this.handleInputChange.bind(this)} type='password' className='form-control' />
        </div>

        <div className='form-group'>
          <label>Confirmar Contraseña</label>
          <input value={this.props.user.password2} name='password2' onChange={this.handleInputChange.bind(this)} type='password' className='form-control' />
        </div>

        <span>Crear</span>
        <hr />
        {buttons}
      </div>

    </div>
  }
}
