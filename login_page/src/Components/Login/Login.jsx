import React from 'react'
import './Login.css'
const Login = () => {
  return (
    <div className='container'>
      <div className="header">
        <div className="text">LOGIN</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <input type="text" placeholder='enter username'/>
        </div>
      </div>

      <div className="inputs">
        <div className="input">
          <input type="password" placeholder='enter password'/>
        </div>
      </div>
      <div className="forgot-password">Lost Password? <span>Click Here.</span></div>
      <div className="submit-container">
        <div className="submit">Continue</div>
      </div>
    </div>
  )
}

export default Login
