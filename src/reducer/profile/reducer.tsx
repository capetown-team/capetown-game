import { ActionProps } from '@/types.d';

const initialState = {};

export const profileReducer = (state = initialState, action: ActionProps) => {
  switch (action.type) {
    case 'TEST': {
      return { ...state };
    }
    // no default
  }

  return state;
};
