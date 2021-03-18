import { AppState } from '@/reducers';

export const pendingSelector = (state: AppState) => state.leaderBoard.pending;
export const leadersSelector = (state: AppState) => state.leaderBoard.leaders;
