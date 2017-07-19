/*
 * Module dependencies
 */
import React from 'react';
import Search from './components/search/search.jsx'
import ComposedItem from './components/items/composed.jsx'
import {Link} from 'react-router-dom'


export default class SideMenu extends React.Component {



    // Main Layout
    render(){

        const childClients = [{text:'Listar', class:'fa-table', href:'/admin/clients'},
                              {text:'Agregar', class:'fa-plus', href:'/admin/clients/add'}]
        const childProducts = [{text:'Lista de Productos', class:'fa-gift', href:'/admin/products'},
                              {text:'Departamenentos', class:'fa-plus', href:'/admin/products/departments'},
                              {text:'Sub-Departamentos', class:'fa-plus', href:'/admin/products/subdepartments'},
                              {text:'Inventarios', class:'fa-plus', href:'/admin/products/inventory'}]

        return <div id='sideMenu' className='sideMenu'>

                    <h3 className="sideMenu-header">POS APP</h3>

                    <Search></Search>

                    <div className="sideMenu-wrapper">
                        <ul className="sideMenu-items">
                            <li><Link to="/admin/"><span className="fa fa-area-chart"></span> Sitio Administrador</Link></li>
                            <li><Link to="/admin/clients"><span className="fa fa-users"></span> Clientes</Link></li>
                            <ComposedItem mainTittle='Productos' mainIcon='fa-gift' childItems={childProducts}></ComposedItem>
                            <li><a href="/pos/"><span className="fa fa-shopping-cart"></span> Punto de Venta</a></li>
                            <li><a href="/"><span className="fa fa-home"></span> Inicio</a></li>
                        </ul>
                    </div>

                </div>


    }

}
