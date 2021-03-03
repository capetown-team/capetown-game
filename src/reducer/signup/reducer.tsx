import { SignUpState } from '@/reducer/signup/actions';

import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from './types';

export type ActionType = {
  type: string;
  payload: SignUpState;
};

const initialState = {
  pending: false,
  error: false
};

export const signupReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case SIGNUP_REQUEST: {
      return { ...state, error: false, pending: true };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        pending: false,
        error: false
      };
    }
    case SIGNUP_FAILURE: {
      return { ...state, pending: false, error: true };
    }
    // no default
  }
  return state;
};
