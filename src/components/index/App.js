import React, { Component } from 'react'
import Nav from "./Nav"
import Main from './Main'

export default class App extends Component {


  render() {
    return (
        <div className="app bg-gray-100">

            <Nav />
            <Main />

        
        </div>
    )
  }
}
