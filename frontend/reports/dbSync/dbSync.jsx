/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {fetchItemsBulk, fetchItems} from '../../admin/utils/api'
import {getDbUrl} from './actions'

const PouchDB = require('pouchdb')

@connect((store) => {
  return {
    userSales: store.config.userSales,
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
      this.syncSalesDb(nextProps.dbUrl)
    }
  }

  componentDidMount() {
    document.getElementById('loader').classList.remove('loader')
  }

  syncGeneralDb(remoteDBUrl) {

    const docTypes = [
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
        dispatchType: 'FETCH_PRODUCTMOVEMENTS_FULFILLED',
        dispatchErrorType: 'FETCH_PRODUCTMOVEMENTS_REJECTED'
      },
      {
        docType: 'CLIENT',
        dispatchType: 'FETCH_CLIENTS_FULFILLED',
        dispatchErrorType: 'FETCH_CLIENTS_REJECTED'
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

  // syncSalesDb(remoteDBUrl) {
  //   const _this = this
  //   const localDB = new PouchDB('sales')
  //   const remoteDB = new PouchDB(`${remoteDBUrl}/sales`)
  //
  //   localDB.createIndex({ index: {fields: ['docType']} })
  //   localDB.createIndex({ index: {fields: ['docType', 'created']} })
  //   localDB.createIndex({ index: {fields: ['docType', 'id']} })
  //   localDB.createIndex({ index: {fields: ['docType', 'client.code', 'pay.payMethod']} })
  //
  //   const kwargs = {
  //     db: 'sales',
  //     docType: 'SALE',
  //     dispatchType: 'FETCH_SALES_FULFILLED',
  //     dispatchErrorType: 'FETCH_SALES_REJECTED'
  //   }
  //
  //   localDB.sync(remoteDB, {
  //     retry: true
  //   })
  //     .on('change', function(change) {
  //       console.log('change')
  //       _this.props.dispatch(fetchItems(kwargs))
  //
  //     })
  //
  //   this.props.dispatch(fetchItems(kwargs))
  //
  // }

  render() {
    return null
  }

}
