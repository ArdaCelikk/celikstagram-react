import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import withRouter from "../withRouter"



let diffrentUser = false

const Profile = (props) => {
    const user = useSelector((state) => state.user.user)

    useEffect(()=>{
        try {
            if(props.params.username) {
                diffrentUser= true
            }else {
                diffrentUser= false
            }
        } catch (error) {
            console.log(error);
        }
    })

  return (
            <main className="profile-page">
                <section className="relative block h-500-px">
                <div className="absolute top-0 w-full h-full bg-center bg-cover"
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1578470303280-ea206504cc22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"}}>
                    <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                </div>
                <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{transform: "translateZ(0px)"}}>
                    <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                    <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>
                </section>
                <section className="relative py-16 bg-blueGray-200">
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                    <div className="px-6">
                        <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                            <div className="relative">
                            <img alt="..." src={diffrentUser ? "" :user.profile_photo} className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" />
                            </div>
                        </div>
                        <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                            <div className="py-6 px-3 mt-32 sm:mt-0">
                            <button className="bg-blue-500 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                {
                                    diffrentUser ? "Follow" : "Edit"
                                }
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
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda tenetur aut animi similique quas veniam voluptas hic quia ab. Amet!
                            </p>
                            <a href="#pablo" className="font-normal text-pink-500">Show more</a>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
                <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                    <div className="text-sm text-blueGray-500 font-semibold py-1">
                        Made with <Link to="https://www.react.dev" className="text-blueGray-500 hover:text-gray-800">React JS</Link> by <Link to="https://www.ardacelik.com" className="text-blueGray-500 hover:text-blueGray-800" > Arda Çelik</Link>.
                    </div>
                    </div>
                </div>
                </div>
            </footer>
                </section>
            </main>
  )
}



export default withRouter(Profile)
