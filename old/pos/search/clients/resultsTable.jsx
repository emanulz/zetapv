import React from 'react';
import { connect } from "react-redux"

import { clientSelected } from '../../sidebar/clients/actions.js'
import { hidePanel } from './actions.js'

@connect((store) => {
  return {
    matches: store.searchClients.clientsMatched,
    clients: store.clients.clients
  };
})
export default class resultsTable extends React.Component {

    selectClient(code, ev){
        this.props.dispatch(clientSelected(code, this.props.clients))// dispatchs action according to result
        this.props.dispatch(hidePanel())
    }

    render(){

        let clients = this.props.matches.map((item)=>{

            let hasCredit = (item.has_credit) ? 'SI' : 'NO'

            return <tr onDoubleClick={this.selectClient.bind(this, item.code)} key={item.code}>
                    <td> {item.code} </td>
                    <td> {item.name} {item.last_name} </td>
                    <td> {hasCredit} </td>
                    <td> 0 </td>
                  </tr>

        })

        return  <form action="" className="col-sm-12 form-horizontal">
                    <div className="form-group">
                        <div className="col-sm-12">
                            <table id="cliente-search-table" className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Nombre</th>
                                        <th>Crédito</th>
                                        <th>Saldo</th>
                                    </tr>
                                </thead>

                                <tbody className="client-search-table-body">
                                    {clients}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </form>

        }

}
