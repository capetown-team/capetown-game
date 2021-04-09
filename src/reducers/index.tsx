import { combineReducers } from 'redux';
import { userReducer } from '@/reducers/user/reducer';
import { leaderBoardReducer } from '@/reducers/leaderBoard/reducer';
import { forumReducer } from '@/reducers/forum/topic/reducer';
import { commentReducer } from '@/reducers/forum/comment/reducer';

import { UserState } from '@/reducers/user/types';
import { LeaderBoardState } from '@/reducers/leaderBoard/types';
import { ForumState } from '@/reducers/forum/topic/types';
import { CommentState } from '@/reducers/forum/comment/types';

export type AppState = {
  user: UserState;
  leaderBoard: LeaderBoardState;
  forum: ForumState;
  comment: CommentState;
};

export const reducer = combineReducers({
  user: userReducer,
  leaderBoard: leaderBoardReducer,
  forum: forumReducer,
  comment: commentReducer
});

export type State = ReturnType<typeof reducer>;
