
import React from 'react'
import { connect } from "react-redux"

import { checkFields } from './actions.js'

@connect((store) => {
  return {
    clients: store.clients.clients
  }
})
export default class Add extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            name: '',
            last_name: '',
            id: '',
            code: '',
            has_credit: false,
            credit_limit: 0,
            credit_days: 0
            }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        let newState = this.state

        this.setState({

          [name]: value

        })


    }

    saveClicked(){

      checkFields(this.state, this.props.clients)

    }


    render(){
        return <div className='client'>

                <div className='client-header'>

                Agregar Cliente

                </div>

                <div className='row'>
                    <div className='client-fields col-xs-12 col-sm-6'>
                        <form>

                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input value={this.state.name}
                                           name="name"
                                           onChange={this.handleInputChange}
                                           type="text"
                                           className="form-control"
                                    />
                                </div>


                                <div className="form-group">
                                    <label>Apellidos</label>
                                    <input value={this.state.last_name}
                                           name="last_name"
                                           onChange={this.handleInputChange}
                                           type="text"
                                           className="form-control"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Identificación</label>
                                    <input value={this.state.id}
                                           onChange={this.handleInputChange}
                                           name="id" type="text"
                                           className="form-control"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Código</label>
                                    <input value={this.state.code}
                                           name="code"
                                           onChange={this.handleInputChange}
                                           type="text"
                                           className="form-control"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Tiene Crédito</label>
                                    <input checked={this.state.has_credit}
                                           name="has_credit"
                                           onChange={this.handleInputChange}
                                           type='checkbox'
                                           className="form-control"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Límite de crédito</label>
                                    <input value={this.state.credit_limit}
                                           name="credit_limit"
                                           onChange={this.handleInputChange}
                                           type="number"
                                           className="form-control"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Días de crédito</label>
                                    <input value={this.state.credit_days}
                                           name="credit_days"
                                           onChange={this.handleInputChange}
                                           type="number"
                                           className="form-control"
                                    />
                                </div>

                        </form>

                    </div>

                    <div className='client-buttons col-xs-12 col-sm-6'>

                        <div className='client-buttons col-xs-12 col-sm-8 col-md-6 col-sm-offset-1 col-md-offset-3'>

                            <button onClick={this.saveClicked.bind(this)} className='form-control btn-success'> Guardar </button>
                            <button className='form-control btn-primary'> Guardar y agregar otro </button>
                            <button className='form-control btn-danger'> Cancelar </button>

                        </div>

                    </div>

               </div>


              </div>
    }

}
