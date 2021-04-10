import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { IApi } from '@/middlewares/api';
import { Props } from './types';

import { REPLY_REQUEST, REPLY_SUCCESS, REPLY_FAILURE } from './constants';

type ReplyRequest = {
  type: typeof REPLY_REQUEST;
};

const replyRequest = (): ReplyRequest => {
  return {
    type: REPLY_REQUEST
  };
};

type ReplySuccess = {
  type: typeof REPLY_SUCCESS;
  payload: { replies: Props[] };
};

const replySuccess = (replies: Props[]): ReplySuccess => {
  return {
    type: REPLY_SUCCESS,
    payload: { replies }
  };
};

type ReplyFailure = {
  type: typeof REPLY_FAILURE;
};

const replyFailure = (): ReplyFailure => {
  return {
    type: REPLY_FAILURE
  };
};

export const getReplies = <S,>(): ThunkAction<
  void,
  () => S,
  IApi,
  Action<string>
> => {
  return async (
    dispatch: Dispatch,
    getState,
    { getReplies }
  ): Promise<void> => {
    dispatch(replyRequest());
    getReplies()
      .then((response) => {
        if (response.data) {
          dispatch(replySuccess(response.data));
        }
      })
      .catch(() => {
        dispatch(replyFailure());
      });
  };
};

export type ReplyAction = ReplyRequest | ReplySuccess | ReplyFailure;
