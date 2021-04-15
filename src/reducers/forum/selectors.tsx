import { AppState } from '@/reducers';

export const pendingSelector = (state: AppState) => state.forum.pending;
export const topicsSelector = (state: AppState) => state.forum.topics;
export const commentsSelector = (state: AppState) => state.forum.comments;
export const emotionsSelector = (state: AppState) => state.forum.emotions;
