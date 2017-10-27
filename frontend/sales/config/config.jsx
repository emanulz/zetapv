/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {loadConfig} from '../../admin/config/actions'

@connect((store) => {
  return {products: store.products.products}
})
export default class Config extends React.Component {

  componentWillMount() {
    this.loadConfigs()
  }

  componentDidMount() {
    document.getElementById('loader').classList.remove('loader')
  }

  loadConfigs() {
    // COMPANY CONFIG
    this.fetchConfig('company', 'default')
    this.fetchConfig('company', 'user')

    // SALES CONFIG
    this.fetchConfig('sales', 'default')
    this.fetchConfig('sales', 'user')

  }

  fetchConfig(config, type) {
    this.props.dispatch(
      loadConfig(config, type, 'FETCH_CONFIG_FULFILLED', 'FETCH_CONFIG_FAILED')
    )
  }

  render() {
    return null
  }

}
