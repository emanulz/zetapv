/*
 * Module dependencies
 */
import React from 'react'

export default class BodyPrices extends React.Component {

  render() {

    return <div className='report-content-body'>
      <table className='table'>
        {this.props.thead}
        <tbody>
          {this.props.tbody}
        </tbody>
      </table>
    </div>
  }
}
