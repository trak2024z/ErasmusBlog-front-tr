import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import PostItem from './PostItem'
import axios from 'axios'


const Posts = () => {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
      const fetchPost = async () =>{
        setIsLoading(true);
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`);
          setPosts(response?.data);
        } catch (error) {
          console.log(error);
        }

        setIsLoading(false)
      }
      fetchPost()
    }, [])

    if (isLoading) {
      return <Loader/>
    }
  return (
    <section className="Posts">
      {posts.length > 0 ? <div className="container posts_container">
        {posts.map(({ _id, thumbnail, title, category, description, creator, createdAt }) => (
          <PostItem
            key={_id}
            postID={_id}
            thumbnail={thumbnail}
            title={title}
            category={category}
            description={description}
            creator={creator}
            createdAt={createdAt}
          />
        ))}
      </div> : <h2 className='center'>No post found</h2>}
    </section>
  );
}

export default Posts