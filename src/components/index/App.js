import React, { useEffect } from 'react'
import Nav from "./Nav"
import Main from './Main'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInformations } from "../../redux/userSlice"
import { setPosts } from "../../redux/postSlice"
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
    } catch (error) {
      console.log(error);
    }
  },[dispatch])

  const loading = useSelector((state) => state.user.loading);


  return (
    <div className="app bg-gray-100">
      {
        loading
        ? <><Nav /> <Main /></>
        : <></>
      }
    </div>
  )
}

export default App
