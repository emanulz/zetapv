/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {salesReport, pricesReport, utilitiesReport, clientsReport, proformasReport} from './actions'
import Header from './components/header.jsx'
import FiltersData from './components/filtersData.jsx'
import FiltersDataPrices from './components/filtersDataPrices.jsx'
import Body from './components/body.jsx'
import BodyPrices from './components/bodyPrices.jsx'

@connect((store) => {
  return {
    isCollapsed: store.reports.isCollapsed,
    isActive: store.reports.isActive,
    reportActive: store.reports.reportActive,
    iniDateActive: store.reports.iniDateActive,
    endDateActive: store.reports.endDateActive,
    clientActive: store.reports.clientActive,
    clientActiveId: store.reports.clientActiveId,
    userActive: store.reports.userActive,
    userActiveId: store.reports.userActiveId,
    departmentActive: store.reports.departmentActive,
    subdepartmentActive: store.reports.subdepartmentActive,
    departments: store.reports.departments,
    clients: store.reports.clients,
    subdepartments: store.reports.subdepartments,
    sales: store.reports.sales,
    proformas: store.reports.proformas,
    products: store.reports.products,
    costFilter: store.reports.costFilter,
    price1Filter: store.reports.price1Filter,
    price2Filter: store.reports.price2Filter,
    price3Filter: store.reports.price3Filter
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
          const reportData = salesReport(this.props.sales, this.props.iniDateActive, this.props.endDateActive,
            this.props.clientActiveId, this.props.userActiveId)
          header = <Header tittle='REPORTE DE VENTAS' date={new Date()} />
          filters = <FiltersData />
          body = <Body tbody={reportData.tbody} thead={reportData.thead} totals={reportData.totals} />
          break
        }

        case '2' :
        {
          const reportData = utilitiesReport(this.props.sales, this.props.iniDateActive, this.props.endDateActive,
            this.props.clientActiveId, this.props.userActiveId)
          header = <Header tittle='REPORTE DE UTILIDADES' date={new Date()} />
          filters = <FiltersData />
          body = <Body tbody={reportData.tbody} thead={reportData.thead} totals={reportData.totals} />
          break
        }

        case '4' :
        {
          const reportData = pricesReport(this.props.products, this.props.costFilter, this.props.price1Filter,
            this.props.price2Filter, this.props.price3Filter, this.props.departmentActive,
            this.props.subdepartmentActive)
          header = <Header tittle='LISTA DE PRECIOS' date={new Date()} />
          filters = <FiltersDataPrices />
          body = <BodyPrices tbody={reportData.tbody} thead={reportData.thead} />
          break
        }
        case '5' :
        {
          const reportData = clientsReport(this.props.clients)
          header = <Header tittle='LISTA DE CLIENTES' date={new Date()} />
          filters = <div />
          body = <Body tbody={reportData.tbody} thead={reportData.thead} />
          break
        }

        case '6' :
        {
          const reportData = proformasReport(this.props.proformas, this.props.iniDateActive, this.props.endDateActive,
            this.props.clientActiveId, this.props.userActiveId)
          header = <Header tittle='REPORTE DE PROFORMAS' date={new Date()} />
          filters = <FiltersData />
          body = <Body tbody={reportData.tbody} thead={reportData.thead} totals={reportData.totals} />
          break
        }
      }
    }

    return <div className={reportClass}>
      <div className='report-header'>
        Reporte:
        <i class={iconClass} aria-hidden='true' onClick={this.collapseFilters.bind(this)} />
      </div>
      <div id='report-content' className='report-content'>
        {header}
        {filters}
        {body}
      </div>
    </div>
  }
}
