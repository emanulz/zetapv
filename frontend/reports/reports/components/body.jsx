/*
 * Module dependencies
 */
import React from 'react'

export default class Header extends React.Component {

  render() {

    const totalsHeader = this.props.totals
      ? <div className='report-content-body-totals row'>
        <div className='report-content-body-totals-text'>
          Totales:
        </div>
      </div>
      : <div />

    return <div className='report-content-body'>
      <table className='table'>
        {this.props.thead}
        <tbody>
          {this.props.tbody}
        </tbody>
      </table>
      {totalsHeader}
      <div className='report-content-body-totals row'>
        {this.props.totals}
      </div>
    </div>
  }
}
