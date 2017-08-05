/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {fetchItemsBulk} from '../../utils/api'

const PouchDB = require('pouchdb')

window.PouchDB = PouchDB

@connect((store) => {
  return {products: store.products.products}
})
export default class Product extends React.Component {

  componentWillMount() {
    this.syncGeneralDb()
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
        dispatchType: 'FETCH_PRODUCT_DEPARTMENT_FULFILLED',
        dispatchErrorType: 'FETCH_PRODUCT_DEPARTMENT_REJECTED'
      },
      {
        docType: 'PRODUCT_SUBDEPARTMENT',
        dispatchType: 'FETCH_PRODUCT_SUBDEPARTMENT_FULFILLED',
        dispatchErrorType: 'FETCH_PRODUCT_SUBDEPARTMENT_REJECTED'
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
        console.log('complete')

      }).on('paused', function(info) {
        console.log('paused')
        // replication was paused, usually because of a lost connection

      }).on('active', function(info) {
        console.log('active')
        // replication was resumed

      }).on('error', function(err) {
        console.log('error')
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
