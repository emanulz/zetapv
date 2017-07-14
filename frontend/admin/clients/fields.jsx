
import React from 'react'

export default class Fields extends React.Component {


    


    render(){

        return <div className='row'>
                    <div className='client-fields col-xs-12 col-sm-6'>
                        <form>

                                <div className="form-group">
                                    <label for="client_name">Nombre</label>
                                    <input type="text" className="form-control" id="client_name" />
                                </div>


                                <div className="form-group">
                                    <label for="client_last_name">Apellidos</label>
                                    <input type="text" className="form-control" id="client_last_name" />
                                </div>

                                <div className="form-group">
                                    <label for="client_id">Identificación</label>
                                    <input type="text" className="form-control" id="client_id" />
                                </div>

                                <div className="form-group">
                                    <label for="client_code">Código</label>
                                    <input type="text" className="form-control" id="client_code" />
                                </div>

                                <div className="form-group">
                                    <label for="client_has_credit">Tiene Crédito</label>
                                    <select className="form-control" id="client_has_credit">
                                      <option>No</option>
                                      <option>Si</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label for="client_credit_limit">Límite de crédito</label>
                                    <input type="text" className="form-control" id="client_credit_limit" />
                                </div>

                        </form>

                    </div>

                    <div className='client-buttons col-xs-12 col-sm-6'>

                        <div className='client-buttons col-xs-12 col-sm-8 col-md-6 col-sm-offset-1 col-md-offset-3'>

                            <button className='form-control btn-success'> Guardar </button>
                            <button className='form-control btn-primary'> Guardar y agregar otro </button>
                            <button className='form-control btn-danger'> Cancelar </button>

                        </div>

                    </div>

               </div>


    }

}
