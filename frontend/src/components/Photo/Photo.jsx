/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import postdemoimg from '../../assets/sui.jpg'
import './photo.css'

const PostPhoto = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className=" post-photo-container">
    <Link
     className="post"
     onMouseEnter={() => setIsHovered(true)}
     onMouseLeave={() => setIsHovered(false)}
     to={`/postDetails/${post._id}`}
    >
      <img src={postdemoimg}/>
      {isHovered && <div className="likes">{post?.likes?.length} likes</div>}
    </Link>
    </div>
  )
  
}

export default PostPhoto