import React from 'react'

import Fields from './fields.jsx'

import {connect} from 'react-redux'

@connect((store) => {
  return { subdepartment: store.products.subdepartmentActive }
})
export default class Update extends React.Component {
  componentWillMount() {
    this.props.dispatch({type: 'CLEAR_SUBDEPARTMENT', payload: ''})
  }
  render() {
    return <div className='create row'>
      <h1>Crear Sub-Departamento</h1>

      <Fields create update={false} location={this.props.location} />

    </div>
  }
}
