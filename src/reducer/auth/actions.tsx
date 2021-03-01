import { Dispatch, Action } from 'redux';
import { AxiosInstance } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { path } from '@/api';

import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_CHECK_FAILURE,
  LOGOUT_FAILURE,
  LOGOUT,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from './types';

export type UserType = {
  login: string;
  avatar: string | null;
  first_name: string;
};

export type UserTypeSign = {
  login: string;
  password: string;
};

export type UserTypeSignup = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
};

export type AuthState = {
  isAuth: boolean;
  pending: boolean;
  error: boolean;
  user: UserType;
  signinError: boolean;
  signupError: boolean;
};

export const authorize = (userInfo: { user: UserType }) => {
  return {
    type: AUTH_SUCCESS,
    payload: userInfo
  };
};

const authRequest = () => {
  return {
    type: AUTH_REQUEST
  };
};

const authCheckFailure = () => {
  return {
    type: AUTH_CHECK_FAILURE
  };
};

export const authFailure = (error: string) => {
  return {
    type: LOGOUT_FAILURE,
    payload: {
      error
    }
  };
};

export const checkAuth = <S,>(): ThunkAction<
  void,
  () => S,
  AxiosInstance,
  Action<string>
> => {
  return async (dispatch: Dispatch, getState, api): Promise<void> => {
    dispatch(authRequest());
    api
      .get(`${path}/auth/user`, { withCredentials: true })
      .then((response) => {
        if (response.data) {
          const user: { user: UserType } = { user: response.data };
          dispatch(authorize(user));
        }
      })
      .catch(() => {
        dispatch(authCheckFailure());
      });
  };
};

export const logout = <S,>(): ThunkAction<
  void,
  () => S,
  AxiosInstance,
  Action<string>
> => {
  return async (dispatch: Dispatch, getState, api): Promise<void> => {
    api
      .post(
        `${path}/auth/logout`,
        {},
        {
          withCredentials: true
        }
      )
      .then(() => {
        dispatch({
          type: LOGOUT
        });
      })
      .catch((error) => {
        dispatch(authFailure(error));
      });
  };
};

const signIn = (userInfo: { user: UserType }) => {
  return {
    type: SIGNIN_SUCCESS,
    payload: userInfo
  };
};

const signInRequest = () => {
  return {
    type: SIGNIN_REQUEST
  };
};

const signInFailure = () => {
  return {
    type: SIGNIN_FAILURE
  };
};

export const checkSignIn = <S,>(
  userSignin: UserTypeSign
): ThunkAction<void, () => S, AxiosInstance, Action<string>> => {
  return async (dispatch: Dispatch, getState, api): Promise<void> => {
    dispatch(signInRequest());
    await api
      .post(`${path}/auth/signin`, userSignin, { withCredentials: true })
      .then((response) => {
        if (response.data) {
          const user: { user: UserType } = {
            user: { login: userSignin.login, avatar: '', first_name: '' }
          };
          dispatch(signIn(user));
          // dispatch(authorize(user));
        }
      })
      .catch(() => {
        dispatch(signInFailure());
      });
  };
};

const signUp = (userInfo: { user: UserType }) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: userInfo
  };
};

const signUpRequest = () => {
  return {
    type: SIGNUP_REQUEST
  };
};

const signUpFailure = () => {
  return {
    type: SIGNUP_FAILURE
  };
};

export const checkSignUp = <S,>(
  userSignup: UserTypeSignup
): ThunkAction<void, () => S, AxiosInstance, Action<string>> => {
  return async (dispatch: Dispatch, getState, api): Promise<void> => {
    dispatch(signUpRequest());
    await api
      .post(`${path}/auth/signup`, userSignup, { withCredentials: true })
      .then((response) => {
        if (response.data) {
          const user: { user: UserType } = {
            user: {
              login: userSignup.login,
              avatar: '',
              first_name: userSignup.first_name
            }
          };
          dispatch(signUp(user));
          // dispatch(authorize(user));
        }
      })
      .catch(() => {
        dispatch(signUpFailure());
      });
  };
};
