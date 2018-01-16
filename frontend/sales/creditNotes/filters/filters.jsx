/*
 * Module dependencies
 */
import React from 'react'
import Select2 from 'react-select2-wrapper'
import {connect} from 'react-redux'

import {filterSales} from './actions'

@connect((store) => {
  return {
    clients: store.clients.clients,
    sales: store.sales.sales,
    clientFilter: store.creditNotes.clientFilter,
    saleFilter: store.creditNotes.saleFilter
  }
})
export default class Filters extends React.Component {

  setClientFilter(event) {
    const target = event.target
    const value = target.value
    this.props.dispatch({type: 'SET_CREDIT_NOTE_CLIENT_FILTER', payload: value})
  }

  setSaleFilter (event) {
    const target = event.target
    const value = parseInt(target.value)
    this.props.dispatch({type: 'SET_CREDIT_NOTE_SALE_FILTER', payload: value})
  }

  clearFilters () {
    this.props.dispatch({type: 'CLEAR_CREDIT_NOTE_SALE_FILTER', payload: ''})
    this.props.dispatch({type: 'CLEAR_CREDIT_NOTE_CLIENT_FILTER', payload: ''})
    this.props.dispatch({type: 'CLEAR_SALES_FILTERED', payload: ''})
  }

  searchBtn () {

    const sales = filterSales(this.props.sales, this.props.clientFilter, this.props.saleFilter)
    this.props.dispatch({type: 'SET_SALES_FILTERED', payload: sales})

  }

  // Main Layout
  render() {

    // ********************************************************************
    // SELECT2 DATA
    // ********************************************************************
    const clients = this.props.clients

    clients.sort((a, b) => {
      return a.code - b.code
    })

    const clientData = clients.map(client => {
      return {text: `${client.code} - ${client.name} ${client.last_name}`, id: client._id}
    })

    // ********************************************************************
    // RETURN BLOCK
    // ********************************************************************
    return <div className='creditNote-filters'>
      <div className='creditNote-filters-header'>
        Filtros
      </div>
      <div className='creditNote-filters-container'>

        <h4>Venta #:</h4>

        <input value={this.props.saleFilter} type='text' placeholder='Filtrar por venta' className='form-control'
          onChange={this.setSaleFilter.bind(this)}
        />

        <h4>Cliente:</h4>

        <Select2
          name='client'
          value={this.props.clientFilter}
          className='form-control'
          onSelect={this.setClientFilter.bind(this)}
          data={clientData}
          options={{
            placeholder: 'Elija un Cliente...',
            noResultsText: 'Sin elementos'
          }}
        />

        <button className='btn form-control'onClick={this.searchBtn.bind(this)}> Buscar </button>

        <button className='btn form-control'onClick={this.clearFilters.bind(this)}> Limpiar Filtros </button>

      </div>

    </div>

  }

}
