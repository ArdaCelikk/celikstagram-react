import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../../redux/postSlice'

const PostInformations =  (props) => {
    const post = useSelector((state) => state.posts.posts)
    const user = useSelector((state) => state.user.user)
    const comments = useSelector((state) => state.posts.comments);
    const [postCommentCount, setPostCommentCount] = useState(0)
    const dispatch = useDispatch()
    useEffect(()=>{
        try {
            if(comments.length > 0) {
                setPostCommentCount(0)
                // eslint-disable-next-line
                comments.map(comment=>{
                    if(comment.postId === post.id) {
                        setPostCommentCount(count => ++count)
                    }
                })  
            }
        } catch (error) {
            console.log(error);
        }
    }, [comments, post.id, dispatch])


    const likePost = async (e)=>{
        try {
            const res = await axios.post("/post/like", {postID: post.id})
            if(res.data.succeded) {
                res.data.posts.forEach( async (resPost)=>{
                    if(resPost.id === post.id) {
                        let parsedPost = {...resPost, likes: await JSON.parse(resPost.likes)}
                        dispatch(setPosts(parsedPost))
                    }
                })
                // console.log(res.data);
            }
            
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
        <div className="flex justify-start mb-4 border-t border-gray-100">
            <div className="flex w-full mt-1 pt-2 pl-5">
                <span className="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="14px" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                    </svg>
                </span>
            </div>
            <div className="flex justify-end w-full mt-1 pt-2 pr-5">
                <span className="transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 w-8 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="14px" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                    </svg>
                </span>
                <span onClick={likePost} className="transition ease-out duration-300 hover:bg-gray-50 bg-gray-100 h-8 px-2 py-2 text-center rounded-full text-gray-100 cursor-pointer">
                    <svg className="h-4 w-4 text-red-500" fill={post.likes.includes(user.id) ? "red" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                </span>
            </div>
        </div>
        <div className="flex w-full border-t border-gray-100">
            <div className="mt-3 mx-5 flex flex-row text-xs">
                <div className="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">Comments:<div className="ml-1 text-gray-400 text-ms">{postCommentCount}</div></div>
            </div>
            <div className="mt-3 mx-5 w-full flex justify-end text-xs">
                <div className="flex text-gray-700  rounded-md mb-2 mr-4 items-center">Likes: <div className="ml-1 text-gray-400 text-ms"> {post.likes.length}</div></div>
            </div>
        </div>
    </>
  )
}

export default PostInformations