import axios from "axios";
import { FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_FAILURE } from './category.types';

export const fetchCategory = () => {
   return (dispatch) => {
    dispatch(fetchCategoryRequest())
    axios.get("https://eu-api.backendless.com/2F91D088-EB50-B7B7-FFFC-8439A97CF700/B69C0E45-5D57-4B34-B301-B4DE62FDB203/data/NewsPostAPI?pageSize=100")
        .then(response => {
            const userClickedCategory = localStorage.getItem('user-clicked')
            const testing = response.data
            const category = testing.filter((item) => {
                return item.Category === userClickedCategory
            })
            dispatch(fetchCategorySuccess(category))
        })
        .catch(error => {
            const errorMsg = error.message
            dispatch(fetchCategoryFailure(errorMsg))
        })
   } 
}

export const fetchNewsPost = () => {
    return (dispatch) => {
     dispatch(fetchCategoryRequest())
     axios.get("https://eu-api.backendless.com/2F91D088-EB50-B7B7-FFFC-8439A97CF700/B69C0E45-5D57-4B34-B301-B4DE62FDB203/data/NewsPostAPI?pageSize=100")
         .then(response => {
             const testing = response.data
             let random = testing.sort(() => .5 - Math.random()).slice(0)
             const categoryRandom = random.slice(1, 7)
             dispatch(fetchCategorySuccess(categoryRandom))
         })
         .catch(error => {
             const errorMsg = error.message
             dispatch(fetchCategoryFailure(errorMsg))
         })
    } 
 }

export const fetchCategoryRequest = () => {
    return {
      type: FETCH_CATEGORY_REQUEST
    }
}
  
export const fetchCategorySuccess = category => {
    return {
      type: FETCH_CATEGORY_SUCCESS,
      payload: category
    }
}
  
export const fetchCategoryFailure = error => {
    return {
      type: FETCH_CATEGORY_FAILURE,
      payload: error
    }
}
