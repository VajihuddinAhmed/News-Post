import { FETCH_COLLECTION_FAILURE, FETCH_COLLECTION_SUCCESS, FETCH_COLLECTION_REQUEST } from './collection.types.js';

const initialState = {
    loading: false,
    collection: [],
    error: ''
}
  
const collectionReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_COLLECTION_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_COLLECTION_SUCCESS:
        return {
          loading: false,
          collection: action.payload,
          error: ''
        }
      case FETCH_COLLECTION_FAILURE:
        return {
          loading: false,
          collection: [],
          error: action.payload
        }
      default: return state
    }
}
  
export default collectionReducer;
  