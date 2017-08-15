import React from 'react'
import {Route} from 'react-router-dom'

// Routes Components
import ClientsList from './clients/list.jsx'
import ClientsCreate from './clients/create.jsx'
import ClientsEdit from './clients/update.jsx'

import UsersList from './users/list.jsx'
import UsersCreate from './users/create.jsx'
import UsersEdit from './users/update.jsx'

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

import Receivable from './receivable/list.jsx'

import Statement from './receivable/statement/statement.jsx'
import BillMovement from './receivable/statement/billMovements/movements.jsx'

import ClientMovementsList from './receivable/movements/list.jsx'
import ClientMovementsCreate from './receivable/movements/create.jsx'
import ClientMovementsUpdate from './receivable/movements/update.jsx'

import Sales from './sales/list.jsx'

const routes = <div>

  <Route exact path='/admin' render={() => {
    return <h1>HOME</h1>
  }} />

  <Route exact path='/admin/clients' component={ClientsList} />
  <Route path='/admin/clients/add' component={ClientsCreate} />
  <Route path='/admin/clients/edit/:client' component={ClientsEdit} />

  <Route exact path='/admin/users' component={UsersList} />
  <Route path='/admin/users/add' component={UsersCreate} />
  <Route path='/admin/users/edit/:user' component={UsersEdit} />

  <Route exact path='/admin/sales' component={Sales} />

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

  <Route exact path='/admin/receivable' component={Receivable} />

  <Route exact path='/admin/receivable/movements' component={ClientMovementsList} />
  <Route exact path='/admin/receivable/movements/add' component={ClientMovementsCreate} />
  <Route exact path='/admin/receivable/movements/edit/:movement' component={ClientMovementsUpdate} />

  <Route exact path='/admin/receivable/statement/:client' component={Statement} />
  <Route exact path='/admin/receivable/statement/:client/billmovements/:bill' component={BillMovement} />

</div>

export default routes
