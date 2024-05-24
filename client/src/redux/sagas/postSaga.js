import axios from 'axios'
import { takeEvery,call, put, all, fork } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { 
    POST_LOADING_FAILURE, 
    POST_LOADING_REQUEST, 
    POST_LOADING_SUCCESS 
} from '../types'

// All Post Load
const loadPostAPI = () => {
    return axios.get("api/auth/post")
}

function* loadPost() {
    try {
        const result = yield call(loadPostAPI)
        console.log(result, "loadPost")
        yield put({
            type: POST_LOADING_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        yield put({
            type: POST_LOADING_FAILURE,
            payload: e
        })
        yield push("/")
    }
}

function* watchLoadPosts(){
    yield takeEvery(POST_LOADING_REQUEST, loadPost)
}

export default function* postSaga(){
    yield all([
        fork(watchLoadPosts)
    ])
}

