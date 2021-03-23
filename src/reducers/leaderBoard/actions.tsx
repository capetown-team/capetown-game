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

type LeaderBoardRequest = {
  type: typeof LEADER_BOARD_REQUEST;
};

const leaderBoardRequest = (): LeaderBoardRequest => {
  return {
    type: LEADER_BOARD_REQUEST
  };
};

type LeaderBoardSuccess = {
  type: typeof LEADER_BOARD_SUCCESS;
  payload: { leaders: Props[] };
};

const leaderBoardSuccess = (leaders: Props[]): LeaderBoardSuccess => {
  return {
    type: LEADER_BOARD_SUCCESS,
    payload: { leaders }
  };
};

type LeaderBoardFailure = {
  type: typeof LEADER_BOARD_FAILURE;
};

const leaderBoardFailure = (s: string): LeaderBoardFailure => {
  return {
    type: LEADER_BOARD_FAILURE
  };
};

type LeaderResultRequest = {
  type: typeof LEADER_RESULT_REQUEST;
};

const leaderResultRequest = (): LeaderResultRequest => {
  return {
    type: LEADER_RESULT_REQUEST
  };
};

type LeaderResultSuccess = {
  type: typeof LEADER_RESULT_SUCCESS;
};

const leaderResultSuccess = (): LeaderResultSuccess => {
  return {
    type: LEADER_RESULT_SUCCESS
  };
};

type LeaderResultFailure = {
  type: typeof LEADER_RESULT_FAILURE;
};

const leaderResultFailure = (): LeaderResultFailure => {
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
    try {
      dispatch(leaderBoardRequest());
      const { data } = await getLiderBoardAll(LeaderBoardRequest);
      if (data) {
        const result: Props[] = [];
        for (let i = 0; i < data.length; i += 1) {
          result.push({
            id: i + 1,
            displayName: data[i].data.pacmanPlayer,
            avatar: data[i].data.pacmanAvatar,
            score: data[i].data.pacmanScore
          });
        }
        dispatch(leaderBoardSuccess(result));
      }
    } catch (err) {
      dispatch(leaderBoardFailure(JSON.stringify('Ну такое')));
    }
  };
};

export type LeaderBoardAction =
  | LeaderBoardRequest
  | LeaderBoardSuccess
  | LeaderBoardFailure
  | LeaderResultFailure
  | LeaderResultSuccess
  | LeaderResultRequest;
