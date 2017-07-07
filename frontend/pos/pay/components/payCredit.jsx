import React from 'react'
import { connect } from "react-redux"

@connect((store) => {
  return {

  };
})
export default class PayCredit extends React.Component{

    render(){

        return <div className='pay-method-body'>

                <div className='pay-method-body-header'> <span>Crédito</span> </div>

                <div className='pay-method-body-content'>


                    <div className='pay-tag left'>LÍMITE:</div>
                    <div className='pay-tag right' > ₡ 0,00</div>

                    <div className='pay-tag left'>DISPONIBLE:</div>
                    <div className='pay-tag right' > ₡ 0,00</div>

                    <br/>
                    <br/>


                </div>


               </div>

    }

}
