import axios from "axios";
import { FETCH_DELETE_REQUEST, FETCH_DELETE_SUCCESS, FETCH_DELETE_FAILURE } from './deletePost.types';

export const fetchDelete = () => {
   return (dispatch) => {
    dispatch(fetchDeleteRequest())
    const collections = JSON.parse(localStorage.getItem('myItems'))
    const { objectId } = collections
    axios.delete(`https://eu-api.backendless.com/2F91D088-EB50-B7B7-FFFC-8439A97CF700/B69C0E45-5D57-4B34-B301-B4DE62FDB203/data/NewsPostAPI/${objectId}`)
        .then((res) => {
            if(res.status === 200) {
              dispatch(fetchDeleteSuccess())
            }
        })
        .catch(error => {
            const errorMsg = error.message
            dispatch(fetchDeleteFailure(errorMsg))
        })
   } 
}

export const fetchDeleteRequest = () => {
    return {
      type: FETCH_DELETE_REQUEST
    }
}
  
export const fetchDeleteSuccess = post => {
    return {
      type: FETCH_DELETE_SUCCESS,
      payload: post
    }
}
  
export const fetchDeleteFailure = error => {
    return {
      type: FETCH_DELETE_FAILURE,
      payload: error
    }
}
