/*
 * Module dependencies
 */
import React from 'react'

export default class Header extends React.Component {

  render() {
    return <div className='report-content-header'>
      <hr style={{'borderTop': '1px solid #ccc'}} />
      {this.props.tittle}
      <hr style={{'borderTop': '1px solid #ccc'}} />
    </div>
  }
}
