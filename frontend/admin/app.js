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
import TopBar from './layout/topBar/topBar.jsx'
import SideMenu from './layout/sideMenu/sideMenu.jsx'

import Clients from './clients/clients.jsx'

import store from "./store.js"


ReactDOM.render(<Provider store={store}>

                        <Router>
                            <div>
                                <SideMenu></SideMenu>
                                <div id='mainContainer' className="blur-div mainContainer">
                                    <TopBar></TopBar>
                                    <div className="mainContainer-content">
                                        <Route exact path='/admin' render={()=>{return <h1>HOME</h1>}} />
                                        <Route exact path='/admin/clients' component={Clients} />
                                    </div>

                                </div>
                            </div>
                        </Router>

                </Provider>,

                document.getElementById('app-container')
);
