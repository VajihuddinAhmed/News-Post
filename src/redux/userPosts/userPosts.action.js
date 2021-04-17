import axios from "axios";
import { FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE } from './userPosts.types';

export const fetchPosts = () => {
   return (dispatch) => {
    dispatch(fetchPostsRequest())
    axios.get("https://eu-api.backendless.com/2F91D088-EB50-B7B7-FFFC-8439A97CF700/B69C0E45-5D57-4B34-B301-B4DE62FDB203/data/NewsPostAPI?pageSize=100")
        .then(response => {
            const userCurrent = JSON.parse(localStorage.getItem('user'))
            const testing = response.data
            const category = testing.filter((item) => {
                return item.ownerId === userCurrent.data.ownerId
            })
            dispatch(fetchPostsSuccess(category))
        })
        .catch(error => {
            const errorMsg = error.message
            dispatch(fetchPostsFailure(errorMsg))
        })
   } 
}

export const fetchPostsRequest = () => {
    return {
      type: FETCH_POSTS_REQUEST
    }
}
  
export const fetchPostsSuccess = userposts => {
    return {
      type: FETCH_POSTS_SUCCESS,
      payload: userposts
    }
}
  
export const fetchPostsFailure = error => {
    return {
      type: FETCH_POSTS_FAILURE,
      payload: error
    }
}
