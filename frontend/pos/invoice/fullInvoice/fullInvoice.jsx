import React from 'react'

import Header from './components/header.jsx'
import Data from './components/data.jsx'
import Table from './components/table.jsx'
import Totals from './components/totals.jsx'
import Notes from './components/notes.jsx'

export default class FullInvoice extends React.Component {

  render() {

    return <div className='full-invoice'>

      <Header />
      <Data />
      <Table />
      <Totals />
      <Notes />

    </div>

  }

}
