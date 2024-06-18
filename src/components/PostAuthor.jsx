import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar1 from '../images/avatar1.jpg'
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';

import en from "javascript-time-ago/locale/en.json"
TimeAgo.addDefaultLocale(en)

const PostAuthor = ({createdAt, creator}) => {

  const [author, setAuthor] = useState({});

  useEffect(()=>{
    const getAuthor = async () =>{
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${creator}`)
        setAuthor(response?.data)
      } catch (error) {
        console.log(error)
      }
    }
    getAuthor();
  },[])


  return (
    <Link to={`/posts/users/${creator}`} className='post_author'>
      <div className="post_author-avatar">
        <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author?.avatar}`} alt="" />
      </div>
      <div className="post_author-details">
        <h5>By: {author.name}</h5>
        <small><ReactTimeAgo date={new Date(createdAt)} locale='en-US'/></small>
      </div>
    </Link>
  );
}

export default PostAuthor