/*
 * Module dependencies
 */
import React from 'react'
import {Link} from 'react-router-dom'
import {formatDateTimeAmPm} from '../../../utils/formatDate.js'

// data Tables
const $ = require('jquery')
$.DataTable = require('datatables.net')
window.jQuery = $
window.$ = $

export default class DataTable extends React.Component {

  componentWillReceiveProps() {

    $(this.refs.table).DataTable().destroy()

  }

  componentDidUpdate() {

    $(this.refs.table).DataTable({
      destroy: true,
      lengthMenu: [
        [
          10, 25, 50, 100, -1
        ],
        [10, 25, 50, 100, 'Todos']
      ],
      language: {

        processing: 'Procesando...',
        search: 'Buscar&nbsp;:',
        lengthMenu: 'Mostrar _MENU_ elementos',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ elementos',
        infoEmpty: 'Mostrando 0 a 0 de 0 elementos',
        infoFiltered: '(filtrado de _MAX_ elementos en total)',
        loadingRecords: 'Cargando Registros...',
        zeroRecords: 'No hay Registros',
        emptyTable: 'No hay datos disponibles en la tabla',
        paginate: {
          first: 'Primero',
          previous: 'Anterior',
          next: 'Siguiente',
          last: 'Último'
        },
        aria: {
          sortAscending: 'Ascendente',
          sortDescending: 'Descendente'
        }
      }
    })

  }

  generateBody(headerOrder, data) {}

  generateRow() {}

  render() {
    const headerOrder = this.props.headerOrder
    const model = this.props.model
    const data = this.props.data.length
      ? this.props.data
      : []

    const tableHeader = headerOrder.map(item => {

      const ret = item.type != 'bool'
        ? <th key={item.field}>
          {item.text}
        </th>
        : <th style={{
          textAlign: 'center'
        }} key={item.field}>
          {item.text}
        </th>
      return ret
    })

    const bodyRows = data.map(el => {

      return <tr key={el._id}>
        {headerOrder.map(header => {

          // const fieldName = header.field
          // const itemToRender = el[fieldName]

          const fieldNames = header.field.split('.')
          let itemToRender = ''

          if (fieldNames.length == 1) itemToRender = el[fieldNames[0]]
          if (fieldNames.length == 2) itemToRender = el[fieldNames[0]][fieldNames[1]]
          if (fieldNames.length == 3) itemToRender = el[fieldNames[0]][fieldNames[1]][fieldNames[2]]
          if (fieldNames.length == 4) itemToRender = el[fieldNames[0]][fieldNames[1]][fieldNames[2]][fieldNames[3]]

          const fieldNames2 = header.field2 ? header.field2.split('.') : []
          let itemToRender2 = ''

          if (fieldNames2.length == 1) itemToRender2 = el[fieldNames2[0]]
          if (fieldNames2.length == 2) itemToRender2 = el[fieldNames2[0]][fieldNames2[1]]
          if (fieldNames2.length == 3) itemToRender2 = el[fieldNames2[0]][fieldNames2[1]][fieldNames2[2]]
          if (fieldNames2.length == 4) itemToRender2 = el[fieldNames2[0]][fieldNames2[1]][fieldNames2[2]][fieldNames2[3]]

          let item
          switch (header.type) {
            case 'price':
            {
              item = <td key={`${el._id}_${header.field}`} data-order={itemToRender}>
                ₡ {parseFloat(itemToRender).formatMoney(2, ',', '.')}
              </td>
              break
            }

            case 'date':
            {
              // const date = moment(itemToRender).format('DD-MM-YYYY HH:mm:ss')
              const date = formatDateTimeAmPm(itemToRender)
              item = <td key={`${el._id}_${header.field}`} data-order={itemToRender}>
                {date}
              </td>
              break
            }

            case 'bool':
            {
              const icon = itemToRender
                ? 'fa fa-check'
                : 'fa fa-minus-square'
              item = <td style={{
                textAlign: 'center'
              }} key={`${el._id}_${header.field}`} data-order={itemToRender}>
                <span className={icon} />
              </td>
              break
            }

            case 'primary':
            {

              item = <td key={`${el._id}_${header.field}`} data-order={itemToRender}>
                {/* <Link to={`/admin/${model}/edit#${itemToRender}`}>
                                              {itemToRender}
                                          </Link> */}
                <Link to={{
                  pathname: `/admin/${model}/edit/${itemToRender}`,
                  state: {
                    el: el
                  }
                }}>
                  {itemToRender}
                </Link>
              </td>
              break
            }

            case 'primaryNoEdit':
            {

              item = <td key={`${el._id}_${header.field}`} data-order={itemToRender}>
                {/* <Link to={`/admin/${model}/edit#${itemToRender}`}>
                                              {itemToRender}
                                          </Link> */}
                <Link to={{
                  pathname: `/admin/${model}/${itemToRender}`,
                  state: {
                    el: el
                  }
                }}>
                  {itemToRender}
                </Link>
              </td>
              break
            }

            case 'link':
            {

              item = <td key={`${el._id}_${header.field}`} data-order={itemToRender}>
                {/* <Link to={`/admin/${model}/edit#${itemToRender}`}>
                                              {itemToRender}
                                          </Link> */}
                <a target='_blank' href={`${header.baseLink}/${itemToRender}`}>
                  {itemToRender}
                </a>
              </td>
              break
            }

            case 'foreingKey':
            {
              const code = header.split ? itemToRender.split(header.split)[header.splitIndex] : itemToRender

              const filtered = header.iterable.filter(item => {
                return item[header.lookUpField] == code
              })

              const returnItem = filtered.length ? filtered[0][header.foreingKeyField] : '-'
              item = <td key={`${el._id}_${header.field}`} data-order={returnItem}>
                {returnItem}
              </td>
              break
            }

            case 'composed':
            {
              item = <td key={`${el._id}_${header.field}`} data-order={itemToRender}>
                {`${itemToRender} ${itemToRender2}`}
              </td>
              break
            }

            default:
            {
              item = <td key={`${el._id}_${header.field}`} data-order={itemToRender}>
                {itemToRender}
              </td>
            }

          }

          return item
        })}
      </tr>
    })

    return <div className='dataTables'>

      <div>
        <Link className='addBtn' to={`${this.props.addLink}`}>

          <span className='fa fa-plus' />
          Agregar

        </Link>
      </div>

      <table ref='table' className='table' cellSpacing='0' width='100%'>

        <thead>
          <tr>
            {tableHeader}
          </tr>
        </thead>

        <tfoot>
          <tr>
            {tableHeader}
          </tr>
        </tfoot>

        <tbody>
          {bodyRows}
        </tbody>

      </table>

    </div>
  }
}
