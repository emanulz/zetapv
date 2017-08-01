/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, fetchItems} from '../../products/actions.js'

import {fetchClients} from '../../clients/actions.js'
const PouchDB = require('pouchdb')
window.PouchDB = PouchDB

@connect((store) => {
  return {products: store.products.products}
})
export default class Product extends React.Component {

  componentWillMount() {

    this.syncClients()
    this.syncProducts()
    this.syncDepartments()
    this.syncSubDepartments()

  }

  componentDidMount() {
    document.getElementById('loader').classList.remove('loader')
  }

  syncClients() {
    const _this = this
    const localDb = new PouchDB('clients')
    const remoteDb = new PouchDB(`${this.props.remoteDB}/clients`)
    localDb.sync(remoteDb, {
      live: true,
      retry: true
    }).on('change', function(change) {
      // yo, something changed!
      _this.props.dispatch(fetchClients())
    }).on('complete', function(info) {
      _this.props.dispatch(fetchClients())
    }).on('paused', function(info) {
      // replication was paused, usually because of a lost connection
    }).on('active', function(info) {
      // replication was resumed
    }).on('error', function(err) {
      // totally unhandled error (shouldn't happen)
      console.log(err)
    })

    this.props.dispatch(fetchClients())
  }

  syncProducts() {

    const _this = this
    const localDb = new PouchDB('products')
    const remoteDb = new PouchDB(`${this.props.remoteDB}/products`)
    localDb.sync(remoteDb, {
      live: true,
      retry: true
    }).on('change', function(change) {
      // yo, something changed!
      _this.props.dispatch(fetchProducts())
    }).on('complete', function(info) {
      _this.props.dispatch(fetchProducts())
    }).on('paused', function(info) {
      // replication was paused, usually because of a lost connection
    }).on('active', function(info) {
      // replication was resumed
    }).on('error', function(err) {
      // totally unhandled error (shouldn't happen)
      console.log(err)
    })

    this.props.dispatch(fetchProducts())

  }

  syncDepartments() {

    const _this = this
    // Kwargs Used by method
    const kwargs = {
      db: 'departments',
      dispatchType: 'FETCH_DEPARTMENTS_FULFILLED',
      dispatchErrorType: 'FETCH_DEPARTMENTS_REJECTED'
    }
    // DBs declaration and sync
    const localDb = new PouchDB(kwargs.db)
    const remoteDb = new PouchDB(`${this.props.remoteDB}/${kwargs.db}`)
    localDb.sync(remoteDb, {
      live: true,
      retry: true
    }).on('change', function(change) {
      // yo, something changed!
      _this.props.dispatch(fetchItems(kwargs))
    }).on('complete', function(info) {
      _this.props.dispatch(fetchItems(kwargs))
    }).on('paused', function(info) {
      // replication was paused, usually because of a lost connection
    }).on('active', function(info) {
      // replication was resumed
    }).on('error', function(err) {
      // totally unhandled error (shouldn't happen)
      console.log(err)
    })
    // Fecth items
    this.props.dispatch(fetchItems(kwargs))

  }

  syncSubDepartments() {

    const _this = this
    // Kwargs Used by method
    const kwargs = {
      db: 'subdepartments',
      dispatchType: 'FETCH_SUBDEPARTMENTS_FULFILLED',
      dispatchErrorType: 'FETCH_SUBDEPARTMENTS_REJECTED'
    }
    // DBs declaration and sync
    const localDb = new PouchDB(kwargs.db)
    const remoteDb = new PouchDB(`${this.props.remoteDB}/${kwargs.db}`)
    localDb.sync(remoteDb, {
      live: true,
      retry: true
    }).on('change', function(change) {
      // yo, something changed!
      _this.props.dispatch(fetchItems(kwargs))
    }).on('complete', function(info) {
      _this.props.dispatch(fetchItems(kwargs))
    }).on('paused', function(info) {
      // replication was paused, usually because of a lost connection
    }).on('active', function(info) {
      // replication was resumed
    }).on('error', function(err) {
      // totally unhandled error (shouldn't happen)
      console.log(err)
    })
    // Fecth items
    this.props.dispatch(fetchItems(kwargs))

  }

  render() {
    return null
  }

}
