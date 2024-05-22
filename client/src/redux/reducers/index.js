import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

// Rootreducer 생성
const createRootReducer = (history) => 
combineReducers({
    router: connectRouter(history)
})

export default createRootReducer;