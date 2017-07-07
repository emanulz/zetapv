import React from 'react'
import { connect } from "react-redux"

@connect((store) => {
  return {

  };
})
export default class PayCard extends React.Component{

    render(){

        return <div className='pay-method-body'>

                <div className='pay-method-body-header'> <span>Tarjeta</span> </div>

                <div className='pay-method-body-content'>


                    <div className='pay-tag left'>4 DIGITOS:</div>
                    <input type='Number' className='form-control'></input>

                    <div className='pay-tag left'>AUTORIZACIÓN:</div>
                    <input type='Number' className='form-control'></input>

                    <br/>
                    <br/>


                </div>


               </div>

    }

}
