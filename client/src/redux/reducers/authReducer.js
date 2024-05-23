import { CLEAR_ERROR_REQUEST, CLEAR_ERROR_FAILURE, CLEAR_ERROR_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../types"

// store에서 만든 initialSate와 동일한 명칭으로 사용하여 빈값인 초기값에 데이터를 넣는다
const initialSate = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: "",
    userId: "",
    userName: "",
    userRole: "",
    errorMsg: "",
    successMsg: "",
} 

// ... 얕은 복사를 하는 이유는 새로만든 것과 기존의 것과 비교하여 바뀐 것만 렌더링 해주기 위함이다.
const authReducer = (state = initialSate, action) => {
    switch(action.type){
        case LOGIN_REQUEST:
            return {
                ...state,
                errorMsg: "",
                isLoading: true,
            }
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                userId: action.payload.user.id,
                userRole: action.payload.user.role,
                errorMsg: "",
            }
        case LOGIN_FAILURE:
            localStorage.removeItem("token")
            return {
                ...state,
                ...action.payload,
                token: null,
                user: null,
                userId: null,
                isAuthenticated: false,
                isLoading: false,
                userRole: null,
                errorMsg: action.payload.data.msg
            }
        case CLEAR_ERROR_REQUEST:
            return {
                ...state,
                errorMsg: null,
            }
        case CLEAR_ERROR_SUCCESS:
            return {
                ...state,
                errorMsg: null,
            }
        case CLEAR_ERROR_FAILURE:
            return {
                ...state,
                errorMsg: null,
            }
        default:
            return state
    }
}

export default authReducer;