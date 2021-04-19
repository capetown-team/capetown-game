import { initialState as userState } from '@/reducers/user/reducer';
import { initialState as themeState } from '@/reducers/theme/reducer';
import { initialState as leaderBoardState } from '@/reducers/leaderBoard/reducer';
import { initialState as forumState } from '@/reducers/forum/reducer';
import { initialState as feedbackState } from '@/reducers/feedback/reducer';

import { AppState } from '@/reducers';
import { isServer } from '@/modules/isServer';

export const getInitialState = (): AppState => {
  return isServer
    ? {
        user: userState,
        theme: themeState,
        leaderBoard: leaderBoardState,
        forum: forumState,
        feedback: feedbackState
      }
    : window.__INITIAL_STATE__;
};
