import React from 'react'

export default class Body extends React.Component {

  componentDidMount() {
    document.getElementById('loader').classList.remove('loader')
  }

  render() {
    return <div className='client'>LANDING</div>
  }

}
