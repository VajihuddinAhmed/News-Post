import { FETCH_ALL_USERS_REQUEST, FETCH_ALL_USERS_SUCCESS, FETCH_ALL_USERS_FAILURE } from './allUsers.types';

const initialState = {
    loading: false,
    allUsers: [],
    error: ''
}
  
const allUsersReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ALL_USERS_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_ALL_USERS_SUCCESS:
        return {
          loading: false,
          allUsers: action.payload,
          error: ''
        }
      case FETCH_ALL_USERS_FAILURE:
        return {
          loading: false,
          allUsers: [],
          error: action.payload
        }
      default: return state
    }
}
  
export default allUsersReducer;
  