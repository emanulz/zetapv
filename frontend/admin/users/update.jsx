import React from 'react'

import Fields from './fields.jsx'

export default class Update extends React.Component {

  render() {

    return <div className='create row'>

      <h1>Editar Usuario</h1>

      <Fields create={false} update location={this.props.location} />

    </div>

  }

}
