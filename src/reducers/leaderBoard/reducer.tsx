import { LeaderBoardAction } from './actions';
import {
  LEADER_BOARD_REQUEST,
  LEADER_BOARD_SUCCESS,
  LEADER_BOARD_FAILURE,
  LEADER_RESULT_REQUEST,
  LEADER_RESULT_SUCCESS,
  LEADER_RESULT_FAILURE
} from './constants';

export const initialState = {
  leaders: [],
  isSuccessResult: false,
  isSuccessBoard: false,
  pending: false,
  error: null
};

export const leaderBoardReducer = (
  state = initialState,
  action: LeaderBoardAction
) => {
  switch (action.type) {
    case LEADER_BOARD_REQUEST:
      return { ...state, error: null, pending: true };
    case LEADER_BOARD_FAILURE:
      return { ...state, pending: false, isSuccessBoard: false };
    case LEADER_BOARD_SUCCESS: {
      return {
        ...state,
        isSuccessBoard: true,
        leaders: action.payload.leaders,
        pending: false,
        error: false
      };
    }
    case LEADER_RESULT_REQUEST:
      return { ...state, error: null, pending: true };
    case LEADER_RESULT_FAILURE:
      return { ...state, pending: false, isSuccessResult: false, error: true };
    case LEADER_RESULT_SUCCESS: {
      return {
        ...state,
        isSuccessResult: true,
        pending: false,
        load: false,
        error: false
      };
    }
    // no default
  }

  return state;
};
