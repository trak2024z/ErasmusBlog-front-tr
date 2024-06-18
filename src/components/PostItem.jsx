import React from 'react'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
const PostItem = ({ postID, title, creator, description, thumbnail, category ,createdAt}) => {

    const shortDesc = description.length > 145 ? description.substr(0, 145) + "..." : description;
    const shortTitle = title.length > 30?title.substr(0, 30) + "...":title;

    
  return (
    <article className="post">
      <div className="post_thumbnail">
        <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`} alt={title} />
      </div>
      <div className="post_content">
        <Link to={`/posts/${postID}`}>
          <h3>{shortTitle}</h3>
        </Link>
        <p dangerouslySetInnerHTML={{__html: shortDesc}}></p>
      </div>
      <div className="post_footer">
        <PostAuthor creator={creator} createdAt={createdAt}/>
        <Link to={`/posts/categories/${category}`} className='btn category'>{category}</Link>
      </div>
    </article>
  );
};

export default PostItem