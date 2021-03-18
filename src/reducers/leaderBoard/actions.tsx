import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { IApi } from '@/middlewares/api';
import { Props, LeaderBoardType, LeaderBoardAllType } from './types';

import {
  LEADER_BOARD_REQUEST,
  LEADER_BOARD_SUCCESS,
  LEADER_BOARD_FAILURE,
  LEADER_RESULT_REQUEST,
  LEADER_RESULT_SUCCESS,
  LEADER_RESULT_FAILURE
} from './constants';

const leaderBoardRequest = () => {
  return {
    type: LEADER_BOARD_REQUEST
  };
};

const leaderBoardSuccess = (leaders: Props[]) => {
  return {
    type: LEADER_BOARD_SUCCESS,
    payload: { leaders }
  };
};

const leaderBoardFailure = () => {
  return {
    type: LEADER_BOARD_FAILURE
  };
};

const leaderResultRequest = () => {
  return {
    type: LEADER_RESULT_REQUEST
  };
};

const leaderResultSuccess = () => {
  return {
    type: LEADER_RESULT_SUCCESS
  };
};

const leaderResultFailure = () => {
  return {
    type: LEADER_RESULT_FAILURE
  };
};

export const setLiderBoardResult = <S,>(
  leaderBoardResult: LeaderBoardType
): ThunkAction<void, () => S, IApi, Action<string>> => {
  return async (
    dispatch: Dispatch,
    getState,
    { setLiderBoardResult }
  ): Promise<void> => {
    dispatch(leaderResultRequest());
    setLiderBoardResult(leaderBoardResult)
      .then((response) => {
        if (response.data) {
          dispatch(leaderResultSuccess());
        }
      })
      .catch(() => {
        dispatch(leaderResultFailure());
      });
  };
};

export const getLiderBoardAll = <S,>(
  LeaderBoardRequest: LeaderBoardAllType
): ThunkAction<void, () => S, IApi, Action<string>> => {
  return async (
    dispatch: Dispatch,
    getState,
    { getLiderBoardAll }
  ): Promise<void> => {
    dispatch(leaderBoardRequest());
    getLiderBoardAll(LeaderBoardRequest)
      .then((response) => {
        if (response.data) {
          const result: Props[] = [];
          for (let i = 0; i < response.data.length; i += 1) {
            result.push({
              id: i + 1,
              displayName: response.data[i].data.pacmanPlayer,
              avatar: response.data[i].data.pacmanAvatar,
              score: response.data[i].data.pacmanScore
            });
          }
          dispatch(leaderBoardSuccess(result));
        }
      })
      .catch(() => {
        dispatch(leaderBoardFailure());
      });
  };
};
