import { LOGIN_SUCCESS, LOGOUT, SET_CURRENT_USER } from './user.types';
import { LoggedIn } from '../../services/auth.service';


export const Login = (login, password) => (dispatch) => {
    return LoggedIn(login, password).then(
      (data) => {
        console.log(data)
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
  
        return Promise.resolve();
      }
    );
};

export const Logout = () => (dispatch) => {

    dispatch({
      type: LOGOUT,
      payload: { user: null },
    });
};

export const SetCurrentUser = () => ({
  type: SET_CURRENT_USER
})