import React from 'react'
import PropTypes from 'prop-types'
import '../index.css'

const LoginForm = ({
  isLogin,
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <form  onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="inputEmail3" className="">Email</label>
          <div className="">
            <input  className="form-control" id="inputEmail3" value={username}
             onChange={handleUsernameChange} />
          </div>
        </div>  
        <div className="">
          <label htmlFor="inputPassword3" className="">Password</label>
          <div className="">
            <input type="password" className="form-control" id="inputPassword3" value={password}
             onChange={handlePasswordChange}/>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">{(isLogin) ? 'Sign In' : 'Register'}</button>
      </form>
    </div>
    )
   {/* <div>
       <h2>Login</h2>
 
       <form onSubmit={handleSubmit} >
         <div>
           username
           <input
           id='username'
             value={username}
             onChange={handleUsernameChange}
           />
         </div>
         <div>
           password
           <input
              id='password'
             type="password"
             value={password}
             onChange={handlePasswordChange}
           />
       </div>
         <button type="submit" id='login-button'>login</button>
       </form>
     </div>
   ) */}
   
}
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm