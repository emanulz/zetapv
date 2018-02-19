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
    departmentActive: store.reports.departmentActive,
    subdepartmentActive: store.reports.subdepartmentActive,
    departments: store.reports.departments,
    subdepartments: store.reports.subdepartments
  }
})
export default class FiltersDataPrices extends React.Component {

  render() {
    const today = formatDate(new Date())

    const departmentActive = this.props.departmentActive
    const department = this.props.departments.filter(department => {
      return department._id == departmentActive
    })

    const departmentName = department[0] ? department[0].name : 'Todos'

    const subdepartmentActive = this.props.subdepartmentActive
    const subdepartment = this.props.subdepartments.filter(subdepartment => {
      return subdepartment._id == subdepartmentActive
    })

    const subdepartmentName = subdepartment[0] ? subdepartment[0].name : 'Todos'

    return <div className='report-content-filters row'>
      <div className='report-content-filters-today col-xs-4'>
        <h3><b>Fecha:</b> {today}</h3>
      </div>

      <div className='report-content-filters-dates col-xs-4'>
        <h4><b>Familia:</b> {departmentName}</h4>
        <h4><b>Sub-Familia:</b> {subdepartmentName}</h4>
      </div>
    </div>
  }
}
