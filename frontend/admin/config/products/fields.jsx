import React from 'react'
import {connect} from 'react-redux'
import {saveConfig} from '../actions'

@connect((store) => {
  return {
    userConfig: store.config.userProducts
  }
})

export default class Fields extends React.Component {
  // REACT METHODS

  // HANDLE INPUT CHANGE
  handleInputChange(event) {

    const target = event.target
    let value

    switch (target.type) {
      case 'checkbox':
      {
        value = target.checked
        break
      }
      case 'number':
      {
        value = parseFloat(target.value)
          ? parseFloat(target.value)
          : ''
        break
      }
      default:
      {
        value = target.value
      }
    }

    const name = target.name

    const userConfig = {
      ...this.props.userConfig
    }

    userConfig[name] = value

    this.props.dispatch({type: 'SET_CONFIG', payload: {data: userConfig, property: 'userProducts'}})
  }

  // BUTTONS
  saveBtn() {
    const userConfig = this.props.userConfig

    userConfig.updated = new Date()
    // FUNCTION TO SAVE
    // console.log(userConfig)
    this.props.dispatch(
      saveConfig(
        'products', 'user', 'FETCH_CONFIG_FULFILLED', 'FETCH_CONFIG_REJECTED', userConfig
      )
    )

  }
  render() {
    // ********************************************************************
    // BUTTONS
    // ********************************************************************
    const buttons = <div className='col-xs-10 col-sm-offset-1'>
      <div className='col-xs-12'>
        <button onClick={this.saveBtn.bind(this)} className=' form-control btn-success'>
          Guardar
        </button>
      </div>
    </div>

    // ********************************************************************
    // RETURN BLOCK
    // ********************************************************************
    return <div className='col-xs-12 row'>

      <div className='col-xs-6 create-fields-container first'>

        <span>Datos generales</span>
        <hr />

        <div className='form-group'>
          <label>Impuesto 2</label>
          <input checked={this.props.userConfig.taxes2Field || false} name='taxes2Field' onChange={this.handleInputChange.bind(this)}
            type='checkbox' className='form-control' />
        </div>

        <div className='form-group'>
          <label>Comercio Justo</label>
          <input checked={this.props.userConfig.fairTradeField || false} name='fairTradeField' onChange={this.handleInputChange.bind(this)}
            type='checkbox' className='form-control' />
        </div>

      </div>

      <div className='col-xs-12 col-sm-6 create-fields-container buttons second'>

        <span>Guardar</span>
        <hr />
        {buttons}
      </div>

    </div>
  }
}
