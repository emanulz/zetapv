import { combineReducers } from 'redux'

import sideMenu from './layout/sideMenu/reducer.js'
import clients from './clients/reducer.js'
import users from './users/reducer.js'
import products from './products/reducer.js'
import inventories from './inventories/reducer.js'
import receivable from './receivable/reducer.js'
import sales from './sales/reducer.js'
import config from './config/reducer.js'

export default combineReducers({
  sideMenu,
  clients,
  users,
  products,
  inventories,
  receivable,
  sales,
  config
})
