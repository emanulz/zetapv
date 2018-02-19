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
    filtersActive: store.reports.filtersActive,
    costFilter: store.reports.costFilter,
    price1Filter: store.reports.price1Filter,
    price2Filter: store.reports.price2Filter,
    price3Filter: store.reports.price3Filter
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

  setDepartmentActive(event) {
    const target = event.target
    const value = target.value
    this.props.dispatch({type: 'SET_PRODUCT_DEPARTMENT', payload: value})
    this.props.dispatch({type: 'CLEAR_PRODUCT_SUBDEPARTMENT', payload: ''})
  }

  setSubDepartmentActive(event) {
    const target = event.target
    const value = target.value
    this.props.dispatch({type: 'SET_PRODUCT_SUBDEPARTMENT', payload: value})
  }

  setPricesFilterActive(val, event) {
    const target = event.target
    const value = target.checked
    const payload = {
      cost: this.props.costFilter,
      price1: this.props.price1Filter,
      price2: this.props.price2Filter,
      price3: this.props.price3Filter
    }

    if (val == 'cost') {
      payload.cost = value
    }

    if (val == 'price1') {
      payload.price1 = value
    }

    if (val == 'price2') {
      payload.price2 = value
    }

    if (val == 'price3') {
      payload.price3 = value
    }

    this.props.dispatch({type: 'SET_PRICES_FILTER', payload: payload})

  }

  clearFilters () {
    this.props.dispatch({type: 'CLEAR_CLIENT', payload: ''})
    this.props.dispatch({type: 'CLEAR_REPORT', payload: ''})
    this.props.dispatch({type: 'CLEAR_INI_DATE', payload: ''})
    this.props.dispatch({type: 'CLEAR_END_DATE', payload: ''})
    this.props.dispatch({type: 'SET_FILTERS_ACTIVE', payload: ''})
    this.props.dispatch({type: 'CLEAR_REPORT_GENERATED', payload: ''})
    this.props.dispatch({type: 'CLEAR_PRICES_FILTER', payload: ''})
    this.props.dispatch({type: 'CLEAR_PRODUCT_DEPARTMENT', payload: ''})
    this.props.dispatch({type: 'CLEAR_PRODUCT_SUBDEPARTMENT', payload: ''})
  }

  clearDepartment() {
    this.props.dispatch({type: 'CLEAR_PRODUCT_DEPARTMENT', payload: ''})
    this.props.dispatch({type: 'CLEAR_PRODUCT_SUBDEPARTMENT', payload: ''})
  }

  clearReport() {
    this.clearFilters()
  }

  clearSubDepartment() {
    this.props.dispatch({type: 'CLEAR_PRODUCT_SUBDEPARTMENT', payload: ''})
  }

  collapseFilters() {
    this.props.dispatch({type: 'TOGGLE_FILTERS', payload: ''})
  }

  setReportAreaActive() {
    this.props.dispatch({type: 'SET_REPORT_GENERATED', payload: ''})
    this.props.dispatch({type: 'SET_FILTERS_INACTIVE', payload: ''})
  }

  printReport() {
    window.printDiv('report-content')
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

    const printButton = this.props.isActive
      ? <button className='btn form-control'onClick={this.printReport.bind(this)}>
        Imprimir
        <i class='fa fa-print' aria-hidden='true' />
      </button>
      : ''

    // ********************************************************************
    // SELECT2 DATA
    // ********************************************************************

    // Reports
    const reportsData = [
      {text: `Ventas`, id: 1},
      {text: `Utilidades`, id: 2},
      // {text: `Descuentos`, id: 3},
      {text: `Lista de Precios`, id: 4}
    ]

    // Department and Sub

    const departments = this.props.departments

    departments.sort((a, b) => {
      return a.code - b.code
    })

    const departmentData = departments.map(department => {
      return {text: `${department.code} - ${department.name}`, id: department._id}
    })

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

    const subdepartmentData = filteredSubDepartments.map(subdepartment => {
      return {text: `${subdepartment.code} - ${subdepartment.name}`, id: subdepartment._id}
    })

    // Clients

    const clients = this.props.clients

    const sortedClients = clients.sort((a, b) => {
      return a.code - b.code
    })

    const clientsData = sortedClients.map(client => {
      return {text: `${client.code} - ${client.name} ${client.last_name}`,
        id: `${client._id}/${client.name} ${client.last_name} - ${client.code}`}
    })

    clientsData.unshift({text: 'Todos los clientes', id: '0/Todos los clientes'})

    // ********************************************************************
    // FILTERS
    // ********************************************************************

    const pricesToShowFilter = <div className='filters-container-prices'>
      <h4>Precios a mostrar:</h4>
      <label><input checked={this.props.costFilter} onChange={this.setPricesFilterActive.bind(this, 'cost')}
        type='checkbox' disabled={!this.props.filtersActive} />Costo</label> <br />
      <label><input checked={this.props.price1Filter} onChange={this.setPricesFilterActive.bind(this, 'price1')}
        type='checkbox' disabled={!this.props.filtersActive} />Precio 1</label> <br />
      <label><input checked={this.props.price2Filter} onChange={this.setPricesFilterActive.bind(this, 'price2')}
        type='checkbox' disabled={!this.props.filtersActive} />Precio 2</label> <br />
      <label><input checked={this.props.price3Filter} onChange={this.setPricesFilterActive.bind(this, 'price3')}
        type='checkbox' disabled={!this.props.filtersActive} />Precio 3</label> <br />
    </div>

    const clientFilter = <div>
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
    </div>

    const datesFilter = <div className='filters-container-dates'>
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

    const departmentFilters = <div>
      <h4>Familia:</h4>

      <Select2
        disabled={!this.props.filtersActive}
        name='department'
        value={this.props.departmentActive}
        className='form-control'
        onSelect={this.setDepartmentActive.bind(this)}
        onUnselect={this.clearDepartment.bind(this)}
        data={departmentData}
        options={{
          placeholder: 'Elija una Familia...',
          noResultsText: 'Sin elementos',
          allowClear: true
        }}
      />

      <h4>Sub-Familia:</h4>
      <Select2
        disabled={!this.props.filtersActive}
        name='subdepartment'
        value={this.props.subdepartmentActive}
        className='form-control'
        onSelect={this.setSubDepartmentActive.bind(this)}
        onUnselect={this.clearSubDepartment.bind(this)}
        data={subdepartmentData}
        options={{
          placeholder: 'Elija una sub Familia...',
          noResultsText: 'Sin elementos',
          allowClear: true
        }}
      />
    </div>

    let filters = <div />

    switch (this.props.reportActive) {
      case '1' :
      {
        filters = <div>
          {datesFilter}
          {clientFilter}
        </div>
        break
      }

      case '2' :
      {
        filters = <div>
          {datesFilter}
          {clientFilter}
        </div>
        break
      }

      case '4' :
      {
        filters = <div>
          {pricesToShowFilter}
          {departmentFilters}
        </div>
        break
      }
    }

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
          onUnselect={this.clearReport.bind(this)}
          data={reportsData}
          options={{
            placeholder: 'Elija un Reporte...',
            noResultsText: 'Sin elementos',
            allowClear: true
          }}
        />

        {filters}

        {buttons}

        {printButton}

      </div>

    </div>

  }

}
