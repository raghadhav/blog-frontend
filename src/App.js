import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import noteService from "./services/backend";
import loginService from './services/login';
import LoginForm from './components/LoginForm'
function App() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null)
  const [msg, setMsge] = useState({
    text: '',
    theme: ''
  });
  const text = msg.text;
  const theme = msg.theme;
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    noteService.getAll().then((intialBlogs) => {
      setBlogs(intialBlogs.filter((blog) => {
        if (!user) return true;
        if (blog.user) return blog.user.username === user.username
      }))
    });
  }, [user]); //when the user is changing, trigger this hook tp change the blogs
  // to get the information of the logged in user from the localstorage and store in in noteservice
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog
    }

    noteService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        //console.log(blogs);
        setNewBlog('')
        setMsge('New blog added', 'red')
      })
  }
  const handleBlogChange = (event) => {
    console.log(event.target.value)
    setNewBlog(event.target.value)
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
     // setMsge('Wrong Username Or Password')
    }
    console.log('logging in with', username, password)
  }
  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }
  const blogForm = () => (
    <form onSubmit={addBlog}>
      <input
        value={newBlog}
        onChange={handleBlogChange}
      />
      <button type="submit">save</button>
    </form>
  )
  const Notification = (props) => {
    if (props.text === "") return null;

    else return <div style={{color: props.theme}}> {props.text}</div>;
  
  };
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
  }

  let mainSection = (user === null) ?
    loginForm() :
    <div>
      <p>{user.name} Logged in</p>
      {blogForm()}
      <button onClick={handleLogout}>Logout</button>
    </div>

  // if (user !== null) {
  //   blogFromDb = blogs.filter((blog) => {
  //     if (blog.user) return blog.user.username === user.username
  //   })
  //     .map((b) => <li>{b.title} ++ {b.author}</li>)
  // }

  // setDisplayBlogs(blogs.filter((blog) => {
  //   if (user === null) return true;
  //   if (blog.user) return blog.user.username === user.username
  // }))

  return (
    <div className="App">
      <h3>Blog App</h3>
      <Notification text={text} theme={theme} />
      {mainSection}
      <ul>
        {blogs.map((b) => <li key={b.id} >{b.title} ++ {b.author}</li>)}
      </ul>
    </div>
  );
}

export default App;
