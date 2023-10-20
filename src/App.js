import "./App.css";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
import UsersPage from "./components/Users.js";
import Home from "./components/Home";
import SingleBlog from "./components/SingleBlog";
import LoginForm from "./components/LoginForm";
import Toggable from "./components/Toggable";
import noteService from "./services/backend";
import loginService from "./services/login";
import registerService from "./services/register";
import { useDispatch, useSelector } from "react-redux";
import { showMsg } from "./reducers/notificationReducer";
import { saveUserInfo } from "./reducers/loggedInUserReducer";
import SingleUser from "./components/SingleUser";
import BlogContent from "./components/BlogContent";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.loggedInUser);
  console.log("in the app", user);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const LogedInuser = JSON.parse(loggedUserJSON);
      dispatch(saveUserInfo(LogedInuser));
      noteService.setToken(LogedInuser.token);
    }
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userReturend = await loginService.login({
        // the token will be return from here
        username,
        password,
      });
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(userReturend)
      );
      noteService.setToken(userReturend.token);
      dispatch(saveUserInfo(userReturend));
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(showMsg("Wrong Username of Password", "red"));
      setTimeout(() => {
        dispatch(showMsg(null, ""));
      }, 5000);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const userReturend = await registerService.register({
        // the token will be return from here
        username,
        password,
      });
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(userReturend)
      );
      noteService.setToken(userReturend.token);
      dispatch(saveUserInfo(userReturend));
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception.response);
      if (exception?.response?.data.error) {
        dispatch(showMsg('error: ' + exception.response.data.error, "red"));
      }
      else {
        dispatch(showMsg("error: Unable to register", "red"));
      }
      setTimeout(() => {
        dispatch(showMsg(null, ""));
      }, 5000);
    }
  }

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(saveUserInfo(null));
  };

  const toggableRegisterForm = (
    <Toggable buttonLabel="register">
      <LoginForm
        isLogin={false}
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleRegister}
      />
    </Toggable>
  );

  const toggableLoginForm = (
    <Toggable buttonLabel="login">
      <LoginForm
        isLogin={true}
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Toggable>
  );

  return (
    <Router basename={process.env.REACT_APP_PUBLIC_URL}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Blog App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Blogs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users/">
                  Users
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      
      {!(user?.username) ? (
        <div>
          {toggableLoginForm}
          {toggableRegisterForm}
        </div>
      ) : (
        <div style={{ display: "inline-block" }}>
          <div className="userNamelogin">
            {" "}
            Welcome <div id="singleUserName">{user.name}</div>{" "}
          </div>
          <button className="btn btn-link" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      <Routes>
        <Route path="/SingleUser/:id" element={<SingleUser />} />
        <Route path="/blogs/:id" element={<BlogContent />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
export default App;
