/*
 * Module dependencies
 */
import React from 'react'
import {toggleItemsBar} from './actions'
import {Link} from 'react-router-dom'

export default class ConfigBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {items: props.items}
  }

  componentWillUpdate(nextProps) {
    if (nextProps.items.length && nextProps.items != this.props.items) {
      this.setState({
        items: nextProps.items
      })
    }
  }

  closeItemsBar() {
    toggleItemsBar()
  }

  filterItems(event) {

    const text = event.target.value.toUpperCase()
    const items = this.props.items
    const codeField = this.props.codeField
    const descriptionField = this.props.descriptionField

    const newItems = items.filter(item => {
      return item[codeField].toUpperCase().indexOf(text) != -1 ||
      item[descriptionField].toUpperCase().indexOf(text) != -1
    })

    this.setState({
      items: newItems
    })
  }

  // Main Layout
  render() {
    const codeField = this.props.codeField
    const descriptionField = this.props.descriptionField
    const descriptionField2 = this.props.descriptionField2 ? this.props.descriptionField2 : ''
    const items = this.state.items

    items.sort((a, b) => {
      if (a[codeField] > b[codeField]) {
        return 1
      }
      if (a[codeField] < b[codeField]) {
        return -1
      }
      return 0
    })

    const itemsToRender = items.map(item => {
      const description = this.props.descriptionField2
        ? `${item[descriptionField]} ${item[descriptionField2]}`
        : `${item[descriptionField]}`
      return <tr key={item[codeField]}>
        <td><Link to={`${this.props.editPath}${item[codeField]}`} >{item[codeField]}</Link></td>
        <td>{`${description}`}</td>
      </tr>
    })

    return <div id='itemsBar' className='itemsBar not-visible'>
      <div className='itemsBar-header'>
        <div className='itemsBar-header-top' >
          <div>{this.props.tittle}</div>
          <div className='itemsBar-header-top-close'>
            <span onClick={this.closeItemsBar.bind(this)} className='fa fa-close' />
          </div>
        </div>
        <div className='itemsBar-header-bottom' >
          <input onChange={this.filterItems.bind(this)} placeholder='Filtrar...' type='text' className='form-control' />
        </div>
      </div>

      <div className='itemsBar-content'>
        <div className='col-xs-12'>
          <table className='table table-bordered'>
            <tbody>
              {itemsToRender}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  }

}
