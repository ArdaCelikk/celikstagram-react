import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EditProfileForm = (props) => {


    const navigate =useNavigate()
    const defaultUser = { id: "", username: "", name: "", adress: "", profile_photo: "", followers: "", following: "", };
    const reducerUser = useSelector((state) => state.user.user);
    // STATES
    const [user, setUser] = useState(defaultUser);

    useEffect(() => {
        try {
            if(reducerUser.following) {
                setUser(reducerUser);
            } else {
                // navigate("/login")
            }
        } catch (error) {
            console.error("Please login.")
        }
    }, [reducerUser, navigate]); 

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
                        <p></p>
                    </div>

                    <form className="lg:col-span-2">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-5">
                            <label htmlFor="full_name">Name</label>
                            <input type="text" defaultValue={user.name} name="full_name" placeholder='Name' id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
                        </div>

                        <div className="md:col-span-5">
                            <label htmlFor="email">Email Address</label>
                            <input type="text" defaultValue={user.email} name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="email@domain.com" />
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
                            <label htmlFor="password">Passowrd</label>
                            <input type="password" name="password" id="password" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  placeholder="***********" />
                        </div>

                        <div className="md:col-span-5">
                            <label htmlFor="bio">Bio</label>
                            <textarea name="bio" id="bio" placeholder='Your Bio' className='resize-none h-20 border mt-1 pt-1 rounded px-2 w-full bg-gray-50'></textarea>
                        </div>

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