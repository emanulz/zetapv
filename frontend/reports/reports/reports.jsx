/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'

@connect((store) => {
  return {
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
    sales: store.reports.sales
  }
})
export default class Report extends React.Component {

  collapseFilters() {
    this.props.dispatch({type: 'TOGGLE_FILTERS', payload: ''})
  }

  render() {
    const reportClass = this.props.isCollapsed ? 'report collapsed' : 'report'
    const iconClass = this.props.isCollapsed ? 'fa fa-chevron-right' : ''

    return <div className={reportClass}>
      <div className='report-header'>
        Reporte:
        <i class={iconClass} aria-hidden='true' onClick={this.collapseFilters.bind(this)} />
        <button className='btn'>
          Generar
          <i class='fa fa-tasks' aria-hidden='true' />
        </button>
      </div>
      <div className='report-content'>
        <span />
      </div>
    </div>
  }
}
