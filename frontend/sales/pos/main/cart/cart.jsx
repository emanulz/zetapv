/*
 * Module dependencies
 */
import React from 'react'
import CartItems from './cartItems.jsx'
import {connect} from 'react-redux'

@connect((store) => {
  return {
    defaultConfig: store.config.defaultSales,
    userConfig: store.config.userSales}
})
export default class Cart extends React.Component {

  // Main Layout
  render() {
    const useLote = this.props.defaultConfig
      ? this.props.defaultConfig.cartItemUseLote
      : false

    const loteField = useLote
      ? <th>Lote</th>
      : <th />

    return <div style={{
      'marginTop': '10px'
    }} className='bg-white left-item cart col-xs-12'>
      <table className='table cart-table'>
        <thead>
          <tr>
            <th>Cód</th>
            <th>Art</th>
            <th style={{
              'width': '10%'
            }}>Can</th>
            <th>P.Uni</th>
            <th>Des%</th>
            <th>IV</th>
            <th>Precio IVI</th>
            {loteField}
            <th>x</th>
          </tr>
        </thead>
        <CartItems />
      </table>
    </div>

  }

}
