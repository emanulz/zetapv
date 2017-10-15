/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {salesReport} from './actions'
import Header from './components/header.jsx'
import FiltersData from './components/filtersData.jsx'
import Body from './components/body.jsx'

@connect((store) => {
  return {
    isCollapsed: store.reports.isCollapsed,
    isActive: store.reports.isActive,
    reportActive: store.reports.reportActive,
    iniDateActive: store.reports.iniDateActive,
    endDateActive: store.reports.endDateActive,
    clientActive: store.reports.clientActive,
    clientActiveId: store.reports.clientActiveId,
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

  setReportActive() {
    this.props.dispatch({type: 'SET_REPORT_GENERATED', payload: ''})
    this.props.dispatch({type: 'SET_FILTERS_INACTIVE', payload: ''})
  }

  render() {
    const reportClass = this.props.isCollapsed ? 'report collapsed' : 'report'
    const iconClass = this.props.isCollapsed ? 'fa fa-chevron-right' : ''

    let header = <div />
    let body = <div />
    let filters = <div />

    if (this.props.isActive) {
      switch (this.props.reportActive) {
        case '1' :
        {
          const reportData = salesReport(this.props.sales, this.props.iniDateActive, this.props.endDateActive, this.props.clientActiveId)
          header = <Header tittle='REPORTE DE VENTAS' date={new Date()} />
          filters = <FiltersData />
          body = <Body tbody={reportData.tbody} thead={reportData.thead} totals={reportData.totals} />
        }
      }
    }

    return <div className={reportClass}>
      <div className='report-header'>
        Reporte:
        <i class={iconClass} aria-hidden='true' onClick={this.collapseFilters.bind(this)} />
      </div>
      <div className='report-content'>
        {header}
        {filters}
        {body}
      </div>
    </div>
  }
}
