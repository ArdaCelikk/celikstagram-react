import React, { Component } from 'react'

export default class PostImg extends Component {
  render() {
    return (
      <>
            <div className="border-b border-gray-100"></div> 
            <div className="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2">
                <img className="rounded w-full" loading='lazy' src={this.props.url} alt='' />
            </div>
      </>
    )
  }
}
