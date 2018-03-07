/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {fetchItemsBulk} from '../../admin/utils/api'
import {getDbUrl} from './actions'

const PouchDB = require('pouchdb')

window.PouchDB = PouchDB

@connect((store) => {
  return {
    products: store.products.products,
    dbUrl: store.dbSync.dbUrl}
})
export default class DbSync extends React.Component {

  componentWillMount() {
    this.props.dispatch(getDbUrl())
  }

  componentWillUpdate(nextProps) {
    if (nextProps.dbUrl != this.props.dbUrl && nextProps.dbUrl != '') {
      this.syncGeneralDb(nextProps.dbUrl)
      this.syncSalesDb(nextProps.dbUrl)
      this.syncUsersDb(nextProps.dbUrl)
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
      remoteDBUrl: remoteDBUrl,
      fecthFunc: fetchItemsBulk,
      docTypes: docTypes
    }

    this.syncDB(kwargs)
  }

  syncDB(kwargs) {
    const _this = this
    // DBs declaration and sync
    const localDB = new PouchDB(kwargs.db)
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

  syncSalesDb(remoteDBUrl) {

    const docTypes = [
      {
        docType: 'SALE',
        dispatchType: 'FETCH_SALES_FULFILLED',
        dispatchErrorType: 'FETCH_SALES_REJECTED'
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

    const docTypes = [
      {
        docType: 'USER',
        dispatchType: 'FETCH_USERS_FULFILLED',
        dispatchErrorType: 'FETCH_USERS_REJECTED'
      }

    ]

    const kwargs = {
      db: 'users',
      remoteDBUrl: remoteDBUrl,
      fecthFunc: fetchItemsBulk,
      docTypes: docTypes
    }

    this.syncDB(kwargs)

  }

  render() {
    return null
  }

}
