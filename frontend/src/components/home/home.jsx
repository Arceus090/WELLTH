import React from 'react'
import Posts from '../post/Post'
import ProfileCard from '../profileCard/ProfileCard'
import Rightside from '../rightside/Rightside'
import SuggestedUsers from '../suggestedUser/SuggestedUser'
import './homecs.css'

const Home = () => {
  return (
    <div className="home-container">
      <div className="left">
        <ProfileCard />
        <SuggestedUsers />
      </div>
      <Posts />
      <Rightside />
    </div>
  )
}

export default Home