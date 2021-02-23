import { UserState } from '@/reducer/user/actions';
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_CHECK_FAILURE,
  AUTH_FAILURE,
  LOGOUT
} from './types';

export type ActionType = {
  type: string;
  payload: UserState;
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
          id: action.payload.user?.id,
          first_name: action.payload?.user?.first_name ?? '',
          second_name: action.payload?.user?.second_name ?? '',
          display_name: action.payload?.user?.display_name ?? '',
          login: action.payload?.user?.login ?? '',
          email: action.payload?.user?.email ?? '',
          phone: action.payload?.user?.phone ?? '',
          avatar: action.payload?.user?.avatar ?? ''
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
    case AUTH_FAILURE:
      return { ...state, error: action.payload.error, isAuth: false };
    // no default
  }

  return state;
};
