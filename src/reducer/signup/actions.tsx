import { Dispatch, Action } from 'redux';
import { AxiosInstance } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { path } from '@/api';

import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from './types';

export type UserType = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
};

export type SignUpState = {
  isSignUp: boolean;
  pending: boolean;
  error: boolean;
  user: UserType;
};

const signUp = (userInfo: { user: UserType }) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: userInfo
  };
};

const signInRequest = () => {
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
  user: UserType
): ThunkAction<void, () => S, AxiosInstance, Action<string>> => {
  return async (dispatch: Dispatch, getState, api): Promise<void> => {
    dispatch(signInRequest());
    api
      .post(`${path}/auth/signup`, { withCredentials: true })
      .then((response) => {
        if (response.data) {
          const user: { user: UserType } = { user: response.data };
          dispatch(signUp(user));
        }
      })
      .catch(() => {
        dispatch(signUpFailure());
      });
  };
};
