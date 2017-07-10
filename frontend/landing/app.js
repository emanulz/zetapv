import React from 'react';
import ReactDOM from 'react-dom';

import TopBar from '../pos/layout/topBar/topBar.jsx'
import SideMenu from '../pos/layout/sideMenu/sideMenu.jsx'


ReactDOM.render(<div>
                    <SideMenu></SideMenu>

                    <div id='mainContainer'  className='mainContainer'>
                            <TopBar></TopBar>
                    </div>

                </div>,

                document.getElementById('app-container')
            );
