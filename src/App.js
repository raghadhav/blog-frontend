import './App.css';
import React, { useState, useEffect, useRef } from "react";
import UsersPage from './components/Users.js'
import Home from './components/Home'
import BlogPage from './components/BlogPage'
import SingleBlog from './components/SingleBlog'
import LoginForm from './components/LoginForm'
import Toggable from './components/Toggable'
import noteService from "./services/backend";
import loginService from './services/login';
import { useDispatch, useSelector } from 'react-redux'
import { showMsg } from './reducers/notificationReducer'
import { saveUserInfo } from './reducers/loggedInUserReducer'
import SingleUser from './components/SingleUser';

import {
  BrowserRouter as Router,
  Switch, Route, useRouteMatch
} from "react-router-dom"
function App() {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(state => state.loggedInUser);
  console.log('in the app', user)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const LogedInuser = JSON.parse(loggedUserJSON)
      dispatch(saveUserInfo(LogedInuser))
      noteService.setToken(LogedInuser.token)
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userReturend = await loginService.login({ // the token will be return from here 
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(userReturend)
      )
      noteService.setToken(userReturend.token)
      dispatch(saveUserInfo(userReturend))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(showMsg('Wrong Username of Password', 'red'))
      setTimeout(() => {
        dispatch(showMsg(null, ''))
      }, 5000)

    }
  }
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(saveUserInfo(null))

  }
  const toggableLoginForm = (
    <Toggable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Toggable>
  );

  return (
    <Router>
      <h3>Blog App</h3>
      {!user ?
        toggableLoginForm :
        <div>
          <p>{user.name} logged in</p><button onClick={handleLogout}>Logout</button>
        </div>
      }
      <Switch>
        <Route path="/SingleUser/:id">
          <SingleUser />
        </Route>

        <Route path="/users">
          <UsersPage />
        </Route>
        <Route path="/blogs">
          <BlogPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>

  )
}
export default App;
