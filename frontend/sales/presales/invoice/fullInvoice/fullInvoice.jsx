import React from 'react'

import Header from './components/header.jsx'
import Data from './components/data.jsx'
import Table from './components/table.jsx'
import Totals from './components/totals.jsx'
import Notes from './components/notes.jsx'
import {connect} from 'react-redux'
import {loadPresale} from '../actions'
const Mousetrap = require('mousetrap')

@connect((store) => {
  return {
    presales: store.presale.presales
  }
})
export default class FullInvoice extends React.Component {

  componentWillUpdate(nextProps) {

    if (nextProps.presales.length && nextProps.presales != this.props.presales) {

      const presale = window.location.href.split('/').pop()

      // If is loading presales
      if (presale != 'pos' && presale != '' && presale != 'presale' && presale != 'presale') {
        this.props.dispatch(loadPresale(presale, nextProps.presales))

        Mousetrap.reset()

      }
    }

  }

  render() {

    return <div className='full-proformaInvoice'>

      <Header />
      <Data />
      <Table />
      <Totals />
      <Notes />

    </div>

  }

}
