import React from 'react'
import {connect} from 'react-redux'

import PayMethod from './components/payMethod.jsx'
import PayCash from './components/payCahs.jsx'
import PayCard from './components/payCard.jsx'
import PayCredit from './components/payCredit.jsx'
import PayOther from './components/payOther.jsx'
import PaySideBar from './components/paySideBar.jsx'

@connect((store) => {
  return {panelVisible: store.pay.isVisible, payMethod: store.pay.payMethod}
})
export default class PayPanel extends React.Component {

  hidePanel() {

    this.props.dispatch({type: 'HIDE_PAY_PANEL', payload: -1})
  }

  render() {

    const isVisible = (this.props.panelVisible)
      ? 'pay-panel is-visible'
      : 'pay-panel'

    let payMethod = ''
    switch (this.props.payMethod) {

      case 'CASH':
      {
        payMethod = <PayCash />
        break
      } // case

      case 'CARD':
      {
        payMethod = <PayCard />
        break
      } // case

      case 'CREDIT':
      {
        payMethod = <PayCredit />
        break
      } //  case

      case 'OTHER':
      {
        payMethod = <PayOther />
        break
      } // case

    } // switch

    return <div className={isVisible}>

      <div className='pay-panel-main'>
        <div className='pay-panel-header'>
          Registrar Pago
          <i onClick={this.hidePanel.bind(this)} className='fa fa-times' aria-hidden='true' />
        </div>

        <PayMethod />

        <div className='pay-area-container'>

          {payMethod}

          <PaySideBar />

        </div>

      </div>

    </div>

  }

}
