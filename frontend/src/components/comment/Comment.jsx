/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { format } from 'timeago.js'
import man from '../../assets/noman.png'
import { capitalizeFirstLetter } from '../util/capitalizeFirstLetter'
import './comment.css'

const Comment = ({ c}) => {
   const {token, user} = useSelector((state) => state.auth)
   const [comment, setComment] = useState(c)
   const [isLiked, setIsLiked] = useState(comment?.likes?.includes(user?._id))

   const handleLikeComment = async() => {
    try {
      if (!c || !c._id) {
        console.error("Invalid comment data:", c);
        return;
      }

      await fetch(`http://localhost:5000/comment/toggleLike/${c?._id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        method: "PUT"
      })

      setComment(prev => {
        return {
          ...prev,
          likes: isLiked
          ? [...prev.likes].filter((id) => id !== user._id)
          : [...prev.likes, user._id]
        }
      })
      setIsLiked(prev => !prev)
    } catch (error) {
      console.error(error)
    }
   }

  return (
    <div className="comment-container">
    <div className="contoiner">
      <div className="commentLeft">
      <img src={user?.profileImg ? `http://localhost:5000/images/${user.profileImg}` : man} className="profileUserImg"/>
        <div className="commentData">
          <span>{comment?.user?.username ? capitalizeFirstLetter(comment?.user?.username) : ''}</span>
          <span className="commentTimeago">{format(comment?.createdAt)}</span>
        </div>
        <div className="commentText">{comment?.commentText}</div>
      </div>
      <div className="commentRight">
        {
          isLiked 
          ? <AiFillHeart onClick={handleLikeComment} />
          : <AiOutlineHeart onClick={handleLikeComment} />
        }
        <span>{comment?.likes?.length || 0}</span>
        <span>likes</span>
      </div>
    </div>
    </div>
  )
}

export default Comment
