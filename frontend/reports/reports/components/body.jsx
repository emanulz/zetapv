/*
 * Module dependencies
 */
import React from 'react'

export default class Header extends React.Component {

  render() {

    return <div className='report-content-body'>
      <table className='table'>
        {this.props.thead}
        <tbody>
          {this.props.tbody}
        </tbody>
      </table>
      <div className='report-content-body-totals row'>
        <div className='report-content-body-totals-text'>
          Totales:
        </div>
      </div>
      <div className='report-content-body-totals row'>
        {this.props.totals}
      </div>
    </div>
  }
}
