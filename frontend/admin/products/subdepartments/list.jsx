/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {fetchItems} from '../../utils/api'

// components
import DataTable from '../../generalComponents/dataTable/dataTable.jsx'

@connect((store) => {
  return {
    departments: store.products.departments,
    subdepartments: store.products.subdepartments
  }
})
export default class Product extends React.Component {

  componentWillMount() {
    const kwargs = {
      db: 'general',
      docType: 'PRODUCT_SUBDEPARTMENT',
      dispatchType: 'FETCH_PRODUCT_SUBDEPARTMENTS_FULFILLED',
      dispatchErrorType: 'FETCH_PRODUCT_SUBDEPARTMENTS_REJECTED'
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
        field: 'department',
        text: 'Departamento',
        type: 'text'
      },
      {
        field: 'description',
        text: 'Descripción',
        type: 'text'
      }
    ]

    return <div className='list-container'>

      <h1>Sub-Departmamentos:</h1>

      <DataTable headerOrder={headerOrder} model='products/subdepartments' data={this.props.subdepartments} addLink='/admin/products/subdepartments/add' />

    </div>
  }
}
