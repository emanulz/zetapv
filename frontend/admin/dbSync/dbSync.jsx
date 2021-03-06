/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {fetchItemsBulk, fetchItems} from '../utils/api'
import {getDbUrl} from './actions'

const PouchDB = require('pouchdb')

window.PouchDB = PouchDB

@connect((store) => {
  return {
    products: store.products.products,
    dbUrl: store.dbSync.dbUrl
  }
})
export default class Product extends React.Component {

  componentWillMount() {
    this.props.dispatch(getDbUrl())
  }

  componentWillUpdate(nextProps) {
    if (nextProps.dbUrl != this.props.dbUrl && nextProps.dbUrl != '') {
      this.syncGeneralDb(nextProps.dbUrl)
      this.syncUsersDb(nextProps.dbUrl)
      this.syncSalesDb(nextProps.dbUrl)
    }
  }

  componentDidMount() {
    document.getElementById('loader').classList.remove('loader')
  }

  syncGeneralDb(remoteDBUrl) {

    const docTypes = [
      {
        docType: 'CLIENT',
        dispatchType: 'FETCH_CLIENTS_FULFILLED',
        dispatchErrorType: 'FETCH_CLIENTS_REJECTED'
      },
      {
        docType: 'PRODUCT',
        dispatchType: 'FETCH_PRODUCTS_FULFILLED',
        dispatchErrorType: 'FETCH_PRODUCTS_REJECTED',
        sortField: 'code'
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
        dispatchType: 'FETCH_PRODUCT_MOVEMENTS_FULFILLED',
        dispatchErrorType: 'FETCH_PRODUCT_MOVEMENTS_REJECTED'
      },
      {
        docType: 'CLIENT_MOVEMENT',
        dispatchType: 'FETCH_CLIENT_MOVEMENTS_FULFILLED',
        dispatchErrorType: 'FETCH_CLIENT_MOVEMENTS_REJECTED'
      },
      {
        docType: 'EXPENSE',
        dispatchType: 'FETCH_EXPENSES_FULFILLED',
        dispatchErrorType: 'FETCH_EXPENSES_REJECTED'
      },
      {
        docType: 'WAREHOUSE',
        dispatchType: 'FETCH_WAREHOUSES_FULFILLED',
        dispatchErrorType: 'FETCH_WAREHOUSES_REJECTED'
      },
      {
        docType: 'BANK_ACCOUNT',
        dispatchType: 'FETCH_BANK_ACCOUNTS_FULFILLED',
        dispatchErrorType: 'FETCH_BANK_ACCOUNTS_REJECTED'
      }

    ]

    const kwargs = {
      db: 'general',
      remoteDBUrl: remoteDBUrl,
      fecthFunc: fetchItemsBulk,
      docTypes: docTypes
    }

    this.syncDB(kwargs)
  }

  syncSalesDb(remoteDBUrl) {

    const docTypes = [
      {
        docType: 'SALE',
        dispatchType: 'FETCH_SALES_FULFILLED',
        dispatchErrorType: 'FETCH_SALES_REJECTED'
      },
      {
        docType: 'PRESALE',
        dispatchType: 'FETCH_PRESALES_FULFILLED',
        dispatchErrorType: 'FETCH_PRESALES_REJECTED'
      },
      {
        docType: 'DONATION',
        dispatchType: 'FETCH_DONATIONS_FULFILLED',
        dispatchErrorType: 'FETCH_DONATIONS_REJECTED'
      },
      {
        docType: 'PROFORMA',
        dispatchType: 'FETCH_PROFORMAS_FULFILLED',
        dispatchErrorType: 'FETCH_PROFORMAS_REJECTED'
      }
    ]

    const kwargs = {
      db: 'sales',
      remoteDBUrl: remoteDBUrl,
      fecthFunc: fetchItemsBulk,
      docTypes: docTypes
    }

    this.syncDB(kwargs)

  }

  syncUsersDb(remoteDBUrl) {
    const _this = this
    const localDB = new PouchDB('users')
    const remoteDB = new PouchDB(`${remoteDBUrl}/users`)

    localDB.createIndex({ index: {fields: ['docType']} })
    localDB.createIndex({ index: {fields: ['docType', 'username']} })

    const kwargs = {
      db: 'users',
      docType: 'USER',
      dispatchType: 'FETCH_USERS_FULFILLED',
      dispatchErrorType: 'FETCH_USERS_REJECTED'
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

  syncDB(kwargs) {
    const _this = this
    // DBs declaration and sync
    const localDB = new PouchDB(kwargs.db)
    console.log(this.props.dbUrl)
    const remoteDB = new PouchDB(`${kwargs.remoteDBUrl}/${kwargs.db}`)

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

  render() {
    return null
  }

}
