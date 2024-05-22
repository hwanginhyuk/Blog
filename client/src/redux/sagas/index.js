import { all } from 'redux-saga/effects'

// RootSaga 생성
// function* : 제너레이트 함수 (하위 모든 함수 반환)
export default function* rootSaga(){
    yield all([]);
}