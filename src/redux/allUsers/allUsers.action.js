import axios from "axios";
import { FETCH_ALL_USERS_REQUEST, FETCH_ALL_USERS_SUCCESS, FETCH_ALL_USERS_FAILURE } from './allUsers.types';

export const fetchAllUsers = () => {
   return (dispatch) => {
    dispatch(fetchallUsersRequest())
    axios.get("https://eu-api.backendless.com/2F91D088-EB50-B7B7-FFFC-8439A97CF700/B69C0E45-5D57-4B34-B301-B4DE62FDB203/data/Users")
        .then(response => {
            const usersCollection = response.data
            dispatch(fetchallUsersSuccess(usersCollection))
        })
        .catch(error => {
            const errorMsg = error.message
            dispatch(fetchallUsersFailure(errorMsg))
        })
   } 
}

export const fetchallUsersRequest = () => {
    return {
      type: FETCH_ALL_USERS_REQUEST
    }
  }
  
  export const fetchallUsersSuccess = usersCollection => {
    return {
      type: FETCH_ALL_USERS_SUCCESS,
      payload: usersCollection
    }
  }
  
  export const fetchallUsersFailure = error => {
    return {
      type: FETCH_ALL_USERS_FAILURE,
      payload: error
    }
  }
