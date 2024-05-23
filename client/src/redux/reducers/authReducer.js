import { CLEAR_ERROR_REQUEST, CLEAR_ERROR_FAILURE, CLEAR_ERROR_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE, USER_LOADING_REQUEST, USER_LOADING_SUCCESS, USER_LOADING_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "../types"

// store에서 만든 initialState와 동일한 명칭으로 사용하여 빈값인 초기값에 데이터를 넣는다
const initialState = {
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
const authReducer = (state = initialState, action) => {
    switch(action.type){
        case REGISTER_REQUEST:
        case LOGOUT_REQUEST:
        case LOGIN_REQUEST:
            return {
                ...state,
                errorMsg: "",
                isLoading: true,
            }
        case REGISTER_SUCCESS:
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
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case LOGOUT_FAILURE:
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
        case LOGOUT_SUCCESS:
            localStorage.removeItem("token")
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                userId: action.payload.user.id,
                userRole: action.payload.user.role,
                errorMsg: "",
            }
            case CLEAR_ERROR_REQUEST:
            case CLEAR_ERROR_SUCCESS:
            case CLEAR_ERROR_FAILURE:
                return {
                    ...state,
                    errorMsg: null,
                };
        case USER_LOADING_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case USER_LOADING_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
                userId: action.payload._id,
                userName: action.payload.name,
                userRole: action.payload.role
            }
        case USER_LOADING_FAILURE:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                userRole: ""
            }            
        default:
            return state
    }
}

export default authReducer;