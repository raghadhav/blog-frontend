import React from 'react'
import PropTypes from 'prop-types'
import '../index.css'
const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <form  onSubmit={handleSubmit}>
        <div class="row mb-3">
          <label for="inputEmail3" class="col-sm-1 col-form-label">Email</label>
          <div class="col-sm-4">
            <input  class="form-control" id="inputEmail3" value={username}
             onChange={handleUsernameChange} />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputPassword3" class="col-sm-1 col-form-label">Password</label>
          <div class="col-sm-4">
            <input type="password" class="form-control" id="inputPassword3" value={password}
             onChange={handlePasswordChange}/>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Sign in</button>
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