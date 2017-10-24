/*
 * Module dependencies
 */
import React from 'react'
import Select2 from 'react-select2-wrapper'
import {connect} from 'react-redux'

@connect((store) => {
  return {
    departments: store.products.departments,
    subdepartments: store.products.subdepartments,
    departmentActive: store.products.departmentActive,
    subdepartmentActive: store.products.subdepartmentActive,
    filterText: store.products.filterText,
    warehouses: store.products.warehouses,
    warehouseActive: store.products.warehouseActive,
    isPhysicalTake: store.products.isPhysicalTake
  }
})
export default class Filters extends React.Component {

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

  setWarehouseActive(event) {
    const target = event.target
    const value = target.value
    this.props.dispatch({type: 'SET_WAREHOUSE', payload: value})
  }

  setFilterText (event) {
    const target = event.target
    const value = target.value
    this.props.dispatch({type: 'SET_FILTER_TEXT', payload: value})
  }

  clearFilters () {
    this.props.dispatch({type: 'CLEAR_FILTER_TEXT', payload: ''})
    this.props.dispatch({type: 'CLEAR_PRODUCT_SUBDEPARTMENT', payload: ''})
    this.props.dispatch({type: 'CLEAR_PRODUCT_DEPARTMENT', payload: ''})
    this.props.dispatch({type: 'CLEAR_WAREHOUSES', payload: ''})
  }

  togglePhysical () {
    this.props.dispatch({type: 'TOGGLE_PHYSICAL_TAKE', payload: ''})
  }

  // Main Layout
  render() {

    // ********************************************************************
    // SELECT2 DATA
    // ********************************************************************
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

    const warehouses = this.props.warehouses
    warehouses.sort((a, b) => {
      return a.code - b.code
    })
    const warehousesData = warehouses.map(warehouse => {
      return {text: `${warehouse.code} - ${warehouse.name}`, id: warehouse._id}
    })

    // ********************************************************************
    // RETURN BLOCK
    // ********************************************************************
    return <div className='filters'>
      <div className='filters-header'>
        Filtros
      </div>
      <div className='filters-container'>

        <input value={this.props.filterText} onChange={this.setFilterText.bind(this)} type='text'
          placeholder='Filtrar...' className='form-control' />

        <h4>Familia:</h4>

        <Select2
          name='department'
          value={this.props.departmentActive}
          className='form-control'
          onSelect={this.setDepartmentActive.bind(this)}
          data={departmentData}
          options={{
            placeholder: 'Elija una Familia...',
            noResultsText: 'Sin elementos'
          }}
        />

        <h4>Sub-Familia:</h4>
        <Select2
          name='subdepartment'
          value={this.props.subdepartmentActive}
          className='form-control'
          onSelect={this.setSubDepartmentActive.bind(this)}
          data={subdepartmentData}
          options={{
            placeholder: 'Elija una sub Familia...',
            noResultsText: 'Sin elementos'
          }}
        />

        <h4>Bodega:</h4>
        <Select2
          name='department'
          value={this.props.warehouseActive}
          className='form-control'
          onSelect={this.setWarehouseActive.bind(this)}
          data={warehousesData}
          options={{
            placeholder: 'Elija una Bodega...',
            noResultsText: 'Sin elementos'
          }}
        />

        <button className='btn form-control'onClick={this.clearFilters.bind(this)}> Limpiar Filtros </button>

        <div className='filters-container-inline' >
          <h4>Toma Física:</h4>
          <input onChange={this.togglePhysical.bind(this)} value={this.props.isPhysicalTake} type='checkbox' />
        </div>

      </div>

    </div>

  }

}
