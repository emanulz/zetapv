/*
 * Module dependencies
 */
import React from 'react'

const $ = require('jquery')
$.DataTable = require('datatables.net')
window.jQuery = $
window.$ = $


export default class Clients extends React.Component {

    componentDidMount() {
        $(this.refs.main).DataTable(

        {
            "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Todos"]],
            language: {
                processing:     "Procesando...",
                search:         "Buscar&nbsp;:",
                lengthMenu:     "Mostrando _MENU_ elementos",
                info:           "Mostrando _START_ a _END_ de _TOTAL_ elementos",
                infoEmpty:      "Mostrando 0 a 0 de 0 elementos",
                infoFiltered:   "(filtrado de _MAX_ elementos en total)",
                loadingRecords: "Cargando Registros...",
                zeroRecords:    "No hay Registros",
                emptyTable:     "No hay datos disponibles en la tabla",
                paginate: {
                    first:      "Primero",
                    previous:   "Anterior",
                    next:       "Siguiente",
                    last:       "Último"
                },
                aria: {
                    sortAscending:  "Ascendente",
                    sortDescending: "Descendente"
                }
            }
    }
);
    }
    // Main Layout
    render(){


        return <div className='clients'>

                    <table ref="main" className='table display compact' cellspacing="0" width="100%" >
                        <thead>
                            <tr>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td>8</td>
                                <td>9</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>11</td>
                                <td>12</td>
                            </tr>
                            <tr>
                                <td>13</td>
                                <td>14</td>
                                <td>15</td>
                            </tr>

                        </tbody>
                    </table>
{/*
                    <table ref="main" /> */}


                </div>


    }

}
