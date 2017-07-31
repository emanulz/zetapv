import React from 'react'

import Fields from './fields.jsx'

export default class Update extends React.Component {
  render() {
    return <div className='create-product row'>
      <h1>Crear Producto</h1>

      <Fields create update={false} location={this.props.location} />

    </div>
  }
}
