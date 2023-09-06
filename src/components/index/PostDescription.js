import React, { Component } from 'react'

export default class PostDescription extends Component {
  render() {
    return (
      <>
        {/* <div className="text-gray-600 font-semibold  mb-2 mx-3 px-2">Dummy text of the printing and typesetting industry</div> */}
        <div className="text-gray-500 text-sm mb-6 mx-3 px-2">{this.props.description}</div>
      </>
    )
  }
}
