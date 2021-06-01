import Toggable from './Toggable'

const BlogContent = (props) => {
    const blog = props.blog;

    return (
        <li key={blog.id}>
            {blog.title}
            <p><i>{blog.author}</i></p>
            <Toggable buttonLabel='Show' id="showBtn">
                <div>
                    <p>{blog.url}</p>
                    <p style={{ display: 'inline-block' }}>likes = {blog.likes}</p>
                    <button onClick={() => props.updateLikes(blog)}>Like</button>
                </div>
            </Toggable>
            <button onClick={() => props.handleDelete(blog)}>Remove</button>
        </li>
    );
}

export default BlogContent;