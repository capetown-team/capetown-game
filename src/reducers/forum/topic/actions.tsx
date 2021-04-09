import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { IApi } from '@/middlewares/api';
import { Props } from './types';

import { FORUM_REQUEST, FORUM_SUCCESS, FORUM_FAILURE } from './constants';

type ForumRequest = {
  type: typeof FORUM_REQUEST;
};

const forumRequest = (): ForumRequest => {
  return {
    type: FORUM_REQUEST
  };
};

type ForumSuccess = {
  type: typeof FORUM_SUCCESS;
  payload: { topics: Props[] };
};

const forumSuccess = (topics: Props[]): ForumSuccess => {
  return {
    type: FORUM_SUCCESS,
    payload: { topics }
  };
};

type ForumFailure = {
  type: typeof FORUM_FAILURE;
};

const forumFailure = (): ForumFailure => {
  return {
    type: FORUM_FAILURE
  };
};

export const getForum = <S,>(): ThunkAction<
  void,
  () => S,
  IApi,
  Action<string>
> => {
  return async (dispatch: Dispatch, getState, { getTopics }): Promise<void> => {
    dispatch(forumRequest());
    getTopics()
      .then((response) => {
        if (response.data) {
          dispatch(forumSuccess(response.data));
        }
      })
      .catch(() => {
        dispatch(forumFailure());
      });
  };
};

export type ForumAction = ForumRequest | ForumSuccess | ForumFailure;
