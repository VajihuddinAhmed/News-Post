import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import dropdownReducer from './dropdown/dropdown.reducer';
import collectionReducer from './collection/collection.reducer';
import categoryReducer from './category/category.reducer';
import deletPostReducer from './deletePost/deletePost.reducer';
import userPostsReducer from './userPosts/userPosts.reducer';
import allUsersReducer from './allUsers/allUsers.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    dropdown: dropdownReducer,
    collection: collectionReducer,
    category: categoryReducer,
    post: deletPostReducer,
    userposts: userPostsReducer,
    allUsers: allUsersReducer
});

export default rootReducer;