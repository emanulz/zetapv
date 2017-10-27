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

    componentDidMount(){
        document.getElementById('loader').classList.add('hidden')
    }

    // Main Layout
    render(){

        return <div className="col-xs-12 col-sm-8 footer-content">

                    <div className="footer-content-tag">
                        <h1>
                            <span className="price">₡ {this.props.total.formatMoney(2,',','.')} </span>
                        </h1>
                    </div>



               </div>

    }

}
