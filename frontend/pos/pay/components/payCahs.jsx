import React from 'react'
import { connect } from "react-redux"
import {updateStoreCashAmount} from '../actions.js'


@connect((store) => {
  return {
      cashAmount: store.pay.cashAmount,

  };
})
export default class PayCash extends React.Component{

    payAmountChanged(ev){

        this.props.dispatch(updateStoreCashAmount(ev.target.value))
    }

    render(){

        return <div className='pay-method-body'>

                <div className='pay-method-body-header'> <span>Efectivo</span> </div>

                <div className='pay-method-body-content'>


                    <div className='pay-tag left'>EFECTIVO:</div>
                    <input onChange={this.payAmountChanged.bind(this)} type='Number' className='form-control'></input>

                    <br/>
                    <br/>


                </div>


               </div>

    }

}
