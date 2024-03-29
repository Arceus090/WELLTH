/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import img from '../../assets/login2.jpg'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/authSlice.js'
import './css.css'
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async(e) => {
    e.preventDefault()

    if(email === '' || password === '') return

    try {
      const res = await fetch(`http://localhost:5000/auth/login`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({email, password})
      })

      const data = await res.json()
      
      if (data.isAdmin) {
        navigate('/admindashboard')
      } else {
        dispatch(login(data))
        navigate('/')
      }
    } catch (error) {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 3000)
    }
  }

  return (
    <div className="loginContainer">
      <div className="loginWrapper">
          <div className="loginLeftSide">
            <img src={img} className="leftImg"/>
          </div>
          <div className="loginRightSide">
            <h2 className="title">Login</h2>
            <form onSubmit={handleLogin} className="loginForm">
               <input type="email" placeholder='Type email' onChange={(e) => setEmail(e.target.value)}/>
               <input type="password" placeholder='Type password' onChange={(e) => setPassword(e.target.value)}/>
               <button className="submitBtn">Login</button>
               <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
            </form>
            {error && (
              <div className="errorMessage">
                Wrong credentials! Try different ones
              </div>
            )}
          </div>
      </div>
    </div>
  )
}

export default Login