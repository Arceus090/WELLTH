/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineClose, AiOutlineFileImage, AiOutlineLogout, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai'
import { AiOutlineMessage } from 'react-icons/ai';
import {GiHamburgerMenu} from 'react-icons/gi'
import { logout, updateUser } from '../../redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import man from '../../assets/noman.png'
import './navbar.css'
import { useState } from 'react'
import { useEffect } from 'react'



const Navbar = () => {
  const {token, user} = useSelector((state) => state.auth)
  const [searchText, setSearchText] = useState("")
  const [state, setState] = useState({})
  const [photo, setPhoto] = useState("")
  const handleState = (e) => {
    setState(prev => {
     return {...prev, [e.target.name]: e.target.value}
    })
  }

const [showModal, setShowModal] = useState(false)
const [showForm, setShowForm] = useState(false)

const [allUsers, setAllUsers] = useState([])
const [filteredUsers, setFilteredUsers] = useState([])
const dispatch = useDispatch()
const navigate = useNavigate()

// mobile
const [showMobileNav, setShowMobileNav] = useState(false)


// fetch all users
useEffect(() => {
  const fetchAllUsers = async() => {
    try {
      const res = await fetch(`http://localhost:5000/user/findAll`)
      const data = await res.json()

      setAllUsers(data)
    } catch (error) {
      console.error(error)
    }
  }
  fetchAllUsers()
}, [])

useEffect(() => {
  if(searchText){
     setFilteredUsers(allUsers.filter((user) => user.username.includes(searchText)))
  } else {
    setFilteredUsers(allUsers)
  }
}, [searchText])

const handleLogout = () => {
  dispatch(logout())
  navigate('/login')
}

const handleShowForm = () => {
  setShowForm(true)
  setShowModal(false)
}

const handleUpdateProfile = async(e) => {
  e.preventDefault()
  let filename = null
  if(photo){
    const formData = new FormData()
    filename = crypto.randomUUID() + photo.name
    formData.append('filename', filename)
    formData.append('image', photo)
    
    await fetch(`http://localhost:5000/upload/image`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      method: 'POST',
      body: formData
    })
  }
    

  try {
    const res = await fetch(`http://localhost:5000/user/updateUser/${user._id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      method: "PUT",
      body: JSON.stringify({...state, profileImg: filename})
    })
    
    const data = await res.json()
    setShowForm(false)
    dispatch(updateUser(data))
    window.location.reload()
  } catch (error) {
    console.error(error)
  }
}


return (
  <div className="navbar-container">
  <div className="container">
    <div className="wrapper">
      <div className="left">
        <Link to='/'>
          WELLTH
        </Link>
      </div>
      <div className="center">
        <input value={searchText} onChange={(e) => setSearchText(e.target.value)} type="text" placeholder="Search user..." />
        <AiOutlineSearch className="searchIcon" />
        {searchText && (
          <div onClick={() => setSearchText("")} className="allUsersContainer">
            {filteredUsers?.map((user) => (
              <Link to={`/profileDetail/${user._id}`} key={user._id}>
                <img src={user?.profileImg ? `http://localhost:5000/images/${user.profileImg}` : man} />
                <div className="userData">
                  <span>{user?.username}</span>
                  <span>{user?.bio?.slice(0, 10)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="right">
        <Link to='/upload' style={{ textDecoration: 'none', color: 'inherit' }}>
          Upload
        </Link>
        <Link to="/chat">
          <AiOutlineMessage />
        </Link>
        <div className="icons">
          <AiOutlineUser />
          <AiOutlineLogout onClick={handleLogout} />
        </div>
       
        <img
          src={user?.profileImg ? `http://localhost:5000/images/${user?.profileImg}` : man}
          className="profileUserImg"
          onClick={() => setShowModal(prev => !prev)}
        />

        {showModal &&
          <div className="modal">
            <span onClick={handleShowForm}>Update Profile</span>
          </div>
        }
      </div>
        {
          showForm &&
          <div className="updateProfileForm" onClick={() => setShowForm(false)}>
            <div className="updateProfileWrapper" onClick={(e) => e.stopPropagation()}>
              <h2>Update Profile</h2>
              <form onSubmit={handleUpdateProfile}>
                <input type="text" placeholder='Username' name="username" onChange={handleState} />
                <input type="email" placeholder='Email' name="email" onChange={handleState} />
                <input type="text" placeholder='Bio' name="bio" onChange={handleState} />
                <input type="password" placeholder='Password' name="password" onChange={handleState} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '50%' }}>
                  <label htmlFor='photo'>Profile Picture <AiOutlineFileImage /></label>
                  <input
                    type="file"
                    id='photo'
                    placeholder='Profile picture'
                    style={{ display: 'none' }}
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                  {photo && <p>{photo.name}</p>}
                </div>
                <button>Update profile</button>
              </form>
              <AiOutlineClose onClick={() => setShowForm(false)} className="removeIcon" />
            </div>
          </div>
        }
    </div>
    {
        <div className="mobileNav">
          {showMobileNav &&
            <div className="navigation">
              <div className="left" onClick={() => setShowMobileNav(false)}>
                <Link to='/'>WELLTH</Link>
              </div>
              <AiOutlineClose className="mobileCloseIcon" onClick={() => setShowMobileNav(false)} />
              <div className="center">
                <input value={searchText} type="text" placeholder='Search user...' onChange={(e) => setSearchText(e.target.value)} />
                <AiOutlineSearch className="searchIcon" />
                {searchText && (
                  <div onClick={() => setSearchText("")} className="allUsersContainer">
                    {filteredUsers?.map((user) => (
                      <Link to={`/profileDetail/${user._id}`} key={user._id} onClick={() => setShowMobileNav(false)}>
                        <img src={user?.photo ? `http://localhost:5000/images/${user.photo}` : man} />
                        <div className="userData">
                          <span>{user?.username}</span>
                          <span>{user?.bio?.slice(0, 10)}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div className="right">
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/upload' onClick={() => setShowMobileNav(false)}>Upload</Link >
                <div className="icons" sonClick={() => setShowMobileNav(false)}>
                  <AiOutlineUser onClick={() => navigate(`/profileDetail/${user._id}`)} />
                  <AiOutlineLogout onClick={handleLogout} />
                </div>
                <img
                  onClick={() => setShowModal(!showModal)}
                  src={user?.profileImg ? `http://localhost:5000/images/${user?.profileImg}` : man}
                  className="profileUserImg"
                />
                {showModal && (
                  <div className="modal">
                    <span onClick={handleShowForm}>Update Profile</span>
                  </div>
                )}
              </div>
              {showForm &&
                <div className="updateProfileForm" onClick={() => setShowForm(false)}>
                <div className="updateProfileWrapper" onClick={(e) => e.stopPropagation()}>
                  <h2>Update Profile</h2>
                  <form onSubmit={handleUpdateProfile}>
                    <input type="text" placeholder='Username' name="username" onChange={handleState} />
                    <input type="email" placeholder='Email' name="email" onChange={handleState} />
                    <input type="text" placeholder='Bio' name="bio" onChange={handleState} />
                    <input type="password" placeholder='Password' name="password" onChange={handleState} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '50%' }}>
                      <label htmlFor='photo'>Profile Picture <AiOutlineFileImage /></label>
                      <input
                        type="file"
                        id='photo'
                        placeholder='Profile picture'
                        style={{ display: 'none' }}
                        onChange={(e) => setPhoto(e.target.files[0])}
                      />
                      {photo && <p>{photo.name}</p>}
                    </div>
                    <button>Update profile</button>
                  </form>
                  <AiOutlineClose onClick={() => setShowForm(false)} className="removeIcon" />
                </div>
              </div>}
            </div>}
          {!showMobileNav && <GiHamburgerMenu onClick={() => setShowMobileNav(prev => !prev)} className="hamburgerIcon" />}
        </div>
      }
    </div>
    </div>
  )
}

export default Navbar