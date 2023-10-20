import React, { useState } from 'react'
import noteService from "../services/backend";
import loginService from '../services/login';
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducers'
import UserService from '../services/user';
import './user-list.css'

import {
    BrowserRouter as Router,
    Switch, Route, Link
} from "react-router-dom"

// const DisplayUser = (props) => {
//     const usr = props.usr;
//     console.log('inside display user component')
//     return (
//         <li key={usr.id}>
//             <Link to="/">{usr.username} {usr.blogs}</Link>
//             {/* <li> {user.blogs}</li> */}
//         </li>
//     )
// }

const Users = () => {
    const dispatch = useDispatch()
    let users = useSelector(state => state.user)

    React.useEffect(() => {
        dispatch(initializeUsers());
    }, []);

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Users</th>
                    <th scope="col"> Blogs Created</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{users.map((u) => <div key={u.id}><Link to={`/SingleUser/${u.id}`}>{u.username}</Link></div>)}</td>
                    <td>{users.map((u) => <div key={u.id}>{u.blogs.length}</div>)}</td>
                </tr>
            </tbody>
        </table>

        // <div >
        //     <h2>Users</h2>
        //     {/* <button onClick={showUser}>show user</button> */}
        //     {/* {users === ''} ? <div> no</div> : */}
        //     <div className='container'>
        //         <div className='countTitle'>
        //             blogs created
        //         </div>
        //         <div className='users'>
        //             {users.map((u) => <div key={u.id}><Link to={`/SingleUser/${u.id}`}>{u.username}</Link></div>)}
        //         </div>
        //         <div className='blogCount'>
        //             {users.map((u) => <div key={u.id}>{u.blogs.length}</div>)}
        //         </div>
        //         {/* <Link to=''> {renderedUserd.username}</Link> */}
        //     </div>
        // </div>
    )
}


export default Users;