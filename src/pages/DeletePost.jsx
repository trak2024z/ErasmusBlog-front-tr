import React, { useState,useContext, useEffect } from 'react'
import { UserContext } from '../context/useContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';

const DeletePost = ({postId}) => {
  const navigate = useNavigate();
  const locatioin = useLocation();



  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token;
  //redir if user not login
  useEffect(()=>{
    if(!token){
      navigate("/login");
    }
  },[])

  const removePost = async (postId) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${postId}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      if (response.status == 200) {
        if(locatioin.pathname == `/myposts/${currentUser.id}`){
          navigate(postId)
        }else{
          navigate('/')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <Link className='btn sm danger' onClick={()=>removePost(postId)}>Delete</Link>
  )
}

export default DeletePost