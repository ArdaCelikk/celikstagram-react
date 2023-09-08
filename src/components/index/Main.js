import UserProfile from "./UserProfile"
import PostForm from "./PostForm"
import Post from "./Post"
import React, { useState } from 'react'
import { useSelector } from "react-redux"
import Alert from "../alert/Alert"

const Main = (props) => {
  const posts = useSelector((state) => state.posts.posts);
  const user = useSelector((state) => state.user.user);
  const [alertMsg, setAlertMsg] = useState("")


  const showAlert = (text)=>{
    setAlertMsg(text)
    setTimeout(() => {
      setAlertMsg("")
    }, 6000);
  }
  


  return (
      <main style={{position: "static"}} className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-12 mx-12 w-2xl container px-2 mx-auto">
        {alertMsg && <Alert profile_photo={user.profile_photo} username={user.username} text={alertMsg} />}
        <UserProfile/> 

        <article className="">
            <PostForm  showAlert={showAlert}/>
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