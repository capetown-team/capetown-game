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

const signUp = (userInfo: { user: UserTypeSignup }) => {
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
    api
      .post(`${path}/auth/signup`, userSignup, { withCredentials: true })
      .then((response) => {
        if (response.data) {
          const user: { user: UserTypeSignup } = { user: response.data };
          dispatch(signUp(user));
          const userAuth: UserType = {
            login: userSignup.login,
            avatar: '',
            first_name: ''
          };
          authorize({ user: userAuth });
        }
      })
      .catch((err) => {
        dispatch(signUpFailure());
        console.log(err);
      });
  };
};
