import { AuthState } from '@/reducer/auth/actions';
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

export type ActionType = {
  type: string;
  payload: AuthState;
};

const initialState = {
  isAuth: false,
  pending: false,
  user: null,
  error: null,
  signinError: null,
  signupError: null
};

export const userReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return { ...state, error: null, pending: true };
    case AUTH_SUCCESS: {
      return {
        ...state,
        user: {
          ...action.payload.user
        },
        isAuth: true,
        pending: false,
        error: false
      };
    }
    case AUTH_CHECK_FAILURE:
      return { ...state, pending: false, isAuth: false };
    case LOGOUT:
      return { ...state, pending: false, isAuth: false };
    case LOGOUT_FAILURE:
      return { ...state, error: action.payload.error, isAuth: false };
    case SIGNIN_REQUEST:
      return { ...state, error: false, pending: true };
    case SIGNIN_SUCCESS: {
      return {
        ...state,
        user: {
          ...action.payload.user
        },
        isAuth: true,
        pending: false,
        error: false
      };
    }
    case SIGNIN_FAILURE:
      return { ...state, pending: false, isAuth: false, signinError: true };
    case SIGNUP_REQUEST:
      return { ...state, error: null, pending: true };
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        user: {
          ...action.payload.user
        },
        isAuth: true,
        pending: false,
        error: false
      };
    }
    case SIGNUP_FAILURE: {
      return { ...state, pending: false, isAuth: false, signupError: true };
    }
    // no default
  }

  return state;
};
