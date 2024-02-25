/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import './ProfileCard.css'
import man from '../../assets/noman.png'
import {Link} from 'react-router-dom'
import { capitalizeFirstLetter } from '../util/capitalizeFirstLetter'
import {format} from 'timeago.js'
import { useSelector } from 'react-redux'

const ProfileCard = () => {
  const {user} = useSelector((state) => state.auth)

  return (
    
    <div className="profile-card-container">
    <div className="container">
      <div className="wrapper">
        <div className="top">
          <div className="imgContainer">
            <img src={man} className="profileUserImg"/>
          </div>
          <div className="usernameAndCreatedAt">
            <p><span>Username:</span> {capitalizeFirstLetter(user.username)}</p>
            <p><span>Created At:</span> {format(user.createdAt)}</p>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <p>Followers: <span>{user.followers.length}</span></p>
          <p>Followings: <span>{user.followings.length}</span></p>
        </div>
      </div>
        <Link style={{textDecoration: 'none'}} to={`/profileDetail/${user._id}`}>
          <h3 className="myProfile">My Profile</h3>
        </Link>
    </div>
    </div>
  )
}

export default ProfileCard