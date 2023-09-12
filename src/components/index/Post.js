import React from 'react'
import PostHeader from "./PostHeader"
import PostImg from "./PostImg"
import PostDescription from "./PostDescription"
import PostActions from './PostActions'
import Comment from './Comment'
import PostComment from './PostComment'
import { useSelector } from 'react-redux'
import ViewPostBtn from './ViewPostBtn'
// import Loading from '../loading/Loading'

const Post = (props) => {
  let count = 0
  // const [likes, setLikes] = useState()
  // useState(()=>{
  //   const setLike = async ()=>{
  //     setLikes(await JSON.parse())
  //   }
  // })
  // console.log(props.likes);
  const comments = useSelector((state) => state.posts.comments);
  return (
    <div className="bg-white shadow rounded-lg mb-6">
      <PostHeader createdAt={props.createdAt} user={props.user} />
      {
        props.onlyText 
        ? <></>
        : <PostImg url={props.url} />
      }
      <PostDescription description={props.description} />
      <PostActions likes={JSON.parse(props.likes)} postID={props.id} />
      <ViewPostBtn postId={props.id}/>
      {
        // eslint-disable-next-line      
        comments.map((comment)=>{
          
          if(comment.postId === props.id) {
            count++
            if(count <= 2) {
              return <Comment key={comment.id} {...comment} />
            } else {
              return <></>
            }
          }
        })
      }
      <PostComment commentCount={count} postId={props.id}/>
      
  </div>
  )
}

export default Post
