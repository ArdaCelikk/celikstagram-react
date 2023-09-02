import React, { Component } from 'react'
import UserProfile from "./UserProfile"
import PostForm from "./PostForm"
import Post from "./Post"

export default class Main extends Component { 
  render() {
    return (
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-12 mx-12 w-2xl container px-2 mx-auto">
            <UserProfile user={this.props.user} /> 

        
            <article className="">
                <PostForm />
                <Post user={this.props.user}/>
                
                <Post user={this.props.user} />
        
            </article>
            
        </main>
    )
  }
}
