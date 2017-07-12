
/*
 * Module dependencies
 */
import React from 'react'

//data Tables
const $ = require('jquery')
$.DataTable = require('datatables.net')
window.jQuery = $
window.$ = $


export default class DataTable extends React.Component {

    componentDidUpdate() {

        $(this.refs.table).DataTable(
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
        )
    }
    

    render(){

        console.log(this.props)

        const headerOrder = this.props.headerOrder
        const data = this.props.data.length ? this.props.data : []

        const tableHeader = headerOrder.map(item=>{
            return <th key={item.field}> {item.text} </th>
        })

        console.log(data)

        const bodyRows = data.map(el=>{

            return <tr key={el._id}>
                    {headerOrder.map(header=>{
                        const fieldName = header.field
                        return <td key={`${el._id}_${header.field}`} > {el[fieldName]} </td>
                    })}
                   </tr>
        })

        return <div className='data-table'>

                    <table ref="table" className='table display compact' cellSpacing="0" width="100%" >
                        <thead>
                            <tr>
                                {tableHeader}
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                {tableHeader}
                            </tr>
                        </tfoot>
                        <tbody>
                            {bodyRows}
                        </tbody>
                    </table>
    {/*
                    <table ref="main" /> */}


                </div>


    }

}
