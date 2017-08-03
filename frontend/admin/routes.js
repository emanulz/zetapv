import React from 'react'
import {Route} from 'react-router-dom'

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

import Productinventory from './inventories/products/list.jsx'

import InventoryMovementsList from './inventories/products/movements/list.jsx'
import InventoryMovementsCreate from './inventories/products/movements/create.jsx'
import InventoryMovementsUpdate from './inventories/products/movements/update.jsx'

const routes = <div>

  <Route exact path='/admin' render={() => {
    return <h1>HOME</h1>
  }} />

  <Route exact path='/admin/clients' component={ListClients} />
  <Route path='/add' component={AddClients} />
  <Route path='/edit/:client' component={EditClients} />

  <Route exact path='/admin/products' component={Products} />
  <Route exact path='/admin/products/add' component={CreateProduct} />
  <Route exact path='/admin/products/edit/:product' component={EditProduct} />

  <Route exact path='/admin/products/departments' component={DepartmentList} />
  <Route exact path='/admin/products/departments/add' component={DepartmentCreate} />
  <Route exact path='/admin/products/departments/edit/:department' component={DepartmentUpdate} />

  <Route exact path='/admin/products/subdepartments' component={SubDepartmentList} />
  <Route exact path='/admin/products/subdepartments/add' component={SubDepartmentCreate} />
  <Route exact path='/admin/products/subdepartments/edit/:subdepartment' component={SubDepartmentUpdate} />

  <Route exact path='/admin/inventories/products' component={Productinventory} />

  <Route exact path='/admin/inventories/products/movements' component={InventoryMovementsList} />
  <Route exact path='/admin/inventories/products/movements/add' component={InventoryMovementsCreate} />
  <Route exact path='/admin/inventories/products/movements/edit/:movement' component={InventoryMovementsUpdate} />

</div>

export default routes
