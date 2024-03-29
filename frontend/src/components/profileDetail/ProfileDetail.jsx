/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import man from '../../assets/noman.png';
import { handleFollow } from '../../redux/authSlice';
import PostPhoto from '../Photo/Photo';
import './profileDetail.css';

const ProfileDetail = () => {
  const [profile, setProfile] = useState('');
  const [profilePosts, setProfilePosts] = useState([]);
  const { user, token } = useSelector((state) => state.auth);
  const [isFollowed, setIsFollowed] = useState(false);
  const [show, setShow] = useState('mypost');
  const dispatch = useDispatch();
  const { id } = useParams();

 // fetch profile
 useEffect(() => {
  const fetchProfile = async() => {
     try {
      const res = await fetch(`http://localhost:5000/user/find/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data  = await res.json()
      setProfile(data)

      if(user?._id !== data?._id){
        setIsFollowed(user?.followings?.includes(data?._id))
      }
     } catch (error) {
      console.error(error)
     }
  }
  fetchProfile()
}, [id])

// fetch profile posts
useEffect(() => {
  const fetchProfilePosts = async() => {
    try {
      const res = await fetch(`http://localhost:5000/post/find/userposts/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();
      setProfilePosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchProfilePosts();
}, [id, token]);

  
  // handle follow function
  const handleFollowFunction = async () => {
    try {
      await fetch(`http://localhost:5000/user/toggleFollow/${profile?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'PUT',
      });

      dispatch(handleFollow(id));

      setProfile((prev) => ({
        ...prev,
        followers: isFollowed
          ? [...prev.followers].filter((id) => id !== user._id)
          : [...prev.followers, user._id],
      }));
      setIsFollowed((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile-detail-container">
      <div className="container">
        <div className="wrapper">
          <div className="top">
            <div className="top-left-side">
              <img
                src={profile?.profileImg ? `http://localhost:5000/images/${profile?.profileImg}` : man}
                className="profileImg"
              />
             

            </div>
            <div className="top-right-side">
              <h4>{profile?.username}</h4>
              <h4>Bio: {profile?.desc ? profile.desc : 'Life is full of adventures'}</h4>
            </div>
            {profile?._id !== user._id && (
              <button onClick={handleFollowFunction} className="followBtn">
                {isFollowed ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>
          <div className="center">
            <div className="followings">Followings: {profile?.followings?.length}</div>
            <div className="followers">Followers: {profile?.followers?.length}</div>
          </div>
          {user._id === profile?._id && (
            <div className="posts-or-bookmarked">
              <button onClick={() => setShow('mypost')} className={`${show === 'mypost' && 'active'}`}>
                My posts
              </button>
             
            </div>
          )}
          {show === 'mypost' && profilePosts?.length > 0 ? (
            <div className="bottom">
              {profilePosts.map((post) => (
                <PostPhoto post={post} key={post._id} />
              ))}
            </div>
          ) : show === 'mypost' ? (
            <h2>Profile has no posts</h2>
          ) : null}
         
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
