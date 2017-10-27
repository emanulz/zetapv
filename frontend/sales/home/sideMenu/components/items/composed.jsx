/*
 * Module dependencies
 */
import React from 'react'
import {Link} from 'react-router-dom'

export default class Composed extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleMenu() {

    this.setState({
      visible: !this.state.visible
    })
  }

  // Main Layout
  render() {
    const childItems = this.props.childItems.map(item => {
      const innerItem = item.noLink
        ? <a href={item.href}>
          <span className={`fa ${item.class}`} />
          {item.text}
        </a>
        : <Link to={item.href}>
          <span className={`fa ${item.class}`} />
          {item.text}
        </Link>
      return <li key={item.text + item.href}>
        {innerItem}
      </li>
    })
    const visible = this.state.visible
      ? 'visible'
      : ''

    return <li className={`sideMenu-item-composed ${visible}`}>
      <a className={visible} onClick={this.toggleMenu.bind(this)}>
        <span className={`fa ${this.props.mainIcon}`} />
        {this.props.mainTittle}
        <span className='fa fa-chevron-left show-icon' />
      </a>
      <ul className={visible}>
        {childItems}
      </ul>
    </li>
  }
}
