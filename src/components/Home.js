import React, { useState, useEffect, useRef } from "react";
import noteService from "../services/backend";
import loginService from '../services/login';
import BlogList from './BlogList'
import { useDispatch, useSelector } from 'react-redux'
import blogsReducer, { initializeBlog } from '../reducers/blogsReducer'
import { saveUserInfo } from '../reducers/usersReducers'
import Notification from './Notification'

const Home = () => {
    const noteFormRef = useRef();

    const user = useSelector(state => state.user);
    console.log('the users fromt the selectors is', user);
    // to get the information of the logged in user from the localstorage and store in in noteservice

    return (
        <div className="App">
            <Notification />
            <div>
                <BlogList noteFormRef={noteFormRef} />
            </div>
        </div>
    );
}

export default Home;