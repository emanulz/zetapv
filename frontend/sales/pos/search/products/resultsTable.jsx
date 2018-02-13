import React from 'react'
import {connect} from 'react-redux'

import {productSelectedTable, hidePanel} from './actions.js'

@connect((store) => {
  return {matches: store.searchProducts.productsMatched, products: store.products.products}
})
export default class resultsTable extends React.Component {

  selectProduct(code, ev) {
    this.props.dispatch(productSelectedTable(code)) // dispatchs action according to result
    this.props.dispatch(hidePanel())
    document.getElementById('productCodeInputField').focus()
  }

  render() {

    const products = this.props.matches.map((item) => {

      return <tr onDoubleClick={this.selectProduct.bind(this, item.code)} key={item.code}>
        <td>
          {item.code}
        </td>
        <td>
          {item.description}</td>
        <td>
          {item.sellprice}
        </td>
      </tr>

    })

    return <form action='' className='col-sm-12 form-horizontal'>
      <div className='form-group'>
        <div className='col-sm-12'>
          <table id='producte-search-table' className='table table-bordered table-hover'>
            <thead>
              <tr>
                <th>Código</th>
                <th>Descripción</th>
                <th>Precio</th>
              </tr>
            </thead>

            <tbody className='product-search-table-body'>
              {products}
            </tbody>
          </table>
        </div>
      </div>
    </form>

  }

}
