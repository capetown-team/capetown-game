import { Dispatch } from 'redux';

import { getUserInfo } from '@/api';
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_CHECK_FAILURE,
  LOGOUT,
  USER_FAILURE
} from './types';

export type UserType = {
  login: string;
  avatar: string | null;
  id: number | undefined;
  first_name: string;
  second_name: string;
  display_name: string;
  email: string;
  phone: string;
};

export type UserState = {
  isAuth: boolean;
  pending: boolean;
  error: boolean;
  user: UserType;
};

const authorize = (userInfo: { user: UserType }) => {
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

export const logout = () => {
  return {
    type: LOGOUT
  };
};

export const authFailure = (error: string) => {
  return {
    type: USER_FAILURE,
    payload: {
      error
    }
  };
};

export const checkAuth = () => {
  return async (dispatch: Dispatch) => {
    dispatch(authRequest());
    getUserInfo()
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
