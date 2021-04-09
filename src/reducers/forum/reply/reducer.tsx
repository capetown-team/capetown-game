import { CommentAction } from './actions';
import { COMMENT_REQUEST, COMMENT_SUCCESS, COMMENT_FAILURE } from './constants';

export const initialState = {
  comments: [],
  isSuccessResult: false,
  pending: false,
  error: null
};

export const commentReducer = (state = initialState, action: CommentAction) => {
  switch (action.type) {
    case COMMENT_REQUEST:
      return { ...state, error: null, pending: true };
    case COMMENT_FAILURE:
      return { ...state, pending: false, isSuccessResult: false };
    case COMMENT_SUCCESS: {
      return {
        ...state,
        isSuccessResult: true,
        comments: action.payload.comments,
        pending: false,
        error: false
      };
    }
    // no default
  }

  return state;
};
