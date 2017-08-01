import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Provider} from 'react-redux'

// utils
import alertify from 'alertifyjs'
import formatMoney from '../utils/formatMoney.js'

// layout components
import DbSync from './generalComponents/dbSync/dbSync.jsx'
import TopBar from './layout/topBar/topBar.jsx'
import SideMenu from './layout/sideMenu/sideMenu.jsx'

// Routes Components
import ListClients from './clients/list.jsx'
import AddClients from './clients/add.jsx'
import EditClients from './clients/edit.jsx'
import Products from './products/products/list.jsx'
import CreateProduct from './products/products/create.jsx'
import EditProduct from './products/products/update.jsx'
import DepartmentList from './products/departments/list.jsx'
import DepartmentCreate from './products/departments/create.jsx'
import DepartmentUpdate from './products/departments/update.jsx'

import SubDepartmentList from './products/subdepartments/list.jsx'
import SubDepartmentCreate from './products/subdepartments/create.jsx'
import SubDepartmentUpdate from './products/subdepartments/update.jsx'

// Store
import store from './store.js'

window.alertify = alertify
formatMoney()

ReactDOM.render(
  <Provider store={store}>

    <Router>
      <div>
        <DbSync remoteDB='http://192.168.9.108:5984' />
        <SideMenu />
        <div id='mainContainer' className='blur-div mainContainer'>
          <TopBar />
          <div className='mainContainer-content'>
            <Route exact path='/admin' render={() => {
              return <h1>HOME</h1>
            }} />
            <Route exact path='/admin/clients' component={ListClients} />
            <Route exact path='/admin/clients/add' component={AddClients} />
            <Route exact path='/admin/clients/edit/:client' component={EditClients} />
            <Route exact path='/admin/products' component={Products} />
            <Route exact path='/admin/products/add' component={CreateProduct} />
            <Route exact path='/admin/products/edit/:product' component={EditProduct} />
            <Route exact path='/admin/products/departments' component={DepartmentList} />
            <Route exact path='/admin/products/departments/add' component={DepartmentCreate} />
            <Route exact path='/admin/products/departments/edit/:department' component={DepartmentUpdate} />
            <Route exact path='/admin/products/subdepartments' component={SubDepartmentList} />
            <Route exact path='/admin/products/subdepartments/add' component={SubDepartmentCreate} />
            <Route exact path='/admin/products/subdepartments/edit/:subdepartment' component={SubDepartmentUpdate} />
          </div>

        </div>
      </div>
    </Router>

  </Provider>, document.getElementById('app-container'))
