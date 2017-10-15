import { combineReducers } from 'redux'

import config from './config/reducer'
import dbSync from './dbSync/reducer.js'
import reports from './reports/reducer.js'

export default combineReducers({
  reports,
  config,
  dbSync
})
