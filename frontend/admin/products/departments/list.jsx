/*
 * Module dependencies
 */
import React from 'react';
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
var PouchDB = require('pouchdb');

import {fetchDepartments} from "../actions"

//components
import DataTable from '../../generalComponents/dataTable/dataTable.jsx'

@connect((store) => {
    return {departments: store.products.departments};
})
export default class Product extends React.Component {

    componentWillMount() {
        this.props.dispatch(fetchDepartments()) //fetch products before mount, send dispatch to reducer.
    }

    // Render the product
    render() {

        const headerOrder = [
            {
                field: 'code',
                text: 'Código',
                type: 'primary'
            }, {
                field: 'name',
                text: 'Nombre',
                type: 'text'
            }
        ]

        return <div className='products-list-container'>

            <h1>Departmamentos:</h1>

            <DataTable headerOrder={headerOrder} data={this.props.departments}></DataTable>

        </div>
    }

}
