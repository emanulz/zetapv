/*
 * Module dependencies
 */
import React from 'react';
import Search from './components/search/search.jsx'
import ComposedItem from './components/items/composed.jsx'


export default class SideMenu extends React.Component {

    // Main Layout
    render(){

        return <div id='sideMenu' className='sideMenu'>

                    <h3 className="sideMenu-header">POS APP</h3>

                    <Search></Search>

                    <ul className="sideMenu-items">
                		<li><a href="/"><span className="fa fa-home"></span> Inicio</a></li>
                        <ComposedItem></ComposedItem>
                		<li><a href="/pos/"><span className="fa fa-shopping-cart"></span> Punto de Venta</a></li>
                		<li><a href="/admin/"><span className="fa fa-area-chart"></span> Sitio Administrador</a></li>
                	</ul>
                </div>


    }

}
