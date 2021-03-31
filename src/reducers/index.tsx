import { combineReducers } from 'redux';
import { userReducer } from '@/reducers/user/reducer';
import { leaderBoardReducer } from '@/reducers/leaderBoard/reducer';

import { UserState } from '@/reducers/user/types';
import { LeaderBoardState } from '@/reducers/leaderBoard/types';

export type AppState = {
  user: UserState;
  leaderBoard: LeaderBoardState;
};

export const reducer = combineReducers({
  user: userReducer,
  leaderBoard: leaderBoardReducer
});

export type State = ReturnType<typeof reducer>;
