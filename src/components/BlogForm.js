import React, { useState } from 'react'

const BlogForm = (props) => {
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
            likes: 0
        }
        props.createBlog(blog)
    }

    return (
        <div>
            <h2>Create a new note</h2>

            <form onSubmit={handleAddBlog}>
                Blog Title <input
                    id="titleInput"
                    className='titleInput'
                    value={newBlog}
                    onChange={handleBlogChange}
                />
                Blog url <input
                    id="urlInput"
                    className='urlInput'
                    value={newUrl}
                    onChange={handleUrlChange}
                />
                <button type="submit" id ="saveBtn">save</button>
            </form>
        </div>
    )
}
export default BlogForm;