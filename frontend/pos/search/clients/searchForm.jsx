import React from 'react';
import { connect } from "react-redux"

import { searchClient } from "./actions"

@connect((store) => {
  return {
    clients: store.clients.clients,
  };
})
export default class searchForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {searchVal: ''};
    }

    inputKeyPress(ev){

        if(ev.key=='Enter'){
            ev.preventDefault()
            this.searchClientAction()
        }

        else{
            this.state.searchVal = ev.target.value
        }

    }

    searchClientAction(){
        let val = this.state.searchVal
        this.props.dispatch(searchClient(val, this.props.clients))
    }

    render(){

        return  <form action="" className="col-sm-12 form-horizontal">
                    <div className="form-group">
                        <div className="col-xs-12">
                            <label for="client-search-input">Búsqueda por Nombre:</label>
                        </div>
                        <div className="col-xs-7 col-sm-8">
                            <input onKeyPress={this.inputKeyPress.bind(this)} onChange={this.inputKeyPress.bind(this)} type="text" style={{'width':'100%'}} id="client-search-input" className="form-control"/>
                        </div>
                        <div className="col-xs-2">
                            <button onClick={this.searchClientAction.bind(this)} type="button" id="client-search-btn" style={{'height': '48px', 'width':'48px'}}
                                    className="btn btn-success form-control marginBtnAdd2">
                                    <span className="fa fa-search"></span>
                            </button>
                        </div>
                    </div>
                </form>

        }

}
