import React, { Component } from 'react'

export default class PostHeader extends Component {
  render() {
    return (
        <div className="flex flex-row px-2 py-3 mx-3">
            <div className="w-auto h-auto rounded-full border-2 border-green-500">
                <img className="w-12 h-12 object-cover rounded-full shadow cursor-pointer" alt="User avatar" src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=200&amp;q=200" />
            </div>
            <div className="flex flex-col mb-2 ml-4 mt-1">
                <div className="text-gray-600 text-sm font-semibold">Sara Lauren</div>
                <div className="flex w-full mt-1">
                    <div className="text-blue-700 font-base text-xs mr-1 cursor-pointer">
                        UX Design
                    </div> 
                    <div className="text-gray-400 font-thin text-xs">
                        • 1 day ago
                    </div>
                </div>
            </div>
        </div>
    )
  }
}
