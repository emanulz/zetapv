/*
 * Module dependencies
 */
import React from 'react';
import {Link} from 'react-router-dom'

export default class Composed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {visible: false};
    }

    toggleMenu(){

        this.setState({visible: !this.state.visible})
    }



    // Main Layout
    render(){

        const childItems = this.props.childItems.map(item => {
            return  <li key={item.text + item.href}>
                        <Link to={item.href}>
                            <span className={`fa ${item.class}`}></span> {item.text}
                        </Link>
                    </li>
        })

        let visible = this.state.visible ? 'visible' : ''

        return <li className = {`sideMenu-item-composed ${visible}`} >
                    <a className={visible} onClick={this.toggleMenu.bind(this)}>
                        <span className={`fa ${this.props.mainIcon}`}></span>
                        {this.props.mainTittle}
                        <span className="fa fa-chevron-left show-icon"></span>
                    </a>
                    <ul className={visible}>
                        {childItems}
                    </ul>
                </li>
    }

}