import Toggable from './Toggable'

const BlogContent = (props) => {
    const blog = props.blog;

    return (
        <li>
            {blog.title}
            <p><i>{blog.author}</i></p>
            <Toggable buttonLabel='Show' id="showBtn">
                <div>
                    <p>{blog.url}</p>
                    <p style={{ display: 'inline-block' }}>likes = {blog.likes}</p>
                    <button onClick={() => props.updateLikes(blog)}>Like</button>
                </div>
                <div>
                    <button onClick={() => props.handleDelete(blog)}>Remove</button>
                </div>
            </Toggable>

        </li>
    );
}

export default BlogContent;