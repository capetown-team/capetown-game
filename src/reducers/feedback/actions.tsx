import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { IApi } from '@/middlewares/api';
import {
  FEEDBACK_FAILURE,
  FEEDBACK_REQUEST,
  FEEDBACK_SUCCESS,
  FEEDBACK_LIST_SUCCESS
} from './constants';
import { FeedbackCreateType, FeedbackType } from './types';

type FeedbackRequest = {
  type: typeof FEEDBACK_REQUEST;
};

const feedbackRequest = (): FeedbackRequest => {
  return {
    type: FEEDBACK_REQUEST
  };
};

type FeedbackFailure = {
  type: typeof FEEDBACK_FAILURE;
  payload: { error: string };
};

const feedbackFailure = (error: string): FeedbackFailure => {
  return {
    type: FEEDBACK_FAILURE,
    payload: {
      error
    }
  };
};

type FeedbackSuccess = {
  type: typeof FEEDBACK_SUCCESS;
};

const feedbackSuccess = (): FeedbackSuccess => {
  return {
    type: FEEDBACK_SUCCESS
  };
};

type FeedbackListSuccess = {
  type: typeof FEEDBACK_LIST_SUCCESS;
  payload: { list: FeedbackType[] };
};

const feedbackListSuccess = (list: FeedbackType[]): FeedbackListSuccess => {
  return {
    type: FEEDBACK_LIST_SUCCESS,
    payload: { list }
  };
};

export const addFeedback = <S,>(
  data: FeedbackCreateType
): ThunkAction<void, () => S, IApi, Action<string>> => {
  return async (
    dispatch: Dispatch,
    getState,
    { addFeedback }
  ): Promise<void> => {
    dispatch(feedbackRequest());
    try {
      const response = await addFeedback(data);
      if (response.data.success) {
        dispatch(feedbackSuccess());
      }
    } catch (error) {
      if (error.response.data.err?.errors.email.message) {
        dispatch(feedbackFailure('email не соответствует формату'));
      } else {
        dispatch(feedbackFailure('Ошибка, попробуйте позднее'));
      }
    }
  };
};

export const listFeedback = <S,>(): ThunkAction<
  void,
  () => S,
  IApi,
  Action<string>
> => {
  return async (
    dispatch: Dispatch,
    getState,
    { getFeedbackList }
  ): Promise<void> => {
    dispatch(feedbackRequest());
    try {
      const response = await getFeedbackList();

      if (response.data) {
        dispatch(feedbackListSuccess(response.data));
      }
    } catch (e) {
      dispatch(feedbackFailure('Ошибка, попробуйте позднее'));
    }
  };
};

export type FeedbackAction =
  | FeedbackRequest
  | FeedbackFailure
  | FeedbackSuccess
  | FeedbackListSuccess;
