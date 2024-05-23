import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import authReducer from './authReducer'

// Rootreducer 생성
const createRootReducer = (history) => 
combineReducers({
    router: connectRouter(history),
    auth: authReducer,
})

export default createRootReducer;