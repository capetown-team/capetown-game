import { ReplyAction } from './actions';
import { REPLY_REQUEST, REPLY_SUCCESS, REPLY_FAILURE } from './constants';

export const initialState = {
  REPLYs: [],
  isSuccessResult: false,
  pending: false,
  error: null
};

export const replyReducer = (state = initialState, action: ReplyAction) => {
  switch (action.type) {
    case REPLY_REQUEST:
      return { ...state, error: null, pending: true };
    case REPLY_FAILURE:
      return { ...state, pending: false, isSuccessResult: false };
    case REPLY_SUCCESS: {
      return {
        ...state,
        isSuccessResult: true,
        replies: action.payload.replies,
        pending: false,
        error: false
      };
    }
    // no default
  }

  return state;
};
