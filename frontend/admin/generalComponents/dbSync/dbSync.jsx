/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {fetchItemsBulk, fetchItems} from '../../utils/api'

const PouchDB = require('pouchdb')

window.PouchDB = PouchDB

@connect((store) => {
  return {products: store.products.products}
})
export default class Product extends React.Component {

  componentWillMount() {
    this.syncGeneralDb()
    this.syncUsersDb()
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
        docType: 'PRODUCT_DEPARTMENT',
        dispatchType: 'FETCH_PRODUCT_DEPARTMENTS_FULFILLED',
        dispatchErrorType: 'FETCH_PRODUCT_DEPARTMENTS_REJECTED'
      },
      {
        docType: 'PRODUCT_SUBDEPARTMENT',
        dispatchType: 'FETCH_PRODUCT_SUBDEPARTMENTS_FULFILLED',
        dispatchErrorType: 'FETCH_PRODUCT_SUBDEPARTMENTS_REJECTED'
      },
      {
        docType: 'PRODUCT_MOVEMENT',
        dispatchType: 'FETCH_PRODUCTMOVEMENTS_FULFILLED',
        dispatchErrorType: 'FETCH_PRODUCTMOVEMENTS_REJECTED'
      },
      {
        docType: 'CLIENT_MOVEMENT',
        dispatchType: 'FETCH_CLIENTMOVEMENTS_FULFILLED',
        dispatchErrorType: 'FETCH_CLIENTMOVEMENTS_REJECTED'
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
    console.log('Sync', kwargs.db)
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

  syncUsersDb() {
    const _this = this
    const localDB = new PouchDB('users')
    const remoteDB = new PouchDB(`${this.props.remoteDB}/users`)

    localDB.createIndex({ index: {fields: ['docType']} })
    localDB.createIndex({ index: {fields: ['docType', 'username']} })

    const kwargs = {
      db: 'users',
      docType: 'USER',
      dispatchType: 'FETCH_USERS_FULFILLED',
      dispatchErrorType: 'FETCH_USERS_REJECTED'
    }

    localDB.sync(remoteDB, {
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
