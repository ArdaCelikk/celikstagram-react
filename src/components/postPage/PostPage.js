import React, { useEffect, useState } from 'react'
import Nav from "../index/Nav"
import PostHeader from './PostHeader'
import PostImage from './PostImage'
import PostDescription from './PostDescription'
import PostInformations from './PostInformations'
import PostComment from './PostComment'
import axios from 'axios'
import withRouter from "../withRouter"
import { useDispatch, useSelector } from 'react-redux'
import { setUserInformations } from '../../redux/userSlice'
import { setComments, setPosts } from '../../redux/postSlice'
import Comment from "../index/Comment"


const PostPage = (props) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(0)
    useEffect(()=>{
        try {
          const userInfos = async ()=>{
            const res = await axios.post("/informations/userinformations") 
            if(res.data.succeded) {
              dispatch(setUserInformations(res.data.user))
              setLoading(load => ++load)
            }
          }
    
          const comments = async ()=>{
            try {
              const res = await axios.post(`/post/${props.params.id}/comments`)
              if(res.data.succeded) {
                dispatch(setComments(res.data.postComments))
                setLoading(load => ++load)
              }
            } catch (error) {
              console.log(error);
            }
          }
    
          const posts = async ()=> {
            try {
              const res = await axios.post(`/post/${props.params.id}`)
              if(res.data.succeded) {
                dispatch(setPosts(res.data.post))
                setLoading(load => ++load)
              }
            } catch (error) {
              console.log(error);
            }
            }
    
          posts()
          userInfos()
          comments()
        } catch (error) {
          console.log(error);
        }
    },[dispatch, props.params.id,  ])
    const posts = useSelector((state) => state.posts.posts)
    const comments = useSelector((state) => state.posts.comments)
  return (
    <div className="bg-white shadow rounded-lg">
      {
        loading === 3 
        ? <>
          <Nav />
          <PostHeader />
          {
            posts.onlyText 
            ? <></>
            : <PostImage imageURL={posts.url}/>
          }
          <PostDescription description={posts.description}/>
          <PostInformations />
          {
            // eslint-disable-next-line
            comments.map(comment=>{
              if(comment.postId === posts.id) {
                return <Comment key={comment.id} {...comment}  />
              }
            })
          }
          <PostComment />
        </>
        : <></>
      }
    </div>
  )
}

export default withRouter(PostPage)