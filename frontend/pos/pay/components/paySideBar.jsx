import React from 'react'
import { connect } from "react-redux"

@connect((store) => {
  return {
      total:store.cart.cartTotal,
      payMethod:store.pay.payMethod,
      cashAmount:store.pay.cashAmount,
  };
})
export default class PaySideBar extends React.Component{



    render(){

        let change = 0;
        let payButtonClass = 'pay-tag tag-button'

        switch(this.props.payMethod){

            case "CASH":{
                change = parseFloat(this.props.cashAmount) - parseFloat(this.props.total)
                payButtonClass = (change >= 0) ? 'pay-tag tag-button enable' : 'pay-tag tag-button'
                break
            }

        }


        return <div className='pay-side-bar'>
                <div className='pay-method-body-header'>
                    <span>Pago</span>
                </div>

                <div className='pay-method-body-content'>

                    <div className='pay-tag left' > TOTAL :</div>
                    <div className='pay-tag right' > ₡ {this.props.total.formatMoney(2,',','.')}</div>

                    <div className='pay-tag left'>VUELTO :</div>
                    <div className='pay-tag right' > ₡ {change.formatMoney(2,',','.')}</div>

                    <br/>

                    <div className={payButtonClass}>
                        Pagar <i className="fa fa-credit-card" aria-hidden="true"></i>
                    </div>


                </div>

               </div>

    }

}
