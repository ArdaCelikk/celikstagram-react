import axios from 'axios'
import React, { Component } from 'react'
import withRouter from './withRouter'

class LogOut extends Component {
    async componentDidMount() {
        const res = await axios.post("/account/logout")
        if(res.data.succeded) {
            this.props.navigate("/")
        }
    }
  render() {
    return (
      <div></div>
    )
  }
}

export default withRouter(LogOut)