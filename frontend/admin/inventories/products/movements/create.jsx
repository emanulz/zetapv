import React from 'react'

import Fields from './fields.jsx'

import {connect} from 'react-redux'

@connect((store) => {
  return { movements: store.inventories.productmovements }
})
export default class Update extends React.Component {

  render() {
    return <div className='create row'>
      <h1>Crear Movimiento de Producto</h1>

      <Fields create update={false} location={this.props.location} />

    </div>
  }
}
