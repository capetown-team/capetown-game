import { ForumAction } from './actions';
import {
  TOPIC_REQUEST,
  TOPIC_SUCCESS,
  TOPIC_FAILURE,
  COMMENT_REQUEST,
  COMMENT_SUCCESS,
  COMMENT_FAILURE,
  REPLY_REQUEST,
  REPLY_SUCCESS,
  REPLY_FAILURE
} from './constants';

export const initialState = {
  topics: [],
  comments: [],
  replies: [],
  isSuccessResult: false,
  pending: false,
  error: null,
  emotions: []
};

export const forumReducer = (state = initialState, action: ForumAction) => {
  switch (action.type) {
    case TOPIC_REQUEST:
      return { ...state, error: null, pending: true };
    case TOPIC_FAILURE:
      return { ...state, pending: false, isSuccessResult: false };
    case TOPIC_SUCCESS: {
      return {
        ...state,
        isSuccessResult: true,
        topics: action.payload.topics,
        pending: false,
        error: false
      };
    }
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
    default:
      return state;
  }
};
