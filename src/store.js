import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import thunk from 'redux-thunk'
import usersReducer from './reducers/usersReducers'
import loggedInUserReducer from './reducers/loggedInUserReducer'

const reducer = combineReducers({
    blog: blogsReducer,
    user: usersReducer,
    notification: notificationReducer,
    loggedInUser:loggedInUserReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))


export default store