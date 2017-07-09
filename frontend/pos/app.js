import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import { Provider } from "react-redux"

//utils
import alertify from 'alertifyjs';
import formatMoney from '../utils/formatMoney.js'
import printDiv from '../utils/printDiv.js'

window.alertify = alertify;
formatMoney()
window.printDiv = printDiv

//layout components
import TopBar from '../layout/topBar/topBar.jsx'
import SideMenu from '../layout/sideMenu/sideMenu.jsx'

//components
import Main from './main/main.jsx'
import Sidebar from './sidebar/sidebar.jsx'
import SearchClient from './search/clients/searchPanel.jsx'
import SearchProduct from './search/products/searchPanel.jsx'
import Footer from './footer/footer.jsx'
import PayPanel from './pay/payPanel.jsx'
import InvoicePanel from './invoice/InvoicePanel/invoicePanel.jsx'

//store
import store from "./store.js"


ReactDOM.render(<Provider store={store}>
                    <div>
                        <SideMenu></SideMenu>
                        <div id='mainContainer' className="blur-div mainContainer">
                            <TopBar></TopBar>
                            <div className="mainContainer-content">
                                <div className="row" style={{'margin':'0'}}>
                                    <Main></Main>
                                    <Sidebar></Sidebar>
                                </div>
                                <SearchClient></SearchClient>
                                <SearchProduct></SearchProduct>
                                {/* <PayPanel></PayPanel> */}
                                {/* <InvoicePanel></InvoicePanel> */}

                            </div>

                            <div className="row footer">
                                <Footer></Footer>
                                
                            </div>

                        </div>

                    </div>
                </Provider>,

                document.getElementById('app-container')
);

// //footer fixed
// ReactDOM.render(<Provider store={store}>
//
//                     <Footer></Footer>
//
//                 </Provider>,
//
//     document.getElementById('footer')
// );
