import React from 'react'
import {connect} from 'react-redux'

import Fields from './fields.jsx'

@connect((store) => {
  return { movement: store.inventories.productmovementActive }
})
export default class Update extends React.Component {

  render() {

    return <div className='create row'>

      <h1>Movimento de producto # {this.props.movement.document}</h1>

      <Fields create={false} update location={this.props.location} />

    </div>

  }

}
