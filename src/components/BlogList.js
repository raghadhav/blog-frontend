import React, { useState, useEffect, useRef } from "react";
import noteService from '../services/backend'
import Toggable from './Toggable'
import BlogForm from './BlogForm'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import blogsReducer, { initializeBlog, updateBlog, deleteBlog } from '../reducers/blogsReducer'
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from "react-router-dom"

// 1. initial render 
// 2. effect -- initblog -> fetches blogs from backend -> put in state
// 3. addBlog -> add to state

const BlogList = (props) => {
    const dispatch = useDispatch()

    let blogs = useSelector(state => state.blog) //coming from store.js

    React.useEffect(() => {
        dispatch(initializeBlog());
    }, []);

    const updateLikes = (blog) => {
        dispatch(updateBlog(blog))
    }

    const handleDelete = (blog) => {
        const result = window.confirm('You are about to remove this blog')
        if (result) {
            console.log('deeeelete', blog)
            dispatch(deleteBlog(blog));
        }
    }

    const user = props.user;

    console.log('PA blogs', blogs)

    //console.log('type of blogs', JSON.stringify(blogs))
    blogs = blogs.filter((blog) => {
        if (!user) return true;
        if (blog.user) {
            console.log(blog.user.username, '<- is this user equal to this user-> ', user.username)
            return blog.user.username === user.username
        }
    })

    console.log('now the random blogs', blogs)

    let s = new Set();
    for (let i = 0; i < blogs.length; ++i) {
        if (s.has(blogs[i].id)) {
            console.log('repeated id: ', i, blogs[i].id);
        }
        s.add(blogs[i].id);
    }

    return (
        <div>
           
            <h3 id="blogTitle">Blogs are: </h3>
            <ul>
                {blogs.map(b =>
                    <div className="list-group" key={b.id}>
                        <Link to={`/Blogs/${b.id}`} className="list-group-item list-group-item-action"> {b.title}</Link>
                    </div>
                )}
                {/* {blogs.map(b=> 
                    <li> <Link to={`/Blogs/${b.id}`}>{b.title}</Link></li>
                )} */}
            </ul >
            <Toggable buttonLabel='New Blog' ref={props.noteFormRef}>
                <BlogForm user={user} />
            </Toggable>
        </div>
    );
}
export default BlogList;