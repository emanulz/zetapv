/*
 * Module dependencies
 */
import React from 'react';
var PouchDB = require('pouchdb');

import { connect } from "react-redux"
import { fetchClients, clientSelected, searchClient } from "./actions"

@connect((store) => {
  return {
    clients: store.clients.clients,
    clientSelected : store.clients.clientSelected
  };
})
export default class Clients extends React.Component {

    componentWillMount() {
        const _this = this
        var localDbClients = new PouchDB('clients')
        var remoteDbClients = new PouchDB('http://localhost:5984/clients')
        localDbClients.sync(remoteDbClients, {
          live: true,
          retry: true
        }).on('change', function (change) {
            // yo, something changed!
            _this.props.dispatch(fetchClients())
        }).on('paused', function (info) {
            // replication was paused, usually because of a lost connection
        }).on('active', function (info) {
            // replication was resumed
        }).on('error', function (err) {
            // totally unhandled error (shouldn't happen)
        });

        this.props.dispatch(fetchClients())//fetch clients before mount, send dispatch to reducer.
    }

    inputKeyPress(ev){
        //if Key pressed id Enter
        if(ev.key=='Enter'){

            let code = ev.target.value //Split val [0] is code [1] is qty
            this.props.dispatch(clientSelected(code, this.props.clients))// dispatchs action according to result

        }

    }

    searchClientClick(){

        this.props.dispatch(searchClient())

    }


    // Main Layout
    render(){

        let clientToShow = (this.props.clientSelected)
                         ? `${this.props.clientSelected.name} ${this.props.clientSelected.last_name}`
                         : 'Cliente Contado'

        let creditIcon = (this.props.clientSelected && this.props.clientSelected.has_credit)
                       ? 'fa fa-check-square'
                       : 'fa fa-times-circle'

        return <div className="col-xs-12 client">

                    <span>
                        <b>
                        Datos del Cliente:
                            <span>
                                <i onClick={this.searchClientClick.bind(this)} className="fa fa-edit btn-client-search"></i>
                            </span>
                        </b>
                    </span>

                    <br/><br/>

                    <div  className="row">

                        <div className="col-xs-2"><img onClick={this.searchClientClick.bind(this)} src="/img/profile.jpg" className="client-avatar"/></div>

                        <div className="col-xs-10"><span><b>Código : </b></span>

                            <input onKeyDown={this.inputKeyPress.bind(this)} type="text" className="client-code"/><i className="fa fa-street-view"></i><br/>

                            <span><b>Nombre : </b></span>
                            <span className="client-name">{clientToShow}</span>
                            <br/>
                            <span><b>Crédito : </b></span>
                            <span>
                            <i><span className={creditIcon}></span>
                            </i>
                            </span>
                            <br/>
                            <span><b>Balance : </b></span>
                            <span className="client-debt-amount credit-status credit-positive">₡ 0</span>

                        </div>

                    </div>




            </div>

        }

}
