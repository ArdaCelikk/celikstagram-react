import React from 'react'

const PostImage = (props) => {
  return (
    <>
        <div className="border-b border-gray-100"></div> 
        <div className="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2">
            <img className="rounded w-full" alt='postimage' src={props.imageURL} />
        </div>
    </>
  )
}

export default PostImage