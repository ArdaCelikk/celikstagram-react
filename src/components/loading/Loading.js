import React, { Component } from 'react'
import "./loading.css"

export default class Loading extends Component {
  render() {
    return (
      <aside>
        <div className="bg-white shadow rounded-lg p-10 flex justify-center align-center">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
      </aside>
    )
  }
}
