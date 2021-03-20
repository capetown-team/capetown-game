import { combineReducers } from 'redux';
import { userReducer } from '@/reducers/user/reducer';
import { postReducer } from '@/reducers/post/reducer';
import { leaderBoardReducer } from '@/reducers/leaderBoard/reducer';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';

import { UserState } from '@/reducers/user/types';
import { LeaderBoardState } from '@/reducers/leaderBoard/types';

export type AppState = {
  user: UserState;
  post: any;
  leaderBoard: LeaderBoardState;
};

export const reducer = (history: History) =>
  combineReducers({
    user: userReducer,
    post: postReducer,
    leaderBoard: leaderBoardReducer,
    router: connectRouter(history)
  });

export type State = ReturnType<typeof reducer>;

// const postPage = {
//   posts: [],
//   users: [],
//   isFetching: false,
//   lastUpdate: Date.now()
// };

export const getInitialState = (
  pathname = '/'
): {
  leaderBoard: {
    pending: boolean;
    leaders: any[];
    isSuccessBoard: boolean;
    error: null;
    isSuccessResult: boolean;
  };
  router: any;
  post: { lastUpdate: number; isFetching: boolean; posts: any[]; users: any[] };
  user: {
    isAuth: boolean;
    load: boolean;
    pending: boolean;
    error: null;
    user: null;
  };
} => {
  return {
    user: {
      isAuth: false,
      pending: false,
      load: false,
      user: null,
      error: null
    },
    post: {
      posts: [],
      users: [],
      isFetching: false,
      lastUpdate: 1616254079417
    },
    leaderBoard: {
      leaders: [],
      isSuccessResult: false,
      isSuccessBoard: false,
      pending: false,
      error: null
    },
    router: {
      location: { pathname, search: '', hash: '', key: '' },
      action: 'POP'
    } as any
  };
};
