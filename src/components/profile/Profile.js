import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInformations } from "../../redux/userSlice"
import axios from 'axios'
import Background from './Background'
import Main from './Main'





const Profile = () => {
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
    <main className="profile-page">
        {
            loading
            ? <><Background /> <Main /> </>
            : <></>
        }
    </main>
  )
}



export default Profile
