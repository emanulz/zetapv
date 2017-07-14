/*
 * Module dependencies
 */
import React from 'react';


export default class TopBar extends React.Component {



    menuClick(ev){

        console.log(ev)

        const mainContainer = document.getElementById("mainContainer")
        const sideMenu = document.getElementById("sideMenu")

        if(mainContainer.classList.contains('pulled')){

            mainContainer.classList.remove('pulled')
            sideMenu.classList.remove('visible')
            return true
        }

        mainContainer.classList.add('pulled');
        sideMenu.classList.add('visible')

    }



    // Main Layout
    render(){

        return <div className='topBar'>

                    <div className='topBar-content'>

                        <div onClick={this.menuClick.bind(this)} className='topBar-content-button'>

                            <div className='topBar-content-button-content'>
                                <span><i class="fa fa-bars"></i></span>
                                <span>Menu</span>
                            </div>

                        </div>

                        <div className='topBar-content-nav'>


                        </div>

                        <div className='topBar-content-text'>


                        </div>

                    </div>
                </div>


    }

}
