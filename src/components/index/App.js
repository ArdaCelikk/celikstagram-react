import React, { useEffect } from 'react'
import Nav from "./Nav"
import Main from './Main'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInformations } from "../../redux/userSlice"
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
