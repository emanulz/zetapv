import React from 'react'
import {Route} from 'react-router-dom'

// Routes Components

import Home from './home/home.jsx'
import Pos from './pos/pos.jsx'

const routes = <div className='mainContainer-content-wrapper'>

  <Route exact path='/sales' component={Home} />
  <Route exact path='/sales/pos' component={Pos} />

</div>

export default routes
