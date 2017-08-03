/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {fetchItems} from '../../utils/api'

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
    this.syncProductMovements()
  }

  componentDidMount() {
    document.getElementById('loader').classList.remove('loader')
  }

  syncClients() {
    const kwargs = {
      db: 'clients',
      dispatchType: 'FETCH_CLIENTS_FULFILLED',
      dispatchErrorType: 'FETCH_CLIENTS_REJECTED'
    }
    this.syncDB(kwargs)
  }

  syncProducts() {
    const kwargs = {
      db: 'products',
      dispatchType: 'FETCH_PRODUCTS_FULFILLED',
      dispatchErrorType: 'FETCH_PRODUCTS_REJECTED'
    }
    this.syncDB(kwargs)
  }

  syncDepartments() {
    const kwargs = {
      db: 'departments',
      dispatchType: 'FETCH_DEPARTMENTS_FULFILLED',
      dispatchErrorType: 'FETCH_DEPARTMENTS_REJECTED'
    }
    this.syncDB(kwargs)

  }

  syncSubDepartments() {
    const kwargs = {
      db: 'subdepartments',
      dispatchType: 'FETCH_SUBDEPARTMENTS_FULFILLED',
      dispatchErrorType: 'FETCH_SUBDEPARTMENTS_REJECTED'
    }
    this.syncDB(kwargs)

  }

  syncProductMovements() {
    const kwargs = {
      db: 'productmovements',
      dispatchType: 'FETCH_PRODUCTMOVEMENTS_FULFILLED',
      dispatchErrorType: 'FETCH_PRODUCTMOVEMENTS_REJECTED'
    }
    this.syncDB(kwargs)
  }

  syncDB(kwargs) {
    const _this = this
    // DBs declaration and sync
    const localDb = new PouchDB(kwargs.db)
    const remoteDb = new PouchDB(`${this.props.remoteDB}/${kwargs.db}`)

    localDb.sync(remoteDb, {
      live: true,
      retry: true
    }).on('change', function(change) {
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
