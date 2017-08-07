import React from 'react'

export default class Header extends React.Component {

  render() {

    return <div>

      <div className='compact-invoice-header'>

        <div className='compact-invoice-header-info'>
          <h2>FUDESEMILLAS</h2>
          <h3>Céd Jurid No 3-006-228432</h3>
          <h3>Contiguo al matadero municipal</h3>
          <h3>Las Juntas de Pacuar, Daniel Flores, Pérez Zeledón</h3>
          <h3>Tels: 2770-2002/2770-2003</h3>
        </div>

      </div>

      <div className='compact-invoice-separator'>
        <span />

        <h1>Factura de contado</h1>

        <span />
      </div>
    </div>

  }

}
