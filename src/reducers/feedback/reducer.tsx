import { FeedbackAction } from './actions';
import {
  FEEDBACK_SUCCESS,
  FEEDBACK_FAILURE,
  FEEDBACK_REQUEST,
  FEEDBACK_LIST_SUCCESS
} from './constants';

export const initialState = {
  pending: false,
  list: [],
  error: null,
  isSuccessCreate: false
};

export const feedbackReducer = (
  state = initialState,
  action: FeedbackAction
) => {
  switch (action.type) {
    case FEEDBACK_REQUEST:
      return { ...state, error: null, pending: true, isSuccessCreate: false };
    case FEEDBACK_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        pending: false,
        isSuccessCreate: false
      };
    case FEEDBACK_SUCCESS:
      return {
        ...state,
        error: false,
        isSuccessCreate: true,
        pending: false
      };
    case FEEDBACK_LIST_SUCCESS:
      return {
        ...state,
        error: false,
        pending: false,
        list: action.payload.list
      };

    // no default
  }

  return state;
};
