import { FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE } from './userPosts.types';

const initialState = {
    loading: false,
    userposts: [],
    error: ''
}
  
const userPostsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_POSTS_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_POSTS_SUCCESS:
        return {
          loading: false,
          userposts: action.payload,
          error: ''
        }
      case FETCH_POSTS_FAILURE:
        return {
          loading: false,
          userposts: [],
          error: action.payload
        }
      default: return state
    }
}
  
export default userPostsReducer;
  