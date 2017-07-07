import React from 'react'
import { connect } from "react-redux"


export default class Data extends React.Component{


    render(){


        return <div className="full-invoice-data">

            <table className="client-table">
                <thead>
                    <tr>
                        <th>CLIENTE:</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Emanuel Zuniga Infante</td>
                    </tr>
                </tbody>

            </table>
            <table className="datenum-table">

                <tbody>
                    <tr>
                        <th>N. de factura:</th>
                        <td>1352</td>

                    </tr>
                    <tr>
                        <th>Fecha:</th>
                        <td>10-05-1988</td>
                    </tr>
                </tbody>

            </table>

                </div>

    }

}
