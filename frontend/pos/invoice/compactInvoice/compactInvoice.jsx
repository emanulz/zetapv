import React from 'react'
import { connect } from "react-redux"

import Header from './components/header.jsx'
import Table from './components/table.jsx'
import Data from './components/data.jsx'
import Totals from './components/totals.jsx'


export default class CompactInvoice extends React.Component{


    render(){


        return <div className="compact-invoice">

                    <Header></Header>
                    <Data></Data>
                    <Table></Table>
                    <Totals></Totals>

               </div>

    }

}
