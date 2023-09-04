import React, { Component } from 'react'

export default class Comment extends Component {
  render() {
    return (
        <div className="text-black p-4 antialiased flex">
            <img className="rounded-full h-8 w-8 mr-2 mt-1 " src="https://picsum.photos/id/1027/200/200" alt='' />
            <div>
                <div className="bg-gray-100 rounded-lg px-4 pt-2 pb-2.5">
                    <div className="font-semibold text-sm leading-relaxed">Sara Lauren</div>
                    <div className="text-xs leading-snug md:leading-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                </div>
                <div className="text-xs  mt-0.5 text-gray-500">14 w</div>
                
            </div>
        </div>
    )
  }
}
