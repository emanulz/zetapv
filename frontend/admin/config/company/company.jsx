import React from 'react'

import Fields from './fields.jsx'
import {hideConfigBar} from '../../layout/configBar/actions'

export default class Update extends React.Component {

  componentDidMount() {
    hideConfigBar()
  }

  render() {
    return <div className='create row'>
      <h1>Configuración de la compañía:</h1>

      <Fields create update={false} location={this.props.location} />

    </div>
  }
}
