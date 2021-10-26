import React, { useState, useEffect, useRef } from "react";
import noteService from '../services/backend'
import Toggable from './Toggable'
import BlogForm from './BlogForm'
import PropTypes from 'prop-types'
import BlogContent from './BlogContent'
import { useDispatch, useSelector } from 'react-redux'
import blogsReducer, { initializeBlog, updateBlog, deleteBlog } from '../reducers/blogsReducer'

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

    // .sort((a, b) => b.likes - a.likes);
    console.log('now the random blogs', blogs)

    let s = new Set();
    for (let i = 0; i < blogs.length; ++i) {
        if (s.has(blogs[i].id)) {
            console.log('repeated id: ', i, blogs[i].id);
        }
        s.add(blogs[i].id);
    }

    const blogElements = blogs.map((blog) => {
        return (
            <BlogContent key={blog.id} blog={blog} updateLikes={updateLikes} handleDelete={handleDelete} />
        );
    })
    return (
        <div>
            <Toggable buttonLabel='new blog' ref={props.noteFormRef} id="createBlogBtn">
                <BlogForm user={user} />
            </Toggable>
            <p>blosg are </p>
            <ul>
                {blogElements}
            </ul >
        </div>
    );
}
export default BlogList;