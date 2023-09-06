import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';


const UserProfile = (props) => {
    const navigate =useNavigate()
    const defaultUser = { id: "", username: "", name: "", adress: "", profile_photo: "", followers: "", following: "", };
    const reducerUser = useSelector((state) => state.user.user);
    const posts = useSelector((state) => state.posts.posts);

    const postCount = []
    posts.map(post=> post.user_id === reducerUser.id && postCount.push(post) )
    // STATES
    const [user, setUser] = useState(defaultUser);
     

    useEffect(() => {
        try {
            if(reducerUser.following) {
                setUser(reducerUser);
            } else {
                navigate("/login")
            }
        } catch (error) {
            console.error("Please login.")
        }
    }, [reducerUser, navigate]); 

  return (
    <aside className="">
            <div className="bg-white shadow rounded-lg p-10">
                <div className="flex flex-col gap-1 text-center items-center">
                    <Link to="/profile">
                        <img className="h-32 w-32 bg-white p-2 rounded-full shadow mb-4" src={user.profile_photo} alt="" />
                    </Link>
                    <p className="font-semibold">{user.username}</p>
                    <div className="text-sm leading-normal text-gray-400 flex justify-center items-center">
                    <svg viewBox="0 0 24 24" className="mr-1" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        {user.adress}
                    </div>
                </div>
                <div className="flex justify-center items-center gap-2 my-3">
                    <div className="font-semibold text-center mx-4">
                        <p className="text-black">{postCount.length}</p>
                        <span className="text-gray-400">Posts</span>
                    </div>
                    <div className="font-semibold text-center mx-4">
                        <p className="text-black">{user.followers.length}</p>
                        <span className="text-gray-400">Followers</span>
                    </div>
                    <div className="font-semibold text-center mx-4">
                        <p className="text-black">{user.following.length}</p>
                        <span className="text-gray-400">Following</span>
                    </div>
                </div>
            </div>
        </aside>
  )
}

export default UserProfile
