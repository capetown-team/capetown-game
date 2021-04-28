import { combineReducers } from 'redux';
import { userReducer } from '@/reducers/user/reducer';
import { themeReducer } from '@/reducers/theme/reducer';
import { leaderBoardReducer } from '@/reducers/leaderBoard/reducer';
import { forumReducer } from '@/reducers/forum/reducer';
import { feedbackReducer } from '@/reducers/feedback/reducer';

import { UserState } from '@/reducers/user/types';
import { ThemeState } from '@/reducers/theme/types';
import { LeaderBoardState } from '@/reducers/leaderBoard/types';
import { ForumState } from '@/reducers/forum/types';
import { FeedbackState } from '@/reducers/feedback/types';

export type AppState = {
  user: UserState;
  theme: ThemeState;
  leaderBoard: LeaderBoardState;
  forum: ForumState;
  feedback: FeedbackState;
};

export const reducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  leaderBoard: leaderBoardReducer,
  forum: forumReducer,
  feedback: feedbackReducer
});

export type State = ReturnType<typeof reducer>;
