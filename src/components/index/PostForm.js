import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setPosts } from "../../redux/postSlice"

const PostForm = (props) => {
    const dispatch = useDispatch()
    const [file, setFile] = useState()
    const [description, setDescription] = useState()


    const reloadPosts = async ()=> {
        try {
          const res = await axios.post("/post")
          if(res.data.succeded) {
            dispatch(setPosts(res.data.posts))
          }
        } catch (error) {
          console.log(error.message);
        }
    }

    const onFileSelected = (e)=>{
        setFile(e.target.files[0])
    }

    const onChangeText = (e)=>{
        setDescription(e.target.value.trim())
    }

    const onFormSubmit = async (e)=>{
        try {
            e.preventDefault();
            if(file) {
                const formData = new FormData();
                formData.append('image', file);
                formData.append("description", description)
                formData.append("onlyText", !file)
                const res = await axios.post("/post/create",formData)
                if(res.data.succeded) {
                    reloadPosts()
                    setFile()
                    props.showAlert(res.data.msg)
                } else {
                    props.showAlert(res.data.msg)
                }
            } else {
                if(description) {
                    const res = await axios.post("/post/create", {
                        description: description,
                        onlyText: !file,
                        file: file
                    })
                    if(res.data.succeded) {
                        reloadPosts()
                        props.showAlert(res.data.msg)
                    }
                } else {
                    e.target.message.style.border = "2px solid red"
                    setTimeout(() => {
                        e.target.message.style.border = "none"
                    }, 5000);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <form onSubmit={onFormSubmit} encType='multipart/form-data' className="bg-white shadow rounded-lg mb-6 p-4">
        <textarea onChange={onChangeText} name="message" placeholder="Type something..." className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"></textarea>
        <input accept='.jpg, .png, .jpeg' className='hidden' onChange={onFileSelected} type="file" name='postImg' id='postImg' />
        <footer className="flex justify-between mt-2">
            <div className="flex gap-2">
                <label htmlFor='postImg' className={`${file ? "bg-blue-500" : ""} flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer`}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                </label>
                <span className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </span>
                <span className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                </span>
            </div>
            <button className="flex items-center py-2 px-4 rounded-lg text-sm bg-blue-600 text-white shadow-lg">Share 
                <svg className="ml-1" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
        </footer>
    </form>
  )
}

export default PostForm
