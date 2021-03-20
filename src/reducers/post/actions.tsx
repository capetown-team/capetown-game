import axios from 'axios';
import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { IApi } from '@/middlewares/api';
import { Action } from 'redux';

import {
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE
} from './constants';
// import { authorize, userFailure } from '@/reducers/user/actions';

export const ROOT = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = () => async (dispatch: Dispatch<any>) => {
  dispatch({
    type: FETCH_POSTS_START
  });
  try {
    const response = await axios.get(`${ROOT}/posts`);
    // console.log('response', response);
    const posts = response.data;
    dispatch({
      type: FETCH_POSTS_SUCCESS,
      payload: posts
    });
  } catch (error) {
    dispatch({
      type: FETCH_POSTS_FAILURE,
      payload: error,
      error: true
    });
  }
};

export const fetchUsers2 = () => async (dispatch: Dispatch<any>) => {
  dispatch({
    type: FETCH_USERS_START
  });
  try {
    const response = await axios.get(`${ROOT}/users`);
    console.log('response', response);
    // const users: never[] = [];
    const users = response.data;
    dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: users
    });
  } catch (error) {
    dispatch({
      type: FETCH_USERS_FAILURE,
      payload: error,
      error: true
    });
  }
};

export const fetchUsers = <S,>(): ThunkAction<
  void,
  () => S,
  IApi,
  Action<string>
> => {
  return async (dispatch: Dispatch<any>, getState, {}): Promise<void> => {
    dispatch({
      type: FETCH_USERS_START
    });
    try {
      const response = await axios.get(`${ROOT}/users`);
      console.log('response', response);
      // const users: never[] = [];
      const users = response.data;
      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: users
      });
    } catch (error) {
      dispatch({
        type: FETCH_USERS_FAILURE,
        payload: error,
        error: true
      });
    }
  };
};
