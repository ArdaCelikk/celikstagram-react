import React, { useEffect } from 'react'
import Nav from "./Nav"
import Main from './Main'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInformations } from "../../redux/userSlice"
import { setPosts, setComments } from "../../redux/postSlice"
import axios from 'axios'


const App = (props) => {
  const dispatch = useDispatch()
  useEffect(()=>{
    try {
      
      const userInfos = async ()=>{
        const res = await axios.post("/informations/userinformations") 
        if(res.data.succeded) {
          dispatch(setUserInformations(res.data.user))
        }
      }

      const comments = async ()=>{
        try {
          const res = await axios.post("/post/comments")
          if(res.data.succeded) {
            dispatch(setComments(res.data.comments))
          }
        } catch (error) {
          console.log(error);
        }
      }

      const posts = async ()=> {
        try {
          const res = await axios.post("/post")
          if(res.data.succeded) {
            dispatch(setPosts(res.data.posts))
          }
        } catch (error) {
          console.log(error.message);
        }
      }

      posts()
      userInfos()
      comments()
    } catch (error) {
      console.log(error);
    }
  },[dispatch])
  const loading = useSelector((state) => state.user.loading);


  return (
    <div className="app ">
      {
        loading
        ? <><Nav /> <Main /></>
        : <></>
      }
    </div>
  )
}

export default App
