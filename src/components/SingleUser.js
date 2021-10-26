import React from 'react'
import { useParams } from 'react-router-dom';
import {initializeUsers} from '../reducers/usersReducers'
import { useDispatch, useSelector } from 'react-redux'

const SingleUser = () =>{
    let { id } = useParams();
    const dispatch = useDispatch()
    let users = useSelector(state => state.user)

    React.useEffect(() => {
        dispatch(initializeUsers());
    }, []);

    let usr = users.find((u)=> u.id === id)
    console.log(users)
    return (
        <div>hello user {usr.username}</div>
    )
}


export default SingleUser;