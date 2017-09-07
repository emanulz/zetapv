import React from 'react'

import Fields from './fields.jsx'

export default class Update extends React.Component {

  render() {
    return <div className='create row'>
      <h1>Crear Gasto</h1>

      <Fields create update={false} location={this.props.location} />

    </div>
  }
}
