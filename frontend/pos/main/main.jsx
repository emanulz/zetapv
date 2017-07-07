/*
 * Module dependencies
 */
import React from 'react';

import Product from './product/product.jsx'
import Cart from './cart/cart.jsx'

export default class Main extends React.Component {

    

    // Main Layout
    render(){

        return <div style={{'padding':'0'}} className="col-xs-12 col-sm-8 col-md-8 col-lg-8">

                        <Product></Product>
                        <Cart></Cart>

                </div>


    }

}
