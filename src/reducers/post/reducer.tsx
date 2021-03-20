import { FETCH_USERS_SUCCESS, FETCH_POSTS_SUCCESS } from './constants';

export const INITIAL_STATE = {
  posts: [],
  users: [],
  isFetching: false,
  lastUpdate: Date.now()
};

export const postReducer = (
  state = INITIAL_STATE,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS: {
      return { ...state, users: action.payload };
    }
    case FETCH_POSTS_SUCCESS: {
      return { ...state, posts: action.payload };
    }
    default:
      return state;
  }
};
