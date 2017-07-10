import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import { Provider } from "react-redux"

//utils
import alertify from 'alertifyjs';
import formatMoney from '../utils/formatMoney.js'

window.alertify = alertify;
formatMoney()

//layout components
import TopBar from './layout/topBar/topBar.jsx'
import SideMenu from './layout/sideMenu/sideMenu.jsx'

import store from "./store.js"


ReactDOM.render(<Provider store={store}>
                    <div>
                        <SideMenu></SideMenu>
                        <div id='mainContainer' className="blur-div mainContainer">
                            <TopBar></TopBar>
                            <div className="mainContainer-content">

                            </div>

                        </div>

                    </div>
                </Provider>,

                document.getElementById('app-container')
);
