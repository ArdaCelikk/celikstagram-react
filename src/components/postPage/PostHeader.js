import React from 'react'
import { useSelector } from 'react-redux'

const PostHeader = () => {
    const posts = useSelector((state) => state.posts.posts)
  return (
    <div className="flex flex-row px-2 py-3 mx-3">
        <div className="w-auto h-auto rounded-full border-2">
            <div style={{backgroundImage: `url(${posts.user.profile_photo})`}} className="bg-center bg-cover bg-no-repeat w-12 h-12 object-cover rounded-full shadow cursor-pointer" ></div>
        </div>
        <div className="flex flex-col mb-2 ml-4 mt-1">
            <div className="text-gray-600 text-sm font-semibold">{posts.user.username}</div>
            <div className="flex w-full mt-1">
                <div className="text-blue-700 font-base text-xs mr-1 cursor-pointer">
                    Posted
                </div> 
                <div className="text-gray-400 font-thin text-xs">
                    • {posts.createdAt.split("T")[0]}
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostHeader