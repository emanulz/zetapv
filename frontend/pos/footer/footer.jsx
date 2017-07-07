/*
 * Module dependencies
 */
import React from 'react';
import { connect } from "react-redux"


@connect((store) => {
  return {
    total: store.cart.cartTotal,
  };
})
export default class Footer extends React.Component {

    // Main Layout
    render(){

        return <div className="col-xs-12 col-sm-8">
                  <div>
                    <h1 className="sale-total-div"><span className="sale_total price">₡ {this.props.total.formatMoney(2,',','.')}</span></h1>
                  </div>
               </div>

    }

}
