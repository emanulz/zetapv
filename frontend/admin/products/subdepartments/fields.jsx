import React from 'react'
import alertify from 'alertifyjs'
import {connect} from 'react-redux'
import {saveItem, setItem, updateItem, deleteItem} from '../../utils/api'
import {checkSubDepartmentData} from '../actions.js'
import Select2 from 'react-select2-wrapper'
import { withRouter } from 'react-router-dom'

@connect((store) => {
  return {
    subdepartment: store.products.subdepartmentActive,
    subdepartments: store.products.subdepartments,
    departments: store.products.departments}
})

class Fields extends React.Component {

  componentWillMount() {

    this.props.dispatch({type: 'CLEAR_PRODUCT_SUBDEPARTMENT', payload: ''})
    this.props.dispatch({type: 'CLEAR_NEXT_PREV_SUBDEPARTMENT', payload: ''})

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

    const subdepartment = {
      ...this.props.subdepartment
    }

    if (name == 'department') {
      subdepartment[name] = value
      subdepartment['firstCode'] = value.split('.')[1]
      subdepartment['code'] = `${subdepartment.firstCode}.${subdepartment.codeId}`
    } else if (name == 'codeId') {
      subdepartment[name] = value
      subdepartment['code'] = `${subdepartment.firstCode}.${value}`
    } else {
      subdepartment[name] = value
    }

    this.props.dispatch({type: 'SET_PRODUCT_SUBDEPARTMENT', payload: subdepartment})
  }

  saveBtn(redirect) {
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

      if (redirect) {
        obj.redirectUrl = '/admin/products/subdepartments'
        obj.history = this.props.history
      }

      this.props.dispatch(saveItem(obj))
    }
  }

  updateBtn(redirect) {

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

      if (redirect) {
        obj.redirectUrl = '/admin/products/subdepartments'
        obj.history = this.props.history
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
      dispatchType: 'CLEAR_PRODUCT_SUBDEPARTMENT',
      redirectUrl: '/admin/products/subdepartments',
      history: this.props.history
    }
    // ALERTIFY CONFIRM
    alertify.confirm('Eliminar', `Desea Eliminar el Sub-departamento ${subdepartment.code} - ${subdepartment.name}?
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
    // SELECT2 DATA
    // ********************************************************************
    const departments = this.props.departments

    departments.sort((a, b) => {
      return a.code - b.code
    })

    const departmentData = departments.map(department => {
      return {text: `${department.code} - ${department.name}`, id: `${department._id}.${department.code}`}
    })

    // ********************************************************************
    // RETURN BLOCK
    // ********************************************************************
    return <div className='col-xs-12 row'>

      <div className='col-xs-6 create-fields-container first'>

        <span>Datos generales</span>
        <hr />

        <div className='form-group row create-input-block'>
          <div className='col-xs-12'>

            <label>Nombre</label>
            <input value={this.props.subdepartment.name} name='name'
              onChange={this.handleInputChange.bind(this)}
              type='text'
              className='form-control'
            />
          </div>
        </div>

        <div className='form-group row create-input-block'>

          <div className='col-xs-12'>

            <label>Departamento</label>

            <Select2
              name='department'
              value={this.props.subdepartment.department}
              className='form-control'
              onSelect={this.handleInputChange.bind(this)}
              data={departmentData}
              options={{
                placeholder: 'Elija un departamento...',
                noResultsText: 'Sin elementos'
              }}

            />

          </div>
        </div>

        <div className='form-group row create-input-block'>
          <div className='col-xs-12'>

            <label>Código</label>
            <input disabled={!this.props.subdepartment.department} value={this.props.subdepartment.codeId}
              name='codeId' onChange={this.handleInputChange.bind(this)}
              type='number' className='form-control'
            />

          </div>
        </div>

        <div className='form-group row create-input-block'>

          <div className='col-xs-12'>

            <label>Descripción</label>
            <input value={this.props.subdepartment.description} name='description'
              onChange={this.handleInputChange.bind(this)}
              type='text'
              className='form-control' />

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
