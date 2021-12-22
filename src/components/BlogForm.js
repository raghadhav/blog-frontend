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

        <form class="row g-3" onSubmit={handleAddBlog}>
            <div class="col-md-12">
                <label for="inputtitle" class="form-label">Blog Title</label>
                <input class="form-control" id="titleInput"

                    value={newBlog}
                    onChange={handleBlogChange} />
            </div>
            <div class="col-md-12">
                <label for="inputtitle" class="form-label">Blog URL</label>
                <input type="text" id="urlInput"
                    class="form-control"
                    value={newUrl}
                    onChange={handleUrlChange} />
            </div>

            <div class="col-12">
                <button type="submit" class="btn btn-success">Save  </button>
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