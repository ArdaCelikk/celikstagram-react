import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import withRouter from "../withRouter"
import axios from 'axios';




const Informations = (props) => { 
    const defaultUser = { id: "", username: "", name: "", adress: "", profile_photo: "", followers: "", following: "", };
    const [user, setUser] = useState(defaultUser)
    const [navigated, setNavigated] = useState(false)
    const [diffrentUser, setDiffrentUser] = useState(false)
    const [btnText, setBtnText] = useState("edit")
    const loggedUser = useSelector((state) => state.user.user);
    const navigate = useNavigate()

    // USER LOGGED?
    // IF ITS OTHER USER PROFILE TAKES A USER INFORMATİONS
    useEffect(() => {
        try {
            if(loggedUser.following) {
                if(props.params.username === loggedUser.username){
                    if(!navigated){
                        navigate("/profile")
                        setNavigated(true)
                    }  
                }else if(diffrentUser && props.params.username !== loggedUser.username) {
                    const getUserInformations = async ()=>{
                        try {
                            const res = await axios.post("/account/profile", {username: props.params.username})
                            if(res.data.succeded) {
                                if(res.data.sameAccount) {
                                    navigate("/profile")
                                } else {
                                    setUser(res.data.user)
                                }
                            } else {
                                navigate("/")
                            }
                        } catch (error) {
                            if(!navigated){
                                navigate("/404")
                                setNavigated(true)
                            } 
                        }
                    }
                    getUserInformations()
                } else {
                    setUser(loggedUser);
                }
            } else {
                navigate("/login")
            }
        } catch (error) {
            console.error("Please login.")
        }
    }, [loggedUser, props, diffrentUser, navigate, navigated]); 


    // OWN PROFILE OR DIFFRENT USER PROFILE CHECK
    useEffect(()=>{
        try {
            if(props.params.username) {
                setDiffrentUser(true)
            } else {
                setDiffrentUser(false)
            }
        } catch (error) {
            
        }
    },[props, navigate])


    // SETTING BUTTON TEXT 
    useEffect(()=>{
        try {
            if(diffrentUser && user.followers.includes(loggedUser.id)) {
                setBtnText("unfollow")
            } else if(diffrentUser) {
                setBtnText("follow")
            } else {
                setBtnText("edit")
            }
        } catch (error) {
            
        }
    },[user.followers, diffrentUser,loggedUser.id]) 

    const followButtonClick = async ()=>{
        try {
            if(diffrentUser) {
                const res = await axios.post(`/user/follow/${user.id}`,{follow: user.followers.includes(loggedUser.id)})
                if(res.data.succeded) {
                    navigate(`/profile/${props.params.username}`)
                }
            } else {
                navigate("/profile/edit")
            }
        } catch (error) {
            console.log(error);
        }
    }




  return (
    <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
                <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                    <img alt="..." src={user.profile_photo} className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" />
                    </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button onClick={followButtonClick} className="bg-blue-500 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                        {btnText}
                    </button>
                    </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">0</span><span className="text-sm text-blueGray-400">Posts</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{user.followers.length}</span><span className="text-sm text-blueGray-400">Followers</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{user.following.length}</span><span className="text-sm text-blueGray-400">Following</span>
                    </div>
                    </div>
                </div>
                </div>
                <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    {user.username}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                    {user.adress}
                </div>
                {/* <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i> Web Developer
                </div>
                <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>University of Software Engineering
                </div> */}
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        {user.bio}
                    </p>
                    <Link to="/" className="font-normal text-pink-500 cursor-pointer">Return Main Page</Link>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
  )
}

export default withRouter(Informations)