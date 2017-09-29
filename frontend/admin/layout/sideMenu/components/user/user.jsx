/*
 * Module dependencies
 */
import React from 'react'

export default class User extends React.Component {

  // Main Layout
  render() {

    const name = 'Emanuel'
    const lastName = 'Zúñiga Infante'
    const avatar = '/img/avatars/emanuel.jpeg'

    let fullName = `${name} ${lastName}`
    if (fullName.length > 17) fullName = fullName.substring(0, 17)

    return <div className='sideMenu-user col-xs-12 '>

      <div className='sideMenu-user-avatar'>
        <img src={avatar} />
      </div>

      <div className='sideMenu-user-name'>
        <span>{fullName}</span>
        <hr />
      </div>

      <div className='sideMenu-user-lock'>
        <span className='fa fa-lock' />
      </div>
    </div>

  }

}
