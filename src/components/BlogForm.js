import React, { useState } from 'react'
import { addNewBlog } from '../reducers/blogsReducer'
import { showMsg } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const BlogForm = (props) => {
    const dispatch = useDispatch()

    const [newBlog, setNewBlog] = useState('');
    const [newUrl, setNewUrl] = useState('');

    const handleBlogChange = (event) => {
        console.log(event.target.value)
        setNewBlog(event.target.value)
    }

    const handleUrlChange = (event) => {
        console.log(event.target.value)
        setNewUrl(event.target.value)
    }

    const handleAddBlog = (event) => {
        event.preventDefault()
        setNewBlog('');
        setNewUrl('');
        const blog = {
            title: newBlog,
            url: newUrl,
            likes: 0,
        }
        dispatch(addNewBlog(blog))
        dispatch(showMsg('New Blog Added', 'green'))
        // props.newBlogMessage(blog.title);
    }

    return (

        <form className="row g-3" onSubmit={handleAddBlog}>
            <div className="col-md-12">
                <label htmlFor="inputtitle" className="form-label">Blog Title</label>
                <input className="form-control" id="titleInput"

                    value={newBlog}
                    onChange={handleBlogChange} />
            </div>
            <div className="col-md-12">
                <label htmlFor="inputtitle" className="form-label">Blog URL</label>
                <input type="text" id="urlInput"
                    className="form-control"
                    value={newUrl}
                    onChange={handleUrlChange} />
            </div>

            <div className="col-12">
                <button type="submit" className="btn btn-success">Save  </button>
            </div>
        </form>

        // {/* <div>

        // <h2>Create a new note</h2>

        // <form onSubmit={handleAddBlog}>
        //     Blog Title <input
        //         id="titleInput"
        //         className='titleInput'
        //         value={newBlog}
        //         onChange={handleBlogChange}
        //     />
        //     Blog url <input
        //         id="urlInput"
        //         className='urlInput'
        //         value={newUrl}
        //         onChange={handleUrlChange}
        //     />
        //     <button type="submit" id="saveBtn">Save</button>
        // </form>
        // </div> */}
    )
}
export default BlogForm;