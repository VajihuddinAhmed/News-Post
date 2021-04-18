import { FETCH_DELETE_REQUEST, FETCH_DELETE_SUCCESS, FETCH_DELETE_FAILURE } from './deletePost.types';

const initialState = {
    loading: false,
    post: [],
    error: ''
}
  
const deletPostReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DELETE_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_DELETE_SUCCESS:
        return {
          loading: false,
          post: action.payload,
          error: ''
        }
      case FETCH_DELETE_FAILURE:
        return {
          loading: false,
          post: [],
          error: action.payload
        }
      default: return state
    }
}
  
export default deletPostReducer;
  