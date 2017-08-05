import React from 'react'

import Fields from './fields.jsx'

import {connect} from 'react-redux'

@connect((store) => {
  return { clients: store.clients.clients }
})
export default class Update extends React.Component {
  componentWillMount() {
    this.props.dispatch({type: 'CLEAR_CLIENT', payload: ''})
  }
  render() {
    return <div className='create row'>
      <h1>Crear CLiente</h1>

      <Fields create update={false} location={this.props.location} />

    </div>
  }
}
