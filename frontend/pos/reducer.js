import { combineReducers } from 'redux'

import products from './main/product/reducer.js'
import cart from './main/cart/reducer.js'
import clients from './sidebar/clients/reducer.js'
import searchClients from './search/clients/reducer.js'
import searchProducts from './search/products/reducer.js'
import messages from './messages/reducer.js'
import pay from './pay/reducer.js'
import invoice from './invoice/reducer.js'
import sales from './sales/reducer.js'
import clientmovements from './movements/clients/reducer'
import config from './config/reducer'

export default combineReducers({
  products,
  cart,
  clients,
  searchClients,
  searchProducts,
  messages,
  pay,
  invoice,
  sales,
  clientmovements,
  config
})
