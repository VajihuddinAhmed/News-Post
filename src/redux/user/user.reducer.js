import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_CURRENT_USER, SIGN_UP } from './user.types'

const user = JSON.parse(localStorage.getItem("user"));

const INITIAL_STATE = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

const userReducer = (state = INITIAL_STATE, action) => {
    const { payload } = action;
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isLoggedIn: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            }
            case LOGIN_FAIL:
                return {
                    ...state,
                    isLoggedIn: false,
                    user: null,
                };
            case LOGOUT:
                return {
                    ...state,
                    isLoggedIn: false,
                    user: null,
                };
            case SIGN_UP:
                return {
                    ...state,
                    isLoggedIn: true,
                    user: payload.user
                }
        default: 
            return state
    }
};

export default userReducer;