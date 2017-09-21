import React from 'react'
import alertify from 'alertifyjs'
import {connect} from 'react-redux'
import {saveItem, setItem, updateItem, deleteItem, getNextNumericCode} from '../utils/api'
import {checkExpenseData} from './actions'
import Select2 from 'react-select2-wrapper'

@connect((store) => {
  return {
    expense: store.expenses.expenseActive,
    expenses: store.expenses.expenses
  }
})

export default class Fields extends React.Component {
  // REACT METHODS
  componentWillMount() {

    this.props.dispatch({type: 'CLEAR_EXPENSE', payload: ''})

    if (this.props.update) {
      const code = parseInt(this.props.location.pathname.split('/').pop())

      const kwargs = {
        db: 'general',
        docType: 'EXPENSE',
        lookUpField: 'code',
        lookUpValue: code,
        lookUpName: 'código',
        modelName: 'Gastos',
        dispatchType: 'SET_EXPENSE'
      }

      this.props.dispatch(setItem(kwargs))
    }
  }

  // HANDLE INPUT CHANGE
  handleInputChange(event) {

    const target = event.target
    let value
    console.log(target.value)
    // const value = target.type === 'checkbox' ? target.checked : target.value
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
      case 'date':
      {
        const today = new Date()
        const dateInput = target.value.split('-')
        today.setDate(dateInput[2])
        today.setMonth(dateInput[1] - 1)
        today.setYear(dateInput[0])
        value = today
        break
      }
      default:
      {
        value = target.value
      }
    }

    const name = target.name
    console.log(target.name)

    const expense = {
      ...this.props.expense
    }

    expense[name] = value

    this.props.dispatch({type: 'SET_EXPENSE', payload: expense})
  }

  // BUTTONS
  saveBtn() {
    const expense = this.props.expense
    const expenses = this.props.expenses
    expense.code = getNextNumericCode(expenses, 'code')
    const fieldsOk = checkExpenseData(expense, expenses)

    if (fieldsOk) {
      expense.created = new Date()
      const kwargs = {
        db: 'general',
        item: expense,
        sucessMessage: 'Gasto creado Correctamente.',
        errorMessage: 'Hubo un error al crear el Gasto, intente de nuevo.',
        dispatchType: 'CLEAR_EXPENSE'
      }

      this.props.dispatch(saveItem(kwargs))
    }
  }

  updateBtn() {

    const expense = this.props.expense
    const expenses = this.props.expenses
    const fieldsOk = checkExpenseData(expense, expenses)
    expense.updated = new Date()

    if (fieldsOk) {
      const kwargs = {
        db: 'general',
        item: expense,
        modelName: 'Gasto',
        dispatchType: 'SET_EXPENSE'
      }
      this.props.dispatch(updateItem(kwargs))
    }
  }

  deleteBtn() {

    const expense = this.props.expense
    const _this = this
    const kwargs = {
      db: 'general',
      item: expense,
      modelName: 'Expensee',
      dispatchType: 'CLEAR_EXPENSE'
    }
    // ALERTIFY CONFIRM
    alertify.confirm('Eliminar', `Desea Eliminar el Expensee ${expense.code} - ${expense.name}? Esta acción no se puede deshacer.`, function() {
      _this.props.dispatch(deleteItem(kwargs))
    }, function() {
      return true
    }).set('labels', {
      ok: 'Si',
      cancel: 'No'
    })
  }

  render() {
    // ********************************************************************
    // BUTTONS
    // ********************************************************************
    const buttons = this.props.update
      ? <div className='col-xs-10 col-sm-offset-1'>
        <div className='col-xs-12'>
          <button onClick={this.updateBtn.bind(this)} className=' form-control btn-success'>
            Actualizar
          </button>
        </div>

        <div className='col-xs-12'>
          <button className='form-control btn-primary'>
            Guardar y agregar otro
          </button>
        </div>

        <div className='col-xs-12'>
          <button onClick={this.deleteBtn.bind(this)} className='form-control btn-danger'>
            Eliminar
          </button>
        </div>
      </div>
      : <div className='col-xs-10 col-sm-offset-1'>
        <div className='col-xs-12'>
          <button onClick={this.saveBtn.bind(this)} className=' form-control btn-success'>
            Guardar
          </button>
        </div>

        <div className='col-xs-12'>
          <button className='form-control btn-primary'>
            Guardar y agregar otro
          </button>
        </div>

        <div className='col-xs-12'>
          <button className='form-control btn-danger'>
            Cancelar
          </button>
        </div>
      </div>

    // ********************************************************************
    // DATE TO SET
    // ********************************************************************
    let date = this.props.expense.date
    if (date && this.props.update) {
      const newDate = new Date(date)
      date = `${newDate.getFullYear()}-${('0' + (newDate.getMonth() + 1)).slice(-2)}-${('0' + newDate.getDate()).slice(-2)}`
    }
    if (this.props.create) {
      const newDate = date
      date = `${newDate.getFullYear()}-${('0' + (newDate.getMonth() + 1)).slice(-2)}-${('0' + newDate.getDate()).slice(-2)}`
    }

    // ********************************************************************
    // RETURN BLOCK
    // ********************************************************************
    return <div className='col-xs-12 row'>

      <div className='col-xs-6 create-fields-container first'>

        <span>Datos generales</span>
        <hr />

        <div className='form-group row create-input-block'>
          <div className='col-xs-12'>

            <label>Fecha de la Factura</label>
            <input value={date} name='date' onChange={this.handleInputChange.bind(this)} type='date' className='form-control' />

          </div>
        </div>

        <div className='form-group'>
          <label>Categoría</label>
          <Select2
            name='category'
            value={this.props.expense.category}
            className='form-control'
            onSelect={this.handleInputChange.bind(this)}
            data={[]}
            options={{
              placeholder: 'Elija una categoría...'
            }}
          />
        </div>

        <div className='form-group'>
          <label>Documento</label>
          <input value={this.props.expense.document} onChange={this.handleInputChange.bind(this)} name='document'
            type='text'
            className='form-control' />
        </div>

        <div className='form-group'>
          <label>Monto</label>
          <input value={this.props.expense.amount} name='amount' onChange={this.handleInputChange.bind(this)}
            type='number'
            className='form-control' />
        </div>

        <div className='form-group'>
          <label>Detalle</label>
          <input value={this.props.expense.detail} name='detail' onChange={this.handleInputChange.bind(this)} type='text'
            className='form-control' />
        </div>

      </div>

      <div className='col-xs-12 col-sm-6 create-fields-container buttons second'>

        <span>Crear</span>
        <hr />
        {buttons}
      </div>

    </div>
  }
}
