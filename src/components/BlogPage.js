import { useDispatch, useSelector } from 'react-redux'
import { initializeBlog, updateBlog } from '../reducers/blogsReducer'
import React, { useState, useEffect, useRef } from "react";
import BlogContent from './BlogContent'

import {
    BrowserRouter as Router,
    Switch, Route, Link
} from "react-router-dom"

const DisplayBlog = (props) => {
    const blog = props.blog;
console.log('blogggggggggg', blog);
    return (
        <li key={blog.id}>
            <Link to="/"><p>{blog.title}</p></Link>
            <p> Added By {blog.author}</p>
            <p>{blog.url}</p>
            <p style={{ display: 'inline-block' }}>likes = {blog.likes}</p>
            <button onClick={() => props.updateLikes(blog)}>Like</button>

        </li>
    );
}

const BlogPage = () => {
    
    const updateLikes = (blog) => {
        dispatch(updateBlog(blog))
    }

    const [user, setUser] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlog());
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            //   noteService.setToken(user.token)
        }
    }, [dispatch])

    let blogs = useSelector(state => state.blog) //coming from store.js


    blogs = blogs.filter((blog) => {
        if (!user) return true;
        if (blog.user) {
            console.log(blog.user.username, '<- is this user equal to this user-> ', user.username)
            return blog.user.username === user.username
        }
    })
    const blogElements = blogs.map((blog) => {
        return (
            <DisplayBlog blog={blog} updateLikes={updateLikes} />
        );
    })


    return (
        <div className="blogsView">

            <h2>Blogs</h2>
            <ul>
                {blogElements}
            </ul >
        </div>
    )

}

export default BlogPage;