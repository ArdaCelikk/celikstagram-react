import React, { Component } from 'react'

export default class Comment extends Component {
  render() {
    return (
        <div className="text-black p-4 antialiased flex">
            <img style={{minWidth: "2rem"}} className="rounded-full h-8 w-8 mr-2 mt-1 object-cover " src={this.props.user.profile_photo} alt='' />
            <div>
                <div className="bg-gray-100 rounded-lg px-4 pt-2 pb-2.5">
                    <div className="font-semibold text-sm leading-relaxed">{this.props.user.username}</div>
                    <div className="text-xs leading-snug md:leading-normal">
                      {this.props.content}
                    </div>
                </div>
                
                
            </div>
        </div>
    )
  }
}
