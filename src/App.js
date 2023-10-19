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
import { useDispatch, useSelector } from "react-redux";
import { showMsg } from "./reducers/notificationReducer";
import { saveUserInfo } from "./reducers/loggedInUserReducer";
import SingleUser from "./components/SingleUser";
import BlogContent from "./components/BlogContent";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
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
  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(saveUserInfo(null));
  };
  const toggableLoginForm = (
    <Toggable buttonLabel="login">
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
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            Blog App
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">
                  Blogs
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/users/">
                  Users
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {!user ? (
        toggableLoginForm
      ) : (
        <div style={{ display: "inline-block;" }}>
          <p className="userNamelogin">
            {" "}
            Welcome <p id="singleUserName">{user.name}</p>{" "}
          </p>
          <button class="btn btn-link" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      <div>
        <Switch>
          <Route path="/SingleUser/:id">
            <SingleUser />
          </Route>
          <Route path="/blogs/:id">
            <BlogContent />
          </Route>
          <Route path="/users">
            <UsersPage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
