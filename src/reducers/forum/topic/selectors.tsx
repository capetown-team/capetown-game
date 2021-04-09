import { AppState } from '@/reducers';

export const pendingSelector = (state: AppState) => state.forum.pending;
export const topicsSelector = (state: AppState) => state.forum.topics;
