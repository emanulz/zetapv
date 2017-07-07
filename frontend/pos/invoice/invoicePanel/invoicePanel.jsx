import React from 'react'
import { connect } from "react-redux"

import FullInvoice from '../fullInvoice/fullInvoice.jsx'
import CompactInvoice from '../compactInvoice/compactInvoice.jsx'

@connect((store) => {
  return {
            panelVisible: store.invoice.isVisible,
            isFull: store.invoice.isFull,

  };
})
export default class InvoicePanel extends React.Component{

    hidePanel(){

        this.props.dispatch({ type:'HIDE_INVOICE_PANEL', payload:-1})
        //printDiv('full-invoice-print')
    }

    togglePanel(){

        this.props.dispatch({ type:'TOGGLE_INVOICE_PANEL', payload:-1})
        //printDiv('full-invoice-print')
    }

    render(){

        let isVisible = (this.props.panelVisible) ? 'invoice-panel is-visible' : 'invoice-panel'
        let isFullClass = (this.props.isFull) ? '' : ' compact-invoice-on'

        let componentToMount = (this.props.isFull) ? <FullInvoice></FullInvoice> : <CompactInvoice></CompactInvoice>


        return <div className={isVisible}>


                <div className={'invoice-panel-main' + isFullClass}>
                    <div className='invoice-panel-header'>
                        <div>
                            Factura de Venta
                        </div>
                        <div>
                            <i onClick={this.hidePanel.bind(this)} className="fa fa-times" aria-hidden="true"></i>
                            <i onClick={this.togglePanel.bind(this)} className="fa fa-file-text-o" aria-hidden="true"></i>
                        </div>
                    </div>


                    <div id="invoice-print" className={'invoice-panel-container' + isFullClass}>

                            {componentToMount}

                    </div>

                </div>

               </div>

    }

}
