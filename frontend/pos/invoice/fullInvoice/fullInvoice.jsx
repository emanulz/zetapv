import React from 'react'
import { connect } from "react-redux"

import Header from './components/header.jsx'
import Data from './components/data.jsx'
import Table from './components/table.jsx'
import Totals from './components/totals.jsx'
import Notes from './components/notes.jsx'

export default class FullInvoice extends React.Component{


    render(){


        return <div className="full-invoice">

                    <Header></Header>
                    <Data></Data>
                    <Table></Table>
                    <Totals></Totals>
                    <Notes></Notes>
                    
               </div>

    }

}
