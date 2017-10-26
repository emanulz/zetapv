/*
 * Module dependencies
 */
import React from 'react'
import {connect} from 'react-redux'

@connect((store) => {
  return {
    warehouses: store.inventories.warehouses
  }
})
export default class productMovements extends React.Component {

  // Render the product
  render() {

    const data = this.props.movements.map(movement => {
      const type = movement.type == 'INPUT'
        ? 'Entrada'
        : movement.type == 'OUTPUT'
          ? 'Salida'
          : movement.type == 'ADJUST' ? 'TOMA FíSICA' : ''

      const warehouseFiltered = this.props.warehouses.filter(warehouse => warehouse._id == movement.warehouse)
      const warehouseName = warehouseFiltered.length
        ? `${warehouseFiltered[0].code} - ${warehouseFiltered[0].name}`
        : ''

      return <tr key={movement._id}>
        <td>{movement.document}</td>
        <td>{type}</td>
        <td>{movement.amount}</td>
        <td>{warehouseName}</td>
      </tr>
    })

    return <div className='details-container-data-movements'>

      Movimientos Recientes:

      <table className='table'>
        <thead>
          <tr>
            <th>Movimento</th>
            <th>Tipo</th>
            <th>Cantidad</th>
            <th>Bodega</th>
          </tr>
        </thead>
        <tbody>
          {data}
        </tbody>
      </table>

    </div>
  }
}
