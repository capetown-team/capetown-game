import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { IApi } from '@/middlewares/api';
import {
  TopicProps,
  TopicTableProps,
  CommentProps,
  ReplyProps,
  EmotionProps
} from './types';

import {
  TOPIC_REQUEST,
  TOPIC_SUCCESS,
  TOPIC_FAILURE,
  COMMENT_REQUEST,
  COMMENT_SUCCESS,
  COMMENT_FAILURE,
  REPLY_REQUEST,
  REPLY_SUCCESS,
  REPLY_FAILURE,
  EMOTION_REQUEST,
  EMOTION_SUCCESS,
  EMOTION_FAILURE
} from './constants';

type TopicRequest = {
  type: typeof TOPIC_REQUEST;
};

const topicRequest = (): TopicRequest => {
  return {
    type: TOPIC_REQUEST
  };
};

type TopicSuccess = {
  type: typeof TOPIC_SUCCESS;
  payload: { topics: TopicProps[] | TopicProps };
};

const topicSuccess = (topics: TopicProps[] | TopicProps): TopicSuccess => {
  return {
    type: TOPIC_SUCCESS,
    payload: { topics }
  };
};

type TopicFailure = {
  type: typeof TOPIC_FAILURE;
};

const topicFailure = (): TopicFailure => {
  return {
    type: TOPIC_FAILURE
  };
};

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
  payload: { comments: CommentProps[] | CommentProps };
};

const commentSuccess = (
  comments: CommentProps[] | CommentProps
): CommentSuccess => {
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
  payload: { replies: ReplyProps[] | ReplyProps };
};

const replySuccess = (replies: ReplyProps[] | ReplyProps): ReplySuccess => {
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

type EmotionRequest = {
  type: typeof EMOTION_REQUEST;
};

const emotionRequest = (): EmotionRequest => {
  return {
    type: EMOTION_REQUEST
  };
};

type EmotionSuccess = {
  type: typeof EMOTION_SUCCESS;
  payload: { emotions: EmotionProps[] | EmotionProps };
};

const emotionSuccess = (
  emotions: EmotionProps[] | EmotionProps
): EmotionSuccess => {
  return {
    type: EMOTION_SUCCESS,
    payload: { emotions }
  };
};

type EmotionFailure = {
  type: typeof EMOTION_FAILURE;
};

const emotionFailure = (): EmotionFailure => {
  return {
    type: EMOTION_FAILURE
  };
};

export const getTopics = <S,>(): ThunkAction<
  void,
  () => S,
  IApi,
  Action<string>
> => {
  return async (dispatch: Dispatch, getState, { getTopics }): Promise<void> => {
    dispatch(topicRequest());
    getTopics()
      .then((response) => {
        if (response.data) {
          dispatch(topicSuccess(response.data));
        }
      })
      .catch(() => {
        dispatch(topicFailure());
      });
  };
};

export const addTopic = <S,>(
  topic: TopicTableProps
): ThunkAction<void, () => S, IApi, Action<string>> => {
  return async (dispatch: Dispatch, getState, { addTopic }): Promise<void> => {
    dispatch(topicRequest());
    addTopic(topic)
      .then((response) => {
        if (response) {
          getTopics();
        }
      })
      .catch(() => {
        dispatch(topicFailure());
      });
  };
};

export const getComments = <S,>(
  topicId: number
): ThunkAction<void, () => S, IApi, Action<string>> => {
  return async (
    dispatch: Dispatch,
    getState,
    { getComments }
  ): Promise<void> => {
    dispatch(commentRequest());
    getComments(topicId)
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

export const addComment = <S,>(
  comment: CommentProps
): ThunkAction<void, () => S, IApi, Action<string>> => {
  return async (
    dispatch: Dispatch,
    getState,
    { addComment }
  ): Promise<void> => {
    dispatch(commentRequest());
    addComment(comment)
      .then((response) => {
        if (response) {
          dispatch(getComments(comment.topicId));
        }
      })
      .catch(() => {
        dispatch(commentFailure());
      });
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

export const addReply = <S,>(
  reply: ReplyProps
): ThunkAction<void, () => S, IApi, Action<string>> => {
  return async (dispatch: Dispatch, getState, { addReply }): Promise<void> => {
    dispatch(replyRequest());
    addReply(reply)
      .then((response) => {
        if (response) {
          dispatch(replySuccess(response.data));
        }
      })
      .catch(() => {
        dispatch(replyFailure());
      });
  };
};

export const addEmotion = <S,>(
  emotion: EmotionProps
): ThunkAction<void, () => S, IApi, Action<string>> => {
  return async (
    dispatch: Dispatch,
    getState,
    { addEmotion }
  ): Promise<void> => {
    dispatch(emotionRequest());
    addEmotion(emotion)
      .then((response) => {
        if (response) {
          dispatch(emotionSuccess(response.data));
        }
      })
      .catch(() => {
        dispatch(emotionFailure());
      });
  };
};

export type ForumAction =
  | TopicRequest
  | TopicSuccess
  | TopicFailure
  | CommentRequest
  | CommentSuccess
  | CommentFailure
  | ReplyRequest
  | ReplySuccess
  | ReplyFailure;
