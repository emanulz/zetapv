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
    client: store.reports.clientActiveName
  }
})
export default class FiltersDataPrices extends React.Component {

  render() {
    const today = formatDate(new Date())

    return <div className='report-content-filters row'>
      <div className='report-content-filters-today col-xs-4'>
        <h3><b>Fecha:</b> {today}</h3>
      </div>
    </div>
  }
}
