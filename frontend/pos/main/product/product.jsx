/*
 * Module dependencies
 */
import React from 'react';
import { connect } from "react-redux"
var PouchDB = require('pouchdb');
window.PouchDB = PouchDB;

import { fetchProducts, productSelected, searchProduct } from "./actions"

@connect((store) => {
  return {
    products: store.products.products,
    itemsInCart: store.cart.cartItems,
    inputVal : store.products.inputVal,
    globalDiscount : store.cart.globalDiscount
  };
})
export default class Product extends React.Component {

    componentWillMount() {
      const _this = this
      var localDbProducts = new PouchDB('products')
      var remoteDbProducts = new PouchDB('http://localhost:5984/products')
      localDbProducts.sync(remoteDbProducts, {
        live: true,
        retry: true
      }).on('change', function (change) {
          // yo, something changed!
          _this.props.dispatch(fetchProducts())
      }).on('paused', function (info) {
          // replication was paused, usually because of a lost connection
      }).on('active', function (info) {
          // replication was resumed
      }).on('error', function (err) {
          // totally unhandled error (shouldn't happen)
      });

      this.props.dispatch(fetchProducts())//fetch products before mount, send dispatch to reducer.
    }

    componentDidMount(){
        this.codeInput.focus();
    }

    componentDidUpdate(){
        this.codeInput.focus();
    }

    searchProductClick(){

        this.props.dispatch(searchProduct())

    }

    inputKeyPress(ev){
        //if Key pressed id Enter
        if(ev.key=='Enter'){

            let code = ev.target.value.split('*')[0] //Split val [0] is code [1] is qty
            let qty = ev.target.value.split('*')[1]
            qty = (isNaN(qty)) ? 1 : parseFloat(qty)//if no qty sets to 1

            this.props.dispatch(productSelected(code, qty, this.props.products, this.props.itemsInCart, this.props.globalDiscount))
        }
        else{
            this.props.dispatch({type: "SET_PRODUCT_FIELD_VALUE", payload: ev.target.value})
        }

    }


    // Render the product
    render(){

            return <div className="bg-white left-item form-group"><span><b>Producto:</b></span>
                        <div className="inner-addon right-addon"><i style={{'paddingRight':'60px'}} className="fa fa-barcode"></i>
                        <button onClick={this.searchProductClick.bind(this)} style={{'height':'48px', 'width':'48px'}} className="btn btn-success product-search-btn">
                            <span><i style={{'paddingBottom':'8px'}} className="fa fa-search"></i></span>
                        </button>
                        <input onKeyDown={this.inputKeyPress.bind(this)} value={this.props.inputVal} onChange={this.inputKeyPress.bind(this)}
                               ref={(input) => { this.codeInput = input }}
                               type="text" placeholder="Ingrese el Código del Producto"
                               className="form-control input-lg product_code_field mousetrap"/>
                        </div>
                    </div>

        }

}
