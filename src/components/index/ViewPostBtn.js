import React from 'react'
import { Link } from 'react-router-dom'

const ViewPostBtn = (props) => {
  return (
    <Link to={`/post/${props.postId}`} className='w-full text-sm text-gray-500 cursor-pointer px-5 hover:underline'>
        see others
    </Link>
  )
}

export default ViewPostBtn