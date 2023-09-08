import React, { Component } from 'react'
import "./style.css"

export default class Alert extends Component {
  state = {
    animate: false,
    display: ["none", "none"]
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        animate: true
      })
      setTimeout(() => {
        this.setState({
          display: ["block", "flex"]
        })
      }, 500);
      setTimeout(() => {
        this.setState({
          animate: false
        })
      }, 5000);
    }, 1  );
  }

  render() {
    return (
        <div className={`flex fixed bottom-10 z-50 bg-white shadow-lg rounded-lg overflow-hidden alert-box ${this.state.animate ? "active": ""}`}>
            <div className="w-2 bg-gray-800" style={{display: this.state.display[0]}}></div>
            <div className="flex items-center px-2 py-3" style={{display: [1]}}>
              <div style={{backgroundImage: `url(${this.props.profile_photo})`}} className="w-12 h-12 object-cover rounded-full bg-cover bg-center bg-no-repeat" ></div> 
              <div className="mx-3">
                  <h2 className="text-xl font-semibold text-gray-800">{this.props.username}</h2>
                  <p className="text-gray-600">{this.props.text}</p>
              </div>
            </div>
        </div>
    )
  }
}
