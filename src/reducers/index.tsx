import { combineReducers } from 'redux';
import { userReducer } from '@/reducers/user/reducer';
import { themeReducer } from '@/reducers/theme/reducer';
import { leaderBoardReducer } from '@/reducers/leaderBoard/reducer';
import { forumReducer } from '@/reducers/forum/reducer';

import { UserState } from '@/reducers/user/types';
import { ThemeState } from '@/reducers/theme/types';
import { LeaderBoardState } from '@/reducers/leaderBoard/types';
import { ForumState } from '@/reducers/forum/types';

export type AppState = {
  user: UserState;
  theme: ThemeState;
  leaderBoard: LeaderBoardState;
  forum: ForumState;
};

export const reducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  leaderBoard: leaderBoardReducer,
  forum: forumReducer
});

export type State = ReturnType<typeof reducer>;
