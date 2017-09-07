import React from 'react'
import {connect} from 'react-redux'
import {saveConfig} from '../actions'

@connect((store) => {
  return {
    userConfig: store.config.userCompany
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

    this.props.dispatch({type: 'SET_CONFIG', payload: {data: userConfig, property: 'userCompany'}})
  }

  // BUTTONS
  saveBtn() {
    const userConfig = this.props.userConfig

    userConfig.updated = new Date()
    // FUNCTION TO SAVE
    // console.log(userConfig)
    this.props.dispatch(
      saveConfig(
        'company', 'user', 'FETCH_CONFIG_FULFILLED', 'FETCH_CONFIG_FAILED', userConfig
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
          <label>Razón Social</label>
          <input value={this.props.userConfig.legalName || ''} name='legalName' onChange={this.handleInputChange.bind(this)}
            type='text' className='form-control' />
        </div>

        <div className='form-group'>
          <label>Nombre Comercial</label>
          <input value={this.props.userConfig.comercialName || ''} name='comercialName' onChange={this.handleInputChange.bind(this)}
            type='text' className='form-control' />
        </div>

        <div className='form-group'>
          <label>Tipo de Identificación</label>
          <select onChange={this.handleInputChange.bind(this)} className='form-control' name='idType'
            value={this.props.userConfig.idType || ''} >
            <option value=''>-</option>
            <option value='PERSON'>Física</option>
            <option value='JURIDI'>Jurídica</option>
          </select>
        </div>

        <div className='form-group'>
          <label>Identificación</label>
          <input value={this.props.userConfig.id || ''} onChange={this.handleInputChange.bind(this)} name='id'
            type='text' className='form-control' />
        </div>

        <div className='form-group'>
          <label>Logo</label>
          <input value={this.props.userConfig.logo || ''} onChange={this.handleInputChange.bind(this)} name='logo'
            type='text' className='form-control' />
        </div>

        <div className='form-group'>
          <label>Direccion 1</label>
          <input value={this.props.userConfig.address1 || ''} onChange={this.handleInputChange.bind(this)}
            name='address1' type='text' className='form-control' />
        </div>

        <div className='form-group'>
          <label>Direccion 2</label>
          <input value={this.props.userConfig.address2 || ''} onChange={this.handleInputChange.bind(this)}
            name='address2' type='text' className='form-control' />
        </div>

        <div className='form-group'>
          <label>Provincia</label>
          <input value={this.props.userConfig.province || ''} onChange={this.handleInputChange.bind(this)}
            name='province' type='text' className='form-control' />
        </div>

        <div className='form-group'>
          <label>País</label>
          <input value={this.props.userConfig.country || ''} onChange={this.handleInputChange.bind(this)}
            name='country' type='text' className='form-control' />
        </div>

        <div className='form-group'>
          <label>Teléfonos</label>
          <input value={this.props.userConfig.telephones || ''} onChange={this.handleInputChange.bind(this)}
            name='telephones'type='text' className='form-control' />
        </div>

        <div className='form-group'>
          <label>Email</label>
          <input value={this.props.userConfig.email || ''} onChange={this.handleInputChange.bind(this)} name='email'
            type='text' className='form-control' />
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
