import { combineReducers } from 'redux'

import dbSync from './dbSync/reducer.js'
import config from './config/reducer.js'
import products from './pos/main/product/reducer.js'
import cart from './pos/main/cart/reducer.js'
import clients from './pos/sidebar/clients/reducer.js'
import sales from './pos/sales/reducer.js'
import clientmovements from './pos/movements/clients/reducer'
import searchClients from './pos/search/clients/reducer.js'
import searchProducts from './pos/search/products/reducer.js'
import messages from './pos/messages/reducer.js'
import pay from './pos/pay/reducer.js'
import invoice from './pos/invoice/reducer.js'

export default combineReducers({
  dbSync,
  config,
  products,
  cart,
  clients,
  sales,
  clientmovements,
  searchClients,
  searchProducts,
  messages,
  pay,
  invoice
})
