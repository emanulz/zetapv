/*
 * Module dependencies
 */
import React from 'react';

import Client from './clients/clients.jsx'
import Totals from './totals/totals.jsx'
import Buttons from './buttons/buttons.jsx'

export default class SideBar extends React.Component {

    // Main Layout
    render(){

        return <div style={{'padding':'0'}} className="col-xs-12 col-sm-4 col-md-4 col-lg-4 side-div">

                    <Client></Client>
                    <Totals></Totals>
                    <Buttons></Buttons>

               </div>

    }

}
