/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {fetchItems} from '../../../utils/api'

// components
import DataTable from '../../../generalComponents/dataTable/dataTable.jsx'

@connect((store) => {
  return {
    movements: store.inventories.productmovements
  }
})
export default class MovementsList extends React.Component {

  componentWillMount() {
    const kwargs = {
      db: 'general',
      docType: 'PRODUCT_MOVEMENT',
      dispatchType: 'FETCH_PRODUCT_MOVEMENTS_FULFILLED',
      dispatchErrorType: 'FETCH_PRODUCT_MOVEMENTS_REJECTED'
    }
    this.props.dispatch(fetchItems(kwargs)) // fetch products before mount, send dispatch to reducer.
  }

  // Render the product
  render() {
    const headerOrder = [
      {
        field: 'document',
        text: 'Documento',
        type: 'primary'
      }, {
        field: 'productId',
        text: 'Producto',
        type: 'text'
      },
      {
        field: 'type',
        text: 'Tipo',
        type: 'text'
      },
      {
        field: 'amount',
        text: 'Cantidad',
        type: 'text'
      }
    ]

    return <div className='list-container'>

      <h1>Movimientos:</h1>

      <DataTable headerOrder={headerOrder} model='inventories/products/movements' data={this.props.movements} addLink='/admin/inventories/products/movements/add' />

    </div>
  }
}
