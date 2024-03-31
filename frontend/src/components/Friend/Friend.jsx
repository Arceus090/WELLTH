/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './friend.css';
import man from '../../assets/noman.png';
import { capitalizeFirstLetter } from '../util/capitalizeFirstLetter';

const Friend = () => {
  const [friends, setFriends] = useState([]);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await fetch(`http://localhost:5000/user/find/friends`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();

        setFriends(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchFriends();
  }, [user.followings]);

  return (
    <div className="right-side-container">
      <div className="container">
        <div className="wrapper">
          <span><b>YOUR FRIENDS </b></span>
          {friends?.length > 0 ? (
            friends.map((friend) => (
              friend ? (
                <Link className="user" to={`/profileDetail/${friend._id}`} key={friend._id}>
                  <img src={friend?.profileImg ? `http://localhost:5000/images/${friend.profileImg}` : man} className="profileUserImg" alt="Profile" />
                  <div className="userData">
                    <span>{capitalizeFirstLetter(friend.username)}</span>
                  </div>
                </Link>
              ) : null
            ))
          ) : <span>You currently have no friends. Follow someone!</span>}
        </div>
      </div>
    </div>
  );
}

export default Friend;
