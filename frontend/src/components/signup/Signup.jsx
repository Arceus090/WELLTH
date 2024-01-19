import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import img from '../../assets/signup.jpg'
import './signup.css'
import { register } from '../../redux/authSlice.js'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignup = async(e) => {
    e.preventDefault()
    if(username === '' || email === '' || password === '') return
    console.log(username, email, password)

    try {
      const res = await fetch(`http://localhost:5000/auth/register`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({username, email, password})
      })
      console.log(res)
      
      const data = await res.json()
      console.log(data)
      dispatch(register(data))
      navigate('/')
    } catch (error) {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 3000)
    }
  }

  return (
    <div className="signUpContainer">
      <div className="signUpWrapper">
         <div className="signUpLeftSide">
          <img src={img} className="leftImg"/>
         </div>
         <div className="signUpRightSide">
           <h2 className="title">Sign Up</h2>
           <form onSubmit={handleSignup} className="signUpForm">
              <input type="text" placeholder='Type username' onChange={(e) => setUsername(e.target.value)}/>
              <input type="email" placeholder='Type email'  onChange={(e) => setEmail(e.target.value)}/>
              <input type="password" placeholder='Type password'  onChange={(e) => setPassword(e.target.value)}/>
              <button type="submit" className="submitBtn">Sign Up</button>
              <p>Already have an account? <Link to='/login'>Login</Link></p>
           </form>
           {
            error && (
              <div className="errorMessage">
                 Wrong credentials! Try different ones
              </div>
            )
           }
         </div>
      </div>
    </div>
  )
}

export default Signup