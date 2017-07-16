import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { Provider } from "react-redux"

//utils
import alertify from 'alertifyjs';
import formatMoney from '../utils/formatMoney.js'

window.alertify = alertify;
formatMoney()

//layout components
import DbSync from './generalComponents/dbSync/dbSync.jsx'
import TopBar from './layout/topBar/topBar.jsx'
import SideMenu from './layout/sideMenu/sideMenu.jsx'


import ListClients from './clients/list.jsx'
import AddClients from './clients/add.jsx'
import EditClients from './clients/edit.jsx'

import Products from './products/products.jsx'

import store from "./store.js"


ReactDOM.render(<Provider store={store}>

                        <Router>
                            <div>
                                <DbSync remoteDB='http://192.168.9.108:5984'></DbSync>
                                <SideMenu></SideMenu>
                                <div id='mainContainer' className="blur-div mainContainer">
                                    <TopBar></TopBar>
                                    <div className="mainContainer-content">
                                        <Route exact path='/admin' render={()=>{return <h1>HOME</h1>}} />
                                        <Route exact path='/admin/clients' component={ListClients} />
                                        <Route exact path='/admin/clients/add' component={AddClients} />
                                        <Route exact path='/admin/clients/:client' component={EditClients} />
                                        <Route exact path='/admin/products' component={Products} />
                                    </div>

                                </div>
                            </div>
                        </Router>

                </Provider>,

                document.getElementById('app-container')
);
