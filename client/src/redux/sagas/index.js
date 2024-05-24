import { all, fork } from 'redux-saga/effects'
import axios from 'axios';

// Saga 등록
import authSaga from './authSaga';
import postSaga from './postSaga';

axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL;

// RootSaga 생성
// function* : 제너레이트 함수 (하위 모든 함수 반환)
export default function* rootSaga(){
    yield all([
        fork(authSaga), fork(postSaga)
    ]);
}