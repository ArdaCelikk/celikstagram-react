import React from 'react'

const ViewPostBtn = (props) => {
  return (
    <a href={`/post/${props.postId}`} className='w-full text-sm text-gray-500 cursor-pointer px-5 hover:underline'>
        see others
    </a>
  )
}

export default ViewPostBtn