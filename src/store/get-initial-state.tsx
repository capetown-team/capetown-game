import { initialState as userState } from '@/reducers/user/reducer';
import { initialState as leaderBoardState } from '@/reducers/leaderBoard/reducer';
import { AppState } from '@/reducers';

export const getInitialState = (): AppState => {
  return {
    user: userState,
    leaderBoard: leaderBoardState
  };
};
