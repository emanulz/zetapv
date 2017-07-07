/*
 * Module dependencies
 */
import React from 'react'
import CartItems from './cartItems.jsx'

export default class Cart extends React.Component {

    // Main Layout
    render(){

            return <div style={{'marginTop':'10px'}} className="bg-white left-item product-table">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Cód</th>
                                    <th>Art</th>
                                    <th style={{'width':'10%'}}>Can</th>
                                    <th>P.Uni</th>
                                    <th>Des%</th>
                                    <th>IV</th>
                                    <th>Precio IVI</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <CartItems></CartItems>
                        </table>
                 </div>

        }

}
