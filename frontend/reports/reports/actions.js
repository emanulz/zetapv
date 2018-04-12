import React from 'react'
import {formatDate} from '../../utils/formatDate.js'
import { format } from 'date-fns'

export function salesReport(sales, iniDate, endDate, client, user) {

  const initialDate = iniDate != '' ? new Date(`${iniDate} 00:00:00`) : new Date('01-01-1980 00:00:00').setHours(0, 0, 0, 0)
  const finalDate = endDate != '' ? new Date(`${endDate} 00:00:00`).setHours(0, 0, 0, 0) : new Date().setHours(0, 0, 0, 0)

  const filteredSales = sales.filter(sale => {
    const saleDate = new Date(sale.created).setHours(0, 0, 0, 0)

    if (client == 0) {

      return saleDate >= initialDate && saleDate <= finalDate

    } else {

      return sale.client._id == client && saleDate >= initialDate && saleDate <= finalDate
    }

  })

  const filteredSalesUser = filteredSales.filter(sale => {

    if (user == 0) {

      return true

    } else if (sale.user) {

      return sale.user._id == user

    } else {

      return false

    }

  })

  filteredSalesUser.sort((a, b) => {
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

  const tbody = filteredSalesUser.map(sale => {

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

export function utilitiesReport(sales, iniDate, endDate, client, user) {

  const initialDate = iniDate != '' ? new Date(`${iniDate} 00:00:00`) : new Date('01-01-1980 00:00:00').setHours(0, 0, 0, 0)
  const finalDate = endDate != '' ? new Date(`${endDate} 00:00:00`).setHours(0, 0, 0, 0) : new Date().setHours(0, 0, 0, 0)

  const filteredSales = sales.filter(sale => {
    const saleDate = new Date(sale.created)
    // console.log('Sale Date', saleDate.getDate())
    // console.log('Initial Date', initialDate.getDate())
    // console.log('Final Date', finalDate.getDate())
    // saleDate.setDate(saleDate.getDate() + 1)
    if (client == 0) {

      return saleDate >= initialDate && saleDate <= finalDate

    } else {

      return sale.client._id == client && saleDate >= initialDate && saleDate <= finalDate
    }

  })

  const filteredSalesUser = filteredSales.filter(sale => {

    if (user == 0) {

      return true

    } else if (sale.user) {

      return sale.user._id == user

    } else {

      return false

    }

  })

  filteredSalesUser.sort((a, b) => {
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
      <td>Costo</td>
      <td>IV</td>
      <td>Total</td>
      <td>Utilidad</td>
    </tr>
  </thead>

  let total = 0
  let subtotal = 0
  let totalIv = 0
  let utility = 0
  let cost = 0

  const tbody = filteredSalesUser.map(sale => {

    total = total + parseFloat(sale.cart.cartTotal)
    subtotal = subtotal + parseFloat(sale.cart.cartSubtotal)
    totalIv = totalIv + parseFloat(sale.cart.cartTaxes)

    const subUtility = sale.cart.cartItems.map(item => {
      const cost1 = item.product.cost ? item.product.cost : 0
      const utility2 = parseFloat(item.subtotal) - (parseFloat(cost1) * parseFloat(item.qty))
      return utility2
    })

    const subCost = sale.cart.cartItems.map(item => {
      const cost1 = item.product.cost ? item.product.cost : 0
      const cost2 = parseFloat(cost1) * parseFloat(item.qty)
      return cost2
    })

    const localUtility = subUtility.reduce((a, b) => a + b, 0)
    utility = parseFloat(utility) + parseFloat(localUtility)

    const localCost = subCost.reduce((a, b) => a + b, 0)
    cost = parseFloat(cost) + parseFloat(localCost)

    return <tr key={sale._id}>
      <td><a target='_blank' href={`/sales/pos/${sale.id}`}>{sale.id}</a></td>
      <td>{formatDate(sale.created)}</td>
      <td>{`${sale.client.name} ${sale.client.last_name}`}</td>
      <td>₡ {parseFloat(sale.cart.cartSubtotal).formatMoney(2, ',', '.')}</td>
      <td>₡ {parseFloat(localCost).formatMoney(2, ',', '.')}</td>
      <td>₡ {parseFloat(sale.cart.cartTaxes).formatMoney(2, ',', '.')}</td>
      <td>₡ {parseFloat(sale.cart.cartTotal).formatMoney(2, ',', '.')}</td>
      <td>₡ {parseFloat(localUtility).formatMoney(2, ',', '.')}</td>
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
      <tr>
        <th>Costo total</th>
        <td>₡ {cost.formatMoney(2, ',', '.')}</td>
      </tr>
      <tr>
        <th>Utilidad</th>
        <td>₡ {utility.formatMoney(2, ',', '.')}</td>
      </tr>
      <tr className='total-row'>
        <th>Total</th>
        <td>₡ {total.formatMoney(2, ',', '.')}</td>
      </tr>
    </tbody>
  </table>

  return {thead: thead, tbody: tbody, totals: totals}

}

export function pricesReport(products, cost, price1, price2, price3, department, subdepartment) {

  let theadCost = ''
  let theadPrice1 = ''
  let theadPrice2 = ''
  let theadPrice3 = ''

  let tbodyCost = ''
  let tbodyPrice1 = ''
  let tbodyPrice2 = ''
  let tbodyPrice3 = ''

  if (cost) {
    theadCost = <td>Costo</td>
  }

  if (price1) {
    theadPrice1 = <td>Precio 1</td>
  }

  if (price2) {
    theadPrice2 = <td>Precio 2</td>
  }

  if (price3) {
    theadPrice3 = <td>Precio 3</td>
  }

  const thead = <thead>
    <tr>
      <td>Código</td>
      <td>Descripción</td>
      {theadCost}
      {theadPrice1}
      {theadPrice2}
      {theadPrice3}
    </tr>
  </thead>

  let localProducts = products

  // Filter by dep and sub
  if (department) {
    localProducts = localProducts.filter(el => el.department == department)
  }
  if (subdepartment) {
    localProducts = localProducts.filter(el => el.subdepartment == subdepartment)
  }

  // Sort by code
  localProducts.sort((a, b) => {
    if (a.description > b.description) {
      return 1
    }
    if (a.description < b.description) {
      return -1
    }
    return 0
  })

  const tbody = localProducts.map(product => {

    if (cost) {
      tbodyCost = <td>₡ {parseFloat(product.cost).formatMoney(2, ',', '.')}</td>
    }

    if (price1) {
      tbodyPrice1 = <td>₡ {parseFloat(product.sellPrice).formatMoney(2, ',', '.')}</td>
    }

    if (price2) {
      tbodyPrice2 = <td>₡ {parseFloat(product.sellPrice2).formatMoney(2, ',', '.')}</td>
    }

    if (price3) {
      tbodyPrice3 = <td>₡ {parseFloat(product.sellPrice3).formatMoney(2, ',', '.')}</td>
    }

    return <tr key={product._id}>
      <td>{product.code}</td>
      <td>{product.description}</td>
      {tbodyCost}
      {tbodyPrice1}
      {tbodyPrice2}
      {tbodyPrice3}
    </tr>
  })

  return {thead: thead, tbody: tbody, totals: ''}
}

export function clientsReport(clients) {

  const thead = <thead>
    <tr>
      <td>Código</td>
      <td>Nombre</td>
      <td>Apellido</td>
      <td>Dirección</td>
    </tr>
  </thead>

  const localClients = clients

  // Sort by code
  localClients.sort((a, b) => {
    if (a.code > b.code) {
      return 1
    }
    if (a.code < b.code) {
      return -1
    }
    return 0
  })

  const tbody = localClients.map(client => {

    return <tr key={client._id}>
      <td>{client.code}</td>
      <td>{client.name}</td>
      <td>{client.last_name}</td>
      <td>{client.adress}</td>
    </tr>
  })

  return {thead: thead, tbody: tbody, totals: ''}
}

export function proformasReport(proformas, iniDate, endDate, client, user) {

  const initialDate = iniDate != '' ? new Date(`${iniDate} 00:00:00`) : new Date('01-01-1980 00:00:00').setHours(0, 0, 0, 0)
  const finalDate = endDate != '' ? new Date(`${endDate} 00:00:00`).setHours(0, 0, 0, 0) : new Date().setHours(0, 0, 0, 0)

  const filteredProformas = proformas.filter(proforma => {
    const proformaDate = new Date(proforma.created).setHours(0, 0, 0, 0)

    if (client == 0) {

      return proformaDate >= initialDate && proformaDate <= finalDate

    } else {

      return proforma.client._id == client && proformaDate >= initialDate && proformaDate <= finalDate
    }

  })

  filteredProformas.sort((a, b) => {
    if (a.id > b.id) {
      return 1
    }
    if (a.id < b.id) {
      return -1
    }
    return 0
  })

  const filteredProformasUser = filteredProformas.filter(sale => {

    if (user == 0) {

      return true

    } else if (sale.user) {

      return sale.user._id == user

    } else {

      return false

    }

  })

  const thead = <thead>
    <tr>
      <td># Proforma</td>
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

  const tbody = filteredProformasUser.map(proforma => {

    total = total + parseFloat(proforma.cart.cartTotal)
    subtotal = subtotal + parseFloat(proforma.cart.cartSubtotal)
    totalIv = totalIv + parseFloat(proforma.cart.cartTaxes)

    return <tr key={proforma._id}>
      <td><a target='_blank' href={`/sales/proforma/${proforma.id}`}>{proforma.id}</a></td>
      <td>{formatDate(proforma.created)}</td>
      <td>{`${proforma.client.name} ${proforma.client.last_name}`}</td>
      <td>₡ {parseFloat(proforma.cart.cartSubtotal).formatMoney(2, ',', '.')}</td>
      <td>₡ {parseFloat(proforma.cart.cartTaxes).formatMoney(2, ',', '.')}</td>
      <td>₡ {parseFloat(proforma.cart.cartTotal).formatMoney(2, ',', '.')}</td>
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

export function utilitiesProformasReport(proformas, iniDate, endDate, client, user) {

  const initialDate = iniDate != '' ? new Date(`${iniDate} 00:00:00`) : new Date('01-01-1980 00:00:00').setHours(0, 0, 0, 0)
  const finalDate = endDate != '' ? new Date(`${endDate} 00:00:00`).setHours(0, 0, 0, 0) : new Date().setHours(0, 0, 0, 0)

  const filteredSales = proformas.filter(proforma => {
    const proformaDate = new Date(proforma.created)

    if (client == 0) {

      return proformaDate >= initialDate && proformaDate <= finalDate

    } else {

      return proforma.client._id == client && proformaDate >= initialDate && proformaDate <= finalDate
    }

  })

  const filteredSalesUser = filteredSales.filter(proforma => {

    if (user == 0) {

      return true

    } else if (proforma.user) {

      return proforma.user._id == user

    } else {

      return false

    }

  })

  filteredSalesUser.sort((a, b) => {
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
      <td>Costo</td>
      <td>IV</td>
      <td>Total</td>
      <td>Utilidad</td>
    </tr>
  </thead>

  let total = 0
  let subtotal = 0
  let totalIv = 0
  let utility = 0
  let cost = 0

  const tbody = filteredSalesUser.map(proforma => {

    total = total + parseFloat(proforma.cart.cartTotal)
    subtotal = subtotal + parseFloat(proforma.cart.cartSubtotal)
    totalIv = totalIv + parseFloat(proforma.cart.cartTaxes)

    const subUtility = proforma.cart.cartItems.map(item => {
      const cost1 = item.product.cost ? item.product.cost : 0
      const utility2 = parseFloat(item.subtotal) - (parseFloat(cost1) * parseFloat(item.qty))
      return utility2
    })

    const subCost = proforma.cart.cartItems.map(item => {
      const cost1 = item.product.cost ? item.product.cost : 0
      const cost2 = parseFloat(cost1) * parseFloat(item.qty)
      return cost2
    })

    const localUtility = subUtility.reduce((a, b) => a + b, 0)
    utility = parseFloat(utility) + parseFloat(localUtility)

    const localCost = subCost.reduce((a, b) => a + b, 0)
    cost = parseFloat(cost) + parseFloat(localCost)

    return <tr key={proforma._id}>
      <td><a target='_blank' href={`/sales/proforma/${proforma.id}`}>{proforma.id}</a></td>
      <td>{format(proforma.created, 'DD/MM/YYYY')}</td>
      <td>{`${proforma.client.name} ${proforma.client.last_name}`}</td>
      <td>₡ {parseFloat(proforma.cart.cartSubtotal).formatMoney(2, ',', '.')}</td>
      <td>₡ {parseFloat(localCost).formatMoney(2, ',', '.')}</td>
      <td>₡ {parseFloat(proforma.cart.cartTaxes).formatMoney(2, ',', '.')}</td>
      <td>₡ {parseFloat(proforma.cart.cartTotal).formatMoney(2, ',', '.')}</td>
      <td>₡ {parseFloat(localUtility).formatMoney(2, ',', '.')}</td>
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
      <tr>
        <th>Costo total</th>
        <td>₡ {cost.formatMoney(2, ',', '.')}</td>
      </tr>
      <tr>
        <th>Utilidad</th>
        <td>₡ {utility.formatMoney(2, ',', '.')}</td>
      </tr>
      <tr className='total-row'>
        <th>Total</th>
        <td>₡ {total.formatMoney(2, ',', '.')}</td>
      </tr>
    </tbody>
  </table>

  return {thead: thead, tbody: tbody, totals: totals}

}
