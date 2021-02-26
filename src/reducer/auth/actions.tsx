import { Dispatch, Action } from 'redux';
import { AxiosInstance } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { path } from '@/api';

import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_CHECK_FAILURE,
  LOGOUT,
  LOGOUT_FAILURE
} from './types';

export type UserType = {
  login: string;
  avatar: string | null;
  first_name: string;
};

export type AuthState = {
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
