import React, { useState,useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../context/useContext'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import axios from 'axios'
import DeletePost from './DeletePost'


const Dashboard = () => {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)

  const {id} = useParams();
  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token;
  //redir if user not login
  useEffect(()=>{
    if(!token){
      navigate("/login");
    }
  },[])

  useEffect(()=>{
    const getchPosts = async () =>{
      setIsLoading(true)
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`,{withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
        setPosts(response.data)
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }

    getchPosts();
  },[])

  if (isLoading) {
    return <Loader/>
  }
  return (
    <section className='dashboard'>
      {
        posts.length ? <div className='container dashboard_container'>
          {
            posts.map(post => {
              return <article key={post.id} className='dashboard_post'>
                <div className="dashboard_post-info">
                  <div className="dashboard_post-thumbnail">
                    <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="dashboard_post-actions">
                  <Link to={`/posts/${post._id}`} className='btn sm'>View</Link>
                  <Link to={`/posts/${post._id}/edit`} className='btn sm primary'>Edit</Link>
                  <DeletePost postId={post._id}/>
                </div>
              </article>
            })
          }
        </div> : <h2 className='center'>You have no post yet</h2>
      }
    </section>
  )
}

export default Dashboard