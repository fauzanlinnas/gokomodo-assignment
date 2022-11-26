const initState = {
    authError: null,
    isLoading: false
}

const authReducer = (state = initState, action) => {
    if (action.module !== 'AUTH_MODULE') return { ...state }

    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authError: null
            }
        case 'LOGIN_ERROR':
            return {
                ...state,
                authError: 'Login failed'
            }
        case 'SIGNOUT_SUCCESS':
            return state
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            return {
                ...state,
                authError: action.err.message
            }
        case 'ASYNC_START':
            return { ...state, isLoading: true }
        case 'ASYNC_END':
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state
    }
}

export default authReducer
