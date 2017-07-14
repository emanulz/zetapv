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
export default class List extends React.Component {

    componentWillMount() {

        this.props.dispatch(fetchClients())//fetch clients before mount, send dispatch to reducer.

    }


    render(){

        console.log(this.props)

        const headerOrder = [{field:'code', text:'Código', type: 'primary'},
                             {field:'name', text:'Nombre'},
                             {field:'last_name', text:'Apellido'},
                             {field:'id', text:'Identificación'},
                             {field:'has_credit', text:'Tiene Crédito', type: 'bool'},
                             {field:'credit_limit', text:'Límite de crédito', type: 'price'},
                             {field:'credit_days', text:'Días de crédito'}]

        return <DataTable headerOrder={headerOrder} model='clients' data={this.props.clients}></DataTable>

    }



}
