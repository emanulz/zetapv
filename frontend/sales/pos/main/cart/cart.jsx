/*
 * Module dependencies
 */
import React from 'react'
import CartItems from './cartItems.jsx'
import {connect} from 'react-redux'
const Mousetrap = require('mousetrap')

@connect((store) => {
  return {
    defaultConfig: store.config.defaultSales,
    userConfig: store.config.userSales,
    productSearchpanelVisible: store.searchProducts.visible

  }
})
export default class Cart extends React.Component {

  componentWillMount() {

    const _this = this
    Mousetrap.bind('mod+b', function(e) {

      if (e.preventDefault) {
        e.preventDefault()
      } else {
      // internet explorer
        e.returnValue = false
      }

      _this.props.dispatch({type: 'SEARCH_PRODUCT_TOGGLE_PANEL', payload: -1})
      document.getElementById('product-search-input').focus()
      document.getElementById('product-search-input').value = ''

      Mousetrap.bind('esc', function() {
        _this.props.dispatch({type: 'SEARCH_PRODUCT_TOGGLE_PANEL', payload: -1})
        document.getElementById('productCodeInputField').focus()
        document.getElementById('productCodeInputField').value = ''
        Mousetrap.unbind('esc')
      })
    })

    Mousetrap.bind('mod+c', function(e) {

      if (e.preventDefault) {
        e.preventDefault()
      } else {
      // internet explorer
        e.returnValue = false
      }

      _this.props.dispatch({type: 'SEARCH_CLIENT_TOGGLE_PANEL', payload: -1})
      document.getElementById('client-search-input').focus()
      document.getElementById('client-search-input').value = ''

      Mousetrap.bind('esc', function() {
        _this.props.dispatch({type: 'SEARCH_CLIENT_TOGGLE_PANEL', payload: -1})
        document.getElementById('productCodeInputField').focus()
        document.getElementById('productCodeInputField').value = ''
        Mousetrap.unbind('esc')
      })
    })
  }

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
      {/* <table className='table cart-table'>
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
      </table> */}
      <div className='cart-header'>
        <div className='cart-header-code'>
          <h5>Cód</h5>
        </div>
        <div className='cart-header-description'>
          <h5>Art</h5>
        </div>
        <div className='cart-header-qty'>
          <h5>Cant</h5>
        </div>
        <div className='cart-header-unitPrice'>
          <h5>P Unit</h5>
        </div>
        <div className='cart-header-discount'>
          <h5>Desc</h5>
        </div>
        <div className='cart-header-iva'>
          <h5>IV</h5>
        </div>
        <div className='cart-header-total'>
          <h5>Total IVI</h5>
        </div>
      </div>
      <CartItems />
    </div>

  }

}
