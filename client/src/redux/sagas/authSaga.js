import axios from 'axios'
import { takeEvery, call, put, fork, all } from 'redux-saga/effects'
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from '../types'

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

export default function* authSaga(){
    yield all([
        fork(watchLoginUser)
    ])
}