import React from 'react'
import {Route} from 'react-router-dom'

// Routes Components

import Home from './home/home.jsx'
import Pos from './pos/pos.jsx'
import Proformas from './proformas/proformas.jsx'

const routes = <div className='mainContainer-content-wrapper'>

  <Route exact path='/sales' component={Home} />
  <Route exact path='/sales/pos' component={Pos} />
  <Route exact path='/sales/proforma' component={Proformas} />

</div>

export default routes
