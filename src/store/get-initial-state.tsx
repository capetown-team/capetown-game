import { initialState as userState } from '@/reducers/user/reducer';

import { initialState as leaderBoardState } from '@/reducers/leaderBoard/reducer';
import { AppState } from '@/reducers';
import { isServer } from '@/modules/isServer';

export const getInitialState = (): AppState => {
  return isServer
    ? {
        user: userState,
        leaderBoard: leaderBoardState
      }
    : window.__INITIAL_STATE__;
};
