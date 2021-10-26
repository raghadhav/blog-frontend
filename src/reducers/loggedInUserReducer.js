const loggedInUserReducer = (state = {}, action) => {
    if (action.type == 'saveInfo') {
        state = action.data;
    }
    return state;
};

export const saveUserInfo = (user) => {
    return async dispatch => {
        dispatch({
            type: 'saveInfo',
            data: user
        })
    }
}


export default loggedInUserReducer;