import React from 'react'
import alertify from 'alertifyjs'
import {connect} from 'react-redux'
import {saveItem, setItem, updateItem, deleteItem} from '../../utils/api'
import {checkProductData, determinAmounts} from '../actions.js'

@connect((store) => {
  return {
    product: store.products.productActive,
    products: store.products.products
  }
})

export default class Fields extends React.Component {

  // REACT METHODS
  componentWillMount() {

    this.props.dispatch({type: 'CLEAR_PRODUCT', payload: ''})

    if (this.props.update) {
      const code = this.props.location.pathname.split('/').pop()

      const kwargs = {
        db: 'general',
        docType: 'PRODUCT',
        lookUpField: 'code',
        lookUpValue: code,
        lookUpName: 'código',
        modelName: 'Productos',
        dispatchType: 'SET_PRODUCT'
      }

      this.props.dispatch(setItem(kwargs))
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

    let product = {
      ...this.props.product
    }

    product[name] = value
    product = determinAmounts(product, name, value)

    this.props.dispatch({type: 'SET_PRODUCT', payload: product})
  }

  // BUTTONS
  saveBtn() {
    const product = this.props.product
    const products = this.props.products
    const fieldsOk = checkProductData(product, products)

    if (fieldsOk) {
      product.created = new Date()
      const kwargs = {
        db: 'general',
        item: product,
        sucessMessage: 'Producto creado Correctamente.',
        errorMessage: 'Hubo un error al crear el Producto, intente de nuevo.',
        dispatchType: 'CLEAR_PRODUCT'
      }

      this.props.dispatch(saveItem(kwargs))
    }
  }

  updateBtn() {

    const product = this.props.product
    const products = this.props.products
    const fieldsOk = checkProductData(product, products)
    product.updated = new Date()

    if (fieldsOk) {
      const kwargs = {
        db: 'general',
        item: product,
        modelName: 'Producto',
        dispatchType: 'SET_PRODUCT'
      }
      this.props.dispatch(updateItem(kwargs))
    }
  }

  deleteBtn() {

    const product = this.props.product
    const _this = this
    const kwargs = {
      db: 'general',
      item: product,
      modelName: 'Producto',
      dispatchType: 'CLEAR_PRODUCT'
    }
    // ALERTIFY CONFIRM
    alertify.confirm(
      'Eliminar', `Desea Eliminar el producto ${product.code} - ${product.description}?
      Esta acción no se puede deshacer.`,
      function() {
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
      ? <div className='row'>
        <div className='col-xs-6'>
          <button onClick={this.updateBtn.bind(this)} className=' form-control btn-success'>
            Actualizar
          </button>
        </div>

        <div className='col-xs-6'>
          <button className='form-control btn-primary'>
            Guardar y agregar otro
          </button>
        </div>

        <div className='col-xs-6'>
          <button onClick={this.deleteBtn.bind(this)} className='form-control btn-danger'>
            Eliminar
          </button>
        </div>
      </div>
      : <div className='row'>
        <div className='col-xs-6'>
          <button onClick={this.saveBtn.bind(this)} className=' form-control btn-success'>
            Guardar
          </button>
        </div>

        <div className='col-xs-6'>
          <button className='form-control btn-primary'>
            Guardar y agregar otro
          </button>
        </div>

        <div className='col-xs-6'>
          <button className='form-control btn-danger'>
            Cancelar
          </button>
        </div>
      </div>

    // ********************************************************************
    // RETURN BLOCK
    // ********************************************************************
    return <div className='col-xs-12 row'>

      <div className='col-xs-6 create-product-fields-container first'>

        <span>Datos generales</span>
        <hr />

        <div className='form-group row create-product-input-block'>
          <div className='col-xs-6 first'>

            <label>Código</label>
            <input value={this.props.product.code} name='code' onChange={this.handleInputChange.bind(this)} type='text'
              className='form-control' />

          </div>

          <div className='col-xs-6 second'>

            <label>Unidad</label>
            <input value={this.props.product.unit} name='unit' onChange={this.handleInputChange.bind(this)} type='text'
              className='form-control' />

          </div>
        </div>

        <div className='form-group row create-product-input-block'>

          <div className='col-xs-12'>

            <label>Código de Barras</label>
            <input value={this.props.product.barcode} name='barcode' onChange={this.handleInputChange.bind(this)}
              type='number' className='form-control' />

          </div>
        </div>

        <div className='form-group row create-product-input-block'>

          <div className='col-xs-12'>

            <label>Descripción</label>
            <input value={this.props.product.description} name='description' onChange={this.handleInputChange.bind(this)} type='text' className='form-control' />

          </div>
        </div>

        <div className='form-group row create-product-input-block'>

          <div className='col-xs-6 first'>

            <label>Familia</label>
            <select value={this.props.product.department} name='department' onChange={this.handleInputChange.bind(this)}
              className='form-control' />

          </div>

          <div className='col-xs-6 second'>

            <label>Sub-Familia</label>
            <select value={this.props.product.subdepartment} name='subdepartment'
              onChange={this.handleInputChange.bind(this)} className='form-control' />

          </div>
        </div>

        <div className='form-group row create-product-input-block'>

          <div className='col-xs-12'>

            <div className='inline-checkbox'>

              <label>Basado en Costo</label>
              <input checked={this.props.product.costBased} name='costBased'
                onChange={this.handleInputChange.bind(this)} type='checkbox' className='form-control' />

            </div>
            <input disabled={!this.props.product.costBased} value={this.props.product.cost} name='cost' onChange={this.handleInputChange.bind(this)}
              type='number' className='form-control' />

          </div>
        </div>

        <div className='form-group row create-product-input-block'>

          <div className='col-xs-6 first'>
            <div className='inline-checkbox'>

              <label>Impuestos %</label>
              <input checked={this.props.product.useTaxes} name='useTaxes'
                onChange={this.handleInputChange.bind(this)} type='checkbox' className='form-control' />

            </div>
            <input disabled={!this.props.product.useTaxes} value={this.props.product.taxes} name='taxes' onChange={this.handleInputChange.bind(this)}
              type='number' className='form-control' />

          </div>

          <div className='col-xs-6 second'>

            <div className='inline-checkbox'>

              <label>Impuestos 2 %</label>
              <input checked={this.props.product.useTaxes2} name='useTaxes2'
                onChange={this.handleInputChange.bind(this)} type='checkbox' className='form-control' />

            </div>
            <input disabled={!this.props.product.useTaxes2} value={this.props.product.taxes2}
              name='taxes2' onChange={this.handleInputChange.bind(this)}
              type='number' className='form-control' />

          </div>
        </div>

        <div className='form-group row create-product-input-block'>
          <div className='col-xs-6 first'>

            <div className='inline-checkbox'>

              <label>Comercio Justo %</label>
              <input checked={this.props.product.useFairTrade} name='useFairTrade'
                onChange={this.handleInputChange.bind(this)} type='checkbox' className='form-control' />

            </div>
            <input disabled={!this.props.product.useFairTrade} value={this.props.product.fairTrade}
              name='fairTrade' onChange={this.handleInputChange.bind(this)}
              type='number' className='form-control' />

          </div>
        </div>

      </div>

      <div className='col-xs-6 create-product-fields-container second'>

        <div className='inline-checkbox'>
          <span>Datos Venta</span>
          <input checked={this.props.product.isForSale} name='isForSale' onChange={this.handleInputChange.bind(this)}
            type='checkbox' className='form-control' />
        </div>

        <hr />

        <div className='form-group row create-product-input-block'>

          <div className='col-xs-6 first'>

            <label>Utilidad 1 %</label>
            <input disabled={!this.props.product.isForSale} value={this.props.product.utility} name='utility'
              onChange={this.handleInputChange.bind(this)}
              type='number' className='form-control' />

          </div>

          <div className='col-xs-6 second'>

            <label>Precio sin I.V 1</label>
            <input disabled={!this.props.product.isForSale} value={this.props.product.price} name='price'
              onChange={this.handleInputChange.bind(this)}
              type='number' className='form-control' />

          </div>
        </div>

        <div className='form-group row create-product-input-block'>

          <div className='col-xs-6 first'>

            <div className='inline-checkbox'>

              <label>Utilidad 2 %</label>
              <input disabled={!this.props.product.isForSale} checked={this.props.product.usePrice2} name='usePrice2'
                onChange={this.handleInputChange.bind(this)} type='checkbox' className='form-control' />

            </div>
            <input disabled={!this.props.product.usePrice2 || !this.props.product.isForSale}
              value={this.props.product.utility2}
              name='utility2'
              onChange={this.handleInputChange.bind(this)}
              type='number' className='form-control' />

          </div>

          <div className='col-xs-6 second'>

            <label>Precio sin I.V 2</label>
            <input disabled={!this.props.product.usePrice2 || !this.props.product.isForSale}
              value={this.props.product.price2}
              name='price2'
              onChange={this.handleInputChange.bind(this)}
              type='number' className='form-control' />

          </div>
        </div>

        <div className='form-group row create-product-input-block'>

          <div className='col-xs-6 first'>

            <div className='inline-checkbox'>

              <label>Utilidad 3 %</label>
              <input disabled={!this.props.product.isForSale} checked={this.props.product.usePrice3} name='usePrice3'
                onChange={this.handleInputChange.bind(this)} type='checkbox' className='form-control' />

            </div>
            <input disabled={!this.props.product.usePrice3 || !this.props.product.isForSale}
              value={this.props.product.utility3} name='utility3'
              onChange={this.handleInputChange.bind(this)}
              type='number' className='form-control' />

          </div>

          <div className='col-xs-6 second'>

            <label>Precio sin I.V 3</label>
            <input disabled={!this.props.product.usePrice3 || !this.props.product.isForSale}
              value={this.props.product.price3} name='price3'
              onChange={this.handleInputChange.bind(this)}
              type='number' className='form-control' />

          </div>
        </div>

        <div className='form-group row create-product-input-block'>

          <div className='col-xs-12'>

            <div className='inline-checkbox'>

              <label>Descuento Predeterminado %</label>
              <input disabled={!this.props.product.isForSale} checked={this.props.product.hasDiscount}
                name='hasDiscount'
                onChange={this.handleInputChange.bind(this)}
                type='checkbox' className='form-control' />

            </div>
            <input disabled={!this.props.product.isForSale || this.props.products.hasDiscount}
              value={this.props.product.discount} name='discount' onChange={this.handleInputChange.bind(this)}
              type='number' className='form-control' />

          </div>

        </div>

        <div className='form-group row create-product-input-block'>

          <div className='col-xs-12'>

            <label>Precio de Venta</label>
            <input disabled={!this.props.product.isForSale} value={this.props.product.sellPrice} name='sellPrice' onChange={this.handleInputChange.bind(this)}
              type='number' className='form-control' />

          </div>
        </div>

        <div className='form-group row create-product-input-block'>

          <div className='col-xs-6 first'>

            <label>Precio de Venta 2</label>
            <input disabled={!this.props.product.isForSale || !this.props.product.usePrice2} value={this.props.product.sellPrice2}
              name='sellPrice2' onChange={this.handleInputChange.bind(this)}
              type='number' className='form-control' />

          </div>

          <div className='col-xs-6 second'>

            <label>Precio de Venta 3</label>
            <input disabled={!this.props.product.isForSale || !this.props.product.usePrice3} value={this.props.product.sellPrice3}
              name='sellPrice3' onChange={this.handleInputChange.bind(this)}
              type='number' className='form-control' />

          </div>
        </div>
      </div>

      <div className='col-xs-6 create-product-fields-container first'>

        <div className='inline-checkbox'>

          <span>Inventarios</span>

          <input checked={this.props.product.useInventory} name='useInventory'
            onChange={this.handleInputChange.bind(this)} type='checkbox' className='form-control' />

        </div>
        <hr />

        <div className='form-group row create-product-input-block'>

          <div className='col-xs-6 first'>

            <label>Existencia</label>
            <input disabled={!this.props.product.useInventory} value={this.props.product.inventory}
              name='inventory' onChange={this.handleInputChange.bind(this)}
              type='number' className='form-control' />

          </div>

          <div className='col-xs-6 second'>

            <label>Mínimo Inventario</label>
            <input disabled={!this.props.product.useInventory} value={this.props.product.minimum}
              name='minimum' onChange={this.handleInputChange.bind(this)}
              type='number' className='form-control' />

          </div>
        </div>
      </div>

      <div className='col-xs-6 create-product-fields-container buttons second'>

        <span>Crear</span>
        <hr />
        {buttons}
      </div>

    </div>
  }
}
