
/*
 * Module dependencies
 */
import React from 'react'
import {Link} from 'react-router-dom'

//data Tables
const $ = require('jquery')
$.DataTable = require('datatables.net')
window.jQuery = $
window.$ = $


export default class DataTable extends React.Component {

    componentWillReceiveProps(){

        $(this.refs.table).DataTable().destroy()

        console.log('DESTROY')
    }

    componentDidUpdate() {

            $(this.refs.table).DataTable(
                {
                    destroy: true,
                    lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Todos"]],
                    language: {
                        processing:     "Procesando...",
                        search:         "Buscar&nbsp;:",
                        lengthMenu:     "Mostrar _MENU_ elementos",
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

    generateBody(headerOrder, data){



    }

    generateRow(){


    }



    render(){

        const headerOrder = this.props.headerOrder
        const model = this.props.model
        const data = this.props.data.length ? this.props.data : []

        const tableHeader = headerOrder.map(item=>{

            let ret = item.type != 'bool' ? <th key={item.field}> {item.text} </th> : <th style={{textAlign:'center'}} key={item.field}> {item.text} </th>
            return ret
        })

        console.log('rendering...')

        let bodyRows = data.map(el=>{

            return <tr key={el._id}>
                    {headerOrder.map(header=>{

                        const fieldName = header.field
                        let itemToRender = el[fieldName]

                        let item
                        switch(header.type){
                            case 'price' :{
                                item =  <td key={`${el._id}_${header.field}`} data-order={itemToRender} > ₡ {parseFloat(itemToRender).formatMoney(2,',','.')} </td>
                                break
                            }

                            case 'bool' :{
                                let icon = itemToRender ? 'fa fa-check' : 'fa fa-minus-square'
                                item =  <td style={{textAlign:'center'}} key={`${el._id}_${header.field}`} data-order={itemToRender}> <span className={icon}></span> </td>
                                break
                            }

                            case 'primary' :{


                                item =  <td key={`${el._id}_${header.field}`} data-order={itemToRender} >
                                            {/* <Link to={`/admin/${model}/edit#${itemToRender}`}>
                                                {itemToRender}
                                            </Link> */}
                                            <Link to={{
                                                    pathname: `/admin/${model}/${itemToRender}`,
                                                    state:{el:el}
                                                    }}>
                                            {itemToRender}
                                            </Link>
                                        </td>
                                break
                            }

                            default :{
                                item =  <td key={`${el._id}_${header.field}`} data-order={itemToRender} > {itemToRender} </td>
                            }

                        }

                        return item
                    })}
                   </tr>
        })


        return <div className='dataTables'>

                    <table ref="table" className='table' cellSpacing="0" width="100%" >
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
