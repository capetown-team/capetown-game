import { ActionProps } from '@/types.d';

const initialState = {};

export const signupReducer = (state = initialState, action: ActionProps) => {
  switch (action.type) {
    case 'TEST': {
      return { ...state };
    }
    // no default
  }

  return state;
};
