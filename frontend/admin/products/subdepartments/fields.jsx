import React from 'react'
import alertify from 'alertifyjs'
import {connect} from 'react-redux'
import {saveItem, setItem, updateItem, deleteItem} from '../../utils/api'
import {checkSubDepartmentData} from '../actions.js'

@connect((store) => {
  return {
    subdepartment: store.products.subdepartmentActive,
    subdepartments: store.products.subdepartments,
    departments: store.products.departments}
})

export default class Fields extends React.Component {

  componentWillMount() {

    this.props.dispatch({type: 'CLEAR_PRODUCT_SUBDEPARTMENT', payload: ''})

    if (this.props.update) {
      const code = this.props.location.pathname.split('/').pop()

      const obj = {
        db: 'general',
        docType: 'PRODUCT_SUBDEPARTMENT',
        lookUpField: 'code',
        lookUpValue: code,
        lookUpName: 'código',
        modelName: 'sub-departamentos',
        dispatchType: 'SET_PRODUCT_SUBDEPARTMENT'
      }

      this.props.dispatch(setItem(obj))
    }
  }

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

    const subdepartment = {
      ...this.props.subdepartment
    }

    subdepartment[name] = value

    this.props.dispatch({type: 'SET_PRODUCT_SUBDEPARTMENT', payload: subdepartment})
  }

  saveBtn() {
    const subdepartment = this.props.subdepartment
    const subdepartments = this.props.subdepartments.filter(item => item.department == subdepartment.department)
    const fieldsOk = checkSubDepartmentData(subdepartment, subdepartments)

    if (fieldsOk) {
      subdepartment.created = new Date()
      const obj = {
        db: 'general',
        item: subdepartment,
        sucessMessage: 'Sub-Departamento creado correctamente',
        errorMessage: 'Hubo un error al crear el Sub-departamento, intente de nuevo.',
        dispatchType: 'CLEAR_PRODUCT_SUBDEPARTMENT'
      }

      this.props.dispatch(saveItem(obj))
    }
  }

  updateBtn() {

    const subdepartment = this.props.subdepartment
    const subdepartments = this.props.subdepartments.filter(item => item.department == subdepartment.department)
    const fieldsOk = checkSubDepartmentData(subdepartment, subdepartments)

    if (fieldsOk) {
      subdepartment.updated = new Date()
      const obj = {
        db: 'general',
        item: subdepartment,
        modelName: 'Departamento',
        dispatchType: 'SET_PRODUCT_SUBDEPARTMENT'
      }
      this.props.dispatch(updateItem(obj))
    }
  }

  deleteBtn() {

    const subdepartment = this.props.subdepartment
    const _this = this
    const obj = {
      db: 'general',
      item: subdepartment,
      modelName: 'Sub-Departamento',
      dispatchType: 'CLEAR_PRODUCT_SUBDEPARTMENT'
    }
    // ALERTIFY CONFIRM
    alertify.confirm('Eliminar', `Desea Eliminar el Sub-departamento ${subdepartment.code} - ${subdepartment.name}? Esta acción no se puede deshacer.`, function() {
      _this.props.dispatch(deleteItem(obj))
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
    // SELECT OPTIONS
    // ********************************************************************
    const sortedDepartments = this.props.departments.length
      ? this.props.departments.sort((a, b) => { return a.code > b.code })
      : []

    const departmentOptions = sortedDepartments.length
      ? sortedDepartments.map(department => {
        return <option key={department._id} value={department._id}> {department.code} - {department.name}</option>
      })
      : <option value={0}> No hay Departamentos</option>
    // ********************************************************************
    // RETURN BLOCK
    // ********************************************************************
    return <div className='col-xs-12 row'>

      <div className='col-xs-6 create-fields-container first'>

        <span>Datos generales</span>
        <hr />

        <div className='form-group row create-input-block'>

          <div className='col-xs-12'>

            <label>Departamento</label>
            <select value={this.props.subdepartment.department} name='department' onChange={this.handleInputChange.bind(this)} className='form-control'>
              {departmentOptions}
            </select>

          </div>
        </div>

        <div className='form-group row create-input-block'>
          <div className='col-xs-12'>

            <label>Código</label>
            <input value={this.props.subdepartment.code} name='code' onChange={this.handleInputChange.bind(this)} type='text' className='form-control' />

          </div>
        </div>

        <div className='form-group row create-input-block'>

          <div className='col-xs-12'>

            <label>Nombre</label>
            <input value={this.props.subdepartment.name} name='name' onChange={this.handleInputChange.bind(this)} type='text' className='form-control' />

          </div>
        </div>

        <div className='form-group row create-input-block'>

          <div className='col-xs-12'>

            <label>Descripción</label>
            <input value={this.props.subdepartment.description} name='description' onChange={this.handleInputChange.bind(this)} type='text' className='form-control' />

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
