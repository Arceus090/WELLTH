/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import './Card.css';
import man from '../../assets/noman.png';
import { Link } from 'react-router-dom';
import { capitalizeFirstLetter } from '../util/capitalizeFirstLetter';
import { format } from 'timeago.js';
import { useSelector } from 'react-redux';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const ProfileCard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="profile-card-container">
      <div className="container">
        <Link style={{ textDecoration: 'none' }} to={`/profileDetail/${user._id}`}>
          <h3 className="myProfile">MY PROFILE</h3>
        </Link>
        <div className="wrapper">
          <div className="top">
            <div className="imgContainer">
              <img src={user?.profileImg ? `http://localhost:5000/images/${user.profileImg}` : man} className="profileUserImg" />
            </div>
            <div className="usernameAndCreatedAt">
              <p><span>Username:</span> {capitalizeFirstLetter(user.username)}</p>
              <p><span className="shortBio">Bio:</span> {user?.bio ? user.bio : "Live is full of adventures"}</p>
              <p><span>Followers:</span> {user.followers.length}</p>
              <p><span>Followings:</span> {user.followings.length}</p>
              <p><span>Created At:</span> {format(user.createdAt)}</p>
              <p><span>Socials:</span>
               <a href='https://www.facebook.com/'><FaFacebook className="social-icon" /></a>
               <a href='https://www.instagram.com/'> <FaInstagram className="social-icon" /></a>
               <a href='https://www.youtube.com/'><FaYoutube className="social-icon" /></a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
