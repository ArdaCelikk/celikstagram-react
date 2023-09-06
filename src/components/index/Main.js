import UserProfile from "./UserProfile"
import PostForm from "./PostForm"
import Post from "./Post"
import React from 'react'
import { useSelector } from "react-redux"

const Main = (props) => {
  const posts = useSelector((state) => state.posts.posts);
  


  return (
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-12 mx-12 w-2xl container px-2 mx-auto">
        <UserProfile/> 

        <article className="">
            <PostForm />
            {
              !posts
              ? <></>
              : posts.map(post=>(
                <Post key={post.id} {...post} />
              ))
            }
        </article>
      </main>
  )
}

export default Main