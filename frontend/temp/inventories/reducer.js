import { combineReducers } from 'redux'

import products from './products/reducer.js'
import sidePanel from './sidePanel/reducer.js'
import config from './config/reducer'
import dbSync from './dbSync/reducer.js'

export default combineReducers({
  products,
  sidePanel,
  config,
  dbSync
})
