import React from 'react'
import alertify from 'alertifyjs'
import {connect} from 'react-redux'
import {checkProductData, saveProduct, setProduct, updateProduct, deleteProduct} from '../actions.js'

@connect((store) => {
  return {product: store.products.productActive, products: store.products.products}
})

export default class Fields extends React.Component {
  componentWillMount() {
    console.log(this.props)

    if (this.props.update) {
      let code = this.props.location.pathname.split('/').pop()

      this.props.dispatch(setProduct(code))
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

    const product = {
      ...this.props.product
    }

    product[name] = value

    this.props.dispatch({type: 'SET_PRODUCT', payload: product})
  }

  saveProduct() {
    const product = this.props.product
    const products = this.props.products
    const fieldsOk = checkProductData(product, products)

    console.log(fieldsOk)

    if (fieldsOk) {
      this.props.dispatch(saveProduct(product))
    }
  }

  updateProduct() {
    const product = this.props.product
    const products = this.props.products

    const fieldsOk = checkProductData(product, products)

    console.log(fieldsOk)

    if (fieldsOk) {
      this.props.dispatch(updateProduct(product))
    }
  }

  deleteBtn() {
    let product = this.props.product
    let _this = this
    // alertify.promp

    alertify.confirm('Eliminar', `Desea Eliminar el producto ${product.code} - ${product.description}? Esta acción no se puede deshacer.`, function() {
      _this.props.dispatch(deleteProduct(product))
    }, function() {
      return true
    }).set('labels', {
      ok: 'Si',
      cancel: 'No'
    })
  }

  render() {
    const buttons = this.props.update
      ? <div className='row'>
        <div className='col-xs-6'>
          <button onClick={this.updateProduct.bind(this)} className=' form-control btn-success'>
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
          <button onClick={this.saveProduct.bind(this)} className=' form-control btn-success'>
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

    return <div className='col-xs-12 row'>

      <div className='col-xs-6 create-product-fields-container first'>

        <span>Datos generales</span>
        <hr />

        <div className='form-group row create-product-input-block'>
          <div className='col-xs-6 first'>

            <label>Código</label>
            <input value={this.props.product.code} name='code' onChange={this.handleInputChange.bind(this)} type='text' className='form-control' />

          </div>

          <div className='col-xs-6 second'>

            <label>Unidad</label>
            <input value={this.props.product.unit} name='unit' onChange={this.handleInputChange.bind(this)} type='text' className='form-control' />

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
            <select value={this.props.product.department} name='department' onChange={this.handleInputChange.bind(this)} className='form-control' />

          </div>

          <div className='col-xs-6 second'>

            <label>Sub-Familia</label>
            <select value={this.props.product.subdepartment} name='subdepartment' onChange={this.handleInputChange.bind(this)} className='form-control' />

          </div>
        </div>

        <div className='form-group row create-product-input-block'>

          <div className='col-xs-12'>

            <label>Costo</label>
            <input value={this.props.product.cost} name='cost' onChange={this.handleInputChange.bind(this)} type='number' className='form-control' />

          </div>
        </div>
      </div>

      <div className='col-xs-6 create-product-fields-container second'>

        <div className='inline-checkbox'>
          <span>Datos Venta</span>
          <input checked={this.props.product.isForSale} name='isForSale' onChange={this.handleInputChange.bind(this)} type='checkbox' className='form-control' />
        </div>

        <hr />

        <div className='form-group row create-product-input-block'>

          <div className='col-xs-12'>

            <label>Código de Barras</label>
            <input value={this.props.product.barcode} name='barcode' onChange={this.handleInputChange.bind(this)} type='number' className='form-control' />

          </div>
        </div>

        <div className='form-group row create-product-input-block'>

          <div className='col-xs-6 first'>

            <label>Utilidad</label>
            <input value={this.props.product.utility} name='utility' onChange={this.handleInputChange.bind(this)} type='number' className='form-control' />

          </div>

          <div className='col-xs-6 second'>

            <label>Precio sin I.V</label>
            <input value={this.props.product.price} name='price' onChange={this.handleInputChange.bind(this)} type='number' className='form-control' />

          </div>
        </div>

        <div className='form-group row create-product-input-block'>

          <div className='col-xs-6 first'>
            <div className='inline-checkbox'>

              <label>Impuestos %</label>
              <input checked={this.props.product.useTaxes} name='useTaxes' onChange={this.handleInputChange.bind(this)} type='checkbox' className='form-control' />

            </div>
            <input value={this.props.product.taxes} name='taxes' onChange={this.handleInputChange.bind(this)} type='number' className='form-control' />

          </div>

          <div className='col-xs-6 second'>

            <label>Descuento %</label>
            <input value={this.props.product.discount} name='discount' onChange={this.handleInputChange.bind(this)} type='number' className='form-control' />

          </div>
        </div>

        <div className='form-group row create-product-input-block'>

          <div className='col-xs-12'>

            <label>Precio de Venta</label>
            <input value={this.props.product.sellPrice} name='sellPrice' onChange={this.handleInputChange.bind(this)} type='number' className='form-control' />

          </div>
        </div>
      </div>

      <div className='col-xs-6 create-product-fields-container first'>

        <div className='inline-checkbox'>

          <span>Inventarios</span>

          <input checked={this.props.product.useInventory} name='useInventory' onChange={this.handleInputChange.bind(this)} type='checkbox' className='form-control' />

        </div>
        <hr />

        <div className='form-group row create-product-input-block'>

          <div className='col-xs-6 first'>

            <label>Existencia</label>
            <input value={this.props.product.inventory} name='inventory' onChange={this.handleInputChange.bind(this)} type='number' className='form-control' />

          </div>

          <div className='col-xs-6 second'>

            <label>Mínimo Inventario</label>
            <input value={this.props.product.minimum} name='minimum' onChange={this.handleInputChange.bind(this)} type='number' className='form-control' />

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
