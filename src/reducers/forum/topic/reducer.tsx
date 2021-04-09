import { ForumAction } from './actions';
import { FORUM_REQUEST, FORUM_SUCCESS, FORUM_FAILURE } from './constants';

export const initialState = {
  topics: [],
  isSuccessResult: false,
  pending: false,
  error: null
};

export const forumReducer = (state = initialState, action: ForumAction) => {
  switch (action.type) {
    case FORUM_REQUEST:
      return { ...state, error: null, pending: true };
    case FORUM_FAILURE:
      return { ...state, pending: false, isSuccessResult: false };
    case FORUM_SUCCESS: {
      return {
        ...state,
        isSuccessResult: true,
        topics: action.payload.topics,
        pending: false,
        error: false
      };
    }
    // no default
  }

  return state;
};
