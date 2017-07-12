
/*
 * Module dependencies
 */
import React from 'react'

import { connect } from "react-redux"
import { fetchClients } from "./actions"
var PouchDB = require('pouchdb');

//components
import DataTable from '../generalComponents/dataTable/dataTable.jsx'

@connect((store) => {
  return {
    clients: store.clients.clients
  }
})
export default class Clients extends React.Component {

    componentWillMount() {
        
        this.props.dispatch(fetchClients())//fetch clients before mount, send dispatch to reducer.

    }


    render(){

        console.log(this.props)

        const headerOrder = [{field:'code', text:'Código'},
                             {field:'name', text:'Nombre'},
                             {field:'last_name', text:'Apellido'},
                             {field:'id_num', text:'Identificación'},
                             {field:'has_credit', text:'Tiene Crédito'},
                             {field:'credit_limit', text:'Límite de crédito'},
                             {field:'credit_days', text:'Días de crédito'}]

        return <DataTable headerOrder={headerOrder} data={this.props.clients}></DataTable>

    }



}
