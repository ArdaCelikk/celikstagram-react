import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const EditProfileForm = (props) => {


    const navigate =useNavigate()
    const defaultUser = { id: "", username: "", name: "", adress: "", profile_photo: "", followers: "", following: "", };
    const [alert , setAlert ] = useState("")
    const loggedUser = useSelector((state) => state.user.user);
    // STATES
    const [user, setUser] = useState(defaultUser);

    useEffect(() => {
        try {
            if(loggedUser.following) {
                setUser(loggedUser);
            } else {
                navigate("/login")
            }
        } catch (error) {
        }
    }, [loggedUser, navigate]); 

    const onFormSubmit = async (e)=>{
        e.preventDefault()
        try {
            const {name, email, username, adress, bio} = e.target
            const user = {
                name: name.value,
                email: email.value,
                username: username.value,
                adress: adress.value,
                bio: bio.value,
            }
            const res = await axios.post("/account/edit", user)
            if(res.data.succeded) {
                setAlert(res.data.msg)
                setTimeout(()=>{
                    navigate("/profile")
                },750)
            } else {
                setAlert(res.data.msg)
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
            <div className="container max-w-screen-lg mx-auto">
                <div>
                <h2 className="font-semibold text-xl text-gray-600">Edit Profile</h2>
                <p className="text-gray-500 mb-6">Change your account details.</p>

                <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div className="text-gray-600">
                        <p className="font-medium text-lg">Personal Details</p>
                        <Link to="/" className='text-blue-400'>Return main page.</Link>
                    </div>

                    <form onSubmit={onFormSubmit} className="lg:col-span-2">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-5">
                            <label htmlFor="full_name">Name</label>
                            <input type="text" defaultValue={user.name} name="name" placeholder='Name' id="name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
                        </div>

                        <div className="md:col-span-5">
                            <label htmlFor="email">Email Address</label>
                            <input type="text" readOnly defaultValue={user.email} name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="email@domain.com" />
                        </div>

                        <div className="md:col-span-3">
                            <label htmlFor="address">Username</label>
                            <input type="text" defaultValue={user.username} name="username" id="username" placeholder="Username" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="city">Adress</label>
                            <input type="text" name="adress" defaultValue={user.adress} id="adress" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="Adress" />
                        </div>


                        <div className="md:col-span-5">
                            <label htmlFor="bio">Bio</label>
                            <textarea name="bio" id="bio" placeholder='Your Bio' defaultValue={user.bio} className='resize-none h-20 border mt-1 pt-1 rounded px-2 w-full bg-gray-50'></textarea>
                        </div>

                        <p className='w-full md:col-span-5 flex justify-center font-bold'>{alert}</p>

                        <div className="md:col-span-5 text-right">
                            <div className="inline-flex items-end">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                            </div>
                        </div>

                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
    </>
  )
}

export default EditProfileForm