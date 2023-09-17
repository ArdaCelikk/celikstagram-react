import React from 'react'
import "./style.css"
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../redux/postSlice';
import axios from 'axios';

const DropdownMenu = (props) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch()



  const onClickDeletePost =async (e)=>{
    try {
      const res = await axios.delete(`/post/${props.postId}`)
      if(res.data.succeded) {
        dispatch(deletePost({id: props.postId }))
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white  h-full flex flex-col justify-center ">
      <div className="flex items-center justify-center ">
        <div className=" relative inline-block text-left dropdown">
          <span className="rounded-md shadow-sm">
            <button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white  rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800" type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </button>
          </span>
          <div className="opacity-0 invisible relative dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
            <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
              <div className="py-1">
                <a href={`/post/${props.postId}`} tabIndex="1" className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"  role="menuitem" >Show Post</a>
                {
                  props.postUserId === user.id
                  ?
                  <>
                    <span onClick={onClickDeletePost} tabIndex="0" className="cursor-pointer ext-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"  role="menuitem" >Delete Post</span>
                    <span role="menuitem" tabIndex="-1" className="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50" aria-disabled="true">New feature (soon)</span>
                  </>
                  :<></>
                }
                {/* <a href="javascript:void(0)" tabIndex="2" className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem" >License</a> */}
              </div>
              {/* <div className="py-1">
                <a href="javascript:void(0)" tabIndex="3" className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"  role="menuitem" >Sign out</a>
              </div> */}
            </div>
          </div>
        </div>
      </div>              
      </div>
  )
}

export default DropdownMenu