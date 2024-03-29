/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import './Recomend.css'
import man from '../../assets/noman.png'
import { capitalizeFirstLetter } from '../util/capitalizeFirstLetter'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { handleFollow } from '../../redux/authSlice'

const SuggestedUsers = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([])
  const dispatch = useDispatch()
  const { user, token } = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchSuggestedUsers = async() => {
      try {
         const res = await fetch(`http://localhost:5000/user/find/suggestedUsers`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
         })
         const data = await res.json()
       
         setSuggestedUsers(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchSuggestedUsers()
  }, [])

  const toggleFollow = async(id) => {
    try {
      await fetch(`http://localhost:5000/user/toggleFollow/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        method: "PUT"
      })
      setSuggestedUsers((prev) => {
        return [...prev].filter((user) => user._id !== id)
      })
      dispatch(handleFollow(id))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="suggested-user-container">
    <div className="container">
      <div className="wrapper">
        
        {suggestedUsers?.length > 0 ? (
          <div className="suggestedUsers">
              <h3 className="title">Recommended Users</h3>
              {suggestedUsers?.map((suggestedUser) => (
                <div className="suggestedUser" key={suggestedUser._id}>
                  <Link to={`/profileDetail/${suggestedUser._id}`}>
                    <img src={suggestedUser?.profileImg ?`http://localhost:5000/images/${suggestedUser.profileImg}` : man} className="imgUser"/>

                  </Link> 
                  <div className="suggestedUserData">
                    <span>{capitalizeFirstLetter(suggestedUser.username)}</span>
                    <span className="suggestedMsg">Suggested to you</span>
                  </div>
                  <button onClick={() => toggleFollow(suggestedUser._id)} className="followBtn">Follow</button>
                </div>
              ))}
          </div>
        ) : <h3 className="title">You have no suggested users</h3>}
      </div>
    </div>
    </div>
  )
}

export default SuggestedUsers