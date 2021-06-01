import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from "react";
import noteService from "./services/backend";
import loginService from './services/login';
import LoginForm from './components/LoginForm'
import Toggable from './components/Toggable'
import BlogList from './components/BlogList'

function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null)
  const [msg, setMsge] = useState({
    text: '',
    theme: ''
  });
  const text = msg.text;
  const theme = msg.theme;
  const noteFormRef = useRef()

  // to get the information of the logged in user from the localstorage and store in in noteservice
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])


  const showBlogMessage = (blogTitle) => {
    noteFormRef.current.toggleVisibility();
    setMsge({ text: `New blog added: ${blogTitle}`, theme: 'green' })
    setTimeout(() => {
      setMsge({ text: null, theme: '' })
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ // the token will be return from here 
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      //from the loginservice we post username and passord we get the token 
      // and now we save the token
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMsge({ text: 'Wrong Username of Password', theme: 'red' })
      setTimeout(() => {
        setMsge({ text: null, theme: '' })
      }, 5000)

    }
    console.log('logging in with', username, password)
  }

  const Notification = (props) => {
    if (props.text === "") return null;

    else return <div style={{ color: props.theme }} id="notifClass"> {props.text}</div>;

  };
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
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
    <div className="App">
      <h3>Blog App</h3>

      <Notification text={text} theme={theme} />
      {user === null ?
        toggableLoginForm :
        <div>
          <p> {user.name} logged in </p><button onClick={handleLogout}>Logout</button>
          <BlogList user={user} newBlogMessage={showBlogMessage} noteFormRef={noteFormRef} />
        </div>
      }
    </div>
  );
}

export default App;
