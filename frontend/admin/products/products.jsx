/*
 * Module dependencies
 */
import React from 'react';
import { connect } from "react-redux"
var PouchDB = require('pouchdb');
window.PouchDB = PouchDB;

import { fetchProducts } from "./actions"

//components
import DataTable from '../generalComponents/dataTable/dataTable.jsx'

@connect((store) => {
  return {
    products: store.products.products,
  };
})
export default class Product extends React.Component {

    componentWillMount() {
      this.props.dispatch(fetchProducts())//fetch products before mount, send dispatch to reducer.
    }



    // Render the product
    render(){
        console.log(this.props)

        const headerOrder = [{field:'code', text:'Código'},
                             {field:'description', text:'Descripción'},
                             {field:'sellprice', text:'Precio de venta'},
                             {field:'cost', text:'Costo'},
                             ]

        return <DataTable headerOrder={headerOrder} data={this.props.products}></DataTable>
        }

}
