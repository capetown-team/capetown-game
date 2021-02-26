import { SignUpState } from '@/reducer/signup/actions';

import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from './types';

export type ActionType = {
  type: string;
  payload: SignUpState;
};

const initialState = {
  isSignUp: false,
  pending: false,
  user: null,
  error: null
};

export const signupReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case SIGNUP_REQUEST: {
      return { ...state, error: null, pending: true };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        user: {
          ...action.payload.user
        },
        isSignUp: true,
        pending: false,
        error: false
      };
    }
    case SIGNUP_FAILURE: {
      return { ...state, pending: false, isSignUp: false };
    }
    // no default
  }
  return state;
};
