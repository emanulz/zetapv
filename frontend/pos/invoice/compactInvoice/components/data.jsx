import React from 'react'
import { connect } from "react-redux"


export default class Data extends React.Component{


    render(){


        return <div className="compact-invoice-data">

                    <table className="datenum-table">
                        <tbody>
                            <tr>
                                <th>Fecha:</th>
                                <td>10-05-1988</td>
                            </tr>
                            <tr>
                                <th>Factura:</th>
                                <td>1352</td>

                            </tr>
                            <tr>
                                <th>Cliente:</th>
                                <td>Emanuel Zúñiga Infante</td>

                            </tr>

                        </tbody>

                    </table>

                </div>

    }

}
