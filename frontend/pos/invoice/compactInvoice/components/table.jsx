import React from 'react'
import { connect } from "react-redux"

@connect((store) => {
  return {
    inCart: store.cart.cartItems,
    globalDiscount : store.cart.globalDiscount
  };
})
export default class Table extends React.Component {

    // Main Layout
    render(){

        const cartItems = this.props.inCart
        let items = cartItems.map((item) =>{

                let taxesText = (item.product.usetaxes) ?  `G` : `E`

                return <tr key={item.product.code}>
                        <td> {item.qty} </td>
                        <td> {item.product.description} </td>
                        <td className="right-in-table"> {taxesText} </td>
                        <td className="right-in-table"> ₡ {item.totalWithIv.formatMoney(2,',','.')} </td>
                      </tr>
            })

            return <table className="compact-invoice-table">
                        <thead>
                            <tr>
                                <th>Cant</th>
                                <th>Articulo</th>
                                <th className="right-in-table">IV</th>
                                <th className="right-in-table">Total</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {items}
                        </tbody>

                    </table>

        }

}
