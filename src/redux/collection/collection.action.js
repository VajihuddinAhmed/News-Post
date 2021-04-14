import axios from "axios";
import { FETCH_COLLECTION_FAILURE, FETCH_COLLECTION_SUCCESS, FETCH_COLLECTION_REQUEST } from './collection.types.js';

export const fetchCollection = () => {
   return (dispatch) => {
    dispatch(fetchCollectionRequest())
    axios.get("https://eu-api.backendless.com/2F91D088-EB50-B7B7-FFFC-8439A97CF700/B69C0E45-5D57-4B34-B301-B4DE62FDB203/data/sectionsAPI")
        .then(response => {
            const collection = response.data
            dispatch(fetchCollectionSuccess(collection))
        })
        .catch(error => {
            const errorMsg = error.message
            dispatch(fetchCollectionFailure(errorMsg))
        })
   } 
}

export const fetchCollectionRequest = () => {
    return {
      type: FETCH_COLLECTION_REQUEST
    }
  }
  
  export const fetchCollectionSuccess = collection => {
    return {
      type: FETCH_COLLECTION_SUCCESS,
      payload: collection
    }
  }
  
  export const fetchCollectionFailure = error => {
    return {
      type: FETCH_COLLECTION_FAILURE,
      payload: error
    }
  }
