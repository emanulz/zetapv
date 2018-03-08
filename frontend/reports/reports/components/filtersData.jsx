/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'
import {formatDate} from '../../../utils/formatDate.js'

@connect((store) => {
  return {
    iniDateActive: store.reports.iniDateActive,
    endDateActive: store.reports.endDateActive,
    client: store.reports.clientActiveName,
    user: store.reports.userActiveName
  }
})
export default class FiltersData extends React.Component {

  render() {
    const iniDate = this.props.iniDateActive != '' ? formatDate(this.props.iniDateActive) : '-'
    const endDate = this.props.endDateActive != '' ? formatDate(this.props.endDateActive) : '-'
    const today = formatDate(new Date())

    return <div className='report-content-filters row'>
      <div className='report-content-filters-today col-xs-4'>
        <h3><b>Fecha:</b> {today}</h3>
        <h4><b>Cliente:</b> {this.props.client}</h4>
        <h4><b>Vendedor:</b> {this.props.user}</h4>
      </div>
      <div className='report-content-filters-dates col-xs-4'>
        <h4><b>Fecha inicial:</b> {iniDate}</h4>
        <h4><b>Fecha Final:</b> {endDate}</h4>
      </div>

    </div>
  }
}
