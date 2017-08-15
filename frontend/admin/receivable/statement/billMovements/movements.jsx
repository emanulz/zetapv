/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {fetchItems, setItem, setItems} from '../../../utils/api'

@connect((store) => {
  return {
    movements: store.receivable.clientmovements,
    clients: store.clients.clients,
    sale: store.sales.saleActive
  }
})
export default class MovementsList extends React.Component {

  componentWillMount() {
    const kwargs = {
      db: 'general',
      docType: 'CLIENT_MOVEMENT',
      dispatchType: 'FETCH_CLIENT_MOVEMENTS_FULFILLED',
      dispatchErrorType: 'FETCH_CLIENT_MOVEMENTS_REJECTED'
    }
    this.props.dispatch(fetchItems(kwargs)) // fetch client movements before mount, send dispatch to reducer.

    const kwargs2 = {
      db: 'sales',
      docType: 'SALE',
      dispatchType: 'FETCH_SALES_FULFILLED',
      dispatchErrorType: 'FETCH_SALES_REJECTED'
    }
    this.props.dispatch(fetchItems(kwargs2)) // fetch clients before mount, send dispatch to reducer.

    const id = this.props.location.pathname.split('/').pop()

    const kwargs3 = {
      db: 'sales',
      docType: 'SALE',
      lookUpField: 'id',
      lookUpValue: parseInt(id),
      lookUpName: 'Número de Factura',
      modelName: 'Ventas',
      dispatchType: 'SET_SALE'
    }

    this.props.dispatch(setItem(kwargs3))
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.sale) {
      const id = nextprops.sale._id

      const kwargs = {
        db: 'general',
        docType: 'CLIENT_MOVEMENT',
        lookUpField: 'sale_id',
        lookUpValue: id,
        lookUpName: 'Número de Factura',
        modelName: 'Movimientos',
        dispatchType: 'SET_SALE_MOVEMENTS'
      }

      this.props.dispatch(setItems(kwargs))
    }
  }

  // Render the product
  render() {

    return <div className='list-container'>

      <h1>Movimientos de factura:</h1>

    </div>
  }
}
