import React from 'react'
import {Route} from 'react-router-dom'

// Routes Components

import Home from './home/home.jsx'
import Pos from './pos/pos.jsx'
import Proformas from './proformas/proformas.jsx'
import CreditNote from './creditNotes/creditNote.jsx'

const routes = <div className='mainContainer-content-wrapper'>

  <Route exact path='/sales' component={Home} />
  <Route exact path='/sales/pos' component={Pos} />
  <Route exact path='/sales/pos/:sale' component={Pos} />
  <Route exact path='/sales/proforma' component={Proformas} />
  <Route exact path='/sales/proforma/:proforma' component={Proformas} />
  <Route exact path='/sales/creditnote' component={CreditNote} />

</div>

export default routes
