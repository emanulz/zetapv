/*
 * Module dependencies
 */
import React from 'react';
import { connect } from "react-redux"
var PouchDB = require('pouchdb');
window.PouchDB = PouchDB;

import { fetchProducts } from "../../products/actions.js"
import { fetchClients } from "../../clients/actions.js"

@connect((store) => {
  return {
    products: store.products.products,

  };
})
export default class Product extends React.Component {

    componentWillMount() {

        this.syncClients()
        this.syncProducts()

    }

    syncClients(){
        const _this = this
        var localDb = new PouchDB('clients')
        var remoteDb = new PouchDB(`${this.props.remoteDB}/clients`)
        localDb.sync(remoteDb, {
          live: true,
          retry: true
        }).on('change', function (change) {
            // yo, something changed!
            _this.props.dispatch(fetchClients())
        }).on('paused', function (info) {
            // replication was paused, usually because of a lost connection
        }).on('active', function (info) {
            // replication was resumed
        }).on('error', function (err) {
            // totally unhandled error (shouldn't happen)
        });

        this.props.dispatch(fetchClients())//fetch clients before mount, send dispatch to reducer.
    }

    syncProducts(){

        const _this = this
        var localDb = new PouchDB('products')
        var remoteDb = new PouchDB(`${this.props.remoteDB}/products`)
        localDb.sync(remoteDb, {
          live: true,
          retry: true
        }).on('change', function (change) {
            // yo, something changed!
            _this.props.dispatch(fetchProducts())
        }).on('paused', function (info) {
            // replication was paused, usually because of a lost connection
        }).on('active', function (info) {
            // replication was resumed
        }).on('error', function (err) {
            // totally unhandled error (shouldn't happen)
        });

        this.props.dispatch(fetchProducts())//fetch products before mount, send dispatch to reducer.

    }



    // Render the product
    render(){
        return null
        }

}
