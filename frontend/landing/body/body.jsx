import React from 'react'

export default class Body extends React.Component {

  componentDidMount() {
    document.getElementById('loader').remove()
  }

  render() {
    return <div className='col-xs-12 row landing'>
      <div className='col-xs-10 col-sm-8 col-xs-offset-1 col-sm-offset-2 landing-container'>
        <h1>Bienvenido</h1>
        <hr />
        <h3>Elija una opcion para iniciar</h3>

        <ul className='buttons-container'>
          <li><a className='btn btn-default btn-lg landing-btn' href='/pos'>Ventas</a></li>
          <li><a className='btn btn-default btn-lg landing-btn' href='/admin'>Administración</a></li>
          <li><a className='btn btn-default btn-lg landing-btn' href='#'>Inventarios</a></li>
        </ul>
        <ul className='buttons-container'>
          <li><a className='btn btn-default btn-lg landing-btn' href='#'>Producción</a></li>
          <li><a className='btn btn-default btn-lg landing-btn' href='#'>Control</a></li>
          <li><a className='btn btn-default btn-lg landing-btn' href='#'>Reportes</a></li>
        </ul>

      </div>

    </div>

  }

}
