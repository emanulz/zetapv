/*
 * Module dependencies
 */
import React from 'react';


export default class SideMenu extends React.Component {

    // Main Layout
    render(){

        return <div id='sideMenu' className='sideMenu'>

                    <h3 className="sideMenu-header">FUDESEMILLAS</h3>

                    <ul className="sideMenu-items">
                		<li><a href="/"><span className="fa fa-home"></span> Inicio</a></li>
                		<li><a href="/pos/"><span className="fa fa-shopping-cart"></span> Punto de Venta</a></li>
                		<li><a href="/admin/"><span className="fa fa-area-chart"></span> Sitio Administrador</a></li>
                        <li><a href="/admin/logout/"><span className="fa fa-power-off"></span> Cerrar sesión</a></li>
                	</ul>
                </div>


    }

}
