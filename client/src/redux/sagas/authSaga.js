import axios from 'axios'
import { takeEvery, call, put, fork, all } from 'redux-saga/effects'
import { 
    CLEAR_ERROR_FAILURE, 
    CLEAR_ERROR_REQUEST, 
    CLEAR_ERROR_SUCCESS, 
    LOGIN_FAILURE, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGOUT_FAILURE, 
    LOGOUT_REQUEST, 
    LOGOUT_SUCCESS, 
    REGISTER_FAILURE, 
    REGISTER_REQUEST, 
    REGISTER_SUCCESS, 
    USER_LOADING_FAILURE, 
    USER_LOADING_REQUEST, 
    USER_LOADING_SUCCESS } from '../types'

// Login
const loginUserAPI = (loginData) => {
    console.log(loginData, "loginData")
    const config = {
        header: {
            "Content-Type": "application/json"
        }
    }
    return axios.post("api/auth", loginData, config)
}

function* loginUser(action){
    try {
        const result = yield call(loginUserAPI, action.payload)
        console.log(result)
        yield put({
            type: LOGIN_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        yield put({
            type: LOGIN_FAILURE,
            payload: e.response
        })
    }
}

function* watchLoginUser(){
    yield takeEvery(LOGIN_REQUEST, loginUser)
}

// Logout
function* logout(){
    try {
        localStorage.removeItem('token');
        yield put({
            type: LOGOUT_SUCCESS,
        })
    } catch (e) {
        yield put({
            type: LOGOUT_FAILURE,
        })
        console.log(e)
    }
}

function* watchLogout(){
    yield takeEvery(LOGOUT_REQUEST, logout)
}

// Register
const registerUserAPI = (req) => {
    console.log(req, "req")

    return axios.post("api/user", req)
}

function* registerUser(action){
    try {
        const result = yield call(registerUserAPI, action.payload)
        console.log(result, "RegisterUser Data")
        yield put({
            type: REGISTER_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        yield put({
            type: REGISTER_FAILURE,
            payload: e.response
        })
    }
}

function* watchRegisterUser(){
    yield takeEvery(REGISTER_REQUEST, registerUser)
}

// User Loading
const userLoadingAPI = (token) => {
    const config = {
        header: {
            "Content-Type": "application/json"
        }
    }
    if(token){
        config.header["x-auth-token"] = token
    }
    return axios.post("api/auth/user", config)
}

function* userLoading(action){
    try {
        const result = yield call(userLoadingAPI, action.payload)
        console.log(result)
        yield put({
            type: USER_LOADING_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        yield put({
            type: USER_LOADING_FAILURE,
            payload: e.response
        })
    }
}

function* watchUserLoading(){
    yield takeEvery(USER_LOADING_REQUEST, userLoading)
}

// clear Error
function* clearError(){
    try {
        yield put({
            type: CLEAR_ERROR_SUCCESS,
        })
    } catch (e) {
        yield put({
            type: CLEAR_ERROR_FAILURE,
        })
    }
}

function* watchClearError(){
    yield takeEvery(CLEAR_ERROR_REQUEST, clearError)
}

export default function* authSaga(){
    yield all([
        fork(watchLoginUser), 
        fork(watchLogout), 
        fork(watchUserLoading), 
        fork(watchRegisterUser), 
        fork(watchClearError)
    ])
}