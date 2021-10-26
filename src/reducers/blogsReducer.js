import { useDispatch } from 'react-redux'
import blogService from '../services/backend'
const blogsReducer = (state = [], action) => {
    console.log('blogs reducer');

    switch (action.type) {
        case 'init-blog':
            state = action.data;
            state = state.sort((a, b) => b.likes - a.likes);
            return state;
        case 'new-blog': 
            state = [...state, action.data];
            state.sort((a, b) => b.likes - a.likes);
            return state;
        case 'inc-likes':
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.data.id) {
                    state[i].likes = action.data.likes;
                }
            }
            state = [...state];
            state.sort((a, b) => b.likes - a.likes);
            return state;
        case 'delete-blog':
            state = state.filter((b) => b.id !== action.data.id);
            return state;
    }
    return state
}

export const addNewBlog = (newBlog) => {
    return async dispatch => {
        const insertBlog = await blogService.create(newBlog)
        dispatch({
            type: 'new-blog',
            data: insertBlog,
        })
    }
}

export const updateBlog = (sentObj) => {
    let newObj = {...sentObj};
    newObj.likes++;
    return async dispatch => {
        const resObj = await blogService.update(newObj.id, newObj)
        dispatch({
            type: 'inc-likes',
            data: resObj
        })
    }
}

export const deleteBlog = (sentObj) => {
    return async dispatch => {
        const delBlog = await blogService.remove(sentObj.id);
        console.log('delblog = ', delBlog)
        dispatch({
            type: 'delete-blog',
            data: delBlog,
        })
    }
}

export const initializeBlog = () => {

    return async dispatch => {
        const blogs = await blogService.getAll()
        console.log('PA init blog dispatch', blogs)
        dispatch({
            type: 'init-blog',
            data: blogs,
        })
    }
}

export default blogsReducer
