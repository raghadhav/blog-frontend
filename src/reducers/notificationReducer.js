import { useDispatch } from 'react-redux'
import blogService from '../services/backend'

const notificationReducer = (state = {}, action) => {
    if (action.data) state = action.data;
    console.log('notification reducer', state);
    return state;
}

export const showMsg = (msg,colour) => {
    return async dispatch => {
        dispatch({
            type: 'Notify',
            data: {text: msg, theme:colour}
        })
    }
}

export default notificationReducer;