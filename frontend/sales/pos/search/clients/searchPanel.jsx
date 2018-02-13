/* Module dependencies */
import React from 'react'
import {connect} from 'react-redux'

import {hidePanel} from './actions'
import SearchForm from './searchForm.jsx'
import ResultsTable from './resultsTable.jsx'
const Mousetrap = require('mousetrap')

@connect((store) => {
  return {visible: store.searchClients.visible}
})

export default class searchClients extends React.Component {

  panelClick(ev) {

    if (ev.target.classList.contains('cd-panel')) {
      this.props.dispatch(hidePanel())
      document.getElementById('productCodeInputField').focus()
      Mousetrap.unbind('esc')
    }

  }
  // Main Layout
  render() {

    const visibleOrNot = (this.props.visible)
      ? 'cd-panel cd-panel-search-client from-right is-visible'
      : 'cd-panel cd-panel-search-client from-right'

    return <div className={visibleOrNot} onClick={this.panelClick.bind(this)}>

      <header className='cd-panel-header'>
        <h1>Búsqueda de Cliente</h1>
      </header>

      <div className='cd-panel-container'>
        <div className='cd-panel-content'>
          <div className='form-group'>

            <SearchForm />
            <ResultsTable />
          </div>
        </div>
      </div>
    </div>

  }

}
