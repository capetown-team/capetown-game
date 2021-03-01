import { Dispatch, Action } from 'redux';
import { AxiosInstance } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { path } from '@/api';
import { authorize, UserType } from '@/reducer/auth/actions';

import { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE } from './types';

export type UserTypeSign = {
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
          dispatch(authorize(user));
        }
      })
      .catch((err) => {
        dispatch(signInFailure());
      });
  };
};
