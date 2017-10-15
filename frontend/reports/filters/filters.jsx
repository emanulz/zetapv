/*
 * Module dependencies
 */
import React from 'react'
import Select2 from 'react-select2-wrapper'
import {connect} from 'react-redux'

@connect((store) => {
  return {
    isActive: store.reports.isActive,
    isCollapsed: store.reports.isCollapsed,
    reportActive: store.reports.reportActive,
    iniDateActive: store.reports.iniDateActive,
    endDateActive: store.reports.endDateActive,
    clientActive: store.reports.clientActive,
    departmentActive: store.reports.departmentActive,
    subdepartmentActive: store.reports.subdepartmentActive,
    departments: store.reports.departments,
    clients: store.reports.clients,
    subdepartments: store.reports.subdepartments,
    filtersActive: store.reports.filtersActive
  }
})
export default class Filters extends React.Component {

  setClientActive(event) {
    const target = event.target
    const value = target.value
    const id = value.split('/')[0]
    const name = value.split('/')[1]
    this.props.dispatch({type: 'SET_CLIENT', payload: {id: id, name: name, value: value}})
  }

  setReportActive(event) {
    const target = event.target
    const value = target.value
    this.props.dispatch({type: 'SET_REPORT', payload: value})
  }

  setEndDateActive(event) {
    const target = event.target
    const value = target.value
    this.props.dispatch({type: 'SET_END_DATE', payload: value})
  }

  setIniDateActive(event) {
    const target = event.target
    const value = target.value
    this.props.dispatch({type: 'SET_INI_DATE', payload: value})
  }

  clearFilters () {
    this.props.dispatch({type: 'CLEAR_CLIENT', payload: ''})
    this.props.dispatch({type: 'CLEAR_REPORT', payload: ''})
    this.props.dispatch({type: 'CLEAR_INI_DATE', payload: ''})
    this.props.dispatch({type: 'CLEAR_END_DATE', payload: ''})
    this.props.dispatch({type: 'SET_FILTERS_ACTIVE', payload: ''})
    this.props.dispatch({type: 'CLEAR_REPORT_GENERATED', payload: ''})
  }

  collapseFilters() {
    this.props.dispatch({type: 'TOGGLE_FILTERS', payload: ''})
  }

  setReportAreaActive() {
    this.props.dispatch({type: 'SET_REPORT_GENERATED', payload: ''})
    this.props.dispatch({type: 'SET_FILTERS_INACTIVE', payload: ''})
  }

  // Main Layout
  render() {

    // ********************************************************************
    // BUTTONS
    // ********************************************************************
    const buttons = this.props.isActive
      ? <button className='btn form-control'onClick={this.clearFilters.bind(this)}> Limpiar Filtros </button>
      : <button className='btn form-control'onClick={this.setReportAreaActive.bind(this)}>
        Generar
        <i class='fa fa-tasks' aria-hidden='true' />
      </button>
    // ********************************************************************
    // SELECT2 DATA
    // ********************************************************************

    const departmentData = [
      {text: `Ventas`, id: 1}
    ]

    const filteredSubDepartments = this.props.departmentActive
      ? this.props.subdepartments.filter(el => {
        return el.department.split('.')[0] == this.props.departmentActive
      })
      : []

    if (filteredSubDepartments.length) {
      filteredSubDepartments.sort((a, b) => {
        return a.code - b.code
      })
    }

    const clients = this.props.clients

    const sortedClients = clients.sort((a, b) => {
      return a.code - b.code
    })

    const clientsData = sortedClients.map(client => {
      return {text: `${client.code} - ${client.name} ${client.last_name}`,
        id: `${client._id}/${client.name} ${client.last_name} - ${client.code}`}
    })

    clientsData.unshift({text: 'Todos los clientes', id: '0/Todos los clientes'})

    const filterClass = this.props.isCollapsed ? 'filters collapsed' : 'filters'
    // ********************************************************************
    // RETURN BLOCK
    // ********************************************************************
    return <div className={filterClass}>
      <div className='filters-header'>
        Filtros:
        <i class='fa fa-chevron-left' aria-hidden='true' onClick={this.collapseFilters.bind(this)} />
      </div>
      <div className='filters-container'>

        <h4>Tipo de Reporte:</h4>
        <Select2
          disabled={!this.props.filtersActive}
          name='report'
          value={this.props.reportActive}
          className='form-control'
          onSelect={this.setReportActive.bind(this)}
          data={departmentData}
          options={{
            placeholder: 'Elija un Reporte...',
            noResultsText: 'Sin elementos'
          }}
        />

        <div className='filters-container-dates'>

          <div className='filters-container-dates-initial'>
            <h4>Fecha inicial:</h4>
            <input className='form-control' type='date'
              disabled={!this.props.filtersActive}
              value={this.props.iniDateActive}
              onChange={this.setIniDateActive.bind(this)}
            />
          </div>

          <div className='filters-container-dates-final'>
            <h4>Fecha final:</h4>
            <input className='form-control' type='date'
              disabled={!this.props.filtersActive}
              value={this.props.endDateActive}
              onChange={this.setEndDateActive.bind(this)}
            />
          </div>

        </div>

        <h4>Cliente:</h4>
        <Select2
          disabled={!this.props.filtersActive}
          name='client'
          value={this.props.clientActive}
          onSelect={this.setClientActive.bind(this)}
          className='form-control'
          data={clientsData}
          options={{
            placeholder: 'Elija un Cliente...',
            noResultsText: 'Sin elementos'
          }}
        />
        {buttons}

      </div>

    </div>

  }

}
