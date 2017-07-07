import React from 'react'
import { connect } from "react-redux"

@connect((store) => {
  return {
      payMethod: store.pay.payMethod,
  };
})
export default class PayMethod extends React.Component{

    clickChangePayMethod(method, ev){

        this.props.dispatch({type:'CHANGE_PAY_METHOD',payload:method})

    }

    render(){

        return <div className='pay-method-select'>

                    <div onClick={this.clickChangePayMethod.bind(this, 'CASH')}
                         className={(this.props.payMethod=='CASH' ? 'pay-method-select-item selected' : 'pay-method-select-item')}>

                        <div className='pay-method-select-item-header'> <span>Efectivo</span> </div>

                        <i class="fa fa-money" aria-hidden="true"></i>

                    </div>


                    <div onClick={this.clickChangePayMethod.bind(this, 'CARD')}
                         className={(this.props.payMethod=='CARD' ? 'pay-method-select-item selected' : 'pay-method-select-item')}>

                        <div className='pay-method-select-item-header'> <span>Tarjeta</span> </div>

                        <i class="fa fa-credit-card" aria-hidden="true"></i>

                    </div>


                    <div onClick={this.clickChangePayMethod.bind(this, 'CREDIT')}
                         className={(this.props.payMethod=='CREDIT' ? 'pay-method-select-item selected' : 'pay-method-select-item')}>

                        <div className='pay-method-select-item-header'> <span>Crédito</span> </div>

                        <i class="fa fa-users" aria-hidden="true"></i>

                    </div>


                    <div onClick={this.clickChangePayMethod.bind(this, 'OTHER')}
                         className={(this.props.payMethod=='OTHER' ? 'pay-method-select-item selected' : 'pay-method-select-item')}>

                        <div className='pay-method-select-item-header'> <span>Otro</span> </div>

                        <i class="fa fa-share" aria-hidden="true"></i>

                    </div>

               </div>

    }

}
