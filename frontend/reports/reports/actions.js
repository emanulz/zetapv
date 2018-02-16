import React from 'react'
import {formatDate} from '../../utils/formatDate.js'

export function salesReport(sales, iniDate, endDate, client) {

  const initialDate = iniDate != '' ? new Date(iniDate).setHours(0, 0, 0, 0) : new Date('01-01-1980').setHours(0, 0, 0, 0)
  const finalDate = endDate != '' ? new Date(endDate).setHours(0, 0, 0, 0) : new Date().setHours(0, 0, 0, 0)

  const filteredSales = sales.filter(sale => {
    const saleDate = new Date(sale.created).setHours(0, 0, 0, 0)

    if (client == 0) {

      return saleDate >= initialDate && saleDate <= finalDate

    } else {

      return sale.client._id == client && saleDate >= initialDate && saleDate <= finalDate
    }

  })

  filteredSales.sort((a, b) => {
    if (a.id > b.id) {
      return 1
    }
    if (a.id < b.id) {
      return -1
    }
    return 0
  })

  const thead = <thead>
    <tr>
      <td># Factura</td>
      <td>Fecha</td>
      <td>Cliente</td>
      <td>Sub-Total</td>
      <td>IV</td>
      <td>Total</td>
    </tr>
  </thead>

  let total = 0
  let subtotal = 0
  let totalIv = 0

  const tbody = filteredSales.map(sale => {

    total = total + parseFloat(sale.cart.cartTotal)
    subtotal = subtotal + parseFloat(sale.cart.cartSubtotal)
    totalIv = totalIv + parseFloat(sale.cart.cartTaxes)

    return <tr key={sale._id}>
      <td><a target='_blank' href={`/sales/pos/${sale.id}`}>{sale.id}</a></td>
      <td>{formatDate(sale.created)}</td>
      <td>{`${sale.client.name} ${sale.client.last_name}`}</td>
      <td>₡ {parseFloat(sale.cart.cartSubtotal).formatMoney(2, ',', '.')}</td>
      <td>₡ {parseFloat(sale.cart.cartTaxes).formatMoney(2, ',', '.')}</td>
      <td>₡ {parseFloat(sale.cart.cartTotal).formatMoney(2, ',', '.')}</td>
    </tr>
  })

  const totals = <table className='table'>
    <tbody>
      <tr>
        <th>Sub-total</th>
        <td>₡ {subtotal.formatMoney(2, ',', '.')}</td>
      </tr>
      <tr>
        <th>IV</th>
        <td>₡ {totalIv.formatMoney(2, ',', '.')}</td>
      </tr>
      <tr className='total-row'>
        <th>Total</th>
        <td>₡ {total.formatMoney(2, ',', '.')}</td>
      </tr>
    </tbody>
  </table>

  return {thead: thead, tbody: tbody, totals: totals}

}

export function pricesReport(products, price1, price2, price3, cost) {

  const thead = <thead>
    <tr>
      <td>Código</td>
      <td>Descripción</td>
      <td>Costo</td>
      <td>Precio1</td>
      <td>Precio2</td>
      <td>Precio3</td>
    </tr>
  </thead>

  const tbody = products.map(product => {
    return <tr key={product._id}>
      <td>{product.code}</td>
      <td>{product.description}</td>
      <td>₡ {parseFloat(product.cost).formatMoney(2, ',', '.')}</td>
      <td>₡ {parseFloat(product.price).formatMoney(2, ',', '.')}</td>
      <td>₡ {parseFloat(product.price2).formatMoney(2, ',', '.')}</td>
      <td>₡ {parseFloat(product.price3).formatMoney(2, ',', '.')}</td>
    </tr>
  })

  return {thead: thead, tbody: tbody, totals: ''}
}
