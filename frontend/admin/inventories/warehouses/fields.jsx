import React from 'react'
import alertify from 'alertifyjs'
import {connect} from 'react-redux'
import {saveItem, setItem, updateItem, deleteItem} from '../../utils/api'
import {checkWarehouseData} from './actions'
import { withRouter } from 'react-router-dom'

@connect((store) => {
  return {
    warehouse: store.inventories.warehouseActive,
    warehouses: store.inventories.warehouses
  }
})

class Fields extends React.Component {
  // REACT METHODS
  componentWillMount() {

    this.props.dispatch({type: 'CLEAR_WAREHOUSE', payload: ''})
    this.props.dispatch({type: 'CLEAR_NEXT_PREV_WAREHOUSE', payload: ''})

    if (this.props.update) {
      const code = this.props.location.pathname.split('/').pop()

      const kwargs = {
        db: 'general',
        docType: 'WAREHOUSE',
        lookUpField: 'code',
        lookUpValue: code,
        lookUpName: 'código',
        modelName: 'Bodegas',
        dispatchType: 'SET_WAREHOUSE'
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

    const warehouse = {
      ...this.props.warehouse
    }

    warehouse[name] = value

    this.props.dispatch({type: 'SET_WAREHOUSE', payload: warehouse})
  }

  // BUTTONS
  saveBtn(redirect) {
    const warehouse = this.props.warehouse
    const warehouses = this.props.warehouses
    const fieldsOk = checkWarehouseData(warehouse, warehouses)

    if (fieldsOk) {
      warehouse.created = new Date()
      const kwargs = {
        db: 'general',
        item: warehouse,
        sucessMessage: 'Bodega creada Correctamente.',
        errorMessage: 'Hubo un error al crear la Bodega, intente de nuevo.',
        dispatchType: 'CLEAR_WAREHOUSE'
      }

      if (redirect) {
        kwargs.redirectUrl = '/admin/inventories/warehouses'
        kwargs.history = this.props.history
      }

      this.props.dispatch(saveItem(kwargs))
    }
  }

  updateBtn(redirect) {

    const warehouse = this.props.warehouse
    const warehouses = this.props.warehouses
    const fieldsOk = checkWarehouseData(warehouse, warehouses)
    warehouse.updated = new Date()

    if (fieldsOk) {
      const kwargs = {
        db: 'general',
        item: warehouse,
        modelName: 'Bodega',
        dispatchType: 'SET_WAREHOUSE'
      }

      if (redirect) {
        kwargs.redirectUrl = '/admin/inventories/warehouses'
        kwargs.history = this.props.history
      }

      this.props.dispatch(updateItem(kwargs))
    }
  }

  deleteBtn() {

    const warehouse = this.props.warehouse
    const _this = this
    const kwargs = {
      db: 'general',
      item: warehouse,
      modelName: 'Bodega',
      dispatchType: 'CLEAR_WAREHOUSE',
      redirectUrl: '/admin/inventories/warehouses',
      history: this.props.history
    }
    // ALERTIFY CONFIRM
    alertify.confirm('Eliminar', `Desea Eliminar la Bodega ${warehouse.code} - ${warehouse.name}? Esta acción no se puede deshacer.`, function() {
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
      _this.props.history.push('/admin/inventories/warehouses')
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
          <input value={this.props.warehouse.code} name='code' onChange={this.handleInputChange.bind(this)}
            type='text' className='form-control' />
        </div>

        <div className='form-group'>
          <label>Nombre</label>
          <input value={this.props.warehouse.name} name='name' onChange={this.handleInputChange.bind(this)} type='text'
            className='form-control' />
        </div>

        <div className='form-group'>
          <label>Ubicación</label>
          <input value={this.props.warehouse.location} name='location' onChange={this.handleInputChange.bind(this)} type='text'
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

// EXPORT THE CLASS WITH ROUTER
export default withRouter(Fields)
