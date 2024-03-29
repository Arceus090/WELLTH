import React from 'react'
import Posts from '../posts/Posts'
import ProfileCard from '../Card/ProfileCard'
import Rightside from '../Friend/Friend'
import SuggestedUsers from '../Recommend/Recommend'
import './homecs.css'

const Home = () => {
  return (
    <div className="home-container">
      <div className="left">
        <ProfileCard />
        <Rightside />  
      </div>
      <Posts />
      <div>
      <SuggestedUsers />
      
      </div>
    </div>
  )
}

export default Home