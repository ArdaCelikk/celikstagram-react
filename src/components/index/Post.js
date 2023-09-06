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
            <PostHeader createdAt={this.props.createdAt} user={this.props.user} />
            {
              this.props.onlyText 
              ? <></>
              : <PostImg url={this.props.url} />
            }
            <PostDescription description={this.props.description} />
            <PostActions likes={JSON.parse(this.props.likes)} comments={JSON.parse(this.props.comments)} />
            <Comment />
            <PostComment/>
            
        </div>
        
    )
  }
}
