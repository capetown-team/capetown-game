import { AuthState } from '@/reducer/auth/actions';
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_CHECK_FAILURE,
  LOGOUT_FAILURE,
  LOGOUT
} from './types';

export type ActionType = {
  type: string;
  payload: AuthState;
};

const initialState = {
  isAuth: false,
  pending: false,
  user: null,
  error: null
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
    // no default
  }

  return state;
};
