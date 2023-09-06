import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class PostHeader extends Component {
  render() {
    return (
        <div className="flex flex-row px-2 py-3 mx-3">
            <div className="w-auto h-auto rounded-full border-2 border-white-500">
                <img className="w-12 h-12 object-cover rounded-full shadow cursor-pointer" alt="User avatar" src={this.props.user.profile_photo} />
            </div>
            <div className="flex flex-col mb-2 ml-4 mt-1">
                <div className="text-gray-600 text-sm font-semibold">
                    <Link to={`/profile/${this.props.user.username}`}>{this.props.user.username}</Link>
                </div>
                <div className="flex w-full mt-1">
                    <div className="text-blue-700 font-base text-xs mr-1 cursor-pointer">
                        Posted
                    </div> 
                    <div className="text-gray-400 font-thin text-xs">
                        • {this.props.createdAt.split("T")[0]}
                    </div>
                </div>
            </div>
        </div>
    )
  }
}
