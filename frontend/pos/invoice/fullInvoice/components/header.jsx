import React from 'react'
import { connect } from "react-redux"


export default class Header extends React.Component{


    render(){


        return <div>

                <div className="full-invoice-header">

                    <div className="full-invoice-header-logo">
                        <img src="/static/public/img/logo.png"/>
                    </div>
                    <div className="full-invoice-header-info">
                        <h2>Emanuel Zuniga Infante</h2>
                        <h3>Cédula No 1-1353-0032</h3>
                        <h3>200m Norte de la Guardia Rural</h3>
                        <h3>Palmares, Daniel Floeres Pérez Zeledón</h3>
                        <h3>Costa Rica</h3>
                        <h3>Tel: 8302-1964</h3>
                        <h3>emanuelziga@gmail.com</h3>
                    </div>

               </div>

               <div className="full-invoice-separator">
                   <span></span>

                   <h1>Factura de contado</h1>

                   <span></span>
               </div>
           </div>

    }

}
