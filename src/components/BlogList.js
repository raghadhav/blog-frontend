import React from "react";
import noteService from '../services/backend'
import Toggable from './Toggable'
import BlogForm from './BlogForm'
import PropTypes from 'prop-types'
import BlogContent from './BlogContent'

class BlogList extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { blogs: [] };

        this.updateLikes = this.updateLikes.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.addBlog = this.addBlog.bind(this);
    }

    componentDidMount() {
        noteService.getAll().then((res) => {
            this.setState({ blogs: res });
        });
    }

    addBlog(blog) {
        noteService
            .create(blog)
            .then(returnedBlog => {
                this.props.newBlogMessage(returnedBlog.title);
                const newBlogs = this.state.blogs.concat(returnedBlog);
                this.setState({ blogs: newBlogs });
            })
        // setNewBlog('')
    }

    updateLikes(blog) {
        blog.likes++;
        noteService.update(blog.id, blog).then((res) => {
            console.log('res = ', res);
            const newBlogs = this.state.blogs.map((b) => {
                if (b.id === blog.id) {
                    b = res; // to make sure we actually get the updated blog from the backend- not just chaning it from the front it and might display only from th frontend 
                }
                return b;
            });
            console.log(newBlogs);
            this.setState({ blogs: newBlogs });
        });
    }

    handleDelete(blog) {
        const result = window.confirm('You are about to remove this blog')
        if (result) {
            noteService.remove(blog.id).then((res) => {
                const newBlogs = this.state.blogs.filter((b) => b.id !== blog.id);
                this.setState({ blogs: newBlogs });
            })
        }
    }

    render() {
        const user = this.props.user;
        const blogs = this.state.blogs
            .filter((blog) => {
                if (!user) return true;
                if (blog.user) return blog.user.username === user.username
            })
            .sort((a, b) => b.likes - a.likes);


        const blogElements = blogs.map((blog) => {
            return (
                <BlogContent blog={blog} updateLikes={this.updateLikes} handleDelete={this.handleDelete} />
            );
        })
        return (
            <div>
                <Toggable buttonLabel='new blog' ref={this.props.noteFormRef} id="createBlogBtn">
                    <BlogForm createBlog={this.addBlog} />
                </Toggable>
                <ul>
                    {blogElements}
                </ul >
            </div>
        );
    }
}
export default BlogList;