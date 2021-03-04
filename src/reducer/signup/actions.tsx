import { Dispatch, Action } from 'redux';
import { AxiosInstance } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { path } from '@/api';
import { authorize, UserType } from '@/reducer/auth/actions';

import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from './types';

export type UserTypeSignup = {
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

const signUp = () => {
  return {
    type: SIGNUP_SUCCESS
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
              id: response.data.id,
              login: userSignup.login,
              avatar: '',
              first_name: userSignup.first_name,
              second_name: userSignup.second_name,
              display_name: '',
              email: userSignup.email,
              phone: userSignup.phone
            }
          };
          dispatch(signUp());
          dispatch(authorize(user));
        }
      })
      .catch(() => {
        dispatch(signUpFailure());
      });
  };
};
