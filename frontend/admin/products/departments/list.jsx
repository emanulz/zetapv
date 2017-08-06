/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {fetchItems} from '../../utils/api'

// components
import DataTable from '../../generalComponents/dataTable/dataTable.jsx'

@connect((store) => {
  return {departments: store.products.departments}
})
export default class Product extends React.Component {

  componentWillMount() {
    const kwargs = {
      db: 'general',
      docType: 'PRODUCT_DEPARTMENT',
      dispatchType: 'FETCH_PRODUCT_DEPARTMENTS_FULFILLED',
      dispatchErrorType: 'FETCH_PRODUCT_DEPARTMENTS_REJECTED'
    }
    this.props.dispatch(fetchItems(kwargs)) // fetch products before mount, send dispatch to reducer.
  }

  // Render the product
  render() {
    const headerOrder = [
      {
        field: 'code',
        text: 'Código',
        type: 'primary'
      }, {
        field: 'name',
        text: 'Nombre',
        type: 'text'
      },
      {
        field: 'description',
        text: 'Descripción',
        type: 'text'
      }
    ]

    return <div className='list-container'>

      <h1>Departmamentos:</h1>

      <DataTable headerOrder={headerOrder} model='products/departments' data={this.props.departments} addLink='/admin/products/departments/add' />

    </div>
  }
}
