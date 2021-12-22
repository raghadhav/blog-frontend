import React from 'react'
import { useParams } from 'react-router-dom';
import { initializeUsers } from '../reducers/usersReducers'
import { useDispatch, useSelector } from 'react-redux'

const SingleUser = () => {
    let { id } = useParams();
    const dispatch = useDispatch()
    let users = useSelector(state => state.user)
    let blogs = useSelector(state => state.blog)
    console.log('ahhh blog', blogs)
    React.useEffect(() => {
        dispatch(initializeUsers());

    }, []);

    let usr = users.find((u) => u.id === id)
    if (!usr) {
        return null
    }
    console.log('yyyyyyy', usr);
    const thisUserBlogs = usr.blogs.map(b => b.likes)
    console.log('hhhhh', usr.blogs)
    return (
        <div>
            <h4>Bloged added by {usr.username}</h4>
            <ol class="list-group list-group-numbered">
                {usr.blogs.map(b =>
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="">{b.title}</div>
                        </div>
                        {/* <span class="badge bg-primary rounded-pill">14</span> */}
                    </li>
                )}
            </ol>
        </div>


    )
}


export default SingleUser;