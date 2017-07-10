/*
 * Module dependencies
 */
import React from 'react';


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

        let visible = this.state.visible ? 'visible' : ''

        return <li className="sideMenu-item-composed">
                    <a onClick={this.toggleMenu.bind(this)} href="#">
                        <span className="fa fa-home"></span>
                        Inicio
                        <span className="fa fa-chevron-down icon"></span>
                    </a>
                    <ul className={visible}>
                        <li><a href="#"><span className="fa fa-home"></span> Inicio</a></li>
                        <li><a href="#"><span className="fa fa-home"></span> Inicio</a></li>
                        <li><a href="#"><span className="fa fa-home"></span> Inicio</a></li>
                    </ul>
                </li>
    }

}
