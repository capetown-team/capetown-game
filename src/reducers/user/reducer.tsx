import { UserAction } from './actions';
import {
  USER_SUCCESS,
  AUTH_CHECK_FAILURE,
  AUTH_REQUEST,
  USER_REQUEST,
  USER_FAILURE,
  PROFILE_SUCCESS,
  LOGOUT
} from './constants';

export const initialState = {
  isAuth: false,
  pending: false,
  load: false
};

export const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return { ...state, error: null, pending: true };
    case AUTH_CHECK_FAILURE:
      return { ...state, pending: false, isAuth: false };
    case USER_SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
        isAuth: true,
        pending: false,
        load: false,
        error: false
      };
    }
    case USER_REQUEST:
      return { ...state, load: true, error: false };
    case USER_FAILURE:
      return { ...state, error: true, load: false };
    case LOGOUT:
      return { ...state, load: false, isAuth: false };
    case PROFILE_SUCCESS:
      return { ...state, load: false, error: false };
    // no default
  }

  return state;
};
