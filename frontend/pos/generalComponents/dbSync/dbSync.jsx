/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {fetchItemsBulk, fetchItems} from '../../../admin/utils/api'

const PouchDB = require('pouchdb')

window.PouchDB = PouchDB

@connect((store) => {
  return {products: store.products.products}
})
export default class DbSync extends React.Component {

  componentWillMount() {
    this.syncGeneralDb()
    this.syncsalesDb()
  }

  componentDidMount() {
    document.getElementById('loader').classList.remove('loader')
  }

  syncGeneralDb() {

    const docTypes = [
      {
        docType: 'CLIENT',
        dispatchType: 'FETCH_CLIENTS_FULFILLED',
        dispatchErrorType: 'FETCH_CLIENTS_REJECTED'
      },
      {
        docType: 'PRODUCT',
        dispatchType: 'FETCH_PRODUCTS_FULFILLED',
        dispatchErrorType: 'FETCH_PRODUCTS_REJECTED'
      },
      {
        docType: 'CLIENT_MOVEMENT',
        dispatchType: 'FETCH_CLIENT_MOVEMENTS_FULFILLED',
        dispatchErrorType: 'FETCH_CLIENT_MOVEMENTS_REJECTED'
      }

    ]

    const kwargs = {
      db: 'general',
      fecthFunc: fetchItemsBulk,
      docTypes: docTypes
    }

    this.syncDB(kwargs)
  }

  syncDB(kwargs) {
    const _this = this
    // DBs declaration and sync
    const localDB = new PouchDB(kwargs.db)
    const remoteDB = new PouchDB(`${this.props.remoteDB}/${kwargs.db}`)

    // SYNC
    localDB.sync(remoteDB, {
      live: true,
      retry: true
    })
      .on('change', function(change) {
        console.log('change')
        _this.props.dispatch(kwargs.fecthFunc(kwargs))

      }).on('complete', function(info) {

      }).on('paused', function(info) {
        // replication was paused, usually because of a lost connection

      }).on('active', function(info) {
        // replication was resumed

      }).on('error', function(err) {
        // totally unhandled error (shouldn't happen)
        console.log(err)

      })

    // Fecth items
    this.props.dispatch(kwargs.fecthFunc(kwargs))
  }

  syncsalesDb() {
    const _this = this
    const localDB = new PouchDB('sales')
    const remoteDB = new PouchDB(`${this.props.remoteDB}/sales`)

    localDB.createIndex({ index: {fields: ['docType']} })
    localDB.createIndex({ index: {fields: ['docType', 'id']} })

    const kwargs = {
      db: 'sales',
      docType: 'SALE',
      dispatchType: 'FETCH_SALES_FULFILLED',
      dispatchErrorType: 'FETCH_SALES_REJECTED'
    }

    localDB.sync(remoteDB, {
      live: true,
      retry: true
    })
      .on('change', function(change) {
        console.log('change')
        _this.props.dispatch(fetchItems(kwargs))

      })

    this.props.dispatch(fetchItems(kwargs))

  }

  render() {
    return null
  }

}
