import React from 'react'

import Header from './components/header.jsx'
import Data from './components/data.jsx'
import Table from './components/table.jsx'
import Totals from './components/totals.jsx'
import Notes from './components/notes.jsx'
import {connect} from 'react-redux'
import {loadProforma} from '../actions'
const Mousetrap = require('mousetrap')

@connect((store) => {
  return {
    proformas: store.proforma.proformas
  }
})
export default class FullInvoice extends React.Component {

  componentWillUpdate(nextProps) {

    if (nextProps.proformas.length && nextProps.proformas != this.props.proformas) {

      const proforma = window.location.href.split('/').pop()

      // If is loading proformas
      if (proforma != 'pos' && proforma != '' && proforma != 'proforma') {
        this.props.dispatch(loadProforma(proforma, nextProps.proformas))

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
