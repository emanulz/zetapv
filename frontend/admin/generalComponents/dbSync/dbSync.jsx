/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {fetchItems} from '../../utils/api'

const PouchDB = require('pouchdb')

window.PouchDB = PouchDB

PouchDB.adapter('socket', require('socket-pouch/client'))

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
    this.syncClientMovements()
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

  syncClientMovements() {
    const kwargs = {
      db: 'clientmovements',
      dispatchType: 'FETCH_CLIENTMOVEMENTS_FULFILLED',
      dispatchErrorType: 'FETCH_CLIENTMOVEMENTS_REJECTED'
    }
    this.syncDB(kwargs)
  }

  syncDB(kwargs) {
    console.log('Sync', kwargs.db)
    const _this = this
    // DBs declaration and sync
    const localDB = new PouchDB(kwargs.db)

    const remoteDB = new PouchDB({adapter: 'socket', name: kwargs.db, url: 'ws://localhost:8080'})
    // PouchDB.replicate(localDB, remoteDB)
    // localDB.replicate.from(remoteDB)
    // // const localDb = new PouchDB(kwargs.db)
    // // const remoteDb = new PouchDB(`${this.props.remoteDB}/${kwargs.db}`)
    // remoteDB.allDocs({include_docs: true, attachments: true}).then((response) => {
    //   console.log(response)
    // }).catch(err => console.log(err))
    localDB.sync(remoteDB, {
      live: true
    })
      .on('change', function(change) {
        console.log('change')
        _this.props.dispatch(fetchItems(kwargs))
      }).on('complete', function(info) {
        console.log('complete')
        _this.props.dispatch(fetchItems(kwargs))
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

      //
      // localDB.sync(remoteDB, {
      //   live: true,
      //   retry: true
      // })
    // Fecth items
    this.props.dispatch(fetchItems(kwargs))
  }

  render() {
    return null
  }

}
