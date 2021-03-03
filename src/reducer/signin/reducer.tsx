import { SignInState } from '@/reducer/signin/actions';

import { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE } from './types';

export type ActionType = {
  type: string;
  payload: SignInState;
};

const initialState = {
  pending: false,
  error: false
};

export const signinReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case SIGNIN_REQUEST: {
      return { ...state, error: false, pending: true };
    }
    case SIGNIN_SUCCESS: {
      return {
        ...state,
        pending: false,
        error: false
      };
    }
    case SIGNIN_FAILURE: {
      return { ...state, pending: false, error: true };
    }
    // no default
  }
  return state;
};
