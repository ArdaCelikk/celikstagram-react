import React, { Component } from 'react'
import PostHeader from "./PostHeader"
import PostImg from "./PostImg"
import PostDescription from "./PostDescription"
import PostActions from './PostActions'
import Comment from './Comment'
import PostComment from './PostComment'
// import Loading from '../loading/Loading'

export default class Post extends Component {
  render() {
    return (
        <div className="bg-white shadow rounded-lg mb-6">
            <PostHeader />
            <PostImg />
            <PostDescription />
            <PostActions />
            <Comment />
            <PostComment user={this.props.user}/>
            
        </div>
        
    )
  }
}
