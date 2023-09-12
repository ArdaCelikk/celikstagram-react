import React from 'react'

const PostDescription = (props) => {
  return (
    <>
        <div className="text-gray-600 font-semibold  mb-2 mx-3 px-2"></div>
        <div className="text-gray-500 text-sm mb-6 mx-3 px-2">{props.description}</div>
    </>
  )
}

export default PostDescription