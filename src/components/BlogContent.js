import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import blogsReducer, { initializeBlog, updateBlog, deleteBlog, addComments } from '../reducers/blogsReducer'

const BlogContent = () => {
    const [comment, setComment] = React.useState('')
    let { id } = useParams();
    let blogs = useSelector(state => state.blog)
    const dispatch = useDispatch()

    let singleBlog = blogs.find((b) => b.id === id)
    console.log('the single blog', singleBlog);
    if (!singleBlog) {
        return null
    }
    const updateLikes = (blog) => {
        dispatch(updateBlog(blog))
    }
    const addCommentsFunction = (event) => {
        // const comments = event.target.value;
        console.log('<button> this is the comment', comment)
        if (comment !== '') {
            dispatch(addComments(singleBlog, comment));
            setComment('');
        }
        else alert('Comments must not be empty')
    }
    const handleCommentChange = (event) => {
        console.log('<input> the comments is', event.target.value)
        setComment(event.target.value)
    }

    return (
        <div className="sinlgeBlog">
            <h3>Blog Title: {singleBlog.title}</h3>
            <div>
                <p>Blog URL:{singleBlog.url}</p>
                <p style={{ display: 'inline-block', color: 'blueviolet', marginRight: '10px' }}>likes:  {singleBlog.likes}</p>
                <button onClick={() => updateLikes(singleBlog)} class="btn btn-primary">Like</button>
                <p>Added by: {singleBlog.author}</p>
            </div>
            <div class="mb-3">

                <input type="text" class="form-control" value={comment} onChange={handleCommentChange} placeholder='Add Your Comment' />
               
            </div>

            <button type="submit" class="btn btn-primary" onClick={addCommentsFunction}> Add Comment</button>
            
            <ul className="square">
                {singleBlog.comments.map(c =>
                    <li > {c}</li>
                )}
            </ul>
        </div>

    );
}

export default BlogContent;