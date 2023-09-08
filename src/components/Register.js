import React, { Component } from 'react'
import celikstagram from "../assets/celikstagram.png"
import axios from 'axios';
import { Link } from 'react-router-dom';
import withRouter from './withRouter'

class Register extends Component {

    constructor(props) {
        super(props)
        this.onFormSubmit = this.onFormSubmit.bind(this)

        this.state = {
            alert: ""
        }
    }
    
    async componentDidMount() {
        try {
            const {navigate} = this.props
            const res = await axios.post("/informations/userinformations") 
            if(res.data.succeded) {
                if(res.data.user){
                    navigate("/")
                }
            }
        } catch (error) {
            console.log("Something going wrong. Please try later.");
        }
    }

    async onFormSubmit(e) {
        try {
            e.preventDefault();
            const {navigate} = this.props
            const user = {
                name:  e.target.name.value,
                username: e.target.username.value,
                email: e.target.email.value,
                password: e.target.password.value
            }
            const req = await axios.post("/account/register", user)
            if(req.data.succeded) {
                this.setState({
                    alert: req.data.msg
                })
                e.target.submit.value = "Redirecting..."
                setTimeout(() => {
                    navigate("/login")
                }, 1000);
            } else {
                this.setState({
                    alert: req.data.msg
                })
            }
            
        } catch (error) {
            this.setState({
                alert: error.response.data.msg
            })
        }
    }


  render() {
    return (
        <>
        <div
            className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
            >
            <div
                className="
                flex flex-col
                bg-white
                shadow-md
                px-4
                sm:px-6
                md:px-8
                lg:px-10
                py-8
                rounded-3xl
                w-50
                max-w-md
                "
            >
                <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
                    <img className='h-24' src={celikstagram} alt="" />
                </div>
                <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
                Enter your credentials to get access account
                </div>

                <div className="mt-10">
                <form onSubmit={this.onFormSubmit}>
                    <div className="flex flex-col mb-5">
                    <label
                        htmlFor="name"
                        className="mb-1 text-xs tracking-wide text-gray-600"
                        >Name:</label
                    >
                    <div className="relative">
                        <div
                        className="
                            inline-flex
                            items-center
                            justify-center
                            absolute
                            left-0
                            top-0
                            h-full
                            w-10
                            text-gray-400
                        "
                        >
                        <i className="fas fa-user text-blue-500"></i>
                        </div>

                        <input
                        id="name"
                        type="text"
                        required
                        name="name"
                        className="
                            text-sm
                            placeholder-gray-500
                            pl-10
                            pr-4
                            rounded-2xl
                            border border-gray-400
                            w-full
                            py-2
                            focus:outline-none focus:border-blue-400
                        "
                        placeholder="Enter your name"
                        />
                    </div>
                    </div>
                    <div className="flex flex-col mb-5">
                    <label htmlFor="username" className="mb-1 text-xs tracking-wide text-gray-600" >Username:</label
                    >
                    <div className="relative">
                        <div className=" inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <i className="fas fa-at text-blue-500"></i>
                        </div>

                        <input required maxLength="13" id="username" type="text" name="username" className=" text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 " placeholder="Enter your username" />
                    </div>
                    </div>
                    <div className="flex flex-col mb-5">
                    <label htmlFor="email" className="mb-1 text-xs tracking-wide text-gray-600" >E-Mail Address:</label
                    >
                    <div className="relative">
                        <div
                        className=" inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <i className="fas fa-at text-blue-500"></i>
                        </div>

                        <input id="email" required type="email" name="email" className=" text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 " placeholder="Enter your email" />
                    </div>
                    </div>
                    <div className="flex flex-col mb-6">
                    <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600" >Password:</label>
                    <div className="relative">
                        <div
                        className="
                            inline-flex
                            items-center
                            justify-center
                            absolute
                            left-0
                            top-0
                            h-full
                            w-10
                            text-gray-400
                        "
                        >
                        <span>
                            <i className="fas fa-lock text-blue-500"></i>
                        </span>
                        </div>

                        <input
                        id="password"
                        type="password"
                        name="password"
                        required
                        className="
                            text-sm
                            placeholder-gray-500
                            pl-10
                            pr-4
                            rounded-2xl
                            border border-gray-400
                            w-full
                            py-2
                            focus:outline-none focus:border-blue-400
                        "
                        placeholder="Enter your password"
                        />
                    </div>
                    </div>

                    <p className='flex mt-2 items-center justify-center focus:outline-none text-sm sm:text-base py-2 w-full'>{this.state.alert}</p>


                    <div className="flex w-full">
                    <button
                        type="submit"
                        className="
                        flex
                        mt-2
                        items-center
                        justify-center
                        focus:outline-none
                        text-white text-sm
                        sm:text-base
                        bg-blue-500
                        hover:bg-blue-600
                        rounded-2xl
                        py-2
                        w-full
                        transition
                        duration-150
                        ease-in
                        "
                    >
                        <span className="mr-2 uppercase">Sign Up</span>
                        <span>
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        </span>
                    </button>
                    </div>
                </form>
                </div>
            </div>
            <div className="flex justify-center items-center mt-6">
                <span className="ml-2"
                    >You have an account?
                    <Link
                    to="/login"
                    className="text-xs ml-2 text-blue-500 font-semibold"
                    >Login here</Link
                    ></span
                >
            </div>
            </div>
        </>
    )
  }
}

export default withRouter(Register)