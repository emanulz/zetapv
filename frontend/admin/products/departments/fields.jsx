import React from 'react'
import alertify from 'alertifyjs'
import {connect} from 'react-redux'
import {checkDepartmentData} from '../actions.js'
import {saveItem, setItem, updateItem, deleteItem} from '../../utils/api'
import { withRouter } from 'react-router-dom'

@connect((store) => {
  return {department: store.products.departmentActive, departments: store.products.departments}
})

class Fields extends React.Component {

  componentWillMount() {

    this.props.dispatch({type: 'CLEAR_PRODUCT_DEPARTMENT', payload: ''})
    this.props.dispatch({type: 'CLEAR_NEXT_PREV_DEPARTMENT', payload: ''})

    if (this.props.update) {
      const code = this.props.location.pathname.split('/').pop()

      const obj = {
        db: 'general',
        docType: 'PRODUCT_DEPARTMENT',
        lookUpField: 'code',
        lookUpValue: code,
        lookUpName: 'código',
        modelName: 'departamentos',
        dispatchType: 'SET_PRODUCT_DEPARTMENT'
      }

      this.props.dispatch(setItem(obj))
    }
  }

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

    const department = {
      ...this.props.department
    }

    department[name] = value.toString()

    this.props.dispatch({type: 'SET_PRODUCT_DEPARTMENT', payload: department})
  }

  saveBtn(redirect) {
    const department = this.props.department
    const departments = this.props.departments
    const fieldsOk = checkDepartmentData(department, departments)

    if (fieldsOk) {
      department.created = new Date()
      const obj = {
        db: 'general',
        item: department,
        sucessMessage: 'Departamento creado correctamente',
        errorMessage: 'Hubo un error al crear el departamento, intente de nuevo.',
        dispatchType: 'CLEAR_PRODUCT_DEPARTMENT'
      }

      if (redirect) {
        obj.redirectUrl = '/admin/products/departments'
        obj.history = this.props.history
      }

      this.props.dispatch(saveItem(obj))
    }
  }

  updateBtn(redirect) {

    const department = this.props.department
    const departments = this.props.departments
    const fieldsOk = checkDepartmentData(department, departments)

    if (fieldsOk) {
      department.updated = new Date()
      const obj = {
        db: 'general',
        item: department,
        modelName: 'Departamento',
        dispatchType: 'SET_PRODUCT_DEPARTMENT'
      }

      if (redirect) {
        obj.redirectUrl = '/admin/products/departments'
        obj.history = this.props.history
      }

      this.props.dispatch(updateItem(obj))
    }
  }

  deleteBtn() {

    const department = this.props.department
    const _this = this
    // alertify.promp

    const obj = {
      db: 'general',
      item: department,
      modelName: 'Departamento',
      dispatchType: 'CLEAR_PRODUCT_DEPARTMENT',
      redirectUrl: '/admin/products/departments',
      history: this.props.history
    }

    alertify.confirm('Eliminar', `Desea Eliminar el departamento ${department.code} - ${department.name}?
    Esta acción no se puede deshacer.`, function() {
        _this.props.dispatch(deleteItem(obj))
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
      _this.props.history.push('/admin/products/subdepartments')
    }).set('labels', {
      ok: 'Permanecer',
      cancel: 'No guardar'
    })

  }

  render() {
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

    // RETURN BLOCK
    return <div className='col-xs-12 row'>

      <div className='col-xs-6 create-fields-container first'>

        <span>Datos generales</span>
        <hr />

        <div className='form-group row create-input-block'>
          <div className='col-xs-12'>

            <label>Código</label>
            <input value={this.props.department.code} name='code' onChange={this.handleInputChange.bind(this)}
              type='number'
              className='form-control'
            />

          </div>
        </div>

        <div className='form-group row create-input-block'>

          <div className='col-xs-12'>

            <label>Nombre</label>
            <input value={this.props.department.name} name='name' onChange={this.handleInputChange.bind(this)}
              type='text'
              className='form-control'
            />

          </div>
        </div>

        <div className='form-group row create-input-block'>

          <div className='col-xs-12'>

            <label>Descripción</label>
            <input value={this.props.department.description} name='description'
              onChange={this.handleInputChange.bind(this)}
              type='text'
              className='form-control'
            />

          </div>
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
