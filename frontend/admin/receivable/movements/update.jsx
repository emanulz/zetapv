import React from 'react'
import {connect} from 'react-redux'

import Fields from './fields.jsx'

@connect((store) => {
  return { movement: store.receivable.clientmovementActive }
})
export default class Update extends React.Component {

  render() {

    return <div className='create row'>

      <h1>Movimento de crédito # {this.props.movement.document}</h1>

      <Fields create={false} update location={this.props.location} />

    </div>

  }

}
