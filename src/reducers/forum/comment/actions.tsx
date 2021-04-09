import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { IApi } from '@/middlewares/api';
import { Props } from './types';

import { COMMENT_REQUEST, COMMENT_SUCCESS, COMMENT_FAILURE } from './constants';

type CommentRequest = {
  type: typeof COMMENT_REQUEST;
};

const commentRequest = (): CommentRequest => {
  return {
    type: COMMENT_REQUEST
  };
};

type CommentSuccess = {
  type: typeof COMMENT_SUCCESS;
  payload: { comments: Props[] };
};

const commentSuccess = (comments: Props[]): CommentSuccess => {
  return {
    type: COMMENT_SUCCESS,
    payload: { comments }
  };
};

type CommentFailure = {
  type: typeof COMMENT_FAILURE;
};

const commentFailure = (): CommentFailure => {
  return {
    type: COMMENT_FAILURE
  };
};

export const getComments = <S,>(): ThunkAction<
  void,
  () => S,
  IApi,
  Action<string>
> => {
  return async (
    dispatch: Dispatch,
    getState,
    { getComments }
  ): Promise<void> => {
    dispatch(commentRequest());
    getComments()
      .then((response) => {
        if (response.data) {
          dispatch(commentSuccess(response.data));
        }
      })
      .catch(() => {
        dispatch(commentFailure());
      });
  };
};

export type CommentAction = CommentRequest | CommentSuccess | CommentFailure;
