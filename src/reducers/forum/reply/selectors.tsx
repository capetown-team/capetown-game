import { AppState } from '@/reducers';

export const pendingSelector = (state: AppState) => state.comment.pending;
export const errorSelector = (state: AppState) => state.comment.topics;
