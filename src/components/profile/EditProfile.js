import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setUserInformations } from '../../redux/userSlice';
import EditProfileForm from './EditProfileForm';

const EditProfile = () => {
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
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        {
            loading
            ? <EditProfileForm />
            : <></>
        }
    </div>
  )
}

export default EditProfile