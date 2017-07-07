import React from 'react';
import { connect } from "react-redux"

import { searchProduct } from "./actions"

@connect((store) => {
  return {
    products: store.products.products,
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
            this.searchProductAction()
        }

        else{
            this.state.searchVal = ev.target.value
        }

    }

    searchProductAction(){
        let val = this.state.searchVal
        this.props.dispatch(searchProduct(val, this.props.products))
    }

    render(){

        return  <form action="" className="col-sm-12 form-horizontal">
                    <div className="form-group">
                        <div className="col-xs-12">
                            <label for="product-search-input">Búsqueda por Descripción:</label>
                        </div>
                        <div className="col-xs-7 col-sm-8">
                            <input onKeyPress={this.inputKeyPress.bind(this)} onChange={this.inputKeyPress.bind(this)} type="text" style={{'width':'100%'}} id="product-search-input" className="form-control"/>
                        </div>
                        <div className="col-xs-2">
                            <button onClick={this.searchProductAction.bind(this)} type="button" id="product-search-btn" style={{'height': '48px', 'width':'48px'}}
                                    className="btn btn-success form-control marginBtnAdd2">
                                    <span className="fa fa-search"></span>
                            </button>
                        </div>
                    </div>
                </form>

        }

}
