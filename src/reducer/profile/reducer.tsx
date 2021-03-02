import { AuthState } from '@/reducer/auth/actions';
import { CHANGE_PROFILE_VIEW, CHANGE_PROFILE } from './types';

export type ActionType = {
  type: string;
  payload: AuthState;
};

const initialState = {
  isProfileView: true,
  isСhangeable: false
};

export const profileReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case CHANGE_PROFILE_VIEW: {
      return { ...state, isProfileView: action.payload };
    }
    case CHANGE_PROFILE: {
      return { ...state, isСhangeable: action.payload };
    }
    // no default
  }

  return state;
};
