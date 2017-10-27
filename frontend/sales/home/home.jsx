/*
 * Module dependencies
 */
import React from 'react'
import SideBar from './sideBar.jsx'
import Content from './content.jsx'

export default class Home extends React.Component {

  // Main Layout
  render() {

    return <div className='row sales-home'>
      <Content />
      <SideBar />
    </div>

  }

}
