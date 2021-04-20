import { LOGIN_SUCCESS, LOGOUT, SET_CURRENT_USER, SIGN_UP } from './user.types';
import { LoggedIn, SignUp } from '../../services/auth.service';


export const Login = (login, password) => (dispatch) => {
    return LoggedIn(login, password).then(
      (data) => {
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

export const signup = (email, name, password) => (dispatch) => {
  return SignUp(email, name, password).then(
    (data) => {
      dispatch({
        type: SIGN_UP,
        payload: { user: data}
      })

      return Promise.resolve()
    }
  )
}

export const SetCurrentUser = () => ({
  type: SET_CURRENT_USER
})