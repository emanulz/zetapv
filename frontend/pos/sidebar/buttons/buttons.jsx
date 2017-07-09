/*
 * Module dependencies
 */
import React from 'react';
import { connect } from "react-redux"

@connect((store) => {
  return {};
})
export default class Buttons extends React.Component {

    showPayPanel(){

        this.props.dispatch({ type:'SHOW_PAY_PANEL', payload:-1})
    }

    // Main Layout
    render(){

        return <div className="col-xs-12 buttons">

                        <span><b>Pago:<br/></b></span>

                        {/* <button style={{'height':'48px', 'width':'49%', 'marginTop':'10px'}}
                                className="btn btn-default btn-confirm">
                                Confirmar <span><i style={{'paddingBottom':'8px'}} className="fa fa-rotate-right"></i></span>
                        </button> */}

                        <button onClick={this.showPayPanel.bind(this)} style={{'height':'48px', 'width':'49%', 'marginTop':'10px'}}
                                className="btn btn-default buttons-payButton">
                                    Pagar
                                    <span><i className="fa fa-credit-card"></i></span>
                        </button>
              </div>

        }

}
