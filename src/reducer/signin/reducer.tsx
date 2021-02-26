import { SignInState } from '@/reducer/signin/actions';

import { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE } from './types';

export type ActionType = {
  type: string;
  payload: SignInState;
};

const initialState = {
  isSignIn: false,
  pending: false,
  user: null,
  error: null
};

export const signinReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case SIGNIN_REQUEST: {
      return { ...state, error: null, pending: true };
    }
    case SIGNIN_SUCCESS: {
      return {
        ...state,
        user: {
          ...action.payload.user
        },
        isSignIn: true,
        pending: false,
        error: false
      };
    }
    case SIGNIN_FAILURE: {
      return { ...state, pending: false, isSignIn: false };
    }
    // no default
  }
  return state;
};
