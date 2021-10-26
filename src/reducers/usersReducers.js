import { useDispatch } from 'react-redux'
import UserService from '../services/user'
import noteService from "../services/backend";

const usersReducer = (state = [], action) => {
    switch (action.type) {
        case 'init-users':
            return action.data;
    }

    return state
}

export const initializeUsers = () => {
    return async dispatch => {
        const users = await UserService.getAllUsers()
        dispatch({
            type: 'init-users',
            data: users,
        })
    }
}

export default usersReducer
