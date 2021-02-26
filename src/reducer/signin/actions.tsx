import { Dispatch, Action } from 'redux';
import { AxiosInstance } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { path } from '@/api';

import { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE } from './types';

export type UserType = {
  login: string;
  password: string;
};

export type SignInState = {
  isSignIn: boolean;
  pending: boolean;
  error: boolean;
  user: UserType;
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
  user: UserType
): ThunkAction<void, () => S, AxiosInstance, Action<string>> => {
  return async (dispatch: Dispatch, getState, api): Promise<void> => {
    dispatch(signInRequest());
    api
      .post(`${path}/auth/signin`, { withCredentials: true })
      .then((response) => {
        if (response.data) {
          const user: { user: UserType } = { user: response.data };
          dispatch(signIn(user));
        }
      })
      .catch(() => {
        dispatch(signInFailure());
      });
  };
};
