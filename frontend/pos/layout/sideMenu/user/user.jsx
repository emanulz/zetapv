/*
 * Module dependencies
 */
import React from 'react'

export default class User extends React.Component {

  // Main Layout
  render() {

    return <div className='sideMenu-user col-xs-12 '>

      <div className='sideMenu-user-avatar'>
        <img src='/img/avatars/emanuel.jpeg' />
      </div>

      <div className='sideMenu-user-name'>
        <span>Emanuel Zúniga I</span>
        <hr />
      </div>

      <div className='sideMenu-user-lock'>
        <span className='fa fa-lock' />
      </div>
    </div>

  }

}
